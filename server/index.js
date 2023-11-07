const express = require('express'),
    app = express(),
    bodyParser = require('body-parser')

require('express-async-errors')

const db = require('./db'),
    TrackerRoutes = require('./controllers/Tracker.controller')

//Middleware ↓↓↓↓↓↓↓↓↓↓↓↓

app.use('/api/tracker', TrackerRoutes)
app.use(bodyParser.json())
//deals with all errors in the server
app.use((err,req,res,next)=>{
    res.status(err.status || 500).send('Something went wrong!')
})

app.listen(5000,
    () => console.log('server started at 5000'))