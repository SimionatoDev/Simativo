/* DATA nfe */
const db = require('../infra/database');

/* GET CAMPOS */
exports.getCampos = function(Nfe){
return [ 
			Nfe.id_empresa, 
			Nfe.id_nfe, 
			Nfe.numero_nfe, 
			Nfe.emissao, 
			Nfe.descricao, 
			Nfe.id_fornecedor, 
			Nfe.serie, 
			Nfe.data_compra, 
			Nfe.chave_eletronica, 
			Nfe.condicao_pagamento, 
			Nfe.observacao, 
			Nfe.valor_total, 
 ]; 
}; 

/* CRUD GET */
exports.getNfe = function(id_empresa,id_nfe,id_fornecedor,numero_nfe,serie,emissao){
	strSql = ` select   
			   nf.id_empresa as  id_empresa  
			,  nf.id_nfe as  id_nfe  
			,  nf.numero_nfe as  numero_nfe  
			, to_char(nf.emissao, 'DD/MM/YYYY') as emissao  
			,  nf.descricao as  descricao  
			,  nf.id_fornecedor as  id_fornecedor  
			,  nf.serie as  serie  
			, to_char(nf.data_compra, 'DD/MM/YYYY') as data_compra  
			,  nf.chave_eletronica as  chave_eletronica  
			,  nf.condicao_pagamento as  condicao_pagamento  
			,  nf.observacao as  observacao  
			,  nf.valor_total as  valor_total  
			,  forn.cnpj_cpf as  forn_cnpj  
			,  forn.razao as  forn_razao    
 			FROM nfe nf 	  
				 inner join fornecedores forn on nf.id_empresa = forn.id_empresa and forn.id_fornecedor = nf.id_fornecedor   
			 where nf.id_empresa = ${id_empresa} and  nf.id_nfe = ${id_nfe} and  nf.id_fornecedor = ${id_fornecedor} and  nf.numero_nfe = ${numero_nfe} and  nf.serie = '${serie}' and  nf.emissao = '${emissao}'  `;
	return  db.oneOrNone(strSql);
}

/* CRUD GET ALL*/
exports.getNfes = function(params){
if (params) {
	where = "";
	orderby = "";
	paginacao = "";

	if(params.orderby == 'Código') orderby = 'nf.id_nfe, forn.razao, nf.numero_nfe, nf.data_compra, nf.valor_total';
	if(params.orderby == 'Fornecedor') orderby = 'forn.razao, nf.numero_nfe, nf.data_compra, nf.valor_total, nf.id_nfe';
	if(params.orderby == 'Número_Nfe') orderby = 'nf.numero_nfe, nf.id_nfe, forn.razao, nf.data_compra, nf.valor_total';

	if (orderby != "") orderby = " order by " + orderby;
	if(params.id_nfe  !== 0 ){
		if (where != "") where += " and "; 
		where += `nf.id_nfe = ${params.id_nfe} `;
	}
	if(params.numero_nfe  !== 0 ){
		if (where != "") where += " and "; 
		where += `nf.numero_nfe = ${params.numero_nfe} `;
	}
	if(params.forn_razao.trim()  !== ''){
		if (where != "") where += " and ";
		if (params.sharp) { 
			 where +=  `nf.forn_razao = '${params.forn_razao}' `;
		} else 
		{
			where += `nf.forn_razao like '%${params.forn_razao.trim()}%' `;
		}
	}
	if(params.data_compra  !== ''){
		if (where != "") where += " and "; 
		where += `nf.data_compra = '${params.data_compra}' `;
	}
	if(params.valor_total  !== ''){
		if (where != "") where += " and "; 
		where += `nf.valor_total = ${params.valor_total} `;
	}
	if (where != "") where = " where " + where;
	if (params.contador == 'S') {
		sqlStr = `SELECT COALESCE(COUNT(*),0) as total 
				  FROM nfe nf   
				 inner join fornecedores forn on nf.id_empresa = forn.id_empresa and forn.id_fornecedor = nf.id_fornecedor   
				  ${ where} `;
		return db.one(sqlStr);
	}  else {
		strSql = `select   
			   nf.id_empresa as  id_empresa  
			,  nf.id_nfe as  id_nfe  
			,  nf.numero_nfe as  numero_nfe  
			, to_char(nf.emissao, 'DD/MM/YYYY') as emissao  
			,  nf.descricao as  descricao  
			,  nf.id_fornecedor as  id_fornecedor  
			,  nf.serie as  serie  
			, to_char(nf.data_compra, 'DD/MM/YYYY') as data_compra  
			,  nf.chave_eletronica as  chave_eletronica  
			,  nf.condicao_pagamento as  condicao_pagamento  
			,  nf.observacao as  observacao  
			,  nf.valor_total as  valor_total  
			,  forn.cnpj_cpf as  forn_cnpj  
			,  forn.razao as  forn_razao     
			FROM nfe nf   
				 inner join fornecedores forn on nf.id_empresa = forn.id_empresa and forn.id_fornecedor = nf.id_fornecedor   
			${where} 			${ orderby} ${ paginacao} `;
			return  db.manyOrNone(strSql);
		}	}  else {
		strSql = `select   
			   nf.id_empresa as  id_empresa  
			,  nf.id_nfe as  id_nfe  
			,  nf.numero_nfe as  numero_nfe  
			, to_char(nf.emissao, 'DD/MM/YYYY') as emissao  
			,  nf.descricao as  descricao  
			,  nf.id_fornecedor as  id_fornecedor  
			,  nf.serie as  serie  
			, to_char(nf.data_compra, 'DD/MM/YYYY') as data_compra  
			,  nf.chave_eletronica as  chave_eletronica  
			,  nf.condicao_pagamento as  condicao_pagamento  
			,  nf.observacao as  observacao  
			,  nf.valor_total as  valor_total  
			,  forn.cnpj_cpf as  forn_cnpj  
			,  forn.razao as  forn_razao    
			FROM nfe nf			   
				 inner join fornecedores forn on nf.id_empresa = forn.id_empresa and forn.id_fornecedor = nf.id_fornecedor  `;
		return  db.manyOrNone(strSql);
	}
}

/* CRUD - INSERT */
 exports.insertNfe = function(nfe){
	strSql = `insert into nfe (
		     id_empresa 
		 ,   numero_nfe 
		 ,   emissao 
		 ,   descricao 
		 ,   id_fornecedor 
		 ,   serie 
		 ,   data_compra 
		 ,   chave_eletronica 
		 ,   condicao_pagamento 
		 ,   observacao 
		 ,   valor_total 
		 ) 
		 values(
		     ${nfe.id_empresa} 
		 ,   ${nfe.numero_nfe} 
		 ,   '${nfe.emissao}' 
		 ,   '${nfe.descricao}' 
		 ,   ${nfe.id_fornecedor} 
		 ,   '${nfe.serie}' 
		 ,   '${nfe.data_compra}' 
		 ,   ${nfe.chave_eletronica} 
		 ,   '${nfe.condicao_pagamento}' 
		 ,   '${nfe.observacao}' 
		 ,   '${nfe.valor_total}' 
		 ) 
 returning * `;
	return db.oneOrNone(strSql);
};

/* CRUD - UPDATE */
 exports.updateNfe = function(nfe){
	strSql = `update   nfe set  
		     descricao = '${nfe.descricao}' 
 		 ,   data_compra = '${nfe.data_compra}' 
 		 ,   chave_eletronica = ${nfe.chave_eletronica} 
 		 ,   condicao_pagamento = '${nfe.condicao_pagamento}' 
 		 ,   observacao = '${nfe.observacao}' 
 		 ,   valor_total = '${nfe.valor_total}' 
 		 where id_empresa = ${nfe.id_empresa} and  id_nfe = ${nfe.id_nfe} and  id_fornecedor = ${nfe.id_fornecedor} and  numero_nfe = ${nfe.numero_nfe} and  serie = '${nfe.serie}' and  emissao = '${nfe.emissao}'  returning * `;
	return  db.oneOrNone(strSql);
}

/* CRUD - DELETE */
 exports.deleteNfe = function(id_empresa,id_nfe,id_fornecedor,numero_nfe,serie,emissao){
	strSql = `delete from nfe 
		 where id_empresa = ${id_empresa} and  id_nfe = ${id_nfe} and  id_fornecedor = ${id_fornecedor} and  numero_nfe = ${numero_nfe} and  serie = '${serie}' and  emissao = '${emissao}'  `;
 	return  db.oneOrNone(strSql);
}


