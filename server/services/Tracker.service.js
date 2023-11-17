const db = require('../db')

//get all users service. This was used to test the api
module.exports.getAllUsers = async ()=> {
    const [rows] = await db.query("SELECT * FROM User")
    return rows
}

//Sign in module
module.exports.signIn = async (email) => {
    const [user] = await db.query("SELECT * FROM User WHERE Email = ?", [email])
    return user
}

//Sign up module
module.exports.signUp = async (obj) =>{
    const [{affectedRows}] = await db.query("INSERT INTO User(Username,FirstName,LastName,Email,Password)" +
                                            "VALUES(?,?,?,?,?)", [obj.Username,obj.FirstName,obj.LastName,obj.Email,obj.Password])
    return affectedRows
}
