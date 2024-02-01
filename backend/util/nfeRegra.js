const nfeSrv = require('../service/nfeService');
const erroDB = require('../util/userfunctiondb');
/* REGRA DE NEGOCIO nfe */

exports.nfe_Inclusao = async function(nfe) { 
	try { 
		const obj = await nfeSrv.getNfe(nfe.id_empresa,nfe.id_nfe,nfe.id_fornecedor,nfe.numero_nfe,nfe.serie,nfe.emissao);
		if (obj != null) { 
		   throw new erroDB.UserException('Regra de negócio', [{ tabela: 'NFE', message: `"INCLUSÃO" Registro Já Existe Na Base De Dados.!` }]);
		}
	} catch (err) { 
		throw err; 
	}


	return; 
} 

exports.nfe_Alteracao = async function(nfe) { 
	try { 
		const obj = await nfeSrv.getNfe(nfe.id_empresa,nfe.id_nfe,nfe.id_fornecedor,nfe.numero_nfe,nfe.serie,nfe.emissao);
		if (obj == null) { 
		   throw new erroDB.UserException('Regra de negócio', [{ tabela: 'NFE', message: `"ALTERAÇÃO" Registro Não Existe Na Base De Dados.!` }]);
		}
	} catch (err) { 
		throw err; 
	}


	return; 
} 

exports.nfe_Exclusao = async function(id_empresa,id_nfe,id_fornecedor,numero_nfe,serie,emissao) { 
	try { 
		const obj = await nfeSrv.getNfe(id_empresa,id_nfe,id_fornecedor,numero_nfe,serie,emissao);
		if (obj == null) { 
		   throw new erroDB.UserException('Regra de negócio', [{ tabela: 'NFE', message: `"EXCLUSÃO" Registro Não Existe Na Base De Dados.!` }]);
		}
	} catch (err) { 
		throw err; 
	}


	return; 
} 

