const Sequelize = require('sequelize')
require('dotenv').config()

let DB_CONNECTION = null

function connect() {
    let {
        DB_NAME,
        DB_USER,
        DB_PASSWORD,
        DB_HOST,
        PORTDB
    } = process.env

    const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
        host: DB_HOST,
        dialect: 'mysql',
        port: PORTDB,
        benchmark: false,
        charset: "utf8mb4",
        collate: "utf8mb4_unicode_ci",
        pool: {
            max: 20000,
            min: 0,
            idle: 10000
        }
    })

    return sequelize
}

const getConnection = () => {
    if (!DB_CONNECTION) {
        DB_CONNECTION = connect()
    }
    return DB_CONNECTION
}

module.exports = {
    getConnection
}
