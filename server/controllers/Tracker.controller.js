const express = require('express'),
    router = express.Router()

const service = require('../services/Tracker.service')

//http://localhost:5000/api/tracker/

//Sign In service
router.get('/:email', async (req, res) => {
    const user = await service.signIn(req.params.email)
    if (user.length == 0)
        res.status(404).json('Invalid Email or Password')
    else
        res.send(user)
})

router.post('/', async (req,res) => {
    await service.signUp(req.query)
    res.status(201).send(req.query)
})

router.post('/update/profile', async (req, res) => {
    console.log(req.query)
    await service.profile(req.query)
    res.status(201).send(req.query)
})

module.exports = router;