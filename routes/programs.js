  
var express = require('express');
var router = express.Router();

const controller = require('../controllers/programs.controller')

router.get('', controller.getAll)
router.get('', controller.getOne)
router.post('', controller.create)

module.exports = router;