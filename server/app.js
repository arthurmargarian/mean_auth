const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/db');

// Connect to db
mongoose.connect(config.database, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
});

mongoose.connection.on('connected', () => {
    console.log(`Connected to ${config.database} db`);
})

mongoose.connection.on('error', (err) => {
    console.log(`Db Error: ${err}`);
})


const app = express();

const users = require('./routes/users');

// Port Number
const port = process.env.PORT || 5000;

// // Cors Middleware
app.use(cors());

// Set Static folder
// const distDir = path.join(__dirname + "/dist/");
// const distDir = __dirname + "/dist/";
app.use(express.static("../dist"));

// // Body Parser Middleware
app.use(bodyParser.json());
app.use('/users', users);

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);


// Index Route
app.get('/', (req, res) => {
    res.send('invalid endpoint');
})

app.listen(port, () => {
    console.log(`Server started on ${port}`);
});
