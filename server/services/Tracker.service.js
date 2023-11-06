const db = require('../db')

module.exports.getAllUsers = async ()=> {
    const [rows] = await db.query("SELECT * FROM User")
        .catch(err => console.log(err))
    return rows
}
