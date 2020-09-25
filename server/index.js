const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const PORT = 3001
const app = express();

app.use(bodyParser.json())
app.use(cors());

const database = {
  user: [
    {
      id: '1',
      name: 'Jhon',
      email: 'john@gmail.com',
      password: 'cookies',
      enrtries: 0,
      joined: new Date()
    },
    {
      id: '2',
      name: 'Sally',
      email: 'sally@gmail.com',
      password: 'bananas',
      enrtries: 0,
      joined: new Date()
    }
  ]
}

app.get('/', (req, res) => {
  res.send(database.user)
})


app.post('/signin', (req, res) => {
  console.log(req.body)
  if (req.body.email === database.user[0].email &&
    req.body.password === database.user[0].password) {
    res.json('success')
  } else {
    res.status(400).json('error loggin in')
  }
})

app.post('/register', (req, res) => {
  const { email, name, password } = req.body;
  database.user.push({
    id: '3',
    name: name,
    email: email,
    password: password,
    enrtries: 0,
    joined: new Date()
  })
  res.json(database.user[database.user.length - 1]);
})

app.get('/profile/:id', (req, res) => {
  const { id } = req.params;
  let found = false;

  database.user.forEach(user => {
    if (user.id === id) {
      found = true;
      return res.json(user);
    }
  })

  if (!found) {
    res.status(400).json('not found')
  }
})

app.put('/image', (req, res) => {
  const { id } = req.body;
  let found = false;

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
