/* fontes gerado automaticamente */
const express = require('express');
const cors = require('cors');
const app = express(); app.use(express.json());
app.use(cors());
app.use('/', require('./route/empresaRoute'));
app.use('/', require('./route/usuarioRoute'));
app.use('/', require('./route/grupousuarioRoute'));
app.use('/', require('./route/fornecedorRoute'));
app.use('/', require('./route/nfeRoute'));
app.use('/', require('./route/tipo_ativoRoute'));
app.use('/', require('./route/ativoRoute'));
app.use('/', require('./route/valorRoute'));
app.use('/', require('./route/caracteristicaRoute'));
app.use((err, req, res, next) =>  { res.status(err.httpStatusCode).json({ error: err.message, merda: 'Deu Erro' }) });
app.listen(3000, () => { console.log('Servidor No Ar. Porta 3000'); });
