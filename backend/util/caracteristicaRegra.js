const caracteristicaSrv = require('../service/caracteristicaService');
const erroDB = require('../util/userfunctiondb');
/* REGRA DE NEGOCIO caracteristica */

exports.caracteristica_Inclusao = async function(caracteristica) { 
	try { 
		const obj = await caracteristicaSrv.getCaracteristica(caracteristica.id_empresa,caracteristica.id_caracteristica);
		if (obj != null) { 
		   throw new erroDB.UserException('Regra de negócio', [{ tabela: 'CARACTERISTICA', message: `"INCLUSÃO" Registro Já Existe Na Base De Dados.!` }]);
		}
	} catch (err) { 
		throw err; 
	}


	return; 
} 

exports.caracteristica_Alteracao = async function(caracteristica) { 
	try { 
		const obj = await caracteristicaSrv.getCaracteristica(caracteristica.id_empresa,caracteristica.id_caracteristica);
		if (obj == null) { 
		   throw new erroDB.UserException('Regra de negócio', [{ tabela: 'CARACTERISTICA', message: `"ALTERAÇÃO" Registro Não Existe Na Base De Dados.!` }]);
		}
	} catch (err) { 
		throw err; 
	}


	return; 
} 

exports.caracteristica_Exclusao = async function(id_empresa,id_caracteristica) { 
	try { 
		const obj = await caracteristicaSrv.getCaracteristica(id_empresa,id_caracteristica);
		if (obj == null) { 
		   throw new erroDB.UserException('Regra de negócio', [{ tabela: 'CARACTERISTICA', message: `"EXCLUSÃO" Registro Não Existe Na Base De Dados.!` }]);
		}
	} catch (err) { 
		throw err; 
	}


	return; 
} 

