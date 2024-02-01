/* SERVICE caracteristica */
const caracteristicaData = require('../data/caracteristicaData');
const validacao = require('../util/validacao');
const parametros = require('../util/caracteristicaParametros');
const erroDB = require('../util/userfunctiondb');
const regras = require('../util/caracteristicaRegra');

const TABELA = 'CARACTERISTICA';

/* CRUD GET SERVICE */
exports.getCaracteristica = async function(id_empresa,id_caracteristica){
	return caracteristicaData.getCaracteristica(id_empresa,id_caracteristica);
};

/* CRUD GET ALL SERVICE */
exports.getCaracteristicas = async function(params){
	return caracteristicaData.getCaracteristicas(params);
};

//* CRUD - INSERT - SERVICE */
 exports.insertCaracteristica = async function(caracteristica){
try 
{
	await regras.caracteristica_Inclusao(caracteristica);
	validacao.Validacao(TABELA,caracteristica, parametros.caracteristica());
	return caracteristicaData.insertCaracteristica(caracteristica);
}
catch (err)
{ 
	throw new erroDB.UserException(err.erro, err); 
}
 };

//* CRUD - UPDATE - SERVICE */
 exports.updateCaracteristica = async function(caracteristica){
try 
{
	await regras.caracteristica_Alteracao(caracteristica);
	validacao.Validacao(TABELA,caracteristica, parametros.caracteristica());
	return caracteristicaData.updateCaracteristica(caracteristica);
}
catch (err)
{ 
	throw new erroDB.UserException(err.erro, err); 
}
 };

//* CRUD - DELETE - SERVICE */
 exports.deleteCaracteristica = async function(id_empresa,id_caracteristica){
try 
{
	await  regras.caracteristica_Exclusao(id_empresa,id_caracteristica);
	return caracteristicaData.deleteCaracteristica(id_empresa,id_caracteristica);
}
catch (err)
{ 
	throw new erroDB.UserException(err.erro, err); 
}
 };
