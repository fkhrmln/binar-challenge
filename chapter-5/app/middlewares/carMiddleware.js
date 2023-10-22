const { getCarsService, getCarByIdService } = require('../services/carService');
const CustomError = require('../lib/customError');

const checkCarsDataExist = async (req, res, next) => {
  try {
    const cars = await getCarsService();

    if (!cars.length) return res.sendStatus(204);

    res.locals.cars = cars;

    next();
  } catch (err) {
    if (err instanceof CustomError) {
      return res.status(err.code).json({ message: err.message });
    }
    return res.status(500).json({ message: err.message });
  }
};

const checkCarDataExist = async (req, res, next) => {
  const { id } = req.params;

  try {
    const car = await getCarByIdService(id);

    if (!car || Object.keys(car).length === 0) {
      throw new CustomError('Request Error', 'Car Not Found', 404);
    }

    res.locals.car = car;

    next();
  } catch (err) {
    if (err instanceof CustomError) {
      return res.status(err.code).json({ message: err.message });
    }

    return res.status(500).json({ message: err.message });
  }
};

module.exports = {
  checkCarsDataExist,
  checkCarDataExist,
};
