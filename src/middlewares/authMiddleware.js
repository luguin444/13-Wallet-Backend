const connection = require('../database/index');
const {findById} = require('../repositories/userRepository')
const {findSessionBytoken} = require('../repositories/sessionsRepository')

async function authMiddleware(req,res,next) {

    const authHeader = req.header('Authorization');
    if (!authHeader) return res.status(401).send({error: "There is no Authorization Header"});

    const token = authHeader.split(" ")[1];
    if (!token) return res.status(401).send({error: "There is no token"});

    try {

        const session = await findSessionBytoken(token);
        if (!session) return res.status(401).send({error: "Session was not found"});

        const user = await findById(session.userId);
        req.user = user;
        req.session = session;
        next();
    } catch {
        res.sendStatus(500);
    }
}

module.exports = authMiddleware;