import mysql from 'mysql2';

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Admin@123",
    database: "employeems"
});

con.connect(function (err) {
    if (err) {
        console.log("Connection error");
    } else {
        console.log("Connection established");
    }
});

export default con;