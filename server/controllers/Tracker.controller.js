const express = require('express'),
    router = express.Router()

const service = require('../services/Tracker.service')

//http://localhost:5000/api/tracker/
router.get('/', async (req,res) =>{
    const users = await service.getAllUsers()
    res.send(users)
})

module.exports = router;