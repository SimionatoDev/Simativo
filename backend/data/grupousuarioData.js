/* DATA gruposusuarios */
const db = require('../infra/database');

/* GET CAMPOS */
exports.getCampos = function(Grupousuario){
return [ 
			Grupousuario.id_empresa, 
			Grupousuario.id_grupos_user, 
			Grupousuario.descricao, 
			Grupousuario.user_insert, 
			Grupousuario.user_update, 
 ]; 
}; 

/* CRUD GET */
exports.getGrupousuario = function(id_empresa,id_grupos_user){
	strSql = ` select   
			   gru.id_empresa as  id_empresa  
			,  gru.id_grupos_user as  id_grupos_user  
			,  gru.descricao as  descricao  
			,  gru.user_insert as  user_insert  
			,  gru.user_update as  user_update    
 			FROM gruposusuarios gru 	     
			 where gru.id_empresa = ${id_empresa} and  gru.id_grupos_user = ${id_grupos_user}  `;
	return  db.oneOrNone(strSql);
}

/* CRUD GET ALL*/
exports.getGruposusuarios = function(params){
if (params) {
	where = "";
	orderby = "";
	paginacao = "";

	if(params.orderby == 'Empresa') orderby = 'grupo.id_empresa,grupo.descricao,grupo.id_grupos_user';
	if(params.orderby == 'Código') orderby = 'grupo.id_grupos_user, grupo.id_empresa, grupo.descricao';
	if(params.orderby == 'Descrição') orderby = 'grupo.descricao, grupo.id_empresa,grupo.id_grupos_user';

	if (orderby != "") orderby = " order by " + orderby;
	if(params.id_empresa  !== 0 ){
		if (where != "") where += " and "; 
		where += `gru.id_empresa = ${params.id_empresa} `;
	}
	if(params.id_grupos_user  !== 0 ){
		if (where != "") where += " and "; 
		where += `gru.id_grupos_user = ${params.id_grupos_user} `;
	}
	if(params.descricao.trim()  !== ''){
		if (where != "") where += " and ";
		if (params.sharp) { 
			 where +=  `gru.descricao = '${params.descricao}' `;
		} else 
		{
			where += `gru.descricao like '%${params.descricao.trim()}%' `;
		}
	}
	if (where != "") where = " where " + where;
	if (params.contador == 'S') {
		sqlStr = `SELECT COALESCE(COUNT(*),0) as total 
				  FROM gruposusuarios gru      
				  ${ where} `;
		return db.one(sqlStr);
	}  else {
		strSql = `select   
			   gru.id_empresa as  id_empresa  
			,  gru.id_grupos_user as  id_grupos_user  
			,  gru.descricao as  descricao  
			,  gru.user_insert as  user_insert  
			,  gru.user_update as  user_update     
			FROM gruposusuarios gru      
			${where} 			${ orderby} ${ paginacao} `;
			return  db.manyOrNone(strSql);
		}	}  else {
		strSql = `select   
			   gru.id_empresa as  id_empresa  
			,  gru.id_grupos_user as  id_grupos_user  
			,  gru.descricao as  descricao  
			,  gru.user_insert as  user_insert  
			,  gru.user_update as  user_update    
			FROM gruposusuarios gru			     `;
		return  db.manyOrNone(strSql);
	}
}

/* CRUD - INSERT */
 exports.insertGrupousuario = function(grupousuario){
	strSql = `insert into gruposusuarios (
		     id_empresa 
		 ,   descricao 
		 ,   user_insert 
		 ,   user_update 
		 ) 
		 values(
		     ${grupousuario.id_empresa} 
		 ,   '${grupousuario.descricao}' 
		 ,   ${grupousuario.user_insert} 
		 ,   ${grupousuario.user_update} 
		 ) 
 returning * `;
	return db.oneOrNone(strSql);
};

/* CRUD - UPDATE */
 exports.updateGrupousuario = function(grupousuario){
	strSql = `update   gruposusuarios set  
		     descricao = '${grupousuario.descricao}' 
 		 ,   user_insert = ${grupousuario.user_insert} 
 		 ,   user_update = ${grupousuario.user_update} 
 		 where id_empresa = ${grupousuario.id_empresa} and  id_grupos_user = ${grupousuario.id_grupos_user}  returning * `;
	return  db.oneOrNone(strSql);
}

/* CRUD - DELETE */
 exports.deleteGrupousuario = function(id_empresa,id_grupos_user){
	strSql = `delete from gruposusuarios 
		 where id_empresa = ${id_empresa} and  id_grupos_user = ${id_grupos_user}  `;
 	return  db.oneOrNone(strSql);
}


