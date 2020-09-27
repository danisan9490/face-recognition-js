const express = require('express');
let bodyParser = require('body-parser');
const cors = require('cors');
const knex = require('knex');
const { response } = require('express');

const db = knex({
  client: 'pg',
  connection: {
    host: '127.0.0.1',
    user: 'postgres',
    password: 'postgres',
    database: 'smart-brain'
  }
});

// db.select('*').from('users').then(data => console.log(data))

const PORT = 3001
const app = express();

app.use(bodyParser.json())
app.use(cors());

let database = {
  user: [
    {
      id: '1',
      name: 'Jhon',
      email: 'user@gmail.com',
      password: 'a',
      entries: 0,
      joined: new Date()
    },
    {
      id: '2',
      name: 'Sally',
      email: 'sally@gmail.com',
      password: 'bananas',
      entries: 0,
      joined: new Date()
    }
  ]
}

app.get('/', (req, res) => {
  res.send(database.user)
})


app.post('/signin', (req, res) => {
  if (req.body.email === database.user[0].email &&
    req.body.password === database.user[0].password) {
    res.json(database.user[0])
  } else {
    res.status(400).json('error loggin in')
  }
})

app.post('/register', (req, res) => {
  const { email, name, password } = req.body;
  db('users')
    .returning('*')
    .insert({
      email: email,
      name: name,
      joined: new Date()
    })
    .then(user => {
      res.json(user[0]);
    })
    .catch(err => res.status(400).json('unable to register'));
})

app.get('/profile/:id', (req, res) => {
  const { id } = req.params;
  db.select('*').from('users')
    .where({
      id: id,
    })
    .then(user => {
      if (user.length) {
        res.json(user[0])
      } else {
        res.status(400).json('error getting user')
      }
    })
})

app.put('/image', (req, res) => {
  const { id } = req.body;
  let found = false;
  console.log('body', req.body)
  database.user.forEach(user => {
    if (user.id === id) {
      found = true;
      user.enrtries++
      return res.json(user.enrtries);
    }
  })

  if (!found) {
    res.status(400).json('not found')
  }
})


app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`)
});
