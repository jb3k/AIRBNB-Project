'use strict';
const { Model, Validator } = require('sequelize');
//importing bcrypt package
const bcrypt = require('bcryptjs');


module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    //this method will return an object with only the User instance info that is safe to save in JWT (ex: id, username, email)
    toSafeObject() {
      const { firstName, lastName, id, username, email } = this; // context will be the User instance
      return { firstName, lastName, id, username, email }
    }

    //accepts a password string 
    validatePassword(password) {
      //return true if there is a match when comparing User Instance's hashedPassword
      return bcrypt.compareSync(password, this.hashedPassword.toString());
    }

    //accepts an id and uses the currentUser scope
    static getCurrentUserById(id) {
      //return a User with that id
      return User.scope("currentUser").findByPk(id);
    }

    //accept an objeect w/ credentials and password keys. This method will search for a username || email
    static async login({ credential, password }) {
      const { Op } = require('sequelize');
      const user = await User.scope('loginUser').findOne({
        where: {
          [Op.or]: {
            username: credential,
            email: credential
          }
        }
      });
      // if user is found, method will validate the password by passing .validatePassword method
      if (user && user.validatePassword(password)) {
        //if password is valid, then method shoudlreturn th euser by usng the currentUser scope
        return await User.scope('currentUser').findByPk(user.id);
      }
    }

    // accepts an object with the 3 params (user,email,pass)
    static async signup({ firstName, lastName, username, email, password }) {
      //hashes the password with bcyrpt method
      const hashedPassword = bcrypt.hashSync(password);
      //creates a user with firstName, lastName, username, email, password
      const user = await User.create({
        firstName,
        lastName,
        username,
        email,
        hashedPassword
      });
      // console.log(user)
      //returns creaeted user using the currentUser scope
      return await User.scope('currentUser').findByPk(user.id);
    }

    //associations between models
    static associate(models) {
      // define association here
      User.hasMany(
        models.Review,
        { foreignKey: 'userId', onDelete: 'CASCADE', hooks: true }
      )
      User.hasMany(
        models.Booking,
        { foreignKey: 'userId', onDelete: 'CASCADE', hooks: true }
      )
      User.hasMany(
        models.Spot,
        { foreignKey: 'ownerId', onDelete: 'CASCADE', hooks: true }
      )
      User.hasMany(
        models.Image,
        { foreignKey: 'userId', onDelete: 'CASCADE', hooks: true }
      )

    }
  };

  User.init(
    {
      firstName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [3, 256],
          isEmail: true
        }
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [4, 30],
          isNotEmail(value) {
            if (Validator.isEmail(value)) {
              throw new Error("Cannot be an email.");
            }
          }
        }
      },
      hashedPassword: {
        type: DataTypes.STRING.BINARY,
        allowNull: false,
        validate: {
          len: [60, 60]
        }
      }
    },
    {
      sequelize,
      modelName: "User",
      defaultScope: {
        attributes: {
          exclude: ["hashedPassword", "createdAt", "updatedAt"]
        }
      },
      scopes: {
        currentUser: {
          attributes: { exclude: ["hashedPassword", "createdAt", "updatedAt"] }
        },
        loginUser: {
          attributes: {}
        }
      }
    }
  );
  return User;
};
