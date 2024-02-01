/* SERVICE ativo */
const ativoData = require('../data/ativoData');
const validacao = require('../util/validacao');
const parametros = require('../util/ativoParametros');
const erroDB = require('../util/userfunctiondb');
const regras = require('../util/ativoRegra');

const TABELA = 'ATIVO';

/* CRUD GET SERVICE */
exports.getAtivo = async function(id_ativo,id_empresa,etiqueta){
	return ativoData.getAtivo(id_ativo,id_empresa,etiqueta);
};

/* CRUD GET ALL SERVICE */
exports.getAtivos = async function(params){
	return ativoData.getAtivos(params);
};

//* CRUD - INSERT - SERVICE */
 exports.insertAtivo = async function(ativo){
try 
{
	await regras.ativo_Inclusao(ativo);
	validacao.Validacao(TABELA,ativo, parametros.ativo());
	return ativoData.insertAtivo(ativo);
}
catch (err)
{ 
	throw new erroDB.UserException(err.erro, err); 
}
 };

//* CRUD - UPDATE - SERVICE */
 exports.updateAtivo = async function(ativo){
try 
{
	await regras.ativo_Alteracao(ativo);
	validacao.Validacao(TABELA,ativo, parametros.ativo());
	return ativoData.updateAtivo(ativo);
}
catch (err)
{ 
	throw new erroDB.UserException(err.erro, err); 
}
 };

//* CRUD - DELETE - SERVICE */
 exports.deleteAtivo = async function(id_ativo,id_empresa,etiqueta){
try 
{
	await  regras.ativo_Exclusao(id_ativo,id_empresa,etiqueta);
	return ativoData.deleteAtivo(id_ativo,id_empresa,etiqueta);
}
catch (err)
{ 
	throw new erroDB.UserException(err.erro, err); 
}
 };
