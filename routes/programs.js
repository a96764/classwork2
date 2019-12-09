  
var express = require('express');
var router = express.Router();

const controller = require('../controllers/programs.controller')

router.get('/:userId/programs/', controller.getAll)
router.get('/:userId/programs/:programId', controller.getOne)
router.post('/:userId/programs/', controller.create)

module.exports = router;