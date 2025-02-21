import { Router } from "express";

import { 
  validateEmail,
  validateFirstLogin,
  checkCredentials
} from "../middlewares/index.js";

import { login } from "../controllers/authentication.controller.js";

const router = Router();

/* Routes */
router.post(
  '/login',
  validateEmail,checkCredentials,validateFirstLogin,
  login
);

export default router;