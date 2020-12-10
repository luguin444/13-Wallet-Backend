const { validateSignUp, validateSignIn } = require('../schemas/usersSchemas');
const { isEmailUnique, createUserInDatabase, findByemail } = require('../repositories/userRepository');
const {createSession, destroySessionByToken} = require('../repositories/sessionsRepository');
const bcrypt = require('bcrypt')

async function registerUser(req,res) {

    if(!validateSignUp(req.body)) return res.status(422).send({error: "Invalid data from Sign Up"});

    const isEmailNotUnique = ! await isEmailUnique(req.body.email)
    if (isEmailNotUnique) return res.status(409).send({error: "Email already from other user"});

    try {
        const newUser = await createUserInDatabase(req.body);
        res.status(201).send(newUser);
    } catch {
        return res.sendStatus(500);
    }
}

async function signInUser (req,res) {

    if(!validateSignIn(req.body)) return res.status(422).send({error: "Invalid data from Sign In"});

    try {
        const user = await findByemail(req.body.email);
        if(user === undefined) return res.status(401).send({error: "Email not found"});

        if (bcrypt.compareSync(req.body.password, user.password)) {
            const session = await createSession(user.id);
            return res.status(200).send({...session, "name": user.name});
        } else {
            return res.status(401).send({error: "Password incorrect"});
        }   
    } catch {
        res.send(500).send({ error: "Session was not created" });
    }
}

async function signOutUser (req, res) {

    try {
        await destroySessionByToken(req.session.token);
        return res.status(200).send({result: "Session was destroyed"});
    } catch {
        return res.status(500).send({result: "Session was not destroyed"});
    }
}

module.exports = {registerUser, signInUser, signOutUser};