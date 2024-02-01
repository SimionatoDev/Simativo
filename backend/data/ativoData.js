/* DATA ativo */
const db = require('../infra/database');

/* GET CAMPOS */
exports.getCampos = function(Ativo){
return [ 
			Ativo.id_empresa, 
			Ativo.etiqueta, 
			Ativo.id_ativo, 
			Ativo.id_nfe, 
			Ativo.tipo_ativo, 
			Ativo.descricao, 
			Ativo.id_usuario, 
			Ativo.valor_aquisicao, 
 ]; 
}; 

/* CRUD GET */
exports.getAtivo = function(id_ativo,id_empresa,etiqueta){
	strSql = ` select   
			   ati.id_empresa as  id_empresa  
			,  ati.etiqueta as  etiqueta  
			,  ati.id_ativo as  id_ativo  
			,  ati.id_nfe as  id_nfe  
			,  ati.tipo_ativo as  tipo_ativo  
			,  ati.descricao as  descricao  
			,  ati.id_usuario as  id_usuario  
			,  ati.valor_aquisicao as  valor_aquisicao  
			,  usu.cnpj_cpf as  usu_cnpj  
			,  usu.razao as  usu_razao
			,  tip.descricao as descricao
			,  nfe.numero_nfe as nfe_numero 
			,  nfe.valor_total as valor_total_nfe
 			FROM ativo ati 	  
				 inner join usuarios usu on usu.id_empresa = ati.id_empresa and ati.id_usuario = usu.id_usuario
				 left join tipo_ativo tip on  tip.id_empresa = ati.id_empresa and ati.tipo_ativo = tip.tipo_ativo; 
				 left join nfe nfe on nfe.id_empresa = ati.id_empresa and nfe.id_nfe = ati.id_nfe
			 where ati.id_ativo = ${id_ativo} and  ati.id_empresa = ${id_empresa} and  ati.etiqueta = ${etiqueta}  `;
	return  db.oneOrNone(strSql);
}

/* CRUD GET ALL*/
exports.getAtivos = function(params){
if (params) {
	where = "";
	orderby = "";
	paginacao = "";

	if(params.orderby == 'Código') orderby = 'ati.id_ativo, ati.id_usuario, ati.tipo_produto, ati.descricao';
	if(params.orderby == 'Usuário') orderby = 'ati.id_usuario, ati.id_ativo, ati.tipo_produto, ati.descricao ';
	if(params.orderby == 'Tipo do produto') orderby = 'ati.tipo_produto, ati.id_ativo, ati.id_usuario, ati.descricao';
	if(params.orderby == 'Descrição') orderby = 'ati.descricao, ati.tipo_produto, ati.id_ativo, ati.id_usuario';

	if (orderby != "") orderby = " order by " + orderby;
	if(params.id_ativo  !== 0 ){
		if (where != "") where += " and "; 
		where += `ati.id_ativo = ${params.id_ativo} `;
	}
	if(params.tipo_ativo  !== ''){
		if (where != "") where += " and "; 
		where += `ati.tipo_ativo = ${params.tipo_ativo} `;
	}
	if(params.id_usuario  !== ''){
		if (where != "") where += " and "; 
		where += `ati.id_usuario = ${params.id_usuario} `;
	}
	if(params.descricao.trim()  !== ''){
		if (where != "") where += " and ";
		if (params.sharp) { 
			 where +=  `ati.descricao = '${params.descricao}' `;
		} else 
		{
			where += `ati.descricao like '%${params.descricao.trim()}%' `;
		}
	}
	if (where != "") where = " where " + where;
	if (params.contador == 'S') {
		sqlStr = `SELECT COALESCE(COUNT(*),0) as total 
				  FROM ativo ati   
				 inner join usuarios usu on usu.id_empresa = ati.id_empresa and ati.id_usuario = usu.id_usuario
				 left join nfe nfe on nfe.id_empresa = ati.id_empresa and nfe.id_nfe = ati.id_nfe
				 left join tipo_ativo tip on  tip.id_empresa = ati.id_empresa and ati.tipo_ativo = tip.tipo_ativo;
				  ${ where} `;
		return db.one(sqlStr);
	}  else {
		strSql = `select   
			   ati.id_empresa as  id_empresa  
			,  ati.etiqueta as  etiqueta  
			,  ati.id_ativo as  id_ativo  
			,  ati.id_nfe as  id_nfe  
			,  ati.tipo_ativo as  tipo_ativo  
			,  ati.descricao as  descricao  
			,  ati.id_usuario as  id_usuario  
			,  ati.valor_aquisicao as  valor_aquisicao  
			,  usu.cnpj_cpf as  usu_cnpj  
			,  usu.razao as  usu_razao   
			,  nfe.numero_nfe as nfe_numero 
			,  nfe.valor_total as valor_total_nfe
			,  tip.descricao as descricao  
			FROM ativo ati   
				 inner join usuarios usu on usu.id_empresa = ati.id_empresa and ati.id_usuario = usu.id_usuario
				 left join nfe nfe on nfe.id_empresa = ati.id_empresa and nfe.id_nfe = ati.id_nfe
				 left join tipo_ativo tip on  tip.id_empresa = ati.id_empresa and ati.tipo_ativo = tip.tipo_ativo;
			${where} 			${ orderby} ${ paginacao} `;
			return  db.manyOrNone(strSql);
		}	}  else {
		strSql = `select   
			   ati.id_empresa as  id_empresa  
			,  ati.etiqueta as  etiqueta  
			,  ati.id_ativo as  id_ativo  
			,  ati.id_nfe as  id_nfe  
			,  ati.tipo_ativo as  tipo_ativo  
			,  ati.descricao as  descricao  
			,  ati.id_usuario as  id_usuario  
			,  ati.valor_aquisicao as  valor_aquisicao  
			,  usu.cnpj_cpf as  usu_cnpj  
			,  usu.razao as  usu_razao
			,  nfe.numero_nfe as nfe_numero 
			,  nfe.valor_total as valor_total_nfe
			,  tip.descricao as descricao 
			FROM ativo ati			   
				 inner join usuarios usu on usu.id_empresa = ati.id_empresa and ati.id_usuario = usu.id_usuario
				 left join nfe nfe on nfe.id_empresa = ati.id_empresa and nfe.id_nfe = ati.id_nfe
				 left join tipo_ativo tip on  tip.id_empresa = ati.id_empresa and ati.tipo_ativo = tip.tipo_ativo `;
		return  db.manyOrNone(strSql);
	}
}

/* CRUD - INSERT */
 exports.insertAtivo = function(ativo){
	strSql = `insert into ativo (
		     id_empresa 
		 ,   etiqueta 
		 ,   id_nfe 
		 ,   tipo_ativo 
		 ,   descricao 
		 ,   id_usuario 
		 ,   valor_aquisicao 
		 ) 
		 values(
		     ${ativo.id_empresa} 
		 ,   ${ativo.etiqueta} 
		 ,   ${ativo.id_nfe} 
		 ,   ${ativo.tipo_ativo} 
		 ,   '${ativo.descricao}' 
		 ,   ${ativo.id_usuario} 
		 ,   '${ativo.valor_aquisicao}' 
		 ) 
 returning * `;
	return db.oneOrNone(strSql);
};

/* CRUD - UPDATE */
 exports.updateAtivo = function(ativo){
	strSql = `update   ativo set  
		     id_nfe = ${ativo.id_nfe} 
 		 ,   tipo_ativo = ${ativo.tipo_ativo} 
 		 ,   descricao = '${ativo.descricao}' 
 		 ,   id_usuario = ${ativo.id_usuario} 
 		 ,   valor_aquisicao = '${ativo.valor_aquisicao}' 
 		 where id_ativo = ${ativo.id_ativo} and  id_empresa = ${ativo.id_empresa} and  etiqueta = ${ativo.etiqueta}  returning * `;
	return  db.oneOrNone(strSql);
}

/* CRUD - DELETE */
 exports.deleteAtivo = function(id_ativo,id_empresa,etiqueta){
	strSql = `delete from ativo 
		 where id_ativo = ${id_ativo} and  id_empresa = ${id_empresa} and  etiqueta = ${etiqueta}  `;
 	return  db.oneOrNone(strSql);
}


