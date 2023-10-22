const fs = require('fs/promises');
const path = require('path');
const {
  getCarsRepository,
  getCarByIdRepository,
  createCarRepository,
  updateCarByIdRepository,
  deleteCarByIdRepository,
} = require('../repositories/carRepository');

const getCarsService = async () => {
  const cars = await getCarsRepository();

  return cars;
};

const getCarByIdService = async (id) => {
  const record = await getCarByIdRepository(id);

  const { created, updated, deleted, ...car } = record
    ? {
        ...record.dataValues,
        createdBy: record.dataValues.created,
        updatedBy: record.dataValues.updated,
        deletedBy: record.dataValues.deleted,
      }
    : {};

  return car;
};

const createCarService = async (user, car, image) => {
  const createdRecord = await createCarRepository({
    ...car,
    image: image.filename,
    createdBy: user.id,
    updatedBy: user.id,
  });

  const { createdBy, updatedBy, deletedBy, createdAt, updatedAt, deletedAt, ...createdCar } = createdRecord.dataValues;

  return createdCar;
};

const updateCarByIdService = async (user, car, payload, image) => {
  const filteredPayload = {};

  for (let i = 0; i < Object.keys(payload).length; i++) {
    if (payload[Object.keys(payload)[i]] !== '' && payload[Object.keys(payload)[i]] !== null) {
      filteredPayload[Object.keys(payload)[i]] = payload[Object.keys(payload)[i]];
    }
  }

  if (image) {
    filteredPayload.image = image.filename;

    await fs.unlink(`${path.dirname(__dirname)}/public/images/cars/${car.image}`);
  }

  console.log(filteredPayload);

  const updatedRecord = await updateCarByIdRepository(car.id, { ...filteredPayload, updatedBy: user.id });

  const { createdBy, updatedBy, deletedBy, createdAt, updatedAt, deletedAt, ...updatedCar } = updatedRecord.dataValues;

  return updatedCar;
};

const deleteCarByIdService = async (user, car) => {
  await fs.unlink(`${path.dirname(__dirname)}/public/images/cars/${car.image}`);

  const deletedRecord = await deleteCarByIdRepository(car.id, { deletedBy: user.id, deletedAt: new Date() });

  const { createdBy, updatedBy, deletedBy, createdAt, updatedAt, deletedAt, ...deletedCar } = deletedRecord.dataValues;

  return deletedCar;
};

module.exports = {
  getCarsService,
  getCarByIdService,
  createCarService,
  updateCarByIdService,
  deleteCarByIdService,
};
