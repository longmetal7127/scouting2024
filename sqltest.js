const sql = require('mssql');

const config = {
    user: 'username', // better stored in an app setting such as process.env.DB_USER
    password: 'password', // better stored in an app setting such as process.env.DB_PASSWORD
    server: 'your_server.database.windows.net', // better stored in an app setting such as process.env.DB_SERVER
    port: 1433, // optional, defaults to 1433, better stored in an app setting such as process.env.DB_PORT
    database: 'AdventureWorksLT', // better stored in an app setting such as process.env.DB_NAME
    authentication: {
        type: 'default'
    },
    options: {
        encrypt: true
    }
}