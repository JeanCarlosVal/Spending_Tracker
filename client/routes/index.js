const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const initializePassport = require('./passport-config')
const passport = require('passport')

const axios = require('axios')
const URL = 'http://localhost:5000/api/tracker/'

initializePassport(passport)


//GET REQUEST FROM CLIENT ↓↓↓↓↓↓↓↓↓↓↓

router.get('/', (req, res) => {
  res.render('Access_Page', { errorMsg: "", successMsg: "" })
})

router.get('/test', (req, res) => {
  //calling the api for all the users
  axios.get(URL)
    .then(response => {
      const data = response.data

      res.render('test', { users: data })
    })
    .catch(error => {
      console.log(error)
    })
})

router.get('/Profile', (req, res) => {
  res.render('Profile')
})

router.get('/Home_Page', (req, res) => {
  res.render('Home_Page')
})

//POST REQUEST FROM CLIENT ↓↓↓↓↓↓↓↓↓↓↓↓

//this handles post from sign in button and sign up button
router.post('/', async (req, res) => {
  //Sign Up section----------------------------------------------------
  try {
    const hashedPassword = await bcrypt.hash(req.body.Password, 10)
    console.log(hashedPassword)
    req.body.Password = hashedPassword
  } catch {
    res.render('Access_Page', { errorMsg: "Something went wrong!!", successMsg: "" })
  }
  axios.post(URL, null, {
    params: req.body
  })
    .then(response => {
      const data = response.data
      console.log(data)
      res.render('Access_Page', { errorMsg: "", successMsg: "Account Created Sign In!!!" })
    })
    .catch(error => {
      if (error.response.status == 500)
        res.render('Access_Page', { errorMsg: error.response.data, successMsg: "" })
    })
  //-----------------------------------------------------------------------

})

router.post('/Sign_In', passport.authenticate('local', {
  successRedirect: '/Home_Page',
  failureRedirect: '/',
  failureFlash: true
}))

module.exports = router