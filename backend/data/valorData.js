/* DATA valor */
const db = require('../infra/database');

/* GET CAMPOS */
exports.getCampos = function(Valor){
return [ 
			Valor.id_empresa, 
			Valor.id_valor, 
			Valor.id_caracteristica, 
			Valor.id_ativo, 
			Valor.data_registro, 
			Valor.valor, 
 ]; 
}; 

/* CRUD GET */
exports.getValor = function(id_empresa,id_ativo,id_valor,id_caracteristica){
	strSql = ` select   
			   val.id_empresa as  id_empresa  
			,  val.id_valor as  id_valor  
			,  val.id_caracteristica as  id_caracteristica  
			,  val.id_ativo as  id_ativo  
			, to_char(val.data_registro, 'DD/MM/YYYY') as data_registro  
			,  val.valor as  valor 
			,  carac.tipo_ativo as carac_ativo
			,  ati.*
 			FROM valor val 	  
				 left join caracteristicas carac on val.id_empresa = carac.id_empresa and val.id_caracteristica = carac.id_caracteristica
				 left join ativo ati on val.id_ativo = ati.id_ativo and val.id_empresa = ati.id_empresa
				 where val.id_empresa = ${id_empresa} and  val.id_ativo = ${id_ativo} and  val.id_valor = ${id_valor} and  val.id_caracteristica = ${id_caracteristica}  `;
	return  db.oneOrNone(strSql);
}

/* CRUD GET ALL*/
exports.getValores = function(params){
if (params) {
	where = "";
	orderby = "";
	paginacao = "";

	if(params.orderby == 'Código') orderby = 'tip.id_valor, tip.descricao';
	if(params.orderby == 'Descrição') orderby = 'tip.descricao, tip.id_valor';

	if (orderby != "") orderby = " order by " + orderby;
	if(params.id_valor  !== 0 ){
		if (where != "") where += " and "; 
		where += `val.id_valor = ${params.id_valor} `;
	}
	if(params.descricao.trim()  !== 0 ){
		if (where != "") where += " and ";
		if (params.sharp) { 
			 where +=  `val.descricao = '${params.descricao}' `;
		} else 
		{
			where += `val.descricao like '%${params.descricao.trim()}%' `;
		}
	}
	if (where != "") where = " where " + where;
	if (params.contador == 'S') {
		sqlStr = `SELECT COALESCE(COUNT(*),0) as total 
				  FROM valor val   
				  left join caracteristicas carac on val.id_empresa = carac.id_empresa and val.id_caracteristica = carac.id_caracteristica
				  left join ativo ati on val.id_ativo = ati.id_ativo and val.id_empresa = ati.id_empresa
				  ${ where} `;
		return db.one(sqlStr);
	}  else {
		strSql = `select   
			   val.id_empresa as  id_empresa  
			,  val.id_valor as  id_valor  
			,  val.id_caracteristica as  id_caracteristica  
			,  val.id_ativo as  id_ativo  
			, to_char(val.data_registro, 'DD/MM/YYYY') as data_registro  
			,  val.valor as  valor     
			,  carac.descricao as carac_descricao
			,  ati.*
			FROM valor val   
			left join caracteristicas carac on val.id_empresa = carac.id_empresa and val.id_caracteristica = carac.id_caracteristica
			left join ativo ati on val.id_ativo = ati.id_ativo and val.id_empresa = ati.id_empresa
			${where} 			${ orderby} ${ paginacao} `;
			return  db.manyOrNone(strSql);
		}	}  else {
		strSql = `select   
			   val.id_empresa as  id_empresa  
			,  val.id_valor as  id_valor  
			,  val.id_caracteristica as  id_caracteristica  
			,  val.id_ativo as  id_ativo  
			, to_char(val.data_registro, 'DD/MM/YYYY') as data_registro  
			,  val.valor as  valor    
			,  carac.descricao as carac_descricao
			,  ati.*
			FROM valor val			   
			left join caracteristicas carac on val.id_empresa = carac.id_empresa and val.id_caracteristica = carac.id_caracteristica
			left join ativo ati on val.id_ativo = ati.id_ativo and val.id_empresa = ati.id_empresa `;
		return  db.manyOrNone(strSql);
	}
}

/* CRUD - INSERT */
 exports.insertValor = function(valor){
	strSql = `insert into valor (
		     id_empresa 
		 ,   id_caracteristica 
		 ,   id_ativo 
		 ,   data_registro 
		 ,   valor 
		 ) 
		 values(
		     ${valor.id_empresa} 
		 ,   ${valor.id_caracteristica} 
		 ,   ${valor.id_ativo} 
		 ,   '${valor.data_registro}' 
		 ,   '${valor.valor}' 
		 ) 
 returning * `;
	return db.oneOrNone(strSql);
};

/* CRUD - UPDATE */
 exports.updateValor = function(valor){
	strSql = `update   valor set  
		     data_registro = '${valor.data_registro}' 
 		 ,   valor = '${valor.valor}' 
 		 where id_empresa = ${valor.id_empresa} and  id_ativo = ${valor.id_ativo} and  id_valor = ${valor.id_valor} and  id_caracteristica = ${valor.id_caracteristica}  returning * `;
	return  db.oneOrNone(strSql);
}

/* CRUD - DELETE */
 exports.deleteValor = function(id_empresa,id_ativo,id_valor,id_caracteristica){
	strSql = `delete from valor 
		 where id_empresa = ${id_empresa} and  id_ativo = ${id_ativo} and  id_valor = ${id_valor} and  id_caracteristica = ${id_caracteristica}  `;
 	return  db.oneOrNone(strSql);
}