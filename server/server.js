const express = require('express');
const bodyParser = require('body-parser');

const PORT = 3001
const app = express();

app.get('/', (req, res) => {
  res.send('this is working')
})

app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`)
})
