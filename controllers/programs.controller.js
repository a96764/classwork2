const Product = require('../models/programs')
const ObjectId = require('mongoose').Types.ObjectId;

module.exports.getAll = async function(req, res) {
    try {
      let programs = await Program.find({program: new ObjectId(req.params.userId)})
      res.json({data: programs})
    } catch (error) {
      res.json({error: error})
    }
}

module.exports.getOne = async function(req, res) {
  try {
    let product = await Program.findOne({program: new ObjectId(req.params.programId)})
    res.json({data: program})
  } catch (error) {
    res.end({error: error})
  }
}

module.exports.create = async function(req, res) {
        try {
  let progarm = new Program(req.body)
  let newProgram = await program.save()
  res.statusCode = 201
  res.json({data: {id: newProgram._id, message: "Created ok"}})
      } catch (error) {
        console.log(error)
        res.end({error: error})
    }
}