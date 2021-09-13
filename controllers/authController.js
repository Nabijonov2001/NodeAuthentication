const User = require('../models/User')
const jwt = require('jsonwebtoken')

//validation error

// if(err.message.includes('user validation failed')){
//     Object.values(err.errors).forEach(({properties})=>{
//         errors[properties.path]=properties.message
//     })
// }
const maxAge = 3*24*60*60
const createToken = (id)=>{
    return jwt.sign({id}, 'd1ln0z@', {
        expiresIn:maxAge
    })
}
module.exports.signup_get = (req, res)=>{
    res.render('signup')
}
module.exports.login_get = (req, res)=>{
    res.render('login')
}
module.exports.signup_post = async (req, res)=>{
    const {email, password} = req.body;
   try {
       const user = await User.create({email, password});
       res.status(201).json(user)
       console.log(user)
       const token = createToken(user._id)
       console.log(token)
       res.status(201).json(user)
   } catch (err) {
       console.log(err) 
       res.status(400).send('error user not created')
   }
}
module.exports.login_post = (req, res)=>{
    res.render('login')
}