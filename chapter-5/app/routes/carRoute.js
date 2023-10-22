const carsRouter = require('express').Router();
const {
  getCarsController,
  getCarByIdController,
  createCarController,
  updateCarByIdController,
  deleteCarByIdController,
} = require('../controllers/carController.js');
const { checkCarsDataExist, checkCarDataExist } = require('../middlewares/carMiddleware.js');
const { upload } = require('../lib/multer.js');
const { verifySuperOrAdmin } = require('../middlewares/authMiddleware.js');

carsRouter.get('/', checkCarsDataExist, getCarsController);
carsRouter.post('/', verifySuperOrAdmin, upload.single('image'), createCarController);
carsRouter.get('/:id', checkCarDataExist, getCarByIdController);
carsRouter.put('/:id', verifySuperOrAdmin, checkCarDataExist, upload.single('image'), updateCarByIdController);
carsRouter.delete('/:id', verifySuperOrAdmin, checkCarDataExist, deleteCarByIdController);

module.exports = carsRouter;
