if(process.env.NODE_ENV != 'production'){
  require('dotenv').config()
}

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const bcrypt = require('bcrypt');
const passport = require('passport')
const flash = require('express-flash')
const session = require('express-session')
const methodOverride = require('method-override')

const initializePassport = require('./passport-config')
initializePassport(
  passport, 
  email => users.find(user=> user.email===email),
  id=> users.find(user=> user.id===id)
)

var indexRouter = require('./routes/index');
var mapRouter = require('./routes/map');
var login = require('./routes/login');
var register = require('./routes/register');
var usersRouter = require('./routes/users');
// const passport = require('passport');

var app = express();


const users=[]


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(flash())
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}))

app.use(passport.initialize())
app.use(passport.session())
app.use(methodOverride('_method'))

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.get('/map',checkAuthenticated,(req,res)=>{
  res.render('map.ejs', {name:req.user.name})

})

app.get('/login',checkNotAuthenticated, (req,res)=>{
  res.render('login.ejs')
})

app.post('/login', checkNotAuthenticated, passport.authenticate('local',{
  successRedirect : '/map',
  failureRedirect:'/login',
  failureFlash:true
}))

app.get('/register',checkNotAuthenticated, (req,res)=>{
  res.render('register.ejs')
})

app.post('/register', checkNotAuthenticated, async (req,res) => {
  try{
    const hashedPassword = await bcrypt.hash(req.body.password,10)
    users.push({
      id:Date.now().toString(),
      name:req.body.name,
      email:req.body.email,
      password:hashedPassword
    })
    res.redirect('/login')
  } catch{
      res.redirect('/register')
  }
  console.log(users)
})

app.delete('/logout', (req, res) => {
  req.logOut()
  res.redirect('/login')
})
function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next()
  }

  res.redirect('/login')
}

function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect('/map')
  }
  next()
}



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

// res.render('index.ejs', { link: "/views/map.ejs" });

module.exports = app;
