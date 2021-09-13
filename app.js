const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes')
const cookieParser = require('cookie-parser')

const app = express();

// middleware
app.use(express.static('public'));
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cookieParser())

// view engine
app.set('view engine', 'ejs');


// database connection
mongoose.connect('mongodb://localhost/Jwt', { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true })
  .then((result) => console.log("Monodbga ulanish bajarildi..."))
  .catch((err) => console.log(err));

// routes
app.get('/', (req, res) => res.render('home'));
app.get('/smoothies', (req, res) => res.render('smoothies'));
app.use(authRoutes)

app.get('/setcookie', (req, res)=>{
  res.cookie('name', 'Fazliddin')
  res.cookie('name2', 'Jaloliddin', {maxAge: 1000*60*60*24, secure:true})
  res.send('you got the cookies')
})

app.get('/readcookies', (req, res)=>{
  const cookies = req.cookies
  res.json(cookies)
})

app.listen(3000, ()=>{
  console.log('Server is listening on port 3000')
})