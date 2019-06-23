const NODE_ENV = process.env.NODE_ENV || 'development'

// const database = require('./config')[NODE_ENV]

const applicationConfig = {
  development: {
  },
  test: {
  }
}

const newConfig = {
  database: {
    "username": process.env.DB_USERNAME,
    "password": process.env.DB_PASSWORD,
    "database": process.env.DB_NAME,
    "host": process.env.DB_HOST,
    "dialect": "mysql"
  }
}

// applicationConfig[NODE_ENV].database = database

module.exports = newConfig
