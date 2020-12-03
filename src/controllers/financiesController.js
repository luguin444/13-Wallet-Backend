const {getAllByUser, create} = require('../repositories/financiesRepository');
const {validatePostFinancie} = require('../schemas/financieSchemas');


async function getAllFinancies (req, res) {
    try {
        const financies = await getAllByUser(req.user);
        return res.status(200).send(financies);
    } catch {
        return res.status(500).send({error: "Could not get Financies"});
    }
}

async function postFinancie (req, res) {

    if(!validatePostFinancie(req.body)) return res.status(422).send({error: "Invalid data from Financie"});
    
    try {
        const financie = await create(req.user, req.body);
        console.log(financie);
        return res.status(200).send(financie);
    } catch {
        return res.status(500).send({error: "Could not add financie"});
    }
}


module.exports = {getAllFinancies, postFinancie}