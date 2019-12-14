const User = require('../models/user')
const ObjectId = require('mongoose').Types.ObjectId;

exports.createUser =  function(req, res){
    console.log(req.body)
    User.findOne({email:req.body.email}, async (err,user)=> {
        if (user) {

            res.json(
                {data:{ message:"User already exists"}}
            )
        }
        else{
            try {
                let user = new User(req.body)
                let newUser = await user.save()
                res.statusCode = 201
            } catch (error) {
                res.end({error: error})
            }

        }
    })
}

    exports.login = async function(req, res){
        let user = await User.findOne({email:req.body.email})
        if (user) {
            if(req.body.password==user.password){
                
                return res.json(
                    {data:{ id:user._id,
                            name:user.name}}
                )

            }
            
        }
        else{

            return (res.json(
                {data: {mesage: "Wrong email or password"}}
            ) )

        }
        
    }