const connection = require('../database/index');
const bcrypt = require('bcrypt');


async function createUserInDatabase(data) {

    const passwordHashed = bcrypt.hashSync(data.password, 10);

    const result = await connection.query('INSERT INTO users (name, password, email) VALUES ($1, $2, $3) RETURNING *', [data.name, passwordHashed, data.email]);

    const newUser = {
        "name": result.rows[0].name,
        "id": result.rows[0].id,
        "email": result.rows[0].email,
    }

    return newUser;
}

async function findByemail(email) {
    
    const result = await connection.query('SELECT * FROM users WHERE email = $1', [email]);
    return result.rows[0];
}


async function isEmailUnique(email) {

    const result = await connection.query('SELECT * FROM users WHERE email = $1', [email]);  
    return result.rows.length === 0;
}


module.exports = {isEmailUnique, createUserInDatabase, findByemail}