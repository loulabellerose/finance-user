const request = require('supertest');
const { Business } = require('../../models/business');
const { User } = require('../../models/user');
const mongoose = require('mongoose');

let server;

describe('/models/business', () => {
    beforeEach(() => { server = require('../../index'); })
    afterEach(async () => {
        server.close();
        await Business.remove({});
    });

    describe('GET /', () => {
        it('Should return all businesses', async () => {
            const testToken = new User().generateAuthToken();
            const businesses = [
                { businessName: 'business1' },
                { businessName: 'business2' }
            ];

            await Business.collection.insertMany(businesses);

            const res = await request(server).get('/business').set('token', testToken);

            expect(res.status).toBe(200);
            expect(res.body.length).toBe(2);
            expect(res.body.some(b => b.businessName === 'business1')).toBeTruthy();
            expect(res.body.some(b => b.businessName === 'business2')).toBeTruthy();
        });
    });

    describe('GET /:id', () => {
        it('Should return a business if valid ID is passed', async () => {
            const token = new User().generateAuthToken();
            const business = new Business({ businessName: 'business1' });
            await business.save();

            const res = await request(server).get('/business/' + business._id).set('token', token);

            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('businessName', business.businessName);
        });

        it('Should return 404 if invalid ID is passed', async () => {
            const res = await request(server).get('/business/1');

            expect(res.status).toBe(404);
        });

        it('Should return 404 if no business with the given ID exists', async () => {
            const id = mongoose.Types.ObjectId();
            const res = await request(server).get('/business/' + id);

            expect(res.status).toBe(404);
        });
    });

});


