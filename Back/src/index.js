import express from 'express';
import * as dotenv from 'dotenv'; 
import cors from 'cors';
import mongoose from 'mongoose';
import routerAuthentication from './routes/authentication.routes.js';
import routerStudents from './routes/students.routes.js';
import routerProfessors from './routes/professors.routes.js';

dotenv.config();
const app = express();

/* Conection Database */
mongoose.connect(process.env.MONGO_DB_CONNECTION)
  .then(()=>{
    console.log("✅ MongoDB connection successful")
  }).catch(err => {
    console.log("✘ MongoDB connection failed:"+err)
  });

/* Middleware */
app.use(express.json());
app.use(cors({
  origin: "*",
  allowedHeaders: ["Authorization", "Content-Type"]
}));

app.use(routerAuthentication);
app.use(routerStudents);
app.use(routerProfessors);

app.listen(process.env.PORT, "0.0.0.0");
console.log(`Server on port ${process.env.PORT}`);