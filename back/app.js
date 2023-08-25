const express = require('express');
const app = express();
const port = 3000;
const userRoutes = require('./routes/auth');
const postsRoutes = require('./routes/posts');
const routeNotFound = require('./middleware/route-not-found');
const connectDB = require('./db/connect-db');
const errorHandler = require('./middleware/error-handler');
require('dotenv').config();
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const cors = require('cors');

app.set('trust proxy', 1);
app.use(helmet());
app.use(cors());
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});
app.use(limiter);

app.get('/', (req, res) => {
  res.send('<h1>TwiFake API</h1>');
});

app.use(express.json());
app.use('/api/v1', userRoutes);
app.use('/api/v1/posts', postsRoutes);
app.use(routeNotFound);
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
