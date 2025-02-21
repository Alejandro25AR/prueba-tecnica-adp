import { pool } from "../dbConexion.js";

/* 
Obtener:
    id,
    name, 
    email
    grade
    biological sex
Servidor comprueba token
Servidor valida que ya no este en la base de datos la id
Servidor crea un esquema de mongoDB lo guarda
    - Retorna la _id donde se guardo.
Servidor guarda la informacio del estudiante en mysql
Servidor retorna peticion cumplida.

*/

import Joi from 'joi';

import { UserModel } from "../models/user.model.js";
import bcrypt from "bcryptjs";

const schemaStudent = Joi.object({
  id: Joi.number().required(),
  name: Joi.string().required().min(7).max(50),
  email: Joi.string().required().email(),
  grade: Joi.number().required().greater(5).less(12),
  biologicalSex: Joi.string().valid('Female', 'Male').required()
});

export const signUpStudent = async (req, res)  => {
  const {error, value} = schemaStudent.validate(req.body);
  if(error){
    return res.status(400).json({
      status: 'error',
      message: 'Datos inválidos',
      details: error.details.map((detail) => ({
        field: detail.path.join('.'),
        message: detail.message,
      })),
    });
  }

  try {
    const [rowsStudent] = await pool.query(`SELECT 1 FROM students WHERE id = ? LIMIT 1;`, [req.body.id]);
  
    if(rowsStudent.length > 0) {
      return res.status(400).json({
        status: 'error',
        message: 'Datos inválidos, el cliente ya existe',
      });
    }

    const { id, name, email, grade, biologicalSex } = req.body;

    

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash('hola', salt);

    const newUser = new UserModel({
      email: req.body.email,
      role: 'student',
      inscriptionDate: Date.now(),
      mustChangePassword: true,
      password: hash
    });

    const docUser = await newUser.save();

    const [rowStudent] = await pool.execute(`INSERT INTO students(id, user_id, name, grade, biological_sex) VALUES (?,?,?,?,?);`,[id,docUser._id,name,grade, biologicalSex]);

    console.log(rowStudent);

    res.status(200).send('ok, added user.');
  } catch (err) {
    console.log(err);
    res.send(err)
  }
}

export const getSubjectByGrade = async (req, res) => {
  try {
  
    const [ rowsUsers ] = await pool.query('SELECT * FROM students WHERE id = ?',[req.idUser]);

    const [rowsSubjects] = await pool.query(`
      SELECT s.name,s.description, s.grade_required, o.id_professor, o.launch_year, o.places_availables, p.name, p.url_image
      FROM offers AS o
        INNER JOIN subjects AS s
      ON o.id_subject = s.id AND s.grade_required = ?
        INNER JOIN professors AS p
      ON id_professor = p.id
      WHERE launch_year = DATE_FORMAT(CURDATE(), '%Y')`, rowsUsers[0].grade)
    
      return res.json(rowsSubjects);
  } catch (err) {
      return res.send('Error en Subjects'+err);
  }
}


export const getSubjectsToImpart = async(req, res) => {
  try {
    const idUser = req.idUser;
    const [ rowsSubjects ] = await pool.query(`
      SELECT o.launch_year, o.id_group, o.id_subject, o.id_professor, o.places_availables, s.name,s.grade_required
      FROM offers AS o
      INNER JOIN professors AS p
          ON o.id_professor = p.id
      INNER JOIN subjects AS s
          ON o.id_subject = s.id
      WHERE o.id_professor = ?;`,
      [idUser]
    );

    res.status(200).json(rowsSubjects);
  } catch (error) {
    console.log(error)
  }
}

export const addSubjectsToImpart = async(req, res) => {
  try {
    const idUser = req.idUser;
    const [ rowsSubjects ] = await pool.query(`
      SELECT o.launch_year, o.id_group, o.id_subject, o.id_professor, o.places_availables, s.name,s.grade_required
      FROM offers AS o
      INNER JOIN professors AS p
          ON o.id_professor = p.id
      INNER JOIN subjects AS s
          ON o.id_subject = s.id
      WHERE o.id_professor = ?;`,
      [idUser]
    );

    res.status(200).json(rowsSubjects);
  } catch (error) {
    console.log(error)
  }
}