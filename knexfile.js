const {dbName, dbUser, dbPassword, dbHost} = process.env

module.exports = {
  development: {
    client: 'postgresql',
    connection: {
      database: 'USER',
      user: 'USER',
      password: '1',
      host: dbHost,
      port: 5432,
    },
    migrations: {
      directory: 'migrations',
    },
    seeds: {
      directory: __dirname + '/db/seeds',
    },
  },

}
