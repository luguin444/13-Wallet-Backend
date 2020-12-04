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

describe('Authorization MiddleWare', () => {

    it ('No header as token', async () => {

        const res = await supertest(app).post('/api/sign-out');
        expect(res.status).toBe(401);
    })

    it ('Wrong token', async () => {

        const res = await supertest(app).post('/api/sign-out').set('Authorization', 'Bearer e6e8ad54-d93d-4fc3-9b57-191bbf2de908');
        expect(res.status).toBe(401);
    })
})