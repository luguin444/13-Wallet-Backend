const { validateSignUp } = require('../schemas/usersSchemas');
const { isEmailUnique, createUserInDatabase } = require('../repositories/userRepository');

async function registerUser(req,res) {

    if(!validateSignUp(req.body)) return res.status(422).send({error: "Invalid data from Sign Up"});

    if (!isEmailUnique(req.body.email)) return res.status(409).send({error: "Email already from other user"});

    try {
        const newUser = await createUserInDatabase(req.body);
        res.status(201).send(newUser);
    } catch {
        return res.sendStatus(500);
    }
}

async function signInUser (req,res) {
    
    console.log(req.body);
    res.send(200).send(req.body);
}

module.exports = {registerUser, signInUser};