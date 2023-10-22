'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.Cars, {
        foreignKey: 'createdBy',
        as: 'created',
      });
      User.hasMany(models.Cars, {
        foreignKey: 'updatedBy',
        as: 'updated',
      });
      User.hasMany(models.Cars, {
        foreignKey: 'deletedBy',
        as: 'deleted',
      });
    }
  }
  User.init(
    {
      id: {
        primaryKey: true,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
        type: DataTypes.UUID,
      },
      email: {
        unique: true,
        allowNull: false,
        type: DataTypes.STRING,
      },
      password: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      role: {
        allowNull: false,
        type: DataTypes.ENUM,
        values: ['superadmin', 'admin', 'member'],
      },
      refreshToken: {
        type: DataTypes.TEXT,
      },
    },
    {
      sequelize,
      modelName: 'Users',
    }
  );

  return User;
};
