const grupousuarioSrv = require('../service/grupousuarioService');
const erroDB = require('../util/userfunctiondb');
/* REGRA DE NEGOCIO gruposusuarios */

exports.grupousuario_Inclusao = async function(grupousuario) { 
	try { 
		const obj = await grupousuarioSrv.getGrupousuario(grupousuario.id_empresa,grupousuario.id_grupos_user);
		if (obj != null) { 
		   throw new erroDB.UserException('Regra de negócio', [{ tabela: 'GRUPOUSUARIO', message: `"INCLUSÃO" Registro Já Existe Na Base De Dados.!` }]);
		}
	} catch (err) { 
		throw err; 
	}


	return; 
} 

exports.grupousuario_Alteracao = async function(grupousuario) { 
	try { 
		const obj = await grupousuarioSrv.getGrupousuario(grupousuario.id_empresa,grupousuario.id_grupos_user);
		if (obj == null) { 
		   throw new erroDB.UserException('Regra de negócio', [{ tabela: 'GRUPOUSUARIO', message: `"ALTERAÇÃO" Registro Não Existe Na Base De Dados.!` }]);
		}
	} catch (err) { 
		throw err; 
	}


	return; 
} 

exports.grupousuario_Exclusao = async function(id_empresa,id_grupos_user) { 
	try { 
		const obj = await grupousuarioSrv.getGrupousuario(id_empresa,id_grupos_user);
		if (obj == null) { 
		   throw new erroDB.UserException('Regra de negócio', [{ tabela: 'GRUPOUSUARIO', message: `"EXCLUSÃO" Registro Não Existe Na Base De Dados.!` }]);
		}
	} catch (err) { 
		throw err; 
	}


	return; 
} 

