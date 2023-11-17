const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')
const axios = require('axios')

let data
const URL = 'http://localhost:5000/api/tracker/'

function initialize(passport) {
    const authenticateUser = (email, password, done) => {
        axios.get(URL + email)
            .then(async response => {
                data = response.data
                try {
                    if (await bcrypt.compare(password, data[0].Password)) {
                        return done(null, data)
                    } else {
                        return done(null, false, { message: 'Password Incorrect!!' })
                    }
                } catch (e) {
                    return done(e)
                }
            })
            .catch(error => {
                if (error.response.status == 404)
                    return done(null, false, { message: error.response.data })
            })
    }
    passport.use(new LocalStrategy({ usernameField: 'Email', passwordField: 'Password' },
        authenticateUser))
    passport.serializeUser(function (user, done) {
        done(null, user);
    });

    passport.deserializeUser(function (user, done) {
        done(null, user);
    });
}

module.exports = initialize