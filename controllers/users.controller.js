const User = require('../models/user')
constObjectId = require('mongoose').Types.ObjectId;

module.exports.getAll = async function(req, res) {
    try {
      let users = await Product.find({user: new ObjectId(req.params.userId)})
      res.json({data: users})
    } catch (error) {
      res.json({error: error})
    }
}

module.exports.getOne = async function(req, res) {
  try {
    let user = await User.findOne({user: new ObjectId(req.params.userId)})
    res.json({data: user})
  } catch (error) {
    res.end({error: error})
  }
}

module.exports.create = async function(req, res) {
        try {
  console.log(res.body)
  let user = new Product(req.body)
  let newUser = await user.save()
  res.statusCode = 201
  res.json({data: {id: newUser._id, message: "Created ok"}})
      } catch (error) {
        console.log(error)
        res.end({error: error})
    }
}