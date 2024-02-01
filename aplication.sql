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
		codigo serial  NOT NULL  , 
		descricao varchar(40)  NOT NULL  , 
		user_insert int4  NOT NULL  , 
		user_update int4  NOT NULL  , 
		PRIMARY KEY(id_empresa,codigo) 
)
 WITHOUT OIDS 
 TABLESPACE "Producao" 
 GO 
/* TABELA imobilizados  */
DROP TABLE IF EXISTS imobilizados;
CREATE TABLE Public.imobilizados (
		id_imobilizado serial  NOT NULL  , 
		id_nfe int4  NOT NULL  , 
		tipo_produto int4  NOT NULL  , 
		modulo varchar(50)  NOT NULL  , 
		hd int4  NOT NULL  , 
		processador varchar(10)  NOT NULL  , 
		tela numeric(5,0)  NOT NULL  , 
		etiqueta int4  NOT NULL  , 
		id_usuario int4  NOT NULL  , 
		id_empresa int4  NOT NULL  , 
		ssd int4  NOT NULL  , 
		ram int4  NOT NULL  , 
		sistema_operacional varchar(50)  NOT NULL  , 
		nome_software varchar(50)  NOT NULL  , 
		versao_software varchar(10)  NOT NULL  , 
		fabricante_software varchar(50)  NOT NULL  , 
		chave_licenca_software varchar(50)  NOT NULL  , 
		data_instalacao_software date  NOT NULL  , 
		data_aquisicao int4  NOT NULL  , 
		valor_aquisicao numeric(15,2)  NOT NULL  , 
		localizacao_atual varchar(30)  NOT NULL  , 
		estado_atual varchar(30)  NOT NULL  , 
		PRIMARY KEY(id_imobilizado,id_empresa) 
)
 WITHOUT OIDS 
 TABLESPACE "Producao" 
 GO 
/* TABELA fornecedores  */
DROP TABLE IF EXISTS fornecedores;
CREATE TABLE Public.fornecedores (
		id_fornecedor serial  NOT NULL  , 
		cnpj_cpf char(14)  NOT NULL  , 
		razao varchar(50)  NOT NULL  , 
		PRIMARY KEY(id_fornecedor,id_empresa) 
)
 WITHOUT OIDS 
 TABLESPACE "Producao" 
 GO 
/* TABELA nfe  */
DROP TABLE IF EXISTS nfe;
CREATE TABLE Public.nfe (
		id_nfe serial  NOT NULL  , 
		id_empresa int4  NOT NULL  , 
		numero_nfe int4  NOT NULL  , 
		emissao date  NOT NULL  , 
		descricao varchar(255)  NOT NULL  , 
		fornecedor varchar(100)  NOT NULL  , 
		serie varchar(50)  NOT NULL  , 
		data_compra date  NOT NULL  , 
		chave_eletronica int4  NOT NULL  , 
		condicao_pagamento varchar(30)  NOT NULL  , 
		observacao varchar(255)  NOT NULL  , 
		código_item int4  NOT NULL  , 
		valor_total numeric(15,2)  NOT NULL  , 
		PRIMARY KEY(id_nfe,id_empresa) 
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
TRUNCATE TABLE Public.imobilizados RESTART IDENTITY; 
GO 
TRUNCATE TABLE Public.fornecedores RESTART IDENTITY; 
GO 
TRUNCATE TABLE Public.nfe RESTART IDENTITY; 
GO 
/* Drop TABLES */ 
DROP TABLE IF EXISTS Public.empresas ; 
GO 
DROP TABLE IF EXISTS Public.usuarios ; 
GO 
DROP TABLE IF EXISTS Public.gruposusuarios ; 
GO 
DROP TABLE IF EXISTS Public.imobilizados ; 
GO 
DROP TABLE IF EXISTS Public.fornecedores ; 
GO 
DROP TABLE IF EXISTS Public.nfe ; 
GO 
