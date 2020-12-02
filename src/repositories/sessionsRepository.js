const uuid = require('uuid');
const connection = require('../database/index');


async function createSession (userId) {

    const token = uuid.v4();

    const result = await connection.query('INSERT INTO sessions ("userId", token) VALUES ($1, $2) RETURNING*', [userId,token]);
    return result.rows[0];
}

module.exports = { createSession }