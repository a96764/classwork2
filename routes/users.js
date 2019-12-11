  
var express = require('express');
var router = express.Router();

const controller = require('../controllers/users.controller')

/* GET users listing. */
router.post('/', controller.createUser)

module.exports = router;