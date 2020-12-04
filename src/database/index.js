const { Pool } = require('pg');

const dbConfig = { connectionString: process.env.DATABASE_URL };
const connection = new Pool(dbConfig);

//Uso local
// const connection = new Pool( {
//     "host": "localhost",
//     "user": "postgres",
//     "password": "147",
//     "database": "wallet",
//     "port": 5432
// })

module.exports = connection;
