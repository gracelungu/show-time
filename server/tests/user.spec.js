import request from 'supertest';
import app from '../../server';
import users from '../models/users';

const user = {
  username: 'gradie1',
  email: 'gradie@gmail.com',
  password: 'res86ui',
};

afterAll(async () => {
  await users.remove({});
});

describe('Tests for the user endpoints', () => {
  it('Should create a new user', (done) => {
    request(app)
      .post('/api/auth/signup')
      .send(user)
      .end((err, res) => {
        if (err) done(err);
        expect(res.body.status).toBe(201);
        expect(res.body.user.active).toBe(true);
        done();
      });
  });

  it('Should fail to create the same user twice', (done) => {
    request(app)
      .post('/api/auth/signup')
      .send(user)
      .end((err, res) => {
        if (err) done(err);
        expect(res.body.status).toBe(400);
        expect(res.body.message).toBe('A user with the same email address already exist');
        done();
      });
  });

  it('Should fail when the wrong body is sent', (done) => {
    request(app)
      .post('/api/auth/signup')
      .send({ body: 'wrong' })
      .end((err, res) => {
        if (err) done(err);
        expect(res.body.status).toBe(400);
        expect(res.body.message).toBe('username is required');
        done();
      });
  });
});
