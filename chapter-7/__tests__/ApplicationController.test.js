const { ApplicationController } = require('../app/controllers')

describe('ApplicationController', () => {
  let applicationController

  beforeEach(() => {
    applicationController = new ApplicationController()
  })

  describe('handleGetRoot', () => {
    it('should respond with status 200 and a JSON message', () => {
      const mockReq = {}
      const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      }

      applicationController.handleGetRoot(mockReq, mockRes)

      expect(mockRes.status).toHaveBeenCalledWith(200)
      expect(mockRes.json).toHaveBeenCalledWith({
        status: 'OK',
        message: 'BCR API is up and running!'
      })
    })
  })

  describe('handleNotFound', () => {
    it('should respond with status 404 and a JSON error message', () => {
      const mockReq = {
        method: 'GET',
        url: '/not-found'
      }
      const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      }

      applicationController.handleNotFound(mockReq, mockRes)

      expect(mockRes.status).toHaveBeenCalledWith(404)
      expect(mockRes.json).toHaveBeenCalledWith({
        error: {
          name: 'Error',
          message: 'Not found!',
          details: {
            method: mockReq.method,
            url: mockReq.url
          }
        }
      })
    })
  })

  describe('handleError', () => {
    it('should respond with status 500 and a JSON error message', () => {
      const mockErr = new Error('Test Error')
      const mockReq = {}
      const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      }

      applicationController.handleError(mockErr, mockReq, mockRes)

      expect(mockRes.status).toHaveBeenCalledWith(500)
      expect(mockRes.json).toHaveBeenCalledWith({
        error: {
          name: 'Error',
          message: 'Test Error',
          details: null
        }
      })
    })
  })

  // Add more test cases for other methods if needed
})
