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
        if (agente == 'null') agente = null;
        clientesAgenteMysql.getClientesAgente(query.parnom, agente, porNomComer, function(err, clientesAgente) {
            if (err) {
                return res.status(500).send(err.message);
            }
            if (clientesAgente) {
                return res.json(clientesAgente)
            } else {
                return res.status(404).send('No se han encontrado clientes con esos criterios');
            }
        });
    } else {
        return res.status(400).send('Formato de la petición incorrecto');
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
            return res.json(clientes[0]);
        });
    } else {
        return res.status(400).send('Formato de la petición incorrecto');
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
            return res.json(datos);
        });
    } else {
        return res.status(400).send('Formato de la petición incorrecto');
    }
});

router.get('/clientes-agente/ext', function(req, res) {
    // confirmar que se han recibido correctamente los parámetros
    // parnom: Nombre parcial de los clientes buscados
    // agente: Agente del que se quieren los clientes
    query = req.query;
    if (query.parnom) {
        var agente = null || query.agente;
        var porNomComer = false || query.porNomComer;
        if (agente == 'null') agente = null;
        clientesAgenteMysql.getClientesAgenteExt(query.parnom, agente, porNomComer, function(err, clientesAgente) {
            if (err) {
                return res.status(500).send(err.message);
            }
            if (clientesAgente) {
                return res.json(clientesAgente)
            } else {
                return res.status(404).send('No se han encontrado clientes con esos criterios');
            }
        });
    } else {
        return res.status(400).send('Formato de la petición incorrecto');
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
        return res.json(cliente)
    });
});


// Exports
module.exports = router;