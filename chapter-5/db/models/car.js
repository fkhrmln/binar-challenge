'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Car extends Model {
    static associate(models) {
      Car.belongsTo(models.Users, {
        foreignKey: 'createdBy',
        as: 'created',
      });
      Car.belongsTo(models.Users, {
        foreignKey: 'updatedBy',
        as: 'updated',
      });
      Car.belongsTo(models.Users, {
        foreignKey: 'deletedBy',
        as: 'deleted',
      });
    }
  }
  Car.init(
    {
      id: {
        primaryKey: true,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
        type: DataTypes.UUID,
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      type: {
        allowNull: false,
        type: DataTypes.ENUM,
        values: ['small', 'medium', 'large'],
      },
      image: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      capacity: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      rentPerDay: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      description: {
        allowNull: false,
        type: DataTypes.TEXT,
      },
      availableAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      createdBy: {
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id',
        },
        type: DataTypes.UUID,
      },
      updatedBy: {
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id',
        },
        type: DataTypes.UUID,
      },
      deletedBy: {
        references: {
          model: 'Users',
          key: 'id',
        },
        type: DataTypes.UUID,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      deletedAt: {
        type: DataTypes.DATE,
      },
    },
    {
      sequelize,
      paranoid: true,
      timestamps: true,
      modelName: 'Cars',
    }
  );

  return Car;
};
