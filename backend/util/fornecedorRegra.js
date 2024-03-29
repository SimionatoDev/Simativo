const fornecedorSrv = require('../service/fornecedorService');
const erroDB = require('../util/userfunctiondb');
/* REGRA DE NEGOCIO fornecedores */

exports.fornecedor_Inclusao = async function(fornecedor) { 
	try { 
		const obj = await fornecedorSrv.getFornecedor(fornecedor.id_empresa,fornecedor.id_fornecedor);
		if (obj != null) { 
		   throw new erroDB.UserException('Regra de negócio', [{ tabela: 'FORNECEDOR', message: `"INCLUSÃO" Registro Já Existe Na Base De Dados.!` }]);
		}
	} catch (err) { 
		throw err; 
	}


	return; 
} 

exports.fornecedor_Alteracao = async function(fornecedor) { 
	try { 
		const obj = await fornecedorSrv.getFornecedor(fornecedor.id_empresa,fornecedor.id_fornecedor);
		if (obj == null) { 
		   throw new erroDB.UserException('Regra de negócio', [{ tabela: 'FORNECEDOR', message: `"ALTERAÇÃO" Registro Não Existe Na Base De Dados.!` }]);
		}
	} catch (err) { 
		throw err; 
	}


	return; 
} 

exports.fornecedor_Exclusao = async function(id_empresa,id_fornecedor) { 
	try { 
		const obj = await fornecedorSrv.getFornecedor(id_empresa,id_fornecedor);
		if (obj == null) { 
		   throw new erroDB.UserException('Regra de negócio', [{ tabela: 'FORNECEDOR', message: `"EXCLUSÃO" Registro Não Existe Na Base De Dados.!` }]);
		}
	} catch (err) { 
		throw err; 
	}


	return; 
} 

