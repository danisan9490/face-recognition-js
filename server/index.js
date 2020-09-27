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

// let database = {
//   user: [
//     {
//       id: 2,
//       name: 'Anne',
//       email: 'anne@gmail.com',
//       entries: '0',
//       joined: 2020 - 09 - 27T08: 19: 21.375Z
//     },
//     {
//       id: 3,
//       name: 'Jhon',
//       email: 'jhon@gmail.com',
//       entries: '0',
//       joined: 2020 - 09 - 27T08: 20: 10.116Z
//     },
//     {
//       id: 6,
//       name: 'user',
//       email: 'user@gmail.com',
//       entries: '0',
//       joined: 2020 - 09 - 27T08: 23: 35.163Z
//     },
//     {
//       id: 1,
//       name: 'Ann',
//       email: 'ann@gmail.com',
//       entries: '3',
//       joined: 2020 - 09 - 27T08: 15: 04.356Z
//     }
//   ]
// }

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

  db('users').where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => res.json(entries[0]))
    .catch(err => res.status(400).json('unable to get entries'))
})


app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`)
});
