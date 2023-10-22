const jwt = require('jsonwebtoken');
const CustomError = require('../lib/customError');

const validatePayload = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      throw new CustomError('Request Error', 'Email and Password are Required', 400);
    }
  } catch (err) {
    if (err instanceof CustomError) {
      return res.status(err.code).json({ message: err.message });
    }
    return res.status(500).json({ message: err.message });
  }

  res.locals.payload = req.body;

  next();
};

const verifyJWT = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  const token = authHeader && authHeader.split(' ')[1];

  try {
    if (!token) {
      throw new CustomError('Authorization Error', 'Access Token is Required', 401);
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) {
        throw new CustomError('Authorization Error', 'Invalid Token', 403);
      }

      res.locals.user = decoded;

      next();
    });
  } catch (err) {
    if (err instanceof CustomError) {
      return res.status(err.code).json({ message: err.message });
    }
    return res.status(500).json({ message: err.message });
  }
};

const verifySuperAdmin = async (req, res, next) => {
  const { user } = res.locals;

  try {
    if (user.role !== 'superadmin') {
      throw new CustomError('Authorization Error', `Only superadmin can access`, 403);
    }

    next();
  } catch (err) {
    if (err instanceof CustomError) {
      return res.status(err.code).json({ message: err.message });
    }
    return res.status(500).json({ message: err.message });
  }
};

const verifySuperOrAdmin = async (req, res, next) => {
  const { user } = res.locals;

  try {
    if (user.role !== 'superadmin' && user.role !== 'admin') {
      throw new CustomError('Authorization Error', `Only superadmin and admin can access`, 403);
    }

    next();
  } catch (err) {
    if (err instanceof CustomError) {
      return res.status(err.code).json({ message: err.message });
    }
    return res.status(500).json({ message: err.message });
  }
};

module.exports = {
  validatePayload,
  verifyJWT,
  verifySuperAdmin,
  verifySuperOrAdmin,
};
