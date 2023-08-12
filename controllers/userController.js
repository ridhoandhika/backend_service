// const bcrypt = require('bcrypt');
const { User } = require('../models')


const getAllUser = async (req, res) =>{

    const user = await User.findAll();

    if(user.length === 0){
        res.status(404).json({
            status: false,
            error: "no record user found"
        }) 
    }

    res.status(200).json({
        status: true,
        data: user
    })
}

const store = async (req, res) => {
    try {
        // let { name, email, password } =  req.body;

        const user = await User.create({ 
            name: req.body.name, 
            email: req.body.email,
            password: req.body.password
        });
        
    } catch (error) {
        // console.log(error); 
        const errors = error.errors
        const errorList = errors.map(e => {
          let obj = {}
          obj[e.path] = e.message
        //   console.log(e.path);
          return obj;
        })
        return res.status(400).json({
                    status:false,
                    error: errorList
                })
    }

    return res.status(200).json({
        status: true,
        message: "user created"
    })
}

const findById = async (req, res) => {
    const id = req.params.id
    try {
        const user = await User.findByPk(id)

        if(!user){
            return res.status(404).json({
                status:false,
                error: "user not found"
            }) 
        }

        return res.status(200).json({
            status: true,
            data: user
        })
    } catch (error) {
        return res.status(200).json({
            status: true,
            error: error
        })
    }
}

const update = async (req, res) => {
    const id = req.params.id
    const isUser = await User.findByPk(id)

    const {name, email} = req.body
    if(!isUser){
        return res.status(404).json({
            status:false,
            error: "user not found"
        }) 
    }

    const user = await User.update({ name: name}, {
        where: {
          id: id
        }
    })

    if(!user){
        return res.status(400).json({
            status:false,
            error: "failed update"
        }) 
    }

    return res.status(200).json({
        status: true,
        message: "user updated"
    })
}

const destroy = async (req, res) => {
    const id = req.params.id
    const isUser = await User.findByPk(id)

    const {name, email} = req.body
    if(!isUser){
        return res.status(404).json({
            status:false,
            error: "user not found"
        }) 
    }

    const user = await User.destroy({
        where: {
          id: id
        }})

    if(!user){
        return res.status(400).json({
            status:false,
            error: "failed deleted"
        }) 
    }

    return res.status(200).json({
        status: true,
        message: "user deleted"
    })
}

module.exports = { getAllUser,  store, findById, update, destroy}