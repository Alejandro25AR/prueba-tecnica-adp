import jwt from 'jsonwebtoken';

import { pool } from "../dbConexion.js";

export const login = async (req, res) => {
  const { role,_id } = req.data;

  const table = role === "professor" ? "professors" : "students";

  try {
    const [rows, fields] = await pool.query(`SELECT id,name FROM ${table} WHERE user_id = ?`,[_id.toString()]);

    const {id} = rows[0];

    const payload = {
      id,
      role,
      purpose: 'access-token'
    }

    const token = await jwt.sign(payload, process.env.SECRET_KEY,{expiresIn: '1h'});

    console.log(token);

    res.setHeader("Authorization", `Bearer ${token}`);
    res.json({message: "ok"});
  } catch(err){
    console.log(err);
  }
}