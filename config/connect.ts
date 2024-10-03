import mysql from 'mysql2';
//++++++++++++++++++++++++++++++++++++++++++
// DB Connection
//++++++++++++++++++++++++++++++++++++++++++
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '12345',
    database: 'spareyangu',
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