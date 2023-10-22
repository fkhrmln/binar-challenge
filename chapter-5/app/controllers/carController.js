const CustomError = require('../lib/customError');
const { createCarService, updateCarByIdService, deleteCarByIdService } = require('../services/carService');

const getCarsController = async (req, res) => {
  const { cars } = res.locals;

  return res.status(200).json(cars);
};

const getCarByIdController = async (req, res) => {
  const { car } = res.locals;

  return res.status(200).json(car);
};

const createCarController = async (req, res) => {
  const { user } = res.locals;
  const car = req.body;
  const image = req.file;

  try {
    const createdCar = await createCarService(user, car, image);

    return res.status(201).json(createdCar);
  } catch (err) {
    if (err instanceof CustomError) {
      return res.status(err.code).json({ message: err.message });
    }

    return res.status(500).json({ message: err.message });
  }
};

const updateCarByIdController = async (req, res) => {
  const { user, car } = res.locals;
  const payload = req.body;
  const image = req.file;

  try {
    const updatedCar = await updateCarByIdService(user, car, payload, image);

    return res.status(200).json(updatedCar);
  } catch (err) {
    if (err instanceof CustomError) {
      return res.status(err.code).json({ message: err.message });
    }
    return res.status(500).json({ message: err.message });
  }
};

const deleteCarByIdController = async (req, res) => {
  const { user, car } = res.locals;

  try {
    const deletedCar = await deleteCarByIdService(user, car);

    return res.status(200).json(deletedCar);
  } catch (err) {
    if (err instanceof CustomError) {
      return res.status(err.code).json({ message: err.message });
    }
    return res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getCarsController,
  getCarByIdController,
  createCarController,
  updateCarByIdController,
  deleteCarByIdController,
};
