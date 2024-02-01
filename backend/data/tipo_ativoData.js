/* DATA tipo_ativo */
const db = require('../infra/database');

/* GET CAMPOS */
exports.getCampos = function(Tipo_Ativo){
return [ 
			Tipo_Ativo.id_empresa, 
			Tipo_Ativo.tipo_ativo, 
			Tipo_Ativo.descricao, 
 ]; 
}; 

/* CRUD GET */
exports.getTipo_Ativo = function(id_empresa,tipo_ativo){
	strSql = ` select   
			   tip.id_empresa as  id_empresa  
			,  tip.tipo_ativo as  tipo_ativo  
			,  tip.descricao as  descricao    
 			FROM tipo_ativo tip 	     
			 where tip.id_empresa = ${id_empresa} and  tip.tipo_ativo = ${tipo_ativo}  `;
	return  db.oneOrNone(strSql);
}

/* CRUD GET ALL*/
exports.getTipos_Ativos = function(params){
if (params) {
	where = "";
	orderby = "";
	paginacao = "";

	if(params.orderby == 'Código') orderby = 'tip.tipo_ativo, tip.id_empresa, tip.descricao';
	if(params.orderby == 'Empresa') orderby = 'tip.id_empresa, tip.tipo_ativo, tip.descricao';
	if(params.orderby == 'Descrição') orderby = 'tip.descricao, tip.tipo_ativo, tip.id_empresa';

	if (orderby != "") orderby = " order by " + orderby;
	if(params.id_empresa  !== 0 ){
		if (where != "") where += " and "; 
		where += `tip.id_empresa = ${params.id_empresa} `;
	}
	if(params.tipo_ativo  !== 0 ){
		if (where != "") where += " and "; 
		where += `tip.tipo_ativo = ${params.tipo_ativo} `;
	}
	if(params.descricao.trim()  !== 0 ){
		if (where != "") where += " and ";
		if (params.sharp) { 
			 where +=  `tip.descricao = '${params.descricao}' `;
		} else 
		{
			where += `tip.descricao like '%${params.descricao.trim()}%' `;
		}
	}
	if (where != "") where = " where " + where;
	if (params.contador == 'S') {
		sqlStr = `SELECT COALESCE(COUNT(*),0) as total 
				  FROM tipo_ativo tip      
				  ${ where} `;
		return db.one(sqlStr);
	}  else {
		strSql = `select   
			   tip.id_empresa as  id_empresa  
			,  tip.tipo_ativo as  tipo_ativo  
			,  tip.descricao as  descricao     
			FROM tipo_ativo tip      
			${where} 			${ orderby} ${ paginacao} `;
			return  db.manyOrNone(strSql);
		}	}  else {
		strSql = `select   
			   tip.id_empresa as  id_empresa  
			,  tip.tipo_ativo as  tipo_ativo  
			,  tip.descricao as  descricao    
			FROM tipo_ativo tip			     `;
		return  db.manyOrNone(strSql);
	}
}

/* CRUD - INSERT */
 exports.insertTipo_Ativo = function(tipo_ativo){
	strSql = `insert into tipo_ativo (
		     id_empresa 
		 ,   descricao 
		 ) 
		 values(
		     ${tipo_ativo.id_empresa} 
		 ,   '${tipo_ativo.descricao}' 
		 ) 
 returning * `;
	return db.oneOrNone(strSql);
};

/* CRUD - UPDATE */
 exports.updateTipo_Ativo = function(tipo_ativo){
	strSql = `update   tipo_ativo set  
		     descricao = '${tipo_ativo.descricao}' 
 		 where id_empresa = ${tipo_ativo.id_empresa} and  tipo_ativo = ${tipo_ativo.tipo_ativo}  returning * `;
	return  db.oneOrNone(strSql);
}

/* CRUD - DELETE */
 exports.deleteTipo_Ativo = function(id_empresa,tipo_ativo){
	strSql = `delete from tipo_ativo 
		 where id_empresa = ${id_empresa} and  tipo_ativo = ${tipo_ativo}  `;
 	return  db.oneOrNone(strSql);
}


