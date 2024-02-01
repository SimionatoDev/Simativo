/* DATA caracteristicas */
const db = require('../infra/database');

/* GET CAMPOS */
exports.getCampos = function(Caracteristicas){
return [ 
			caracteristicas.id_empresa, 
			caracteristicas.id_caracteristica, 
			caracteristicas.tipo_ativo, 
			caracteristicas.descricao, 
 ]; 
}; 

/* CRUD GET */
exports.getcaracteristicas = function(id_empresa,id_caracteristica){
	strSql = ` select   
			   carac.id_empresa as  id_empresa  
			,  carac.id_caracteristica as  id_caracteristica  
			,  carac.tipo_ativo as  tipo_ativo  
			,  carac.descricao as  descricao
			,  ati.descricao as descricao_ativo
			,  tip.descricao as tip_tipo 
 			FROM caracteristicas carac 	  
			left join ativo ati on carac.id_empresa = ati.id_empresa and carac.tipo_ativo = ati.tipo_ativo 
			left join tipo_ativo tip on tip.id_empresa = carac.id_empresa and tip.tipo_ativo = carac.tipo_ativo
			 where carac.id_empresa = ${id_empresa} and  carac.id_caracteristica = ${id_caracteristica}  `;
	return  db.oneOrNone(strSql);
}

/* CRUD GET ALL*/
exports.getCaracteristicas = function(params){
if (params) {
	where = "";
	orderby = "";
	paginacao = "";

	if(params.orderby == 'Código') orderby = 'carac.id_caracteristica, carac.id_empresa, carac.tipo_ativo, carac.descricao';
	if(params.orderby == 'Empresa') orderby = 'carac.id_empresa, carac.id_caracteristica, carac.tipo_ativo, carac.descricao';
	if(params.orderby == 'Tipo do Ativo') orderby = 'carac.tipo_ativo, carac.id_caracteristica, carac.id_empresa, carac.descricao';
	if(params.orderby == 'Descrição') orderby = 'carac.descricao, carac.id_caracteristica, carac.id_empresa, carac.tipo_ativo';

	if (orderby != "") orderby = " order by " + orderby;
	if(params.id_empresa  !== 0 ){
		if (where != "") where += " and "; 
		where += `carac.id_empresa = ${params.id_empresa} `;
	}
	if(params.id_caracteristica  !== 0 ){
		if (where != "") where += " and "; 
		where += `carac.id_caracteristica = ${params.id_caracteristica} `;
	}
	if(params.descricao.trim()  !== 0 ){
		if (where != "") where += " and ";
		if (params.sharp) { 
			 where +=  `carac.descricao = '${params.descricao}' `;
		} else 
		{
			where += `carac.descricao like '%${params.descricao.trim()}%' `;
		}
	}
	if(params.tipo_ativo  !== 0 ){
		if (where != "") where += " and "; 
		where += `carac.tipo_ativo = ${params.tipo_ativo} `;
	}
	if (where != "") where = " where " + where;
	if (params.contador == 'S') {
		sqlStr = `SELECT COALESCE(COUNT(*),0) as total 
				  FROM caracteristicas carac   
				  left join ativo ati on carac.id_empresa = ati.id_empresa and carac.tipo_ativo = ati.tipo_ativo
				  left join tipo_ativo tip on tip.id_empresa = carac.id_empresa and tip.tipo_ativo = carac.tipo_ativo   
				  ${ where} `;
		return db.one(sqlStr);
	}  else {
		strSql = `select   
			   carac.id_empresa as  id_empresa  
			,  carac.id_caracteristica as  id_caracteristica  
			,  carac.tipo_ativo as  tipo_ativo  
			,  carac.descricao as  descricao 
			,  ati.descricao as descricao_ativo
			,  tip.descricao as tip_tipo 
			FROM caracteristicas carac   
			left join ativo ati on carac.id_empresa = ati.id_empresa and carac.tipo_ativo = ati.tipo_ativo 
			left join tipo_ativo tip on tip.id_empresa = carac.id_empresa and tip.tipo_ativo = carac.tipo_ativo  
			${where} 			${ orderby} ${ paginacao} `;
			return  db.manyOrNone(strSql);
		}	}  else {
		strSql = `select   
			   carac.id_empresa as  id_empresa  
			,  carac.id_caracteristica as  id_caracteristica  
			,  carac.tipo_ativo as  tipo_ativo  
			,  carac.descricao as  descricao    
			,  ati.descricao as descricao_ativo 
			,  tip.descricao as tip_tipo 
			FROM caracteristicas carac			   
			left join ativo ati on carac.id_empresa = ati.id_empresa and carac.tipo_ativo = ati.tipo_ativo   
			left join tipo_ativo tip on tip.id_empresa = carac.id_empresa and tip.tipo_ativo = carac.tipo_ativo
			`;
		return  db.manyOrNone(strSql);
	}
}

/* CRUD - INSERT */
 exports.insertcaracteristicas = function(caracteristicas){
	strSql = `insert into caracteristicas (
		     id_empresa 
		 ,   id_caracteristica 
		 ,   tipo_ativo 
		 ,   descricao 
		 ) 
		 values(
		     ${caracteristicas.id_empresa} 
		 ,   ${caracteristicas.id_caracteristica} 
		 ,   ${caracteristicas.tipo_ativo} 
		 ,   '${caracteristicas.descricao}' 
		 ) 
 returning * `;
	return db.oneOrNone(strSql);
};

/* CRUD - UPDATE */
 exports.updatecaracteristicas = function(caracteristicas){
	strSql = `update   caracteristicas set  
		     tipo_ativo = ${caracteristicas.tipo_ativo} 
 		 ,   descricao = '${caracteristicas.descricao}' 
 		 where id_empresa = ${caracteristicas.id_empresa} and  id_caracteristica = ${caracteristicas.id_caracteristica}  returning * `;
	return  db.oneOrNone(strSql);
}

/* CRUD - DELETE */
 exports.deletecaracteristicas = function(id_empresa,id_caracteristica){
	strSql = `delete from caracteristicas 
		 where id_empresa = ${id_empresa} and  id_caracteristica = ${id_caracteristica}  `;
 	return  db.oneOrNone(strSql);
}


