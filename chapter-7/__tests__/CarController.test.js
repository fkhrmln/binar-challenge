const { CarController } = require('../app/controllers')
const { CarAlreadyRentedError } = require('../app/errors')

describe('CarController', () => {
  let carController

  const mockCarModel = {
    findAll: jest.fn(),
    findByPk: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    destroy: jest.fn(),
    count: jest.fn()
  }

  const mockUserCarModel = {
    findOne: jest.fn(),
    create: jest.fn()
  }

  const mockDayjs = {
    add: jest.fn()
  }

  beforeEach(() => {
    carController = new CarController({
      carModel: mockCarModel,
      userCarModel: mockUserCarModel,
      dayjs: mockDayjs
    })
  })

  describe('handleListCars', () => {
    it('should respond with a list of cars and pagination meta data', async () => {
      const mockCars = [
        {
          id: 1,
          name: 'Car 1'
        },
        {
          id: 2,
          name: 'Car 2'
        },
        {
          id: 3,
          name: 'Car 3'
        }
      ]

      const mockReq = {
        query: {}
      }

      const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      }

      const mockCarCount = 3

      mockCarModel.findAll.mockResolvedValue(mockCars)

      mockCarModel.count.mockResolvedValue(mockCarCount)

      await carController.handleListCars(mockReq, mockRes)

      expect(mockRes.status).toHaveBeenCalledWith(200)

      expect(mockRes.json).toHaveBeenCalledWith({
        cars: mockCars,
        meta: {
          pagination: {
            page: 1,
            pageCount: 1,
            pageSize: 10,
            count: mockCarCount
          }
        }
      })
    })
  })

  it('should respond with a car when found', async () => {
    const mockCar = {
      id: 1,
      name: 'Car 1'
    }

    const mockReq = {
      params: {
        id: mockCar.id.toString()
      }
    }

    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    }

    mockCarModel.findByPk.mockResolvedValue(mockCar)

    await carController.handleGetCar(mockReq, mockRes)

    expect(mockRes.status).toHaveBeenCalledWith(200)

    expect(mockRes.json).toHaveBeenCalledWith(mockCar)
  })

  describe('handleCreateCar', () => {
    it('should respond with the created car', async () => {
      const mockCarData = {
        name: 'New Car',
        price: 3000000,
        size: 'MEDIUM',
        image: 'car.jpg'
      }

      const mockCreatedCar = {
        id: 1,
        ...mockCarData,
        isCurrentlyRented: false
      }

      mockCarModel.create.mockResolvedValue(mockCreatedCar)

      const mockReq = {
        body: mockCarData
      }

      const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      }

      await carController.handleCreateCar(mockReq, mockRes)

      expect(mockRes.status).toHaveBeenCalledWith(201)

      expect(mockRes.json).toHaveBeenCalledWith(mockCreatedCar)
    })

    it('should respond with a 422 error when there is an error creating the car', async () => {
      const mockCarData = {
        name: 'New Car',
        price: 3000000,
        size: 'MEDIUM',
        image: 'car.jpg'
      }

      const mockReq = {
        body: mockCarData
      }

      const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      }

      mockCarModel.create.mockRejectedValue(new Error('Some error occurred during car creation'))

      await carController.handleCreateCar(mockReq, mockRes)

      expect(mockRes.status).toHaveBeenCalledWith(422)

      expect(mockRes.json).toHaveBeenCalledWith({
        error: {
          name: 'Error',
          message: 'Some error occurred during car creation'
        }
      })
    })
  })

  describe('handleRentCar', () => {
    it('should respond with the rented car', async () => {
      const mockRentStartedAt = '2023-11-10 00:00:00.068000 +00:00'
      const mockRentEndedAt = '2023-11-11 00:00:00.068000 +00:00'

      const mockCarId = 1

      const mockCar = {
        id: mockCarId,
        name: 'Car 1'
      }

      mockCarModel.findByPk.mockResolvedValue(mockCar)

      mockUserCarModel.findOne.mockResolvedValue(null)

      const mockUserCar = {
        userId: 1,
        carId: mockCarId,
        rentStartedAt: mockRentStartedAt,
        rentEndedAt: mockRentEndedAt
      }

      mockUserCarModel.create.mockResolvedValue(mockUserCar)

      const mockReq = {
        body: {
          rentStartedAt: mockRentStartedAt,
          rentEndedAt: mockRentEndedAt
        },
        params: {
          id: mockCarId.toString()
        },
        user: {
          id: 1
        }
      }

      const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      }

      await carController.handleRentCar(mockReq, mockRes)

      expect(mockRes.status).toHaveBeenCalledWith(201)

      expect(mockRes.json).toHaveBeenCalledWith(mockUserCar)
    })

    it('should respond with a 422 error when the car is already rented during the specified period', async () => {
      const mockRentStartedAt = '2023-11-10 00:00:00.068000 +00:00'
      const mockRentEndedAt = '2023-11-11 00:00:00.068000 +00:00'

      const mockCarId = 1

      const mockCar = {
        id: mockCarId,
        name: 'Car 1'
      }

      mockCarModel.findByPk.mockResolvedValue(mockCar)

      const existingActiveRent = {
        userId: 1,
        carId: mockCarId,
        rentStartedAt: mockRentStartedAt,
        rentEndedAt: mockRentEndedAt
      }

      mockUserCarModel.findOne.mockResolvedValue(existingActiveRent)

      const mockReq = {
        body: {
          rentStartedAt: mockRentStartedAt,
          rentEndedAt: mockRentEndedAt
        },
        params: {
          id: mockCarId.toString()
        },
        user: {
          id: 1
        }
      }

      const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      }

      await carController.handleRentCar(mockReq, mockRes)

      expect(mockRes.status).toHaveBeenCalledWith(422)

      expect(mockRes.json).toHaveBeenCalledWith(expect.any(CarAlreadyRentedError))
    })
  })

  // describe('handleUpdateCar', () => {
  //   it('should respond with the updated car', async () => {
  //     const mockCarId = 1;
  //
  //     const mockCarData = {
  //       name: 'Updated Car',
  //       price: 5000000,
  //       size: 'LARGE',
  //       image: 'updated-car.jpg',
  //     };
  //
  //     const mockUpdatedCar = {
  //       id: mockCarId,
  //       ...mockCarData,
  //       isCurrentlyRented: false,
  //     };
  //
  //     const mockReq = {
  //       body: mockCarData,
  //       params: {
  //         id: mockCarId,
  //       },
  //     };
  //
  //     const mockRes = {
  //       status: jest.fn().mockReturnThis(),
  //       json: jest.fn(),
  //     };
  //
  //     mockCarModel.findByPk.mockResolvedValue(mockUpdatedCar);
  //
  //     mockCarModel.update.mockResolvedValue([1, [mockUpdatedCar]]);
  //
  //     await carController.handleUpdateCar(mockReq, mockRes);
  //
  //     expect(mockRes.status).toHaveBeenCalledWith(200);
  //
  //     expect(mockRes.json).toHaveBeenCalledWith(mockUpdatedCar);
  //   });
  //
  //   it('should respond with a 422 error when there is an error updating the car', async () => {
  //     const mockCarId = 1;
  //
  //     const mockCarData = {
  //       name: 'Updated Car',
  //       price: 5000000,
  //       size: 'LARGE',
  //       image: 'updated-car.jpg',
  //     };
  //
  //     const mockReq = {
  //       body: mockCarData,
  //       params: {
  //         id: mockCarId.toString(),
  //       },
  //     };
  //
  //     const mockRes = {
  //       status: jest.fn().mockReturnThis(),
  //       json: jest.fn(),
  //     };
  //
  //     mockCarModel.findByPk.mockResolvedValue(null);
  //
  //     await carController.handleUpdateCar(mockReq, mockRes);
  //
  //     expect(mockRes.status).toHaveBeenCalledWith(422);
  //
  //     expect(mockRes.json).toHaveBeenCalledWith({
  //       error: {
  //         name: 'Error',
  //         message: 'Car not found!',
  //       },
  //     });
  //   });
  // });

  describe('handleDeleteCar', () => {
    it('should respond with status 204 when successfully deleting a car', async () => {
      const mockCarId = 1

      const mockReq = {
        params: {
          id: mockCarId.toString()
        }
      }

      const mockRes = {
        status: jest.fn().mockReturnThis(),
        end: jest.fn()
      }

      mockCarModel.destroy.mockResolvedValue(true)

      await carController.handleDeleteCar(mockReq, mockRes)

      expect(mockRes.status).toHaveBeenCalledWith(204)

      expect(mockRes.end).toHaveBeenCalled()
    })
  })

  describe('getCarFromRequest', () => {
    it('should return the car based on the car ID from request parameters', async () => {
      const mockCarId = 1

      const mockCar = {
        id: mockCarId,
        name: 'Car 1'
      }

      const mockReq = {
        params: {
          id: mockCarId.toString()
        }
      }

      mockCarModel.findByPk.mockResolvedValue(mockCar)

      const result = await carController.getCarFromRequest(mockReq)

      expect(result).toEqual(mockCar)
    })

    it('should return null when the car is not found', async () => {
      const mockCarId = 1

      mockCarModel.findByPk.mockResolvedValue(null)

      const mockReq = {
        params: {
          id: mockCarId.toString()
        }
      }

      const result = await carController.getCarFromRequest(mockReq)

      expect(result).toBeNull()
    })
  })
})
