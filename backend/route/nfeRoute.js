/* ROUTE nfe */
const db = require('../infra/database');
const express = require('express');
const router = express.Router(); 
const nfeSrv = require('../service/nfeService');

/* ROTA GETONE nfe */
router.get("/api/nfe/:id_empresa/:id_nfe/:id_fornecedor/:numero_nfe/:serie/:emissao",async function(req, res) {
try 
	{
		const lsLista = await nfeSrv.getNfe(req.params.id_empresa,req.params.id_nfe,req.params.id_fornecedor,req.params.numero_nfe,req.params.serie,req.params.emissao);
		if (lsLista == null) 
		{
			res.status(409).json({ message: 'Nfe Não Encontrada.' });
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
			res.status(500).json({ erro: 'BAK-END', tabela: 'nfe', message: err.message });
		}
	}
})

/* ROTA GETALL nfe */
router.get("/api/nfes",async function(req, res) {
try 
	{
		const lsLista = await nfeSrv.getNfes();
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
			res.status(500).json({ erro: 'BAK-END', tabela: 'nfe', message: err.message });
		}
	}
})

/* ROTA INSERT nfe */
router.post("/api/nfe",async function(req, res) {
try 
	{
		const nfe = req.body;
		const registro = await nfeSrv.insertNfe(nfe);
		if (registro == null)
		{
			res.status(409).json({ message: 'Nfe Cadastrado!' });
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
			res.status(500).json({ erro: 'BAK-END', tabela: 'Nfe', message: err.message });
		}
	}
})

/* ROTA UPDATE nfe */
router.put("/api/nfe",async function(req, res) {
try 
	{
		const nfe = req.body;
		const registro = await nfeSrv.updateNfe(nfe);
		if (registro == null)
		{
			res.status(409).json({ message: 'Nfe Alterado Com Sucesso!' });
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
			res.status(500).json({ erro: 'BAK-END', tabela: 'Nfe', message: err.message });
		}
	}
})

/* ROTA DELETE nfe */
router.delete("/api/nfe/:id_empresa/:id_nfe/:id_fornecedor/:numero_nfe/:serie/:emissao",async function(req, res) {
try 
	{
		await nfeSrv.deleteNfe(req.params.id_empresa,req.params.id_nfe,req.params.id_fornecedor,req.params.numero_nfe,req.params.serie,req.params.emissao);
		res.status(200).json({ message: 'Nfe Excluído Com Sucesso!' });
}
catch (err)
	{
		if(err.name == 'MyExceptionDB')
		{
			res.status(409).json(err);
		}
		else
		{
			res.status(500).json({ erro: 'BAK-END', tabela: 'Nfe', message: err.message });
		}
	}
})

/* ROTA CONSULTA POST nfe */
router.post("/api/nfes",async function(req, res) {
/*
	{
		"id_nfe":0, 
		"numero_nfe":0, 
		"forn_razao":"", 
		"data_compra":"", 
		"valor_total":, 
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
		const lsRegistros = await nfeSrv.getNfes(params);
		if (lsRegistros.length == 0)
		{
			res.status(409).json({ message: 'Nfe Nenhum Registro Encontrado!' });
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
			res.status(500).json({ erro: 'BAK-END', tabela: 'Nfe', message: err.message });
		}
	}
})

module.exports = router;
