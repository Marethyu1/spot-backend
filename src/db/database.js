const Sequelize = require('sequelize')

let sequelize = null
const modelLoader = require('./create-db-models')

/**
 * Database Representation as a singleton
 */
class Database {
  /**
     * @param {Object} config
     * //
     */
  constructor(config) {
    if (!sequelize) {
      if (!config) {
        throw new Error('No config on connection found')
      }
      const options = {
        host: config.host,
        dialect: config.dialect || 'mysql',
        // operatorsAliases: false,
        pool: {
          max: 100,
          min: 0,
          acquire: 30000,
          idle: 10000,
        },
        define: {
          timestamps: false,
        },
        logging: process.env.NODE_ENV === 'production',
        storage: config.storage,
        dialectOptions: {
        },
      }

      if (process.env.NODE_ENV === 'production') {
        options.dialectOptions.socketPath = `/cloudsql/${config.instance_connection_name}`
      }

      sequelize = new Sequelize(
        config.database,
        config.username,
        config.password,
        options,
      )

      modelLoader(sequelize)
    }
  }

  static create(config) {
    return new Database(config)
  }

  async sync(force = true) {
    return sequelize.sync({ force, alter: true })
  }

  getConnection() {
    return sequelize
  }

  getModels() {
    return sequelize.models
  }

  getModel(modelName) {
    const modelExists = sequelize.isDefined(modelName)
    if (!modelExists) {
      throw new Error(`Could not find table with name ${modelName}`)
    }
    return sequelize.models[modelName]
  }

  /**
     * testConnection
     * @return {Promise<*>}
     */
  async testConnection() {
    return sequelize.authenticate()
      .then(() => console.log(`Successfully connected to the db`))
      .then(() => true)
  }

  async tryConnect(maxAttempts=1){
    let attempts= 0
    let waitTime = 1000
    const sleep = (ms) => new Promise((res) => setTimeout(res, ms))

    while (attempts < maxAttempts){
      try {
        await sequelize.query("CREATE DATABASE IF NOT EXISTS spot_dev")
          .then(() => console.log("DID A thING"))
          .catch(err => console.log("NOOO", err))
        await this.sync(true)
          .catch(console.log)
        await this.testConnection();
        return true
      } catch (err) {
        attempts +=1
        console.log(err)
        console.log(`failed to connect on attempt ${attempts}`);
        console.log(`Waiting for ${waitTime/1000} seconds`)
        await sleep(waitTime)
        waitTime *= 3
      }
    }
    throw new Error(`Could not connect after ${maxAttempts} attempts`)
  }

  /**
     * closeConnection
     * @return {Promise<*>}
     */
  async closeConnection() {
    const closedConnection = await sequelize.close()
    sequelize = null
    return closedConnection
  }


  /**
     * exportModel
     * @param {O} modelName
     * @param {O} model
     * @return {void|*|{timestamps}}
     */
  static exportModel(modelName, model, options) {
    if (!sequelize) {
      throw new Error('A connection has not been established')
    }
    return sequelize.define(modelName, model, options)
  }
}

module.exports = Database
