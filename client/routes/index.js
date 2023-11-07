const express = require('express')
const router = express.Router()

const axios = require('axios')
const URL = 'http://localhost:5000/api/tracker/'


//GET REQUEST FROM CLIENT ↓↓↓↓↓↓↓↓↓↓↓

router.get('/', (req, res) => {
  res.render('Access_Page', {errorMsg: ""})
})

router.get('/test', (req,res) => {
  //calling the api for all the users
  axios.get(URL)
    .then(response => {
      const data = response.data

      res.render('test', {users: data})
    })
    .catch(error => {
      console.log(error)
    })
})

//POST REQUEST FROM CLIENT ↓↓↓↓↓↓↓↓↓↓↓↓

//this handles post from sign in button
router.post('/Home_Page', (req,res) =>{
  axios.get(URL+req.body.Email+'/'+req.body.Password)
    .then(response => {
      const data = response.data

      res.render('Home_Page', {user: data[0]})
    })
    .catch(error => {
      if(error.response.status == 404)
        res.render('Access_Page', {errorMsg: error.response.data})
    })
})

//this handles post from sign up button
router.post('/Profile', (req,res) => {
  axios.post(URL,null,{
    params: req.body
  })
    .then(response => {
      const data = response.data
      console.log(data)
      res.render('Profile', {user: data})
    })
    .catch(error => {
      if (error.response.status == 500)
        res.render('Access_Page', {errorMsg: error.response.data})
    })
})

module.exports = router