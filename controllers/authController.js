const { User } = require('../models')
const jwt = require('jsonwebtoken')

const signToken = id => {
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRED_IN * 60
    })
}

const login = async (req, res) =>{

    const { email, password } = req.body;

    //validasi request user
    if(!email || !password){
        return res.status(422).json({
            status: false,
            error: "body is required"
        })
    }

    //check users email exsist in db
    //check password valid or not 

    const user = await User.findOne({where: {email: email}})

    if(!user || !(await user.CorrectPassword(password, user.password))){
        return res.status(400).json({
            status: false,
            error: "invalid authentication"
        })
    }

    const token = signToken(user.id)

    return res.status(200).json({ 
        status: true,
        data: {
            access_token: token,
        }
    })
}

module.exports = { login }