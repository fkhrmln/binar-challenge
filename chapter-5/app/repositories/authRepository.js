const { Users } = require('../../db/models');

const registerRepository = {
  findUser: async (email) => {
    const foundUser = await Users.findOne({
      where: {
        email,
      },
    });

    return foundUser;
  },

  createUser: async (user) => {
    const { email, name, role } = await Users.create(user);

    return { email, name, role };
  },
};

const loginRepository = {
  findUser: async (email) => {
    const foundUser = await Users.findOne({
      where: {
        email,
      },
    });

    return foundUser;
  },

  updateUser: async (email, refreshToken) => {
    await Users.update(
      { refreshToken },
      {
        where: {
          email,
        },
      }
    );
  },
};

const logoutRepository = async (refreshToken) => {
  const loggedOutUser = await Users.update(
    { refreshToken: null },
    {
      where: {
        refreshToken,
      },
    }
  );

  return loggedOutUser;
};

const refreshTokenRepository = async (refreshToken) => {
  const foundUser = Users.findOne({
    where: {
      refreshToken,
    },
  });

  return foundUser;
};

module.exports = {
  registerRepository,
  loginRepository,
  logoutRepository,
  refreshTokenRepository,
};
