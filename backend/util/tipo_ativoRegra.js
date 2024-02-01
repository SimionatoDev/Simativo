const tipo_ativoSrv = require('../service/tipo_ativoService');
const erroDB = require('../util/userfunctiondb');
/* REGRA DE NEGOCIO tipo_ativo */

exports.tipo_ativo_Inclusao = async function(tipo_ativo) { 
	try { 
		const obj = await tipo_ativoSrv.getTipo_Ativo(tipo_ativo.id_empresa,tipo_ativo.tipo_ativo);
		if (obj != null) { 
		   throw new erroDB.UserException('Regra de negócio', [{ tabela: 'TIPO_ATIVO', message: `"INCLUSÃO" Registro Já Existe Na Base De Dados.!` }]);
		}
	} catch (err) { 
		throw err; 
	}


	return; 
} 

exports.tipo_ativo_Alteracao = async function(tipo_ativo) { 
	try { 
		const obj = await tipo_ativoSrv.getTipo_Ativo(tipo_ativo.id_empresa,tipo_ativo.tipo_ativo);
		if (obj == null) { 
		   throw new erroDB.UserException('Regra de negócio', [{ tabela: 'TIPO_ATIVO', message: `"ALTERAÇÃO" Registro Não Existe Na Base De Dados.!` }]);
		}
	} catch (err) { 
		throw err; 
	}


	return; 
} 

exports.tipo_ativo_Exclusao = async function(id_empresa,tipo_ativo) { 
	try { 
		const obj = await tipo_ativoSrv.getTipo_Ativo(id_empresa,tipo_ativo);
		if (obj == null) { 
		   throw new erroDB.UserException('Regra de negócio', [{ tabela: 'TIPO_ATIVO', message: `"EXCLUSÃO" Registro Não Existe Na Base De Dados.!` }]);
		}
	} catch (err) { 
		throw err; 
	}


	return; 
} 

