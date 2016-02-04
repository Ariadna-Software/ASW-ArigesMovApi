var express = require('express');
var router = express.Router();
var clientesAgenteMysql = require('./clientes-agente_mysql');

router.get('/clientes-agente', function(req, res) {
    // confirmar que se han recibido correctamente los parámetros
    // parnom: Nombre parcial de los clientes buscados
    // agente: Agente del que se quieren los clientes
    query = req.query;
    if (query.parnom) {
        var agente = null || query.agente;
        var porNomComer = false || query.porNomComer;
        clientesAgenteMysql.getClientesAgente(query.parnom, agente, porNomComer, function(err, clientesAgente) {
            if (err) {
                res.status(500).send(err.message);
            }
            if (clientesAgente) {
                res.json(clientesAgente)
            } else {
                res.status(404).send('No se han encontrado clientes con esos criterios');
            }
        });
    } else {
        res.status(400).send('Formato de la petición incorrecto');
    }
});


// Exports
module.exports = router;