const mysql = require('mysql');

//creating connection
const db = mysql.createConnection({
    host: 'localhost',
    user : 'root',
    password: '',
    database: 'user_info'
})

//connect
db.connect((req,res,err) => {
    if(err)
        res.send(err);
    else
    console.log('MySql Connected..');
});


module.exports = db;