const User = require('../models/user')
const ObjectId = require('mongoose').Types.ObjectId;

exports.createUser =  async function(req, res){
    console.log(req.body)
    
    let user = await User.findOne({email:req.body.email}) 
    if (user!=null) {

        res.json(
            {data:{ message:"User already exists"}}
        )
    }
    else{
        try {
            let user = new User(req.body)
            let newUser = await user.save()
            res.statusCode = 201
            res.json({data:{message:"User Successfully created"}})
        } catch (error) {
            res.end({error: error})
        }

    }
    
}

exports.login = async function(req, res){
    console.log(req.body)

    let user = await User.findOne({email:req.body.email})

    if (user) {
        if(req.body.password==user.password){
            console.log(user)
            let name = user.name
            res.statusCode=200
            res.json(
                {data:{ id:user._id,
                        name:name}}
            )
        }else{
            res.json(
            {data: {mesage: "Wrong email or password"}}
            )
        }
        
    }
    else{
        res.json(
            {data: {mesage: "Wrong email or password"}}
            )

    }
    
}