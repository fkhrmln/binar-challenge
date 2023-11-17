const { AuthenticationController } = require('../app/controllers')
const { EmailNotRegisteredError, EmailAlreadyTakenError, WrongPasswordError, RecordNotFoundError } = require('../app/errors')
const { JWT_SIGNATURE_KEY } = require('../config/application')

describe('AuthenticationController', () => {
  let authenticationController

  const mockUserModel = {
    findOne: jest.fn(),
    create: jest.fn(),
    findByPk: jest.fn()
  }

  const mockRoleModel = {
    findOne: jest.fn(),
    findByPk: jest.fn()
  }

  const mockBcrypt = {
    hashSync: jest.fn(),
    compareSync: jest.fn()
  }

  const mockJwt = {
    sign: jest.fn(),
    verify: jest.fn()
  }

  beforeEach(() => {
    authenticationController = new AuthenticationController({
      userModel: mockUserModel,
      roleModel: mockRoleModel,
      bcrypt: mockBcrypt,
      jwt: mockJwt
    })
  })

  describe('authorize', () => {
    it('should set req.user and call next for a successful authorization', () => {
      const mockReq = {
        headers: {
          authorization: 'Bearer mockToken'
        }
      }

      const mockRes = {}

      const mockNext = jest.fn()

      const mockUser = {
        id: 1,
        name: 'Fakhri Maulana',
        email: 'fakhrimaulanag@gmail.com',
        image: null,
        role: {
          id: 1,
          name: 'CUSTOMER'
        }
      }

      mockJwt.verify.mockReturnValue({
        id: mockUser.id,
        name: mockUser.name,
        email: mockUser.email,
        image: mockUser.image,
        role: mockUser.role
      })

      authenticationController.authorize('CUSTOMER')(mockReq, mockRes, mockNext)

      expect(mockJwt.verify).toHaveBeenCalledWith('mockToken', expect.any(String))

      expect(mockReq.user).toEqual(mockUser)

      expect(mockNext).toHaveBeenCalled()
    })

    it('should respond with status 401 and an InsufficientAccessError for unauthorized access', () => {
      const mockReq = {
        headers: {
          authorization: 'Bearer mockToken'
        }
      }

      const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      }

      const mockNext = jest.fn()

      const mockUser = {
        id: 1,
        name: 'Fakhri Maulana',
        email: 'fakhrimaulanag@gmail.com',
        image: null,
        role: {
          id: 1,
          name: 'CUSTOMER'
        }
      }

      mockJwt.verify.mockReturnValue({
        id: mockUser.id,
        name: mockUser.name,
        email: mockUser.email,
        role: {
          id: 1,
          name: 'CUSTOMER'
        }
      })

      authenticationController.authorize('ADMIN')(mockReq, mockRes, mockNext)

      expect(mockJwt.verify).toHaveBeenCalledWith('mockToken', expect.any(String))

      expect(mockRes.status).toHaveBeenCalledWith(401)

      expect(mockRes.json).toHaveBeenCalledWith(
        {
          error: {
            name: 'Error',
            message: 'Access forbidden!',
            details: {
              reason: `${mockUser.role.name} is not allowed to perform this operation.`,
              role: `${mockUser.role.name}`
            }
          }
        }
      )

      expect(mockNext).not.toHaveBeenCalled()
    })
  })

  describe('handleLogin', () => {
    it('should respond with status 201 and an access token for successful login', async () => {
      const mockReq = {
        body: {
          email: 'fakhrimaulanag@gmail.com',
          password: 'fakhri123'
        }
      }

      const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      }

      const mockUser = {
        id: 1,
        name: 'Fakhri Maulana',
        email: 'fakhrimaulanag@gmail.com',
        Role: {
          id: 1, name: 'CUSTOMER'
        },
        encryptedPassword: 'mockEncryptedPassword'
      }

      mockUserModel.findOne.mockResolvedValue(mockUser)

      mockBcrypt.compareSync.mockReturnValue(true)

      mockJwt.sign.mockReturnValue('mockAccessToken')

      await authenticationController.handleLogin(mockReq, mockRes)

      expect(mockRes.status).toHaveBeenCalledWith(201)

      expect(mockRes.json).toHaveBeenCalledWith({ accessToken: 'mockAccessToken' })
    })

    it('should respond with status 401 and a WrongPasswordError for incorrect password', async () => {
      const mockReq = {
        body: {
          email: 'fakhrimaulanag@gmail.com',
          password: 'mockWrongPassword'
        }
      }

      const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      }

      const mockUser = {
        id: 1,
        name: 'Fakhri Maulana',
        email: 'fakhrimaulanag@gmail.com',
        Role: {
          id: 1, name: 'CUSTOMER'
        },
        encryptedPassword: 'mockEncryptedPassword'
      }

      mockUserModel.findOne.mockResolvedValue(mockUser)

      mockBcrypt.compareSync.mockReturnValue(false)

      await authenticationController.handleLogin(mockReq, mockRes)

      expect(mockRes.status).toHaveBeenCalledWith(401)

      expect(mockRes.json).toHaveBeenCalledWith(expect.any(WrongPasswordError))
    })

    it('should respond with status 404 for non-existing email', async () => {
      const mockReq = {
        body: {
          email: 'nonexistent@gmail.com',
          password: 'password123'
        }
      }

      const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      }

      mockUserModel.findOne.mockResolvedValue(null)

      await authenticationController.handleLogin(mockReq, mockRes)

      expect(mockRes.status).toHaveBeenCalledWith(404)
      expect(mockRes.json).toHaveBeenCalledWith(expect.any(EmailNotRegisteredError))
    })
  })

  describe('handleRegister', () => {
    it('should respond with status 422 and an EmailAlreadyTakenError for existing email', async () => {
      const mockReq = {
        body: {
          name: 'Fakhri Maulana',
          email: 'fakhrimaulana@gmail.com',
          password: 'fakhri123'
        }
      }

      const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      }

      const mockUser = {
        id: 1,
        name: 'Fakhri Maulana',
        email: 'fakhrimaulanag@gmail.com',
        Role: {
          id: 1,
          name: 'CUSTOMER'
        },
        encryptedPassword: 'mockEncryptedPassword'
      }

      mockUserModel.findOne.mockResolvedValue(mockUser)

      await authenticationController.handleRegister(mockReq, mockRes)

      expect(mockRes.status).toHaveBeenCalledWith(422)

      expect(mockRes.json).toHaveBeenCalledWith(expect.any(EmailAlreadyTakenError))
    })

    it('should respond with status 201 and an access token for successful registration', async () => {
      const mockReq = {
        body: {
          name: 'Fakhri Maulana',
          email: 'fakhrimaulana@gmail.com',
          password: 'fakhri123'
        }
      }

      const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      }

      const mockUser = {
        id: 1,
        name: 'Fakhri Maulana',
        email: 'fakhrimaulanag@gmail.com',
        Role: {
          id: 1,
          name: 'CUSTOMER'
        },
        encryptedPassword: 'mockEncryptedPassword'
      }

      mockUserModel.findOne.mockResolvedValue(null)

      mockRoleModel.findOne.mockResolvedValue(mockUser.Role)

      mockUserModel.create.mockResolvedValue(mockUser)

      mockJwt.sign.mockReturnValue('mockAccessToken')

      await authenticationController.handleRegister(mockReq, mockRes)

      expect(mockRes.status).toHaveBeenCalledWith(201)

      expect(mockRes.json).toHaveBeenCalledWith({ accessToken: 'mockAccessToken' })
    })
  })

  describe('handleGetUser', () => {
    it('should respond with status 200 and user data for successful retrieval', async () => {
      const mockReq = {
        user: { id: 1 }
      }

      const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      }

      const mockUser = {
        id: 1,
        name: 'Fakhri Maulana',
        email: 'fakhrimaulanag@gmail.com',
        Role: {
          id: 1,
          name: 'CUSTOMER'
        }
      }

      mockUserModel.findByPk.mockResolvedValue(mockUser)

      mockRoleModel.findByPk.mockResolvedValue(mockUser.Role)

      await authenticationController.handleGetUser(mockReq, mockRes)

      expect(mockRes.status).toHaveBeenCalledWith(200)

      expect(mockRes.json).toHaveBeenCalledWith(mockUser)
    })

    it('should respond with status 404 and a RecordNotFoundError for user not found', async () => {
      const mockReq = {
        user: { id: 1 }
      }

      const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      }

      mockUserModel.findByPk.mockResolvedValue(null)

      await authenticationController.handleGetUser(mockReq, mockRes)

      expect(mockRes.status).toHaveBeenCalledWith(404)

      expect(mockRes.json).toHaveBeenCalledWith(expect.any(RecordNotFoundError))
    })

    it('should respond with status 404 and a RecordNotFoundError for role not found', async () => {
      const mockReq = {
        user: { id: 1 }
      }

      const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      }

      const mockUser = {
        id: 1,
        name: 'Fakhri Maulana',
        email: 'fakhrimaulanag@gmail.com',
        Role: {
          id: 3,
          name: 'NON_EXISTING_ROLE'
        }
      }

      mockUserModel.findByPk.mockResolvedValue(mockUser)

      mockRoleModel.findByPk.mockResolvedValue(null)

      await authenticationController.handleGetUser(mockReq, mockRes)

      expect(mockRes.status).toHaveBeenCalledWith(404)

      expect(mockRes.json).toHaveBeenCalledWith(expect.any(RecordNotFoundError))
    })
  })

  describe('createTokenFromUser', () => {
    it('should create a token from user data', () => {
      const mockUser = {
        id: 1,
        name: 'Fakhri Maulana',
        email: 'fakhrimaulanag@gmail.com',
        image: null,
        role: {
          id: 1,
          name: 'CUSTOMER'
        }
      }

      mockJwt.sign.mockReturnValue('mockToken')

      const token = authenticationController.createTokenFromUser(mockUser, mockUser.role)

      expect(mockJwt.sign).toHaveBeenCalledWith(
        {
          id: mockUser.id,
          name: mockUser.name,
          email: mockUser.email,
          image: mockUser.image,
          role: mockUser.role
        },
        JWT_SIGNATURE_KEY
      )

      expect(token).toEqual('mockToken')
    })
  })

  describe('decodeToken', () => {
    it('should decode a valid token', () => {
      const mockUser = {
        id: 1,
        name: 'Fakhri Maulana',
        email: 'fakhrimaulanag@gmail.com',
        image: null,
        role: {
          id: 1,
          name: 'CUSTOMER'
        }
      }

      mockJwt.verify.mockReturnValue({
        id: mockUser.id,
        name: mockUser.name,
        email: mockUser.email,
        role: mockUser.role
      })

      const decodedToken = authenticationController.decodeToken('mockToken')

      expect(mockJwt.verify).toHaveBeenCalledWith('mockToken', JWT_SIGNATURE_KEY)

      expect(decodedToken).toEqual({
        id: mockUser.id,
        name: mockUser.name,
        email: mockUser.email,
        role: mockUser.role
      })
    })
  })

  describe('encryptPassword', () => {
    it('should encrypt a password', () => {
      mockBcrypt.hashSync.mockReturnValue('mockEncryptedPassword')

      const encryptedPassword = authenticationController.encryptPassword('fakhri123')

      expect(mockBcrypt.hashSync).toHaveBeenCalledWith('fakhri123', 10)

      expect(encryptedPassword).toEqual('mockEncryptedPassword')
    })
  })

  describe('verifyPassword', () => {
    it('should return true for a correct password', () => {
      mockBcrypt.compareSync.mockReturnValue(true)

      const isPasswordCorrect = authenticationController.verifyPassword('fakhri123', 'mockEncryptedPassword')

      expect(mockBcrypt.compareSync).toHaveBeenCalledWith('fakhri123', 'mockEncryptedPassword')

      expect(isPasswordCorrect).toEqual(true)
    })
  })
})
