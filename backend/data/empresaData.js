/* DATA empresas */
const db = require('../infra/database');

/* GET CAMPOS */
exports.getCampos = function(Empresa){
return [ 
			Empresa.id_empresa, 
			Empresa.cnpj_cpf, 
			Empresa.razao, 
			Empresa.fantasi, 
			Empresa.inscri, 
			Empresa.cadastr, 
			Empresa.ruaf, 
			Empresa.nrof, 
			Empresa.complementof, 
			Empresa.bairrof, 
			Empresa.cidadef, 
			Empresa.uff, 
			Empresa.cepf, 
			Empresa.tel1, 
			Empresa.tel2, 
			Empresa.email, 
			Empresa.obs, 
			Empresa.user_insert, 
			Empresa.user_update, 
 ]; 
}; 

/* CRUD GET */
exports.getEmpresa = function(id_empresa){
	strSql = ` select   
			   emp.id_empresa as  id_empresa  
			,  emp.cnpj_cpf as  cnpj_cpf  
			,  emp.razao as  razao  
			,  emp.fantasi as  fantasi  
			,  emp.inscri as  inscri  
			, to_char(emp.cadastr, 'DD/MM/YYYY') as cadastr  
			,  emp.ruaf as  ruaf  
			,  emp.nrof as  nrof  
			,  emp.complementof as  complementof  
			,  emp.bairrof as  bairrof  
			,  emp.cidadef as  cidadef  
			,  emp.uff as  uff  
			,  emp.cepf as  cepf  
			,  emp.tel1 as  tel1  
			,  emp.tel2 as  tel2  
			,  emp.email as  email  
			,  emp.obs as  obs  
			,  emp.user_insert as  user_insert  
			,  emp.user_update as  user_update    
 			FROM empresas emp 	     
			 where emp.id_empresa = ${id_empresa}  `;
	return  db.oneOrNone(strSql);
}

/* CRUD GET ALL*/
exports.getEmpresas = function(params){
if (params) {
	where = "";
	orderby = "";
	paginacao = "";

	if(params.orderby == '') orderby = 'emp.id_empresa';
	if(params.orderby == 'Código') orderby = 'emp.id_empresa';
	if(params.orderby == 'Razão') orderby = 'emp.razao';
	if(params.orderby == 'CNPJ/CPF') orderby = 'emp.id_empresa,emp.cnpj_cpf';

	if (orderby != "") orderby = " order by " + orderby;
	if(params.id_empresa  !== 0 ){
		if (where != "") where += " and "; 
		where += `emp.id_empresa = ${params.id_empresa} `;
	}
	if(params.razao.trim()  !== ''){
		if (where != "") where += " and ";
		if (params.sharp) { 
			 where +=  `emp.razao = '${params.razao}' `;
		} else 
		{
			where += `emp.razao like '%${params.razao.trim()}%' `;
		}
	}
	if(params.cnpj_cpf.trim()  !== ''){
		if (where != "") where += " and ";
		if (params.sharp) { 
			 where +=  `emp.cnpj_cpf = '${params.cnpj_cpf}' `;
		} else 
		{
			where += `emp.cnpj_cpf like '%${params.cnpj_cpf.trim()}%' `;
		}
	}
	if (where != "") where = " where " + where;
	if (params.contador == 'S') {
		sqlStr = `SELECT COALESCE(COUNT(*),0) as total 
				  FROM empresas emp      
				  ${ where} `;
		return db.one(sqlStr);
	}  else {
		strSql = `select   
			   emp.id_empresa as  id_empresa  
			,  emp.cnpj_cpf as  cnpj_cpf  
			,  emp.razao as  razao  
			,  emp.fantasi as  fantasi  
			,  emp.inscri as  inscri  
			, to_char(emp.cadastr, 'DD/MM/YYYY') as cadastr  
			,  emp.ruaf as  ruaf  
			,  emp.nrof as  nrof  
			,  emp.complementof as  complementof  
			,  emp.bairrof as  bairrof  
			,  emp.cidadef as  cidadef  
			,  emp.uff as  uff  
			,  emp.cepf as  cepf  
			,  emp.tel1 as  tel1  
			,  emp.tel2 as  tel2  
			,  emp.email as  email  
			,  emp.obs as  obs  
			,  emp.user_insert as  user_insert  
			,  emp.user_update as  user_update     
			FROM empresas emp      
			${where} 			${ orderby} ${ paginacao} `;
			return  db.manyOrNone(strSql);
		}	}  else {
		strSql = `select   
			   emp.id_empresa as  id_empresa  
			,  emp.cnpj_cpf as  cnpj_cpf  
			,  emp.razao as  razao  
			,  emp.fantasi as  fantasi  
			,  emp.inscri as  inscri  
			, to_char(emp.cadastr, 'DD/MM/YYYY') as cadastr  
			,  emp.ruaf as  ruaf  
			,  emp.nrof as  nrof  
			,  emp.complementof as  complementof  
			,  emp.bairrof as  bairrof  
			,  emp.cidadef as  cidadef  
			,  emp.uff as  uff  
			,  emp.cepf as  cepf  
			,  emp.tel1 as  tel1  
			,  emp.tel2 as  tel2  
			,  emp.email as  email  
			,  emp.obs as  obs  
			,  emp.user_insert as  user_insert  
			,  emp.user_update as  user_update    
			FROM empresas emp			     `;
		return  db.manyOrNone(strSql);
	}
}

/* CRUD - INSERT */
 exports.insertEmpresa = function(empresa){
	strSql = `insert into empresas (
		     cnpj_cpf 
		 ,   razao 
		 ,   fantasi 
		 ,   inscri 
		 ,   cadastr 
		 ,   ruaf 
		 ,   nrof 
		 ,   complementof 
		 ,   bairrof 
		 ,   cidadef 
		 ,   uff 
		 ,   cepf 
		 ,   tel1 
		 ,   tel2 
		 ,   email 
		 ,   obs 
		 ,   user_insert 
		 ,   user_update 
		 ) 
		 values(
		     '${empresa.cnpj_cpf}' 
		 ,   '${empresa.razao}' 
		 ,   '${empresa.fantasi}' 
		 ,   '${empresa.inscri}' 
		 ,   '${empresa.cadastr}' 
		 ,   '${empresa.ruaf}' 
		 ,   '${empresa.nrof}' 
		 ,   '${empresa.complementof}' 
		 ,   '${empresa.bairrof}' 
		 ,   '${empresa.cidadef}' 
		 ,   '${empresa.uff}' 
		 ,   '${empresa.cepf}' 
		 ,   '${empresa.tel1}' 
		 ,   '${empresa.tel2}' 
		 ,   '${empresa.email}' 
		 ,   '${empresa.obs}' 
		 ,   ${empresa.user_insert} 
		 ,   ${empresa.user_update} 
		 ) 
 returning * `;
	return db.oneOrNone(strSql);
};

/* CRUD - UPDATE */
 exports.updateEmpresa = function(empresa){
	strSql = `update   empresas set  
		     cnpj_cpf = '${empresa.cnpj_cpf}' 
 		 ,   razao = '${empresa.razao}' 
 		 ,   fantasi = '${empresa.fantasi}' 
 		 ,   inscri = '${empresa.inscri}' 
 		 ,   cadastr = '${empresa.cadastr}' 
 		 ,   ruaf = '${empresa.ruaf}' 
 		 ,   nrof = '${empresa.nrof}' 
 		 ,   complementof = '${empresa.complementof}' 
 		 ,   bairrof = '${empresa.bairrof}' 
 		 ,   cidadef = '${empresa.cidadef}' 
 		 ,   uff = '${empresa.uff}' 
 		 ,   cepf = '${empresa.cepf}' 
 		 ,   tel1 = '${empresa.tel1}' 
 		 ,   tel2 = '${empresa.tel2}' 
 		 ,   email = '${empresa.email}' 
 		 ,   obs = '${empresa.obs}' 
 		 ,   user_insert = ${empresa.user_insert} 
 		 ,   user_update = ${empresa.user_update} 
 		 where id_empresa = ${empresa.id_empresa}  returning * `;
	return  db.oneOrNone(strSql);
}

/* CRUD - DELETE */
 exports.deleteEmpresa = function(id_empresa){
	strSql = `delete from empresas 
		 where id_empresa = ${id_empresa}  `;
 	return  db.oneOrNone(strSql);
}


