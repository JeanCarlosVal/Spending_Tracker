const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const initializePassport = require('./passport-config')
const passport = require('passport')

const axios = require('axios')
const URL = 'http://localhost:5000/api/tracker/'

initializePassport(passport)


//GET REQUEST FROM CLIENT ↓↓↓↓↓↓↓↓↓↓↓

router.get('/', checkNotAuthenticated, (req, res) => {
  res.render('Access_Page', { errorMsg: "", successMsg: "" })
})

router.get('/Profile', checkAuthenticated, (req, res) => {
  res.render('Profile', {
    username: req.user[0].Username,
    firstName: req.user[0].FirstName,
    middleName: req.user[0].MiddleName,
    lastName: req.user[0].LastName,
    email: req.user[0].Email,
    phoneNumber: req.user[0].PhoneNumber,
    street: req.user[0].Street,
    city: req.user[0].City,
    state: req.user[0].State,
    zipcode: req.user[0].ZipCode,
    id: req.user[0].ID
  })
})

router.post('/Profile', checkAuthenticated, (req, res) => {
  for (const property in req.body) {
    if (req.body[property] == '') {
      if (req.user[0][property] == null) {
        req.user[0][property] = ''
      } else {
        continue;
      }
    } else {
      req.user[0][property] = req.body[property]
    }
  }
  axios.post(URL + 'update/profile', null, {
    params: req.user[0]
  })
    .then(res.redirect('Profile'))
    .catch(error => {
      if (error.response.state == 500) {
        console.log(error)
      }
    })
})

router.get('/Expenses', checkAuthenticated, (req, res) => {
  axios.get(URL + 'activities/' + req.user[0].ID)
    .then(response => {
      res.render('Expenses', {
        id: req.user[0].ID,
        successMsg: "",
        errorMsg: "",
        data: response.data
      })
    }).catch(error => {
      if(error.response.status == 404)
        res.render('Expenses', {
          id: req.user[0].ID,
          successMsg: "",
          errorMsg: "",
          data: "No records found"
        })
    })
})

router.post('/Expenses', checkAuthenticated, (req, res) => {
  req.body.ActID = Date.now().toString()
  req.body.UID = req.user[0].ID
  axios.post(URL + 'activities', null, {
    params: req.body
  })
  .then(response => {
    const data = response.data
    axios.get(URL + 'activities/' + req.user[0].ID)
    .then(response => {
      res.render('Expenses', {
        id: req.user[0].ID,
        successMsg: "Record Uploaded!!!",
        errorMsg: "",
        data: response.data
      })
    }).catch(error => {
      if(error.response.status == 404)
        res.render('Expenses', {
          id: req.user[0].ID,
          successMsg: "",
          errorMsg: "",
          data: "No records found"
        })
    })
  })
  .catch(error => {
    if (error.response.status == 500)
      res.render('Expenses', { id: req.user[0].ID ,errorMsg: error.response.data, successMsg: "" })
  })
})

router.get('/Goals', checkAuthenticated, (req, res) => {
  res.render('Goals', {
    id: req.user[0].ID
  })
})

router.get('/Home_Page', checkAuthenticated, (req, res) => {
  res.render('Home_Page')
})

//POST REQUEST FROM CLIENT ↓↓↓↓↓↓↓↓↓↓↓↓

//this handles post from sign in button and sign up button
router.post('/', checkNotAuthenticated, async (req, res) => {
  //Sign Up section----------------------------------------------------
  try {
    const hashedPassword = await bcrypt.hash(req.body.Password, 10)
    req.body.Password = hashedPassword
    req.body.ID = Date.now().toString()
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

router.post('/Sign_In', checkNotAuthenticated, passport.authenticate('local', {
  successRedirect: '/Home_Page',
  failureRedirect: '/',
  failureFlash: true
}))

function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next()
  }

  res.redirect('/')
}

function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect('/Home_Page')
  }
  next()
}

module.exports = router