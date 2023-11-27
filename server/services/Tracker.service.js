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

//activities modules
module.exports.activities = async (id) =>{
    const [activities] = await db.query("SELECT Date, Notes, Type, Name, Amount FROM Activities WHERE UID = ?", [id])
    return activities
}

module.exports.postActivity = async (obj) =>{
    const [{affectedRows}] = await db.query("INSERT INTO Activities(ActivityID,UID,Date,Notes,Type,Name,Amount)" +
                                            "VALUES(?,?,?,?,?,?,?)", [obj.ActID, obj.UID, obj.Date, obj.Notes, obj.Type, obj.Name, obj.Amount])
    return affectedRows
}

//Dashboard graph data
module.exports.barData = async (id) => {
    const [barData] = await db.query("SELECT Type, SUM((Amount * -1)) Amount FROM Activities WHERE UID = ? GROUP BY Type ORDER BY Amount desc", [id])
    return barData
}