const Course = require('../models/course')
constObjectId = require('mongoose').Types.ObjectId;

module.exports.getAll = async function(req, res) {
    try {
      let courses = await Course.find({user: new ObjectId(req.params.courseId)})
      res.json({data: courses})
    } catch (error) {
      res.json({error: error})
    }
}

module.exports.getOne = async function(req, res) {
  try {
    let course = await Course.findOne({course: new ObjectId(req.params.userId)})
    res.json({data: course})
  } catch (error) {
    res.end({error: error})
  }
}

module.exports.create = async function(req, res) {
        try {
  let course = new Course(req.body)
  let newCourse = await course.save()
  res.statusCode = 201
  res.json({data: {id: newCourse._id, message: "Created ok"}})
      } catch (error) {
        console.log(error)
        res.end({error: error})
    }
}