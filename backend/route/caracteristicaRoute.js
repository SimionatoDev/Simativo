/* ROUTE caracteristica */
const db = require('../infra/database');
const express = require('express');
const router = express.Router(); 
const caracteristicaSrv = require('../service/caracteristicaService');

/* ROTA GETONE caracteristica */
router.get("/api/caracteristica/:id_empresa/:id_caracteristica",async function(req, res) {
try 
	{
		const lsLista = await caracteristicaSrv.getCaracteristica(req.params.id_empresa,req.params.id_caracteristica);
		if (lsLista == null) 
		{
			res.status(409).json({ message: 'Caracteristica Não Encontrada.' });
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
			res.status(500).json({ erro: 'BAK-END', tabela: 'caracteristica', message: err.message });
		}
	}
})

/* ROTA GETALL caracteristica */
router.get("/api/caracteristicas",async function(req, res) {
try 
	{
		const lsLista = await caracteristicaSrv.getCaracteristicas();
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
			res.status(500).json({ erro: 'BAK-END', tabela: 'caracteristica', message: err.message });
		}
	}
})

/* ROTA INSERT caracteristica */
router.post("/api/caracteristica",async function(req, res) {
try 
	{
		const caracteristica = req.body;
		const registro = await caracteristicaSrv.insertCaracteristica(caracteristica);
		if (registro == null)
		{
			res.status(409).json({ message: 'Caracteristica Cadastrado!' });
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
			res.status(500).json({ erro: 'BAK-END', tabela: 'Caracteristica', message: err.message });
		}
	}
})

/* ROTA UPDATE caracteristica */
router.put("/api/caracteristica",async function(req, res) {
try 
	{
		const caracteristica = req.body;
		const registro = await caracteristicaSrv.updateCaracteristica(caracteristica);
		if (registro == null)
		{
			res.status(409).json({ message: 'Caracteristica Alterado Com Sucesso!' });
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
			res.status(500).json({ erro: 'BAK-END', tabela: 'Caracteristica', message: err.message });
		}
	}
})

/* ROTA DELETE caracteristica */
router.delete("/api/caracteristica/:id_empresa/:id_caracteristica",async function(req, res) {
try 
	{
		await caracteristicaSrv.deleteCaracteristica(req.params.id_empresa,req.params.id_caracteristica);
		res.status(200).json({ message: 'Caracteristica Excluído Com Sucesso!' });
}
catch (err)
	{
		if(err.name == 'MyExceptionDB')
		{
			res.status(409).json(err);
		}
		else
		{
			res.status(500).json({ erro: 'BAK-END', tabela: 'Caracteristica', message: err.message });
		}
	}
})

/* ROTA CONSULTA POST caracteristica */
router.post("/api/caracteristicas",async function(req, res) {
/*
	{
		"id_empresa":0, 
		"id_caracteristica":0, 
		"descricao":"0", 
		"tipo_ativo":0, 
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
		const lsRegistros = await caracteristicaSrv.getCaracteristicas(params);
		if (lsRegistros.length == 0)
		{
			res.status(409).json({ message: 'Caracteristica Nenhum Registro Encontrado!' });
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
			res.status(500).json({ erro: 'BAK-END', tabela: 'Caracteristica', message: err.message });
		}
	}
})

module.exports = router;
