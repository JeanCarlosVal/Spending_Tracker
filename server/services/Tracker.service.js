const db = require('../db')

//get all users service. This was used to test the api
module.exports.getAllUsers = async ()=> {
    const [rows] = await db.query("SELECT * FROM User")
    return rows
}

//Sign in module
module.exports.signIn = async (email,password) => {
    const [user] = await db.query("SELECT * FROM User WHERE Email = ? and Password = ?", [email, password])
    return user
}
