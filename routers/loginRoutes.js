import express from 'express';
const router = express.Router();

import { postUserData, loginTheUser } from '../controllers/signupControllers.js';

router.post('/', postUserData)
router.post('/loginTheUser', loginTheUser)

export default router;
