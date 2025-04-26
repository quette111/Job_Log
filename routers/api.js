const express = require('express');
const  router  = express.Router();
const { getData, postData, deleteDB } = require('../controllers/controllers');




router.get('/allUsers', getData);
router.delete('/:id', deleteDB)
router.post('/', postData)

module.exports = { router } ;
