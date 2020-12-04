const { it, beforeAll, afterAll, expect } = require("@jest/globals");
const supertest = require("supertest");
const app = require('../app');
const db = require('../database/index');

const {createUserInDatabase, findByemail} = require('../repositories/userRepository');
const {createSession, findSessionByUserId} = require('../repositories/sessionsRepository');

async function cleanUpDatabase() {
    await db.query('DELETE FROM financies');
    await db.query('DELETE FROM users');
    await db.query('DELETE FROM sessions');
}

beforeAll(async () => {
    await cleanUpDatabase;

    const bodyNewUser = {
        "name": "luguin2",
        "email": "luguin2@gmail.com",
        "password": "123",
        "confirmPassword": "123"
    }
    const user = await createUserInDatabase(bodyNewUser);
    await createSession(user.id);
})

afterAll( async () => {
    await cleanUpDatabase;
    db.end();
});


describe('POST new Financie Route', () => {

    it('should return 201 - financie created', async () => {

        const user = await findByemail('luguin2@gmail.com');
        const session = await findSessionByUserId(user.id);

        const body = {
            "value": 2500,
            "description": "Mesada Gorda",
            "type": "in"
        }
        const res = await supertest(app).post('/api/financies').send(body).set('Authorization', `Bearer ${session.token}`);

        expect(res.status).toBe(201);
    })

    it('should return 422 - invalid Data', async () => {

        const user = await findByemail('luguin2@gmail.com');
        const session = await findSessionByUserId(user.id);

        const body = {
            "value": 2500,
            "description": "Mesada Gorda"
        }
        const res = await supertest(app).post('/api/financies').send(body).set('Authorization', `Bearer ${session.token}`);

        expect(res.status).toBe(422);
    })
})

describe('GET financies from User Route', () => {

    it('should return 200 - financies returned', async () => {

        const user = await findByemail('luguin2@gmail.com');
        const session = await findSessionByUserId(user.id);

        const res = await supertest(app).get('/api/financies').set('Authorization', `Bearer ${session.token}`);

        expect.arrayContaining(res.body);
        expect(res.status).toBe(200);
    })
})