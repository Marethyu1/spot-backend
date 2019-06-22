const express = require('express')
const morgan = require('morgan')

const BASE_URL = '/api/v1'
const app = express()

app.get('/', (req, res) => {
  res.send(`New Updated container`)
})

app.get('/health', (req, res) => {
  res.send('ok')
})

app.use(morgan('tiny'))
// app.use(`${BASE_URL}/users/`, require('./src/routers/user-router'))

module.exports = app
