'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Spot extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Spot.belongsTo(
        models.User,
        { foreignKey: 'ownerId' }
      )
      Spot.hasMany(
        models.Booking,
        { foreignKey: 'spotId', onDelete: 'cascade', hooks: true }
      )
      Spot.hasMany(
        models.Review,
        { foreignKey: 'spotId', onDelete: 'cascade', hooks: true }
      )
      Spot.hasMany(
        models.Image,
        { foreignKey: 'spotId', onDelete: 'cascade', hooks: true }
      )
    }
  }
  Spot.init({
    ownerId: DataTypes.INTEGER,
    address: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [3, 256]
      }
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 30]
      }
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 30]
      }
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 30]
      }
    },
    lat: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      unique: true
    },
    lng: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      unique: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 256]
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 500]
      }
    },
    price: {
      type: DataTypes.DECIMAL,
      allowNull: false,

    },
  }, {
    sequelize,
    modelName: 'Spot',
  });
  return Spot;
};
