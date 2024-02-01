const empresaSrv = require('../service/empresaService');
const erroDB = require('../util/userfunctiondb');
/* REGRA DE NEGOCIO empresas */

exports.empresa_Inclusao = async function(empresa) { 
	try { 
		const obj = await empresaSrv.getEmpresa(empresa.id_empresa);
		if (obj != null) { 
		   throw new erroDB.UserException('Regra de negócio', [{ tabela: 'EMPRESA', message: `"INCLUSÃO" Registro Já Existe Na Base De Dados.!` }]);
		}
	} catch (err) { 
		throw err; 
	}


	return; 
} 

exports.empresa_Alteracao = async function(empresa) { 
	try { 
		const obj = await empresaSrv.getEmpresa(empresa.id_empresa);
		if (obj == null) { 
		   throw new erroDB.UserException('Regra de negócio', [{ tabela: 'EMPRESA', message: `"ALTERAÇÃO" Registro Não Existe Na Base De Dados.!` }]);
		}
	} catch (err) { 
		throw err; 
	}


	return; 
} 

exports.empresa_Exclusao = async function(id_empresa) { 
	try { 
		const obj = await empresaSrv.getEmpresa(id_empresa);
		if (obj == null) { 
		   throw new erroDB.UserException('Regra de negócio', [{ tabela: 'EMPRESA', message: `"EXCLUSÃO" Registro Não Existe Na Base De Dados.!` }]);
		}
	} catch (err) { 
		throw err; 
	}


	return; 
} 

