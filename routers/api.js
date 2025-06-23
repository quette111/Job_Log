const express = require('express');
const  router  = express.Router();
console.log('[ROUTER] API routes loaded');
const { postData, deleteDB, editData, fetchUserData, postModalData } = require('../controllers/controllers');
const authorizationMiddleware = require('../middleware/auth')



//router.get('/allUsers', getData);
router.delete('/:id', authorizationMiddleware, deleteDB)
router.post('/writeDB', authorizationMiddleware, postData)
router.patch('/:id', authorizationMiddleware, editData)
router.get('/getUserData', authorizationMiddleware, fetchUserData)
router.post('/modalData', authorizationMiddleware, postModalData)

module.exports = router  ;
