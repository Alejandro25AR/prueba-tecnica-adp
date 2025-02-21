import Joi from 'joi';

import { pool } from "../dbConexion.js";

export const getSubjectsEnrolled = async (req,res) => {
  try {
    
    const [ rowsSubjectsEnrolled ] = await pool.query(`
      SELECT o.launch_year, o.id_group, o.id_subject, s.name AS subject_name, p.name AS professor_name
      FROM offers AS o
      INNER JOIN students_offers AS so 
          ON o.launch_year = so.launch_year_offer 
          AND o.id_group = so.id_group_offer 
          AND o.id_subject = so.id_subject_offer 
      INNER JOIN subjects AS s 
          ON o.id_subject = s.id 
      INNER JOIN professors AS p 
          ON o.id_professor = p.id 
      WHERE o.launch_year = YEAR(CURDATE())
      AND so.id_student = ? `,[req.idUser]);
    console.log({data:rowsSubjectsEnrolled})
    return res.json({data:rowsSubjectsEnrolled});
  } catch(error) {
    return res.status(404).send('error');
  }
}

export const getSubjectByGrade = async (req, res) => {
  try {
    console.log('entro');
    const [ rowsUsers ] = await pool.query('SELECT * FROM students WHERE id = ?',[req.idUser]);
    
    const [rowsSubjects] = await pool.query(`
      SELECT s.name,s.description, s.grade_required, o.id_subject,o.id_professor, o.id_group, o.launch_year, o.places_availables, p.name AS name_professor, p.url_image
      FROM offers AS o
        INNER JOIN subjects AS s
      ON o.id_subject = s.id AND s.grade_required = ?
        INNER JOIN professors AS p
      ON id_professor = p.id
      WHERE launch_year = DATE_FORMAT(CURDATE(), '%Y')`, rowsUsers[0].grade)
    
      return res.json({data: rowsSubjects});
  } catch (err) {
      return res.send('Error en Subjects'+err);
  }
}

const schemaEnrollSubject = Joi.object({
  id_subject: Joi.number().required(),
  id_group: Joi.number().required(),
});

export const enrollSubject = async (req, res) => {
  const { error, value } = schemaEnrollSubject.validate(req.body);

  if(error) {
    res.status(400).json({
      status: "error",
      message: "Invalid format",
      details: error.details.map(detail => ({
        field: detail.path.join(''),
        message: detail.message
      }))
    })
  }

  const {id_subject,id_group} = req.body;
  const idUser = req.idUser;
 
  try {
    const [rowsOffers] = await pool.query(`
      SELECT o.places_availables 
      FROM offers AS o
      WHERE 
        o.launch_year = DATE_FORMAT(CURDATE(), '%Y') AND
        o.id_subject = ? AND
        o.id_group = ? AND
        o.places_availables > 0
      LIMIT 1;
      `,[id_subject,id_group]);
    
    if(rowsOffers.length === 0) {
      res.status(409).json({
        status: "error",
        message: "No hay cupos disponibles"
      });
    }

    const [rowsOffersUpdate] = await pool.execute(`
      UPDATE offers 
      SET places_available = places_available - 1 WHERE 
        o.launch_year = DATE_FORMAT(CURDATE(), '%Y') AND
        o.id_subject = ? AND
        o.id_group = ?;`,[id_subject,id_group]);

    const [rowsUserEnroll] = await pool.execute(`
      INSERT INTO students_offers (id_student,launch_year_offer,id_group_offer,id_subject_offer) VALUES (?,?,?,?);
    `,[idUser,new Date().getFullYear(),id_group,id_subject]);

    return res.send('Materia inscrita satisfactoriamente');
  } catch (error) {
    console.log(error);
    return res.send('Error'+error);
  }
}

export const getStudent = async (req,res) => {
  try {

    const [ rowsUsers ] = await pool.query('SELECT * FROM students WHERE id = ?',[req.idUser]);
    console.log(rowsUsers);
    res.json({student: rowsUsers[0]})
  } catch (error) {
    res.status(404).json({error});
  }
  
}