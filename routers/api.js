import express from 'express';
import {
  postData,
  deleteDB,
  editData,
  fetchUserData,
  modalInputDataPatch,
  fetchCurrentUsersName,
} from '../controllers/controllers.js';

import { postDataForOpenAi } from '../controllers/openAi.js';

import authorizationMiddleware from '../middleware/auth.js';

const router = express.Router();


router.delete('/:id', authorizationMiddleware, deleteDB)
router.post('/writeDB', authorizationMiddleware, postData)
router.patch('/:id', authorizationMiddleware, editData)
router.get('/getUserData', authorizationMiddleware, fetchUserData)
router.patch('/modalData/:id', authorizationMiddleware, modalInputDataPatch)
router.get('/getUsersName', authorizationMiddleware, fetchCurrentUsersName)
router.post('/openAIWrite', authorizationMiddleware,  postDataForOpenAi)

export default router;

