const express = require("express");
var os = require("os");
const PORT = 3000;
const app = express();
app.use(express.json());

const allowCors = (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // colocar os dominios permitidos | ex: 127.0.0.1:3000

  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials, X-Access-Token, X-Key"
  );
  res.header(
    "Access-Control-Allow-Methods",
    "GET, PUT, POST, DELETE, OPTIONS, PATCH"
  );

  res.header("Access-Control-Allow-Credentials", "false");

  next();
};

app.use(allowCors);
app.use("/", require("./route/ativoRoute"));
app.use("/", require("./route/caracteristicaRoute"));
app.use("/", require("./route/valorRoute"));
app.use("/", require("./route/empresaRoute"));
app.use("/", require("./route/usuarioRoute"));
app.use("/", require("./route/grupousuarioRoute"));
app.use("/", require("./route/fornecedorRoute"));
app.use("/", require("./route/nfeRoute"));
app.use("/", require("./route/tipo_ativoRoute"));

app.listen(PORT, () => {
  console.log(`Servidor No Ar. Porta ${PORT}`);
});
