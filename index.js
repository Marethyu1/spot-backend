const NODE_ENV = process.env.NODE_ENV || 'development'
const app = require('./server')
const { getDatabase, setUp } = require('./src/db/database-manager')

const db = getDatabase()

console.log("APP STARTED")
db.testConnection()
  .then(() => {
    app.listen(3000, () => {
      console.log(`app running in ${NODE_ENV} on port 3000`)
    })
  }).catch(err => {
    console.log("SOMETHING WENT WRONG")
    app.listen(3000, () => {
      console.log(`app running in ${NODE_ENV} on port 3000`)
    })
  })
