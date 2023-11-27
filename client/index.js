require('dotenv').config();

const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')
const bodyParser = require('body-parser')
const flash = require('express-flash')
const session = require('express-session')
const colors = require('colors')

const indexRouter = require('./routes/index');
const passport = require('passport');

app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')
app.use(expressLayouts)
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ limit: '10mb', extended: false }))
app.use(flash())
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))
app.use(passport.session())

app.use('/', indexRouter)

try {
    colors.enable()
    app.listen(process.env.PORT || 3000)
    console.log('app running successfully at'.yellow,'http://localhost:3000'.blue)
} catch {
    console.log('Something went wrong!!'.red)
}
