//Database related connections
const { Pool } = require('pg')
const db = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'newDb',
  password: '123456',
  port: 5432,
});


module.exports = {db} 