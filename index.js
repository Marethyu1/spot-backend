const NODE_ENV = process.env.NODE_ENV || 'development'
const app = require('./server')
const { getDatabase, setUp } = require('./src/db/database-manager')
const PORT = process.env.PORT || 8080
const {createDoggos} = require('./scripts/create-doggos')
const {tryStartup} = require('./scripts/create-db')

const db = getDatabase()

console.log(`App running ${NODE_ENV} mode`)

function initApp(){
  app.listen(PORT, () => {
    console.log(`app running in ${NODE_ENV} on port ${PORT}`)
  })
}

if (NODE_ENV === "development") {
  tryStartup(5)
  .then(() => db.sync(false))
  .then(createDoggos)
  .then(initApp)
  .catch((err) => {
      console.log("Could not connect to db", err)
    })
} else {
  console.log("neow")
  db.testConnection()
    .then(initApp)
};
