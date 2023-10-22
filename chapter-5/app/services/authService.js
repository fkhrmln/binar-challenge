const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {
  registerRepository,
  loginRepository,
  logoutRepository,
  refreshTokenRepository,
} = require('../repositories/authRepository');
const CustomError = require('../lib/customError');

const registerService = async (payload, role) => {
  const { email, password } = payload;

  const foundUser = await registerRepository.findUser(email);

  if (foundUser) {
    throw new CustomError('Request Error', 'Email Already Exists', 409);
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await registerRepository.createUser({ ...payload, password: hashedPassword, role });

  return newUser;
};

const loginService = async (payload) => {
  const { email, password } = payload;

  const foundUser = await loginRepository.findUser(email);

  const isPasswordMatch = await bcrypt.compare(password, foundUser.password);

  if (!isPasswordMatch) {
    throw new CustomError('Authorization Error', 'Wrong Password', 401);
  }

  const accessToken = jwt.sign(
    { id: foundUser.id, email, name: foundUser.name, role: foundUser.role },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: '30m',
    }
  );

  const refreshToken = jwt.sign(
    { id: foundUser.id, email, name: foundUser.name, role: foundUser.role },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: '1d' }
  );

  await loginRepository.updateUser(email, refreshToken);

  return { accessToken, refreshToken };
};

const currentUserService = async (user) => {
  const { iat, exp, ...filteredUser } = user;

  return filteredUser;
};

const logoutService = async (refreshToken) => {
  const loggedOutUser = await logoutRepository(refreshToken);

  return loggedOutUser;
};

const refreshTokenService = async (refreshToken) => {
  const foundUser = await refreshTokenRepository(refreshToken);

  if (!foundUser) {
    throw new CustomError('Authorization Error', 'User with Token Not Found', 403);
  }

  const accessToken = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, { id, email, name, role }) => {
    if (err) {
      throw new CustomError('Authorization Error', 'Invalid Token', 403);
    }

    const accessToken = jwt.sign({ id, email, name, role }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '30m' });

    return accessToken;
  });

  return accessToken;
};

module.exports = {
  registerService,
  loginService,
  currentUserService,
  logoutService,
  refreshTokenService,
};
