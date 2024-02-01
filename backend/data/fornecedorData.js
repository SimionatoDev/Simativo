/* DATA fornecedores */
const db = require('../infra/database');

/* GET CAMPOS */
exports.getCampos = function(Fornecedor){
return [ 
			Fornecedor.id_empresa, 
			Fornecedor.id_fornecedor, 
			Fornecedor.cnpj_cpf, 
			Fornecedor.razao, 
 ]; 
};

/* CRUD GET */
exports.getFornecedor = function(id_empresa,id_fornecedor){
	strSql = ` select   
			   forn.id_empresa as  id_empresa  
			,  forn.id_fornecedor as  id_fornecedor  
			,  forn.cnpj_cpf as  cnpj_cpf  
			,  forn.razao as  razao    
 			FROM fornecedores forn 	     
			 where forn.id_empresa = ${id_empresa} and  forn.id_fornecedor = ${id_fornecedor}  `;
	return  db.oneOrNone(strSql);
}

/* CRUD GET ALL*/
exports.getFornecedores = function(params){
if (params) {
	where = "";
	orderby = "";
	paginacao = "";

	if(params.orderby == 'Código') orderby = 'forn.id_fornecedor, forn.razao, forn.cnpj_cpf';
	if(params.orderby == 'Razão') orderby = 'forn.razao, forn.cnpj_cpf, forn.id_fornecedor';
	if(params.orderby == 'CNPJ/CPF') orderby = 'forn.cnpj_cpf, forn.id_fornecedor, forn.razao';

	if (orderby != "") orderby = " order by " + orderby;
	if(params.id_fornecedor  !== 0 ){
		if (where != "") where += " and "; 
		where += `forn.id_fornecedor = ${params.id_fornecedor} `;
	}
	if(params.cnpj_cpf  !== 0 ){
		if (where != "") where += " and "; 
		where += `forn.cnpj_cpf = ${params.cnpj_cpf} `;
	}
	if(params.razao.trim()  !== ''){
		if (where != "") where += " and ";
		if (params.sharp) { 
			 where +=  `forn.razao = '${params.razao}' `;
		} else 
		{
			where += `forn.razao like '%${params.razao.trim()}%' `;
		}
	}
	if (where != "") where = " where " + where;
	if (params.contador == 'S') {
		sqlStr = `SELECT COALESCE(COUNT(*),0) as total 
				  FROM fornecedores forn      
				  ${ where} `;
		return db.one(sqlStr);
	}  else {
		strSql = `select   
			   forn.id_empresa as  id_empresa  
			,  forn.id_fornecedor as  id_fornecedor  
			,  forn.cnpj_cpf as  cnpj_cpf  
			,  forn.razao as  razao     
			FROM fornecedores forn      
			${where} 			${ orderby} ${ paginacao} `;
			return  db.manyOrNone(strSql);
		}	}  else {
		strSql = `select   
			   forn.id_empresa as  id_empresa  
			,  forn.id_fornecedor as  id_fornecedor  
			,  forn.cnpj_cpf as  cnpj_cpf  
			,  forn.razao as  razao    
			FROM fornecedores forn			     `;
		return  db.manyOrNone(strSql);
	}
}

/* CRUD - INSERT */
 exports.insertFornecedor = function(fornecedor){
	strSql = `insert into fornecedores (
		     id_empresa 
		 ,   cnpj_cpf 
		 ,   razao 
		 ) 
		 values(
		     ${fornecedor.id_empresa} 
		 ,   '${fornecedor.cnpj_cpf}' 
		 ,   '${fornecedor.razao}' 
		 ) 
 returning * `;
	return db.oneOrNone(strSql);
};

/* CRUD - UPDATE */
 exports.updateFornecedor = function(fornecedor){
	strSql = `update   fornecedores set  
		     cnpj_cpf = '${fornecedor.cnpj_cpf}' 
 		 ,   razao = '${fornecedor.razao}' 
 		 where id_empresa = ${fornecedor.id_empresa} and  id_fornecedor = ${fornecedor.id_fornecedor}  returning * `;
	return  db.oneOrNone(strSql);
}

/* CRUD - DELETE */
 exports.deleteFornecedor = function(id_empresa,id_fornecedor){
	strSql = `delete from fornecedores 
		 where id_empresa = ${id_empresa} and  id_fornecedor = ${id_fornecedor}  `;
 	return  db.oneOrNone(strSql);
}


