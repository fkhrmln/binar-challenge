const express = require('express');
const cors = require('cors');
const carsRouter = require('./routes/carsRoute.js');

const app = express();

const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));

app.get('/', (req, res) => {
  return res.status(200).json({ message: 'Ping Successfully' });
});

app.use('/cars', carsRouter);

app.use('*', (req, res) => {
  return res.sendStatus(404);
});

app.listen(PORT, HOST, () => {
  console.log(`Server is running on http://${HOST}:${PORT}/`);
});
