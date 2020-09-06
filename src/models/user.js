const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate() {
      // define association here
    }
  }
  User.init(
    {
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      profile: DataTypes.STRING
    },
    {
      sequelize,
      modelName: 'User',
      freezeTableName: true
    }
  );
  return User;
};
