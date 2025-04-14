const express = require('express');
const  router  = express.Router();
const { getData, postData } = require('../controllers/controllers');




router.get('/api/v1/users', getData);

router.post('/api/v1/users', postData)

module.exports = { router } ;
