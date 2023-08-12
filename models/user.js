'use strict';
const {
  Model
} = require('sequelize');
const {v4} = require('uuid')
// const { Sequelize } = require('.');
const bcrypt = require('bcrypt');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Please enter your name'
        },
        notEmpty:{
          args:true,
          msg:"Please enter your name"
        },
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false, 
      validate: {
        notEmpty:{
          args:true,
          msg:"Please enter your email"
        },
        isEmail : {
          args: true,
          msg: "email not valid"
        },
        notNull: {
          msg: 'Please enter your email'
        },
        isUnique: (value, next) => {
          User.findAll({
            where: { email: value },
            attributes: ['id'],
          })
            .then((user) => {
              if (user.length != 0)
                next(new Error('Email address already in use!'));
              next();
            })
            .catch((onError) => console.log(onError));
        },
      }
    },
    password: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Please enter your password'
        },
        notEmpty:{
          args:true,
          msg:"Please enter your email"
        },
        len: {
          args: [3],
          msg: "Password must be at least 3 characters",
        },         
        // is: /^[0-9a-f]{64}$/i
      }
    },
    role_id: {
      type: DataTypes.UUID
    }
  }, {
    hooks: {
      beforeCreate: async (user) => {
        if(!user.role_id){
          const roleUser = await sequelize.models.Role.findOne({where: {
            name: 'user' 
          }})
          user.role_id = roleUser.id,
          user.password = bcrypt.hashSync(user.password, 10)
          user.id = v4()
        }
      },
      afterValidate: async (user, options) => {
        user.name = user.name.toUpperCase()
        
      },
    },
    
    sequelize,
    modelName: 'User',
  });

  User.prototype.CorrectPassword = async (reqPassword, passwordDB) => {
    return await bcrypt.compareSync(reqPassword, passwordDB)
  }
  return User;
};