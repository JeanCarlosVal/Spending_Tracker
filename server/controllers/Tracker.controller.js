const express = require('express'),
    router = express.Router()

const service = require('../services/Tracker.service')

//http://localhost:5000/api/tracker/

//Get all Users service
router.get('/', async (req, res) => {
    const users = await service.getAllUsers()
    res.send(users)
})

//Sign In service
router.get('/:email/:password', async (req, res) => {
    const user = await service.signIn(req.params.email, req.params.password)
    if (user.length == 0)
        res.status(404).json('Invalid Email or Password')
    else
        res.send(user)
})

module.exports = router;