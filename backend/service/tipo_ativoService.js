/* SERVICE tipo_ativo */
const tipo_ativoData = require('../data/tipo_ativoData');
const validacao = require('../util/validacao');
const parametros = require('../util/tipo_ativoParametros');
const erroDB = require('../util/userfunctiondb');
const regras = require('../util/tipo_ativoRegra');

const TABELA = 'TIPO_ATIVO';

/* CRUD GET SERVICE */
exports.getTipo_Ativo = async function(id_empresa,tipo_ativo){
	return tipo_ativoData.getTipo_Ativo(id_empresa,tipo_ativo);
};

/* CRUD GET ALL SERVICE */
exports.getTipos_Ativos = async function(params){
	return tipo_ativoData.getTipos_Ativos(params);
};

//* CRUD - INSERT - SERVICE */
 exports.insertTipo_Ativo = async function(tipo_ativo){
try 
{
	await regras.tipo_ativo_Inclusao(tipo_ativo);
	validacao.Validacao(TABELA,tipo_ativo, parametros.tipo_ativo());
	return tipo_ativoData.insertTipo_Ativo(tipo_ativo);
}
catch (err)
{ 
	throw new erroDB.UserException(err.erro, err); 
}
 };

//* CRUD - UPDATE - SERVICE */
 exports.updateTipo_Ativo = async function(tipo_ativo){
try 
{
	await regras.tipo_ativo_Alteracao(tipo_ativo);
	validacao.Validacao(TABELA,tipo_ativo, parametros.tipo_ativo());
	return tipo_ativoData.updateTipo_Ativo(tipo_ativo);
}
catch (err)
{ 
	throw new erroDB.UserException(err.erro, err); 
}
 };

//* CRUD - DELETE - SERVICE */
 exports.deleteTipo_Ativo = async function(id_empresa,tipo_ativo){
try 
{
	await  regras.tipo_ativo_Exclusao(id_empresa,tipo_ativo);
	return tipo_ativoData.deleteTipo_Ativo(id_empresa,tipo_ativo);
}
catch (err)
{ 
	throw new erroDB.UserException(err.erro, err); 
}
 };
