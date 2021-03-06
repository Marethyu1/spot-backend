const NODE_ENV = process.env.NODE_ENV || 'development'
const PORT = process.env.PORT || 3000
const app = require('./server')
const { getDatabase } = require('./src/db/database-manager')
const { createDoggos } = require('./scripts/create-doggos')
const { tryStartup } = require('./scripts/create-db')
const logger = require('./src/logger')('index')

const db = getDatabase()

logger.info(`App running ${NODE_ENV} mode`)
logger.info(`App starting up... `)
logger.info(`App still starting up...`)

function initApp() {
  app.listen(PORT, () => {
    logger.info(`app running in ${NODE_ENV} on port ${PORT}`)
  })
}

console.log(NODE_ENV)
// initApp()

if (NODE_ENV === 'development') {
  tryStartup(5)
    .then(() => db.sync(false))
    .then(createDoggos)
    .then(initApp)
    .catch((err) => {
      logger.error(`Could not connect to db ${err.stack}`)
    })
} else {
  db.testConnection()
    .then(initApp)
}
// tryStartup(5)
//   .then(() => db.testConnection())
//   .then(initApp)
//   .catch((err) => {
//     logger.info(err)
//     initApp()
//   })
