const mysql = require('mysql')

const connection = mysql.createConnection({
    host: 'localhost',
    socketPath: '/tmp/mysql.sock',
    user: 'root',
    port: '3306',
    password: '1234qweR',
    database: 'GOS-Sedyshkin'
})

connection.connect((error) => {
    if (error) {
        return console.log(error.message)
    }
    return console.log('успешно')
})

module.exports = connection