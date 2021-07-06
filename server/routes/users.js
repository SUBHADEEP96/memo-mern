import express from 'express';
import { signUp , signIn } from '../controllers/users.js';

const router = express.Router();

router.post('/signup', signUp);
router.post('/signin', signIn);


export default router;