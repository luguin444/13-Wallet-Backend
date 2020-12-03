const connection = require('../database/index');

async function getAllByUser(user) {
    const result = await connection.query('SELECT * FROM financies WHERE "userId" = $1',[user.id]);
    return result.rows;
}

async function create(user, data) {

    const result = await connection.query(
        'INSERT INTO financies (value, description, type, "userId") VALUES ($1,$2,$3,$4) RETURNING *', [data.value.toFixed(2), data.description, data.type, user.id]);
    return result.rows[0];
}

module.exports = {getAllByUser, create}