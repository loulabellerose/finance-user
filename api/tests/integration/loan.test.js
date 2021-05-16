const request = require('supertest');
const { Loan } = require('../../models/loan');
const { Business } = require('../../models/business');
const { User } = require('../../models/user');
const mongoose = require('mongoose');

let server;

describe('/models/loan', () => {
    beforeEach(() => { server = require('../../index'); })
    afterEach(async () => {
        server.close();
        await Loan.remove({});
        await Business.remove({});
    });

    describe('GET /', () => {
        it('Should return all loans', async () => {
            const testToken = new User().generateAuthToken();
            const loans = [
                { amount: 1000 },
                { amount: 4000 }
            ];

            await Loan.collection.insertMany(loans);

            const res = await request(server).get('/loans').set('token', testToken);

            expect(res.status).toBe(200);
            expect(res.body.length).toBe(2);
            expect(res.body.some(loan => loan.amount === 4000)).toBeTruthy();
            expect(res.body.some(loan => loan.amount === 1000)).toBeTruthy();
        });
    });

    describe('GET /:id', () => {
        it('Should return a loan if valid ID is passed', async () => {
            const token = new User().generateAuthToken();
            const loan = new Loan({ amount: 4000 });
            await loan.save();

            const res = await request(server).get('/loans/' + loan._id).set('token', token);

            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('amount', loan.amount);
        });

        it('Should return 404 if invalid ID is passed', async () => {
            const token = new User().generateAuthToken();
            const res = await request(server).get('/loans/1').set('token', token);
            expect(res.status).toBe(404);
        });

        it('Should return 404 if no loan with the given ID exists', async () => {
            const token = new User().generateAuthToken();
            const id = mongoose.Types.ObjectId();
            const res = await request(server).get('/loans/' + id).set('token', token);
            expect(res.status).toBe(404);
        });
    });

    describe('POST/', () => {
        it('Should save the loan if the amount is valid', async () => {
            let business = new Business({ businessName: 'business1' });
            await business.save();
            business = business._id;
            let amount = 1000;
            const res = await request(server).post('/loans/new').send({
                'amount': amount,
                'businessId': business
            });
            const loan = await Loan.find({ 'amount': 1000 });
            expect(loan).not.toBeNull();
        });

        it('Should return the loan if is valid', async () => {
            let business = new Business({ businessName: 'business1' });
            await business.save();
            business = business._id;
            let amount = 1000;
            const res = await request(server).post('/loans/new').send({
                'amount': amount,
                'businessId': business
            });
            expect(res.body).toHaveProperty('_id');
            expect(res.body).toHaveProperty('loan.amount', 1000);
        });
    });

    describe('PUT /:id', () => {
        let newStatus;
        let business;
        let id;

        const execute = async () => {
            return await request(server)
                .put('/loans/' + id)
                .send({
                    status: {
                        currentStatus: newStatus
                    }
                });
        }

        beforeEach(async () => {
            // First create new business and loan and save in the DB   
            business = new Business({
                businessName: 'business1',
                loan: {
                    amount: 4000,
                    status: {
                        currentStatus: "Submitted"
                    }
                }
            });
            await business.save();
            id = business._id;
            newStatus = {
                currentStatus: 'Test Status'
            };


            it('Should return 404 if business ID is invalid', async () => {
                id = 1;
                const res = await execute();
                expect(res.status).toBe(404);
            });

            it('Should return 404 if business with the given ID was not found', async () => {
                id = mongoose.Types.ObjectId();
                const res = await execute();
                expect(res.status).toBe(404);
            });

            it('Should insert the status', async () => {
                await execute();
                const updatedBusiness = await Business.findById(business._id);
                expect(updatedBusiness.loan.status).toContain(newStatus);
            });

            it('Should return the updated business', async () => {
                const res = await execute();
                expect(res.body).toHaveProperty('_id');
                expect(res.body).toHaveProperty('businessName', business.businessName);
            });

        });
    });
});