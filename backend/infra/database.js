/* fontes gerado automaticamente */
const pgp = require('pg-promise')();
const db = pgp({
	user: 'postgres',
	password: '123456',
	host: 'localhost',
	port:5432,
	database: 'db_ativos_note'
});
module.exports = db;
