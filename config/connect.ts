import mysql from 'mysql2';
import dotenv from 'dotenv';

dotenv.config();
//++++++++++++++++++++++++++++++++++++++++++
// DB Connection
//++++++++++++++++++++++++++++++++++++++++++
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PWD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});
//++++++++++++++++++++++++++++++++++++++++++
// DB Connection Test
//++++++++++++++++++++++++++++++++++++++++++
connection.connect((err) => {
    if (err) {
        console.log('There Is Error In DB Connection:' + err);
    }
    else {
        console.log('DB Connected Succefully')
    }
})
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
export default connection;