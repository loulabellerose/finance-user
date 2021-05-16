const request = require('supertest');
const { User } = require('../../models/user');
const mongoose = require('mongoose');

let server;
let admin;

describe('/models/user', () => {
    beforeEach(async () => {
        server = require('../../index');
        admin = new User({
            name: 'Test Name',
            email: 'email@test.com',
            password: 'password',
            role: 'Admin'
        });
        admin.save();
    });

    afterEach(async () => {
        server.close();
        await User.remove({});
    });

    describe('GET /', () => {
        it('Should return a list of all users', async () => {
            const token = admin.generateAuthToken();
            const users = [{
                name: 'User 1',
                email: 'user1@test.com',
                password: 'password',
                role: 'Analyst'
            },
            {
                name: 'User 2',
                email: 'user2@test.com',
                password: 'password',
                role: 'Analyst'
            }];
            await User.collection.insertMany(users);
            const res = await request(server).get('/users').set('token', token);

            expect(res.status).toBe(200);
            //Excected number of users must include the 1 admin user defined outside this test
            expect(res.body.length).toBe(3);
            expect(res.body.some(u => u.name === 'User 1')).toBeTruthy();
            expect(res.body.some(u => u.name === 'User 2')).toBeTruthy();
        });

        it('Should return 401 error if admin user is not logged in', async () => {
            const users = [{
                name: 'User 1',
                email: 'user1@test.com',
                password: 'password',
                role: 'Analyst'
            },
            {
                name: 'User 2',
                email: 'user2@test.com',
                password: 'password',
                role: 'Analyst'
            }];
            await User.collection.insertMany(users);
            const res = await request(server).get('/users');
            expect(res.status).toBe(401);
        });

        it('Should return 401 error if logged in user is not an admin', async () => {
            const analyst = new User({
                name: 'Test Analyst',
                email: 'analyst@test.com',
                password: 'password',
                role: 'Analyst'
            });
            await analyst.save();
            const res = await request(server).get('/users');
            expect(res.status).toBe(401);
        });
    });

    describe('GET /:id', () => {
        it('Should return a user if valid ID is passed', async () => {
            const token = admin.generateAuthToken();
            const user = new User({
                name: 'User 1',
                email: 'user1@test.com',
                password: 'password',
                role: 'Analyst'
            });
            await user.save();

            const res = await request(server).get('/users/' + user._id).set('token', token);

            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('name', user.name);
        });

        it('Should return 404 if invalid ID is passed', async () => {
            const token = admin.generateAuthToken();
            const res = await request(server).get('/users/1').set('token', token);
            expect(res.status).toBe(404);
        });

        it('Should return 404 if no user with the given ID exists', async () => {
            const token = admin.generateAuthToken();
            const id = mongoose.Types.ObjectId();
            const res = await request(server).get('/users/' + id).set('token', token);
            expect(res.status).toBe(404);
        });

        it('Should return 401 error if admin user is not logged in', async () => {
            const user = new User({
                name: 'User 1',
                email: 'user1@test.com',
                password: 'password',
                role: 'Analyst'
            });
            await user.save();

            const res = await request(server).get('/users/' + user._id);
            expect(res.status).toBe(401);
        });

        it('Should return 401 error if logged in user is not an admin', async () => {
            const analyst = new User({
                name: 'Test Analyst',
                email: 'analyst@test.com',
                password: 'password',
                role: 'Analyst'
            });
            await analyst.save();

            const res = await request(server).get('/users/' + admin._id);
            expect(res.status).toBe(401);
        });        
    });

    describe('POST/', () => {
        it('Should save the new user if info is valid', async () => {
            const token = admin.generateAuthToken();
            const res = await request(server).post('/users/new').set('token', token).send({
                name: 'User 1',
                email: 'user1@test.com',
                password: 'password',
                role: 'Analyst'
            });
            const user = await User.find({ name : 'User 1' });
            expect(user).not.toBeNull();
        });

        it('Should return the user if is valid', async () => {
            const token = admin.generateAuthToken();
            const res = await request(server).post('/users/new').set('token', token).send({
                name: 'User 1',
                email: 'user1@test.com',
                password: 'password',
                role: 'Analyst'
            });
            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('_id');
            expect(res.body).toHaveProperty('name', 'User 1');
        });
    });
    describe('DELETE /:id', () => {
        it('Should delete the user account if the given ID is valid and the admin user is logged in', async () => {
            const token = admin.generateAuthToken();
            let user = new User({
                name: 'User 1',
                email: 'user1@test.com',
                password: 'password',
                role: 'Analyst'
            });
            await user.save();
            const res = await request(server).delete('/users/' + user._id).set('token', token).send();
            
            expect(res.status).toBe(200); 
        });
        it('Should return a 404 error if no user with the given ID exists', async () => {
            const token = admin.generateAuthToken();
            const id = mongoose.Types.ObjectId();
            const res = await request(server).delete('/users/' + id).set('token', token).send();
            expect(res.status).toBe(404);
        });
        it('Should return a 404 error if the given ID is invalid', async () => {
            const token = admin.generateAuthToken();
            const res = await request(server).delete('/users/1').set('token', token).send();
            expect(res.status).toBe(404);
        });
        it('Should return a 401 error if the admin user is not logged in', async () => {
            let user = new User({
                name: 'User 1',
                email: 'user1@test.com',
                password: 'password',
                role: 'Analyst'
            });
            await user.save();
            const res = await request(server).delete('/users/' + user._id).send();
            expect(res.status).toBe(401); 
        });  
    });

});

