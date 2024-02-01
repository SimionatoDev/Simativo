/* SERVICE nfe */
const nfeData = require('../data/nfeData');
const validacao = require('../util/validacao');
const parametros = require('../util/nfeParametros');
const erroDB = require('../util/userfunctiondb');
const regras = require('../util/nfeRegra');

const TABELA = 'NFE';

/* CRUD GET SERVICE */
exports.getNfe = async function(id_empresa,id_nfe,id_fornecedor,numero_nfe,serie,emissao){
	return nfeData.getNfe(id_empresa,id_nfe,id_fornecedor,numero_nfe,serie,emissao);
};

/* CRUD GET ALL SERVICE */
exports.getNfes = async function(params){
	return nfeData.getNfes(params);
};

//* CRUD - INSERT - SERVICE */
 exports.insertNfe = async function(nfe){
try 
{
	await regras.nfe_Inclusao(nfe);
	validacao.Validacao(TABELA,nfe, parametros.nfe());
	return nfeData.insertNfe(nfe);
}
catch (err)
{ 
	throw new erroDB.UserException(err.erro, err); 
}
 };

//* CRUD - UPDATE - SERVICE */
 exports.updateNfe = async function(nfe){
try 
{
	await regras.nfe_Alteracao(nfe);
	validacao.Validacao(TABELA,nfe, parametros.nfe());
	return nfeData.updateNfe(nfe);
}
catch (err)
{ 
	throw new erroDB.UserException(err.erro, err); 
}
 };
 
//* CRUD - DELETE - SERVICE */
 exports.deleteNfe = async function(id_empresa,id_nfe,id_fornecedor,numero_nfe,serie,emissao){
try 
{
	await  regras.nfe_Exclusao(id_empresa,id_nfe,id_fornecedor,numero_nfe,serie,emissao);
	return nfeData.deleteNfe(id_empresa,id_nfe,id_fornecedor,numero_nfe,serie,emissao);
}
catch (err)
{ 
	throw new erroDB.UserException(err.erro, err); 
}
 };
