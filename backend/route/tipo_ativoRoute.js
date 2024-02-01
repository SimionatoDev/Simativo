/* ROUTE tipo_ativo */
const db = require('../infra/database');
const express = require('express');
const router = express.Router(); 
const tipo_ativoSrv = require('../service/tipo_ativoService');

/* ROTA GETONE tipo_ativo */
router.get("/api/tipo_ativo/:id_empresa/:tipo_ativo",async function(req, res) {
try 
	{
		const lsLista = await tipo_ativoSrv.getTipo_Ativo(req.params.id_empresa,req.params.tipo_ativo);
		if (lsLista == null) 
		{
			res.status(409).json({ message: 'Tipo_Ativo Não Encontrada.' });
		}
	else
		{
			res.status(200).json(lsLista);
		}
	}
catch (err)
	{
		if(err.name == 'MyExceptionDB')
		{
			res.status(409).json(err);
		}
		else
		{
			res.status(500).json({ erro: 'BAK-END', tabela: 'tipo_ativo', message: err.message });
		}
	}
})

/* ROTA GETALL tipo_ativo */
router.get("/api/tipos_ativos",async function(req, res) {
try 
	{
		const lsLista = await tipo_ativoSrv.getTipos_Ativos();
		if (lsLista.length == 0) 
		{
			res.status(409).json({ message: 'Nehuma Informação Para Esta Consulta.'} );
		}
	else
		{
			res.status(200).json(lsLista);
		}
	}
catch (err)
	{
		if(err.name == 'MyExceptionDB')
		{
			res.status(409).json(err);
		}
		else
		{
			res.status(500).json({ erro: 'BAK-END', tabela: 'tipo_ativo', message: err.message });
		}
	}
})

/* ROTA INSERT tipo_ativo */
router.post("/api/tipo_ativo",async function(req, res) {
try 
	{
		const tipo_ativo = req.body;
		const registro = await tipo_ativoSrv.insertTipo_Ativo(tipo_ativo);
		if (registro == null)
		{
			res.status(409).json({ message: 'Tipo_Ativo Cadastrado!' });
		}
		else
		{
			res.status(200).json(registro);
		}
}
catch (err)
	{
		if(err.name == 'MyExceptionDB')
		{
			res.status(409).json(err);
		}
		else
		{
			res.status(500).json({ erro: 'BAK-END', tabela: 'Tipo_Ativo', message: err.message });
		}
	}
})

/* ROTA UPDATE tipo_ativo */
router.put("/api/tipo_ativo",async function(req, res) {
try 
	{
		const tipo_ativo = req.body;
		const registro = await tipo_ativoSrv.updateTipo_Ativo(tipo_ativo);
		if (registro == null)
		{
			res.status(409).json({ message: 'Tipo_Ativo Alterado Com Sucesso!' });
		}
		else
		{
			res.status(200).json(registro);
		}
}
catch (err)
	{
		if(err.name == 'MyExceptionDB')
		{
			res.status(409).json(err);
		}
		else
		{
			res.status(500).json({ erro: 'BAK-END', tabela: 'Tipo_Ativo', message: err.message });
		}
	}
})

/* ROTA DELETE tipo_ativo */
router.delete("/api/tipo_ativo/:id_empresa/:tipo_ativo",async function(req, res) {
try 
	{
		await tipo_ativoSrv.deleteTipo_Ativo(req.params.id_empresa,req.params.tipo_ativo);
		res.status(200).json({ message: 'Tipo_Ativo Excluído Com Sucesso!' });
}
catch (err)
	{
		if(err.name == 'MyExceptionDB')
		{
			res.status(409).json(err);
		}
		else
		{
			res.status(500).json({ erro: 'BAK-END', tabela: 'Tipo_Ativo', message: err.message });
		}
	}
})

/* ROTA CONSULTA POST tipo_ativo */
router.post("/api/tipos_ativos",async function(req, res) {
/*
	{
		"id_empresa":0, 
		"tipo_ativo":0, 
		"descricao":"0", 
		"pagina":0, 
		"tamPagina":50, 
		"contador":"N", 
		"orderby":"", 
		"sharp":false 
	}
*/
try 
	{
		const params = req.body;
		const lsRegistros = await tipo_ativoSrv.getTipos_Ativos(params);
		if (lsRegistros.length == 0)
		{
			res.status(409).json({ message: 'Tipo_Ativo Nenhum Registro Encontrado!' });
		}
		else
		{
			res.status(200).json(lsRegistros);
		}
}
catch (err)
	{
		if(err.name == 'MyExceptionDB')
		{
			res.status(409).json(err);
		}
		else
		{
			res.status(500).json({ erro: 'BAK-END', tabela: 'Tipo_Ativo', message: err.message });
		}
	}
})

module.exports = router;
