const express = require('express');
const  router  = express.Router();
const { postData, deleteDB, editData, fetchUserData, modalInputDataPatch, fetchCurrentUsersName } = require('../controllers/controllers');
const authorizationMiddleware = require('../middleware/auth')

router.delete('/:id', authorizationMiddleware, deleteDB)
router.post('/writeDB', authorizationMiddleware, postData)
router.patch('/:id', authorizationMiddleware, editData)
router.get('/getUserData', authorizationMiddleware, fetchUserData)
router.patch('/modalData/:id', authorizationMiddleware, modalInputDataPatch)
router.get('/getUsersName', authorizationMiddleware, fetchCurrentUsersName)

module.exports = router  ;
