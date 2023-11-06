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
router.post('/Sign_in', (req,res) =>{
  axios.get(URL +'/'+req.body.email+'/'+req.body.password)
    .then(response => {
      const data = response.data

      console.log(data)
    })
    .catch(error => {
      if(error.status == 404)
        res.render('Access_Page', {errorMsg: error.data})
    })
})

module.exports = router