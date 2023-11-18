const db = require('../db')

//Sign in module
module.exports.signIn = async (email) => {
    const [user] = await db.query("SELECT * FROM User WHERE Email = ?", [email])
    return user
}

//Sign up module
module.exports.signUp = async (obj) =>{
    const [{affectedRows}] = await db.query("INSERT INTO User(ID,Username,FirstName,LastName,Email,Password)" +
                                            "VALUES(?,?,?,?,?,?)", [obj.ID,obj.Username,obj.FirstName,obj.LastName,obj.Email,obj.Password])
    return affectedRows
}

//profile module
module.exports.profile = async (obj) =>{
    const [{affectedRows}] = await db.query("UPDATE User SET Username = ?, FirstName = ?, MiddleName = ?, LastName = ?, Email = ?, Password = ?, PhoneNumber = ?, ZipCode = ?, Street = ?, City = ?, State = ? WHERE ID = ?", 
                                            [obj.Username, obj.FirstName, obj.MiddleName, obj.LastName, obj.Email, obj.Password, obj.PhoneNumber, obj.Zipcode, obj.Street, obj.City, obj.State, obj.ID])
    return affectedRows
}