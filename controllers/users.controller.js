const User = require('../models/user')
const ObjectId = require('mongoose').Types.ObjectId;

exports.createUser =  function(req, res){
    User.findOne({email:req.body.email}, async (err,user)=> {
        if (user) {
            return res.json(
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
                    {data:{ id:user._id}}
                )

            }
            
        }
        else{

            return (res.json(
                {data: {mesage: "Wrong email or password"}}
            ) )

        }
        
    }