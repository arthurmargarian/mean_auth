const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/db');

// Connect to db
mongoose.connect(config.database, {useUnifiedTopology: true, useNewUrlParser: true});

mongoose.connection.on('connected', () => {
    console.log(`Connected to ${config.database} db`);
})

mongoose.connection.on('error', (err) => {
    console.log(`Db Error: ${err}`);
})


const app = express();

const users = require('./routes/users');

// Port Number
const port = process.env.PORT || 8080;

// // Cors Middleware
app.use(cors());

// Set Static folder
app.use(express.static(path.join(__dirname, 'public')));

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
