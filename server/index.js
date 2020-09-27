const express = require('express');
let bodyParser = require('body-parser');
const cors = require('cors');
const knex = require('knex');
const bcrypt = require('bcrypt-nodejs')
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
  db.select('email', 'hash').from('login')
    .where('email', '=', req.body.email)
    .then(data => {
      const isValid = bcrypt.compareSync(req.body.password, data[0].hash);
      if (isValid) {
        return db.select('*').from('users')
          .where('email', '=', req.body.email)
          .then(user => {
            console.log(user[0])
            res.json(user[0])
          })
          .catch(err => res.status(400).json('unable to get user'))
      } else {
        res.status(400).json('wrong credentials')
      }
    })
    .catch(err => res.status(400).json('wrong credentials'))
})

app.post('/register', (req, res) => {
  const { email, name, password } = req.body;
  const hash = bcrypt.hashSync(password);
  db.transaction(trx => {
    trx.insert({
      hash: hash,
      email: email
    })
      .into('login')
      .returning('email')
      .then(loginemail => {
        return trx('users')
          .returning('*')
          .insert({
            email: loginemail[0],
            name: name,
            joined: new Date()
          })
          .then(user => {
            res.json(user[0]);
          })
      })
      .then(trx.commit)
      .catch(trx.rollback)
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
