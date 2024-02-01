CREATE DATABASE db_ativos_note 
		WITH 
		OWNER = postgres 
		ENCODING = 'UTF8' 
		LC_COLLATE = 'Portuguese_Brazil.1252' 
		LC_CTYPE = 'Portuguese_Brazil.1252' 
		TABLESPACE = "Producao" 
		CONNECTION LIMIT = -1; 
GO 
/* Script Tabelas */
/* TABELA empresas  */
DROP TABLE IF EXISTS empresas;
CREATE TABLE Public.empresas (
		id_empresa serial  NOT NULL  , 
		cnpj_cpf varchar(14)  NOT NULL  , 
		razao varchar(40)  NOT NULL  , 
		fantasi varchar(40)  NOT NULL  , 
		inscri varchar(14)  NOT NULL  , 
		cadastr Date  NOT NULL  , 
		ruaf varchar(80)  NOT NULL  , 
		nrof varchar(10)  NOT NULL  , 
		complementof varchar(30)  NOT NULL  , 
		bairrof varchar(40)  NOT NULL  , 
		cidadef varchar(40)  NOT NULL  , 
		uff varchar(2)  NOT NULL  , 
		cepf char(8)  NOT NULL  , 
		tel1 varchar(23)  NOT NULL  , 
		tel2 varchar(23)  NOT NULL  , 
		email varchar(100)  NOT NULL  , 
		obs varchar(200)  NOT NULL  , 
		user_insert int4  NOT NULL  , 
		user_update int4  NOT NULL  , 
		PRIMARY KEY(id_empresa) 
)
 WITHOUT OIDS 
 TABLESPACE "Producao" 
 GO 
/* TABELA usuarios  */
DROP TABLE IF EXISTS usuarios;
CREATE TABLE Public.usuarios (
		id_empresa int4  NOT NULL  , 
		id_usuario serial  NOT NULL  , 
		cnpj_cpf varchar(14)  NOT NULL  , 
		razao varchar(40)  NOT NULL  , 
		cadastr Date  NOT NULL  , 
		rua varchar(80)  NOT NULL  , 
		nro varchar(10)  NOT NULL  , 
		complemento varchar(30)  NOT NULL  , 
		bairro varchar(40)  NOT NULL  , 
		cidade varchar(40)  NOT NULL  , 
		uf varchar(2)  NOT NULL  , 
		cep char(8)  NOT NULL  , 
		tel1 varchar(23)  NOT NULL  , 
		tel2 varchar(23)  NOT NULL  , 
		email varchar(100)  NOT NULL  , 
		obs varchar(200)  NOT NULL  , 
		senha varchar(255)  NOT NULL  , 
		grupo int4  NOT NULL  , 
		ativo char(1)  NOT NULL  , 
		user_insert int4  NOT NULL  , 
		user_update int4  NOT NULL  , 
		PRIMARY KEY(id_empresa,id_usuario) 
)
 WITHOUT OIDS 
 TABLESPACE "Producao" 
 GO 
/* TABELA gruposusuarios  */
DROP TABLE IF EXISTS gruposusuarios;
CREATE TABLE Public.gruposusuarios (
		id_empresa int4  NOT NULL  , 
		id_grupos_user serial  NOT NULL  , 
		descricao varchar(40)  NOT NULL  , 
		user_insert int4  NOT NULL  , 
		user_update int4  NOT NULL  , 
		PRIMARY KEY(id_empresa,id_grupos_user) 
)
 WITHOUT OIDS 
 TABLESPACE "Producao" 
 GO 
/* TABELA fornecedores  */
DROP TABLE IF EXISTS fornecedores;
CREATE TABLE Public.fornecedores (
		id_empresa int4  NOT NULL  , 
		id_fornecedor serial  NOT NULL  , 
		cnpj_cpf char(14)  NOT NULL  , 
		razao varchar(50)  NOT NULL  , 
		PRIMARY KEY(id_empresa,id_fornecedor) 
)
 WITHOUT OIDS 
 TABLESPACE "Producao" 
 GO 
/* TABELA nfe  */
DROP TABLE IF EXISTS nfe;
CREATE TABLE Public.nfe (
		id_empresa int4  NOT NULL  , 
		id_nfe serial  NOT NULL  , 
		numero_nfe int4  NOT NULL  , 
		emissao date  NOT NULL  , 
		descricao varchar(255)  NOT NULL  , 
		id_fornecedor int4  NOT NULL  , 
		serie varchar(50)  NOT NULL  , 
		data_compra date  NOT NULL  , 
		chave_eletronica int4  NOT NULL  , 
		condicao_pagamento varchar(30)  NOT NULL  , 
		observacao varchar(255)  NOT NULL  , 
		valor_total varchar(30)  NOT NULL  , 
		PRIMARY KEY(id_empresa,id_nfe,id_fornecedor,numero_nfe,serie,emissao) 
)
 WITHOUT OIDS 
 TABLESPACE "Producao" 
 GO 
/* TABELA tipo_ativo  */
DROP TABLE IF EXISTS tipo_ativo;
CREATE TABLE Public.tipo_ativo (
		id_empresa int4  NOT NULL  , 
		tipo_ativo serial  NOT NULL  , 
		descricao varchar(50)  NOT NULL  , 
		PRIMARY KEY(id_empresa,tipo_ativo) 
)
 WITHOUT OIDS 
 TABLESPACE "Producao" 
 GO 
/* TABELA ativo  */
DROP TABLE IF EXISTS ativo;
CREATE TABLE Public.ativo (
		id_empresa int4  NOT NULL  , 
		etiqueta int4  NOT NULL  , 
		id_ativo serial  NOT NULL  , 
		id_nfe int4  NOT NULL  , 
		tipo_ativo int4  NOT NULL  , 
		descricao varchar(50)  NOT NULL  , 
		id_usuario int4  NOT NULL  , 
		valor_aquisicao varchar(30)  NOT NULL  , 
		PRIMARY KEY(id_ativo,id_empresa,etiqueta) 
)
 WITHOUT OIDS 
 TABLESPACE "Producao" 
 GO 
/* TABELA valor  */
DROP TABLE IF EXISTS valor;
CREATE TABLE Public.valor (
		id_empresa int4  NOT NULL  , 
		id_valor serial  NOT NULL  , 
		id_caracteristica int4  NOT NULL  , 
		id_ativo int4  NOT NULL  , 
		data_registro date  NOT NULL  , 
		valor varchar(30)  NOT NULL  , 
		PRIMARY KEY(id_empresa,id_ativo,id_valor,id_caracteristica) 
)
 WITHOUT OIDS 
 TABLESPACE "Producao" 
 GO 
/* TABELA caracteristica  */
DROP TABLE IF EXISTS caracteristica;
CREATE TABLE Public.caracteristica (
		id_empresa int4  NOT NULL  , 
		id_caracteristica int4  NOT NULL  , 
		tipo_ativo int4  NOT NULL  , 
		descricao varchar(50)  NOT NULL  , 
		PRIMARY KEY(id_empresa,id_caracteristica) 
)
 WITHOUT OIDS 
 TABLESPACE "Producao" 
 GO 
/* TRUNCATE TABLES */ 
TRUNCATE TABLE Public.empresas RESTART IDENTITY; 
GO 
TRUNCATE TABLE Public.usuarios RESTART IDENTITY; 
GO 
TRUNCATE TABLE Public.gruposusuarios RESTART IDENTITY; 
GO 
TRUNCATE TABLE Public.fornecedores RESTART IDENTITY; 
GO 
TRUNCATE TABLE Public.nfe RESTART IDENTITY; 
GO 
TRUNCATE TABLE Public.tipo_ativo RESTART IDENTITY; 
GO 
TRUNCATE TABLE Public.ativo RESTART IDENTITY; 
GO 
TRUNCATE TABLE Public.valor RESTART IDENTITY; 
GO 
TRUNCATE TABLE Public.caracteristica RESTART IDENTITY; 
GO 
/* Drop TABLES */ 
DROP TABLE IF EXISTS Public.empresas ; 
GO 
DROP TABLE IF EXISTS Public.usuarios ; 
GO 
DROP TABLE IF EXISTS Public.gruposusuarios ; 
GO 
DROP TABLE IF EXISTS Public.fornecedores ; 
GO 
DROP TABLE IF EXISTS Public.nfe ; 
GO 
DROP TABLE IF EXISTS Public.tipo_ativo ; 
GO 
DROP TABLE IF EXISTS Public.ativo ; 
GO 
DROP TABLE IF EXISTS Public.valor ; 
GO 
DROP TABLE IF EXISTS Public.caracteristica ; 
GO 
