const express = require('express');
const  router  = express.Router();
const { getData, postData, deleteDB } = require('../controllers/controllers');
const authorizationMiddleware = require('../middleware/auth')



//router.get('/allUsers', getData);
router.delete('/:id', authorizationMiddleware, deleteDB)
router.post('/writeDB', authorizationMiddleware, postData)


module.exports = router  ;
