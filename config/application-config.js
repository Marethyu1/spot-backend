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
    "username": process.env.DB_USERNAME || 'root',
    "password": process.env.DB_PASSWORD || 'example',
    "database": process.env.DB_NAME || 'spot_dev',
    "host": process.env.DB_HOST || 'localhost',
    "dialect": "mysql"
  }
}

// applicationConfig[NODE_ENV].database = database

module.exports = newConfig
