const { Pool } = require('pg');


const connection = new Pool( {
    "host": "localhost",
    "user": "postgres",
    "password": "147",
    "database": "wallet",
    "port": 5432
})

module.exports = connection;
