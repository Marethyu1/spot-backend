const NODE_ENV = process.env.NODE_ENV || 'development'
const app = require('./server')
const { getDatabase, setUp } = require('./src/db/database-manager')
const PORT = process.env.PORT || 8080

const db = getDatabase()

console.log("APP STARTED")
db.testConnection()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`app running in ${NODE_ENV} on port ${PORT}`)
    })
  }).catch(err => {
    console.log("SOMETHING WENT WRONG")
    app.listen(PORT, () => {
      console.log(`app running in ${NODE_ENV} on port ${PORT}`)
    })
  })
