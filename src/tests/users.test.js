const { it, beforeAll, afterAll, expect } = require("@jest/globals");
const supertest = require("supertest");

const app = require('../app');
const db = require('../database/index');

async function cleanUpDatabase() {
    await db.query('DELETE FROM users');
    await db.query('DELETE FROM sessions');
}

beforeAll(cleanUpDatabase)

afterAll( async () => {
    await cleanUpDatabase;
    db.end();
});


describe('POST Sign up Route', () => {

    const body = {
        "name": "luguin",
        "email": "luguin@gmail.com",
        "password": "123",
        "confirmPassword": "123"
    }
    
    it('should return 201 - user Created ', async () => {

        const res = await supertest(app).post('/api/sign-up').send(body);

        const resultObject = await db.query('SELECT * FROM users WHERE email = $1', [body.email]);

        const returnedObject = {"id": resultObject.rows[0].id, "email": resultObject.rows[0].email, "name": resultObject.rows[0].name };

        expect(res.body).toMatchObject(returnedObject);
        expect(res.status).toBe(201);
    })

    it('should return conflict 409 - Email is not Unique', async () => {

        const res = await supertest(app).post('/api/sign-up').send(body);
        expect(res.status).toBe(409);      
    })

    it('should return conflict 422 - Data Invalid', async () => {

        const body = {};

        const res = await supertest(app).post('/api/sign-up').send(body);
        expect(res.status).toBe(422);      
    })

});

describe('POST Sign in Route', () => {

    it('should return 200 with token', async () => {

        const body = {
            "email": "luguin@gmail.com",
            "password": "123"
        };

        const res = await supertest(app).post('/api/sign-in').send(body);

        expect(res.status).toBe(200);
        expect(res.body.token).toBeTruthy();
        expect(res.body.name).toBeTruthy();
    })

    it('should return 422 user not found', async () => {

        const body = {
            "password": "123"
        };

        const res = await supertest(app).post('/api/sign-in').send(body);

        expect(res.status).toBe(422);
    })

    it('should return 422 - password is wrong', async () => {

        const body = {
            "email": "luguin@gmail.com",
            "password": "1234"
        };

        const res = await supertest(app).post('/api/sign-in').send(body);

        expect(res.status).toBe(422);
    })
})

describe('POST Sign out Route', () => {

    it('should return 200 - session was destroyed', async () => {

        const email = 'luguin@gmail.com';
        const resultUser = await db.query('SELECT * FROM users WHERE email = $1', [email]);
        const userId = resultUser.rows[0].id;

        const {rows} = await db.query('SELECT * FROM sessions WHERE "userId" = $1', [userId]);
        const token = rows[0].token;

        const res = await supertest(app).post('/api/sign-out').set('Authorization', `Bearer ${token}`);

        expect(res.status).toBe(200);
    })
})