const mysql = require("mysql2/promise")
const {database} = require("../config/application-config")



async function createDbs(connection) {
    console.log('creating spot_dev')
    await connection.query('CREATE DATABASE IF NOT EXISTS spot_dev;')
    console.log('creating spot_test')
    await connection.query('CREATE DATABASE IF NOT EXISTS spot_test;')
    return true
}

async function tryConnect(maxAttempts=1){
    let attempts = 0
    let waitTime = 1000;
    const sleep = (ms) => new Promise((res) => setTimeout(res, ms))

    while (attempts < maxAttempts){
        try {
            const connection = await mysql.createConnection({
                host     : database.host,
                user     : database.username,
                password : database.password
            })
            return connection;
        } catch (err) {
            attempts += 1;
            console.log(`failed to connect on attempt ${attempts}`);
            console.log(`Waiting for ${waitTime/1000} seconds`)
            await sleep(waitTime)
            waitTime *= 3
        }
    }
    throw new Error(`Could not connect to db after ${maxAttempts} attempts`)
}

async function tryStartup(times=1){
    const conn = await tryConnect(times)
    const res = await createDbs(conn)
    return true
}

module.exports = {
    tryStartup
}