const express = require('express');
const app = express();
const port = 3000;
const userRoutes = require('./routes/auth');
const notFound = require('./middleware/not-found');
const connectDB = require('./db/connect-db');
const errorHandler = require('./middleware/error-handler');
require('dotenv').config();

app.get('/', (req, res) => {
  res.send('<h1>TwiFake API</h1>');
});

app.use(express.json());
app.use('/api/v1', userRoutes);
app.use(notFound);
app.use(errorHandler);

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log('Server is running');
      console.log('http://localhost:' + port);
    });
  } catch (err) {
    console.log(err);
  }
};

start();
