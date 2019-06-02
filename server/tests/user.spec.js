import request from 'supertest';
import app from '../../server';
import users from '../models/users';

const user = {
  username: 'gradie1',
  email: 'gradie@gmail.com',
  password: 'res86ui',
};

let token;

afterAll(async () => {
  await users.remove({});
});

describe('Tests for the user endpoints', () => {
  describe('Account creation', () => {
    it('Should create a new user', (done) => {
      request(app)
        .post('/api/auth/signup')
        .send(user)
        .end((err, res) => {
          if (err) done(err);
          token = res.body.token;
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
          expect(res.body.message).toBe('A user with the same email or username already exist');
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

  describe('Login actions', () => {
    it('Should login the user', (done) => {
      delete user.username;
      request(app)
        .post('/api/auth/login')
        .send(user)
        .end((err, res) => {
          if (err) done(err);
          expect(res.body.status).toBe(200);
          expect(res.body.user.email).toBe('gradie@gmail.com');
          done();
        });
    });

    it('Should fail to login with a wrong password', (done) => {
      user.password = 'wrong_password';
      request(app)
        .post('/api/auth/login')
        .send(user)
        .end((err, res) => {
          if (err) done(err);
          expect(res.body.status).toBe(401);
          expect(res.body.message).toBe('Wrong password');
          done();
        });
    });

    it('Should fail to find a user that does not exist', (done) => {
      user.email = 'wrong@email.com'
      request(app)
        .post('/api/auth/login')
        .send(user)
        .end((err, res) => {
          if (err) done(err);
          expect(res.body.status).toBe(404);
          expect(res.body.message).toBe('User not found for the given email');
          done();
        });
    });

    it('Should fail to find a user that does not exist', (done) => {
      user.email = 'wrong@email_format'
      request(app)
        .post('/api/auth/login')
        .send(user)
        .end((err, res) => {
          if (err) done(err);
          expect(res.body.status).toBe(400);
          expect(res.body.message).toBe('email must be a valid email');
          done();
        });
    });
  });

  describe('Update actions', () => {

    const fields = {
      username: 'new_user_name',
      picture: 'https://image.jpg',
    }

    it('Should update the user fields', (done) => {
      request(app)
        .put('/api/user')
        .set('Authorization', `Bearer ${token}`)
        .send(fields)
        .end((err, res) => {
          if (err) done(err);
          console.log(res.body);
          expect(res.body.status).toBe(200);
          expect(res.body.user.username).toBe('new_user_name');
          done();
        });
    });

    it('Should fail to update when the fields are wrong', (done) => {
      fields.picture = 'image.jpg';
      request(app)
        .put('/api/user')
        .set('Authorization', `Bearer ${token}`)
        .send(fields)
        .end((err, res) => {
          if (err) done(err);
          console.log(res.body);
          expect(res.body.status).toBe(200);
          expect(res.body.message).toBe('new_user_name');
          done();
        });
    });

  });

});
