//External Imports
const express = require('express');
const createError = require('http-errors');
const morgan = require('morgan');
const cors = require("cors");
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(morgan('dev'));

//set static folder
// app.use(express.static(path.join(__dirname, "public")));

//internal imports
const usersRouter = require('./routers/usersRouter')
const adminRouter = require('./routers/adminRouter')


app.get('/', async (req, res, next) => {
  res.send({ message: 'Awesome it works 🐻' });
});

app.use('/users', usersRouter)
app.use('/admin', adminRouter)

app.use((req, res, next) => {
  next(createError.NotFound());
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    status: err.status || 500,
    message: err.message,
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 @ http://localhost:${PORT}`));
