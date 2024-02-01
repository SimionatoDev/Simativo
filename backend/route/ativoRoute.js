/* ROUTE ativo */
const db = require('../infra/database');
const express = require('express');
const router = express.Router(); 
const ativoSrv = require('../service/ativoService');

/* ROTA GETONE ativo */
router.get("/api/ativo/:id_ativo/:id_empresa/:etiqueta",async function(req, res) {
try 
	{
		const lsLista = await ativoSrv.getAtivo(req.params.id_ativo,req.params.id_empresa,req.params.etiqueta);
		if (lsLista == null) 
		{
			res.status(409).json({ message: 'Ativo Não Encontrada.' });
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
			res.status(500).json({ erro: 'BAK-END', tabela: 'ativo', message: err.message });
		}
	}
})

/* ROTA GETALL ativo */
router.get("/api/ativos",async function(req, res) {
try 
	{
		const lsLista = await ativoSrv.getAtivos();
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
			res.status(500).json({ erro: 'BAK-END', tabela: 'ativo', message: err.message });
		}
	}
})

/* ROTA INSERT ativo */
router.post("/api/ativo",async function(req, res) {
try 
	{
		const ativo = req.body;
		const registro = await ativoSrv.insertAtivo(ativo);
		if (registro == null)
		{
			res.status(409).json({ message: 'Ativo Cadastrado!' });
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
			res.status(500).json({ erro: 'BAK-END', tabela: 'Ativo', message: err.message });
		}
	}
})

/* ROTA UPDATE ativo */
router.put("/api/ativo",async function(req, res) {
try 
	{
		const ativo = req.body;
		const registro = await ativoSrv.updateAtivo(ativo);
		if (registro == null)
		{
			res.status(409).json({ message: 'Ativo Alterado Com Sucesso!' });
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
			res.status(500).json({ erro: 'BAK-END', tabela: 'Ativo', message: err.message });
		}
	}
})

/* ROTA DELETE ativo */
router.delete("/api/ativo/:id_ativo/:id_empresa/:etiqueta",async function(req, res) {
try 
	{
		await ativoSrv.deleteAtivo(req.params.id_ativo,req.params.id_empresa,req.params.etiqueta);
		res.status(200).json({ message: 'Ativo Excluído Com Sucesso!' });
}
catch (err)
	{
		if(err.name == 'MyExceptionDB')
		{
			res.status(409).json(err);
		}
		else
		{
			res.status(500).json({ erro: 'BAK-END', tabela: 'Ativo', message: err.message });
		}
	}
})

/* ROTA CONSULTA POST ativo */
router.post("/api/ativos",async function(req, res) {
/*
	{
		"id_ativo":0, 
		"tipo_ativo":, 
		"id_usuario":, 
		"descricao":"", 
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
		const lsRegistros = await ativoSrv.getAtivos(params);
		if (lsRegistros.length == 0)
		{
			res.status(409).json({ message: 'Ativo Nenhum Registro Encontrado!' });
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
			res.status(500).json({ erro: 'BAK-END', tabela: 'Ativo', message: err.message });
		}
	}
})

module.exports = router;
