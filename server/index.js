const express = require('express');
let bodyParser = require('body-parser');
const cors = require('cors');
const knex = require('knex');
const bcrypt = require('bcrypt-nodejs');
const register = require('./controllers/register');
const signIn = require('./controllers/signIn');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
  client: 'pg',
  connection: {
    host: '127.0.0.1',
    user: 'postgres',
    password: 'postgres',
    database: 'smart-brain'
  }
});

const PORT = 3001
const app = express();

app.use(bodyParser.json())
app.use(cors());

app.post('/signin', (req, res) => signIn.handleSignIn(req, res, db, bcrypt));
app.post('/register', (req, res) => register.handleRegister(req, res, db, bcrypt));
app.get('/profile/:id', (req, res) => profile.handleProfile(req, res, db));
app.put('/image', (req, res) => image.handleImage(req, res, db));
app.post('/imageurl', (req, res) => image.handleApiCall(req, res));

app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`)
});
