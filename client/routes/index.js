const express = require('express')
const router = express.Router()

const axios = require('axios')
const URL = 'http://localhost:5000/api/tracker/'

router.get('/', (req, res) => {
  res.render('Access_Page')
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

module.exports = router