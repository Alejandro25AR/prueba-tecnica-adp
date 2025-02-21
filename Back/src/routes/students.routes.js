import { Router } from 'express';
import { verifyAccessToken } from '../middlewares/index.js';
import { enrollSubject, getStudent, getSubjectByGrade, getSubjectsEnrolled } from '../controllers/students.controller.js';

const router = Router();

router.get('/subjects',verifyAccessToken('student'),getSubjectByGrade);
router.get('/enroll-subject',verifyAccessToken('student'),enrollSubject);
router.get('/enrolled-subjects',verifyAccessToken('student'),getSubjectsEnrolled);
router.get('/student',verifyAccessToken('student'),getStudent);

export default router;