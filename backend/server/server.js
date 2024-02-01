const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'db_ativos_note',
    password: '123456',
    port: 5432,
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
