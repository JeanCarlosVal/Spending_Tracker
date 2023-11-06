const express = require('express'),
    app = express();

require('express-async-errors')

const db = require('./db'),
    TrackerRoutes = require('./controllers/Tracker.controller')

app.use('/api/tracker', TrackerRoutes)

app.use((err,req,res,next)=>{
    console.log(err)
    res.status(err.status || 500).send('Something went wrong!')
})

app.listen(5000,
    () => console.log('server started at 5000'))