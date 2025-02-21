import { Router } from 'express';
import { getSubjectsToImpart, signUpStudent } from '../controllers/professor.controller.js';
import { verifyAccessToken } from '../middlewares/verifyAccessToken.js';

const router = Router();

router.post('/sing-up-student',verifyAccessToken('professor'),signUpStudent);
router.get('/subject-to-impart',verifyAccessToken('professor'),getSubjectsToImpart);
router.post('/add-subject',verifyAccessToken('professor'),getSubjectsToImpart);


export default router;