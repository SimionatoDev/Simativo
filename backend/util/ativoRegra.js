const ativoSrv = require('../service/ativoService');
const erroDB = require('../util/userfunctiondb');
/* REGRA DE NEGOCIO ativo */

exports.ativo_Inclusao = async function(ativo) { 
	try { 
		const obj = await ativoSrv.getAtivo(ativo.id_ativo,ativo.id_empresa,ativo.etiqueta);
		if (obj != null) { 
		   throw new erroDB.UserException('Regra de negócio', [{ tabela: 'ATIVO', message: `"INCLUSÃO" Registro Já Existe Na Base De Dados.!` }]);
		}
	} catch (err) { 
		throw err; 
	}


	return; 
} 

exports.ativo_Alteracao = async function(ativo) { 
	try { 
		const obj = await ativoSrv.getAtivo(ativo.id_ativo,ativo.id_empresa,ativo.etiqueta);
		if (obj == null) { 
		   throw new erroDB.UserException('Regra de negócio', [{ tabela: 'ATIVO', message: `"ALTERAÇÃO" Registro Não Existe Na Base De Dados.!` }]);
		}
	} catch (err) { 
		throw err; 
	}


	return; 
} 

exports.ativo_Exclusao = async function(id_ativo,id_empresa,etiqueta) { 
	try { 
		const obj = await ativoSrv.getAtivo(id_ativo,id_empresa,etiqueta);
		if (obj == null) { 
		   throw new erroDB.UserException('Regra de negócio', [{ tabela: 'ATIVO', message: `"EXCLUSÃO" Registro Não Existe Na Base De Dados.!` }]);
		}
	} catch (err) { 
		throw err; 
	}


	return; 
} 

