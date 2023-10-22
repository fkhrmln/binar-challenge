const {
  registerController,
  loginController,
  logoutContorller,
  refreshTokenController,
  currentUserController,
} = require('../controllers/authController');
const { validatePayload, verifyJWT, verifySuperAdmin } = require('../middlewares/authMiddleware');

const authRouter = require('express').Router();

authRouter.post('/register/admin', verifyJWT, verifySuperAdmin, validatePayload, registerController);
authRouter.post('/register/member', validatePayload, registerController);
authRouter.post('/login', validatePayload, loginController);
authRouter.get('/current-user', verifyJWT, currentUserController);
authRouter.get('/logout', logoutContorller);
authRouter.get('/refresh-token', refreshTokenController);

module.exports = authRouter;
