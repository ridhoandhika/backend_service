'use strict';

const {
  Model
} = require('sequelize');
// const { Sequelize } = require('.');
module.exports = (sequelize, DataTypes) => {
  class Role extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Role.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    name:{
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
    }
  }, {
    hooks: {
      afterValidate: (user, options) => {
        user.id = v4()
      }
    },
    sequelize,
    modelName: 'Role',
  });
  return Role;
};