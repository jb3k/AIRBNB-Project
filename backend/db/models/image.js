'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Image extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Image.belongsTo(
        models.Spot,
        { foreignKey: 'spotId' }
      )
      Image.belongsTo(
        models.Review,
        { foreignKey: 'reviewId' }
      )
      Image.belongsTo(
        models.User,
        { foreignKey: 'userId' }
      )
    }
  }
  Image.init({
    url: {
      type: DataTypes.STRING(99),
      allowNull: false,
      unique: true,
      validate: {
        len: [1, 99]
      }
    },
    previewImage: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    spotId: {
      type: DataTypes.INTEGER,
      allowNull: false

    },
    reviewId: {
      type: DataTypes.INTEGER,
      allowNull: false

    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Image',
  });
  return Image;
};