const { Cars } = require('../models');

class CarController {
  constructor(cars) {
    this.cars = cars;
  }

  getCars = async (req, res) => {
    const cars = res.locals.cars;

    return res.status(200).json(cars);
  };

  getCarById = async (req, res) => {
    const car = res.locals.car;

    return res.status(200).json(car);
  };

  createNewCar = async (req, res) => {
    const car = req.body;
    const image = req.file;

    try {
      const newCar = await this.cars.create(image ? { image: image.filename, ...car } : car);

      return res.status(201).json(newCar);
    } catch (err) {
      return res.sendStatus(500);
    }
  };

  updateCarById = async (req, res) => {
    const id = res.locals.id;
    const newData = req.body;
    const image = res.locals.image;

    const [updatedRows, [updatedCar]] = await this.cars.update(
      image ? { image: image.filename, ...newData } : newData,
      {
        where: {
          id,
        },
        returning: true,
      }
    );

    return res.status(200).json(updatedCar);
  };

  deleteById = async (req, res) => {
    const deletedCar = res.locals.car;

    await deletedCar.destroy();

    if (!deletedCar) return res.sendStatus(404);

    return res.status(200).json(deletedCar);
  };
}

module.exports = new CarController(Cars);
