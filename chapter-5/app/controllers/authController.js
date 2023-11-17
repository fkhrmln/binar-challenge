const {
  registerService,
  loginService,
  logoutService,
  refreshTokenService,
  currentUserService,
} = require('../services/authService');
const CustomError = require('../lib/customError');

const registerController = async (req, res) => {
  const { user, payload } = res.locals;

  try {
    const newUser = await registerService(payload, user ? 'admin' : 'member');

    return res.status(201).json(newUser);
  } catch (err) {
    if (err instanceof CustomError) {
      return res.status(err.code).json({ message: err.message });
    }
    return res.status(500).json({ message: err.message });
  }
};

const loginController = async (req, res) => {
  const { payload } = res.locals;

  try {
    const { accessToken, refreshToken } = await loginService(payload);

    res.setHeader('Access-Control-Allow-Credentials', 'true');

    res.cookie('jwt', refreshToken, { httpOnly: true, sameSite: 'none', maxAge: 1000 * 60 * 60 * 24 });

    return res.status(200).json({ accessToken });
  } catch (err) {
    if (err instanceof CustomError) {
      return res.status(err.code).json({ message: err.message });
    }
    return res.status(500).json({ message: err.message });
  }
};

const currentUserController = async (req, res) => {
  const { user } = res.locals;

  try {
    if (!user) {
      throw new CustomError('Authorization Error', 'Token Not Found', 401);
    }

    const filteredUser = await currentUserService(user);

    return res.status(200).json(filteredUser);
  } catch (err) {
    if (err instanceof CustomError) {
      return res.status(err.code).json({ message: err.message });
    }
    return res.status(500).json({ message: err.message });
  }
};

const logoutContorller = async (req, res) => {
  const refreshToken = req.cookies?.jwt;

  if (!refreshToken) return res.sendStatus(204);

  try {
    const loggedOutUser = await logoutService(refreshToken);

    if (!loggedOutUser) {
      res.clearCookie('jwt', { httpOnly: true });

      throw new CustomError('Authorization Error', 'User with Token Not Found', 403);
    }

    return res.clearCookie('jwt', { httpOnly: true }).status(200).json({ message: 'Logout Success' });
  } catch (err) {
    if (err instanceof CustomError) {
      return res.status(err.code).json({ message: err.message });
    }
    return res.status(500).json({ message: err.message });
  }
};

const refreshTokenController = async (req, res) => {
  const refreshToken = req.cookies?.jwt;

  try {
    if (!refreshToken) {
      throw new CustomError('Authorization Error', 'Token Not Found', 401);
    }

    const accessToken = await refreshTokenService(refreshToken);

    return res.status(200).json({ accessToken });
  } catch (err) {
    if (err instanceof CustomError) {
      return res.status(err.code).json({ message: err.message });
    }
    return res.status(500).json({ message: err.message });
  }
};

module.exports = {
  registerController,
  loginController,
  currentUserController,
  logoutContorller,
  refreshTokenController,
};
