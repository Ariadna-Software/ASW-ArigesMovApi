var express = require('express');
var router = express.Router();
var clientesAgenteMysql = require('./clientes-agente_mysql');
var clientesMysql = require('./clientes_mysql');

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

router.get('/:codclien', function (req, res) {
    if (!req.params.codclien) {
        return res.status(500).send("Formato de la petición incorrecto");
    }
    var codclien = req.params.codclien;
    if (codclien) {
        clientesMysql.getCliente(codclien, function (err, clientes) {
            if (err) {
                return res.status(500).send(err.message);
            }
            if (clientes.length == 0){
                return res.status(404).send('Cliente no encontrado');
            }
            res.json(clientes[0]);
        });
    } else {
        res.status(400).send('Formato de la petición incorrecto');
    }
});

router.get('/vanual/:codclien', function (req, res) {
    if (!req.params.codclien) {
        return res.status(500).send("Formato de la petición incorrecto");
    }
    var codclien = req.params.codclien;
    if (codclien) {
        clientesMysql.getVentaAnual(codclien, function (err, datos) {
            if (err) {
                return res.status(500).send(err.message);
            }
            res.json(datos);
        });
    } else {
        res.status(400).send('Formato de la petición incorrecto');
    }
});

router.put('/', function (req, res) {
    if (!req.body) {
        return res.status(500).send("Formato de la petición incorrecto");
    }    
    clientesMysql.putCliente(req.body, function (err, cliente) {
        if (err) {
            return res.status(500).send(err.message);
        }
        res.json(cliente)
    });
});


// Exports
module.exports = router;