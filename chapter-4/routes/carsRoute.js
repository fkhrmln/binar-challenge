const carsRouter = require('express').Router();
const { getCars, createNewCar, getCarById, updateCarById, deleteById } = require('../controllers/CarController.js');
const { checkCarsDataExist, checkCarDataExist, updateImage, deleteImage } = require('../middleware/middleware.js');
const { upload } = require('../lib/multer.js');

carsRouter.get('/', checkCarsDataExist, getCars);
carsRouter.post('/', upload.single('image'), createNewCar);
carsRouter.get('/:id', checkCarDataExist, getCarById);
carsRouter.put('/:id', checkCarDataExist, upload.single('image'), updateImage, updateCarById);
carsRouter.delete('/:id', checkCarDataExist, deleteImage, deleteById);

module.exports = carsRouter;
