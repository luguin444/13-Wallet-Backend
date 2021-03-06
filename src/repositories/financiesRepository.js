const connection = require('../database/index');

async function getAllByUser(user) {
    const result = await connection.query('SELECT * FROM financies WHERE "userId" = $1',[user.id]);
    return result.rows;
}

async function create(user, data) {

    let value = parseFloat(data.value);
    

    try{
        const result = await connection.query(
            'INSERT INTO financies (value, description, type, "userId") VALUES ($1,$2,$3,$4) RETURNING *', [value.toFixed(2), data.description, data.type, user.id]);
        return result.rows[0];
    } catch (e) {
        console.log(e);
    }
   
}

module.exports = {getAllByUser, create}


