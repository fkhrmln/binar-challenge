const { Users, Cars } = require('../../db/models');

const getCarsRepository = async () => {
  const cars = await Cars.findAll({
    attributes: ['id', 'name', 'type', 'image', 'capacity', 'rentPerDay', 'description', 'availableAt'],
  });

  return cars;
};

const getCarByIdRepository = async (id) => {
  const car = await Cars.findOne({
    where: {
      id,
    },
    include: [
      {
        model: Users,
        as: 'created',
        attributes: ['id', 'email', 'name', 'role'],
      },
      {
        model: Users,
        as: 'updated',
        attributes: ['id', 'email', 'name', 'role'],
      },
      {
        model: Users,
        as: 'deleted',
        attributes: ['id', 'email', 'name', 'role'],
      },
    ],
    attributes: { exclude: ['createdBy', 'updatedBy', 'deletedBy'] },
  });

  return car;
};

const createCarRepository = async (car) => {
  const createdCar = await Cars.create(car);

  return createdCar;
};

const updateCarByIdRepository = async (id, payload) => {
  const [_, [updatedCar]] = await Cars.update(payload, {
    where: {
      id,
    },
    returning: true,
  });

  return updatedCar;
};

const deleteCarByIdRepository = async (id, payload) => {
  const [_, [deletedCar]] = await Cars.update(payload, {
    where: {
      id,
    },
    returning: true,
  });

  await Cars.destroy({
    where: {
      id,
    },
  });

  return deletedCar;
};

module.exports = {
  getCarsRepository,
  getCarByIdRepository,
  createCarRepository,
  updateCarByIdRepository,
  deleteCarByIdRepository,
};
