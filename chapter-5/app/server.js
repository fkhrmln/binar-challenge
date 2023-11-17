require('dotenv').config();

const express = require('express');
const cors = require('cors');
const carRoute = require('./routes/carRoute.js');
const authRouter = require('./routes/authRoute.js');
const cookieParser = require('cookie-parser');
const swaggerUI = require('swagger-ui-express');
const { verifyJWT } = require('./middlewares/authMiddleware.js');
const swaggerDocs = require('./docs/swagger.json');

const app = express();

const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 5000;

app.use(cookieParser());
app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));

app.get('/', (req, res) => {
  return res.status(200).json({ message: 'Ping Successfully' });
});

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));

app.use('/auth', authRouter);

app.use(verifyJWT);

app.use('/cars', carRoute);

app.use('*', (req, res) => {
  return res.sendStatus(404);
});

app.listen(PORT, HOST, () => {
  console.log(`Server is running on http://${HOST}:${PORT}/`);
});
