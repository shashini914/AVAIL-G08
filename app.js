const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const fileUpload = require('express-fileupload');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');
const path = require('path');
const bodyparser = require("body-parser");
const { v4: uuidv4 } = require("uuid");
const mongoose = require('mongoose');
const passport = require('passport');
const morgan = require('morgan');


const router = require('./router');

const app = express();
const port = process.env.PORT || 3000;

require('dotenv').config();

app.use(express.urlencoded( { extended: true } ));
app.use(express.static('public'));
app.use(expressLayouts);

app.use(cookieParser('AVAILSecure'));
app.use(session({
  secret: 'AVAILSecretSession',
  saveUninitialized: true,
  resave: true
}));
app.use(flash());
app.use(fileUpload());

app.set('layout', './layouts/main');
app.set('view engine', 'ejs');

const routes = require('./server/routes/sellerRoutes.js')
app.use('/', routes);

// parse request to body-parser
app.use(bodyparser.urlencoded({ extended : true}))

app.use(session({
  secret: uuidv4(), //  '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'
  resave: false,
  saveUninitialized: true
}));

app.use('/route', router);

// home route
app.get('/base', (req, res) =>{
  res.render('base', { title : "Login System"});
})


// Passport Config
require('./config/passport')(passport);

// DB Config
const db = require('./config/keys').mongoURI;

// Connect to MongoDB
mongoose
  .connect(
    db,
    { useNewUrlParser: true ,useUnifiedTopology: true}
  )
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// Express body parser
app.use(express.urlencoded({ extended: true }));


// Express session
app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.use(flash());

// Global variables
app.use(function(req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});

// Routes
app.use('/logging', require('./UserRoutes/index.js'));
app.use('/users', require('./UserRoutes/users.js'));

// log requests
app.use(morgan('tiny'));



app.listen(port, ()=> console.log(`Listening to port ${port}`));



