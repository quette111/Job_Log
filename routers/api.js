const express = require('express');
const  router  = express.Router();
const { postData, deleteDB, editData } = require('../controllers/controllers');
const authorizationMiddleware = require('../middleware/auth')



//router.get('/allUsers', getData);
router.delete('/:id', authorizationMiddleware, deleteDB)
router.post('/writeDB', authorizationMiddleware, postData)
router.patch('/:id', authorizationMiddleware, editData)

module.exports = router  ;
