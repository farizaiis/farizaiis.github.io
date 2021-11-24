'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class contactCustomer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  contactCustomer.init({
    email: DataTypes.STRING,
    company: DataTypes.STRING,
    message: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'contactCustomer',
  });
  return contactCustomer;
};