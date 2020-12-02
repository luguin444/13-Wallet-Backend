const uuid = require('uuid');
const connection = require('../database/index');


async function createSession (userId) {

    const token = uuid.v4();

    const result = await connection.query('INSERT INTO sessions ("userId", token) VALUES ($1, $2) RETURNING*', [userId,token]);
    return result.rows[0];
}

async function findSessionBytoken(token) {
    const result = await connection.query('SELECT * FROM sessions WHERE token = $1', [token]);
    return result.rows[0];
}

async function destroySessionByToken(token) {   
    await connection.query('DELETE FROM sessions WHERE token = $1', [token]);
}
module.exports = { createSession, findSessionBytoken, destroySessionByToken }