import { Router } from 'express';
import { Register, Login } from '../controllers/auth.controllers';
const router = Router();

router.post('/register', Register).post('/login', Login);

export default router;
