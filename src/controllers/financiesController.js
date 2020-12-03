const {getAllByUser, create} = require('../repositories/financiesRepository');


async function getAllFinancies (req, res) {
    try {
        const financies = await getAllByUser(req.user);
        return res.status(200).send(financies);
    } catch {
        return res.status(500).send({error: "Could not get Financies"});
    }
}

async function postFinancie (req, res) {
    
    try {
        const financie = await create(req.user, req.body);
        return res.status(200).send(financie);
    } catch {
        return res.status(500).send({error: "Could not add financie"});
    }
}


module.exports = {getAllFinancies, postFinancie}