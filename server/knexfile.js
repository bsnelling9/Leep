// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  development: {
    client: 'mysql',
    connection: {
      host: 'us-cdbr-east-05.cleardb.net',
      user: 'b465e36af7a1a4',
      password: 'dfe04054',
      database: 'heroku_d66690d37c96876',
      charset: 'utf8',
      port: 3306
    }
  },
};



// module.exports = {
//   development: {
//     client: 'mysql',
//     connection: {
//       host: '127.0.0.1',
//       user: 'root',
//       password: '4nHn3Szdk?NRe)}m',
//       database: 'artist',
//       charset: 'utf8',
//       port: 3306
//     }
//   },
// };