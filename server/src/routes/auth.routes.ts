import { Router } from 'express';
import { Register, Login, Logout } from '../controllers/auth.controllers';
const router = Router();

router
  .post('/register', Register)
  .post('/login', Login)
  .post('/logout', Logout);

export default router;
