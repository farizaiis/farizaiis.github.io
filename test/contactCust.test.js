const app = require('../server');
const supertest = require('supertest');

// CREATE CONTACT CUSTOMER
test('POST /v1/contact-customer/', async () => {
    const data = {
        email: 'testpost@hotmail.com',
        company: 'mapeline',
        message: 'loremipsum',
    };

    await supertest(app)
        .post('/v1/contact-customer/')
        .send(data)
        .expect(200)
        .then((res) => {
            expect(res.body.data.email).toBe(data.email);
            expect(res.body.data.company).toBe(data.company);
            expect(res.body.data.message).toBe(data.message);
        });
});

// PUT CONTACT CUSTOMER
test('PUT /v1/contact-customer/:id', async () => {
    const createData = await supertest(app).post('/v1/contact-customer/').send({
        email: 'testpost1@hotmail.com',
        company: 'mapeline',
        message: 'loremipsum',
    });

    const token = await supertest(app).post('/v1/admin/login').send({
        email: 'admin_phoenix@gmail.com',
        password: 'Admin_123',
    });

    const data = {
        email: 'testupdate@hotmail.com',
        company: 'mapeline',
        message: 'loremipsum',
    };

    await supertest(app)
        .put('/v1/contact-customer/' + createData.body.data.id)
        .set('Authorization', 'Bearer ' + token.body.token)
        .send(data)
        .expect(200)
        .then((res) => {
            expect(res.body.data.email).toBe(data.email);
            expect(res.body.data.company).toBe(data.company);
            expect(res.body.data.message).toBe(data.message);
        });
});

// DELETE CONTACT CUSTOMER
test('DELETE /v1/contact-customer/:id', async () => {
    const createData = await supertest(app).post('/v1/contact-customer/').send({
        email: 'testpost2@hotmail.com',
        company: 'mapeline',
        message: 'loremipsum',
    });

    const token = await supertest(app).post('/v1/admin/login').send({
        email: 'admin_phoenix@gmail.com',
        password: 'Admin_123',
    });

    await supertest(app)
        .delete('/v1/contact-customer/' + createData.body.data.id)
        .set('Authorization', 'Bearer ' + token.body.token)
        .expect(200)
        .then((res) => {
            expect(res.body.status).toBe('success');
        });
});

// GET ONE CONTACT CUSTOMER
test('GET /v1/contact-customer/:id', async () => {
    const createData = await supertest(app).post('/v1/contact-customer/').send({
        email: 'testpost3@hotmail.com',
        company: 'mapeline',
        message: 'loremipsum',
    });

    const token = await supertest(app).post('/v1/admin/login').send({
        email: 'admin_phoenix@gmail.com',
        password: 'Admin_123',
    });

    await supertest(app)
        .get('/v1/contact-customer/' + createData.body.data.id)
        .set('Authorization', 'Bearer ' + token.body.token)
        .expect(200)
        .then((res) => {
            expect(typeof res.body).toBe('object');
        });
});

// GET ALL CONTACT CUSTOMER
test('GET /v1/contact-customer/', async () => {
    const token = await supertest(app).post('/v1/admin/login').send({
        email: 'admin_phoenix@gmail.com',
        password: 'Admin_123',
    });

    await supertest(app)
        .get('/v1/contact-customer/')
        .set('Authorization', 'Bearer ' + token.body.token)
        .expect(200)
        .then((res) => {
            expect(Array.isArray(res.body.data)).toBeTruthy();
        });
});