const fs = require('fs/promises');
const path = require('path');
const { Cars } = require('../models');

class CarMiddleware {
  constructor(cars) {
    this.cars = cars;
  }

  checkCarsDataExist = async (req, res, next) => {
    try {
      const cars = await this.cars.findAll();

      if (!cars.length) return res.sendStatus(404);

      res.locals.cars = cars;

      next();
    } catch (err) {
      return res.sendStatus(500);
    }
  };

  checkCarDataExist = async (req, res, next) => {
    const { id } = req.params;

    try {
      const car = await this.cars.findOne({
        where: {
          id,
        },
      });

      if (!car) return res.sendStatus(404);

      res.locals.car = car;
      res.locals.id = car.id;

      next();
    } catch (err) {
      return res.status(400).json({ message: 'ID must be in UUID format' });
    }
  };

  updateImage = async (req, res, next) => {
    const image = req.file;
    const car = res.locals.car;

    if (image) {
      await fs.unlink(`${path.dirname(__dirname)}/public/images/cars/${car.image}`);
    }

    res.locals.image = image;

    next();
  };

  deleteImage = async (req, res, next) => {
    const car = res.locals.car;

    if (car.image) {
      await fs.unlink(`${path.dirname(__dirname)}/public/images/cars/${car.image}`);
    }

    next();
  };
}

module.exports = new CarMiddleware(Cars);
