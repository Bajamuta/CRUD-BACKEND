const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require("cors");
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const apiRouter = require('./routes/api');
const mongoose = require("mongoose");
const { MongoClient, ServerApiVersion } = require('mongodb');

const app = express();
const user = 'gadygumbo0a';
const pass = 'AQcRjNEGjxBBbumU';
mongoose.set('strictQuery', true);

// Define the database URL to connect to.
// const mongoDB = "mongodb://localhost:27017/CRUD";
const mongoDB = `mongodb+srv://${user}:${pass}@akademia108.x7mhb6o.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api', apiRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// Wait for database to connect, logging an error if there is a problem
main().catch(err => console.log(err));

async function main() {
  // await mongoose.connect(mongoDB);
  await client.connect();
}

app.listen(8080, () => console.log('Server Node.Js is working'));

module.exports = app;
