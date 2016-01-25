var express = require('express');
var router = express.Router();
var proveedoresMysql = require('./proveedores_mysql');

router.get('/', function(req, res) {
    // confirmar que se han recibido correctamente los parámetros
    // parnom: Nombre parcial de los proveedores buscados
    var query = req.query;
    if (query.parnom) {
        proveedoresMysql.getProveedores(query.parnom, function(err, proveedores) {
            if (err) {
                res.status(500).send(err.message);
            }
            if (proveedores) {
                res.json(proveedores)
            } else {
                res.status(404).send('No se han encontrado provedores con esos criterios');
            }
        });
    } else {
        res.status(400).send('Formato de la petición incorrecto');
    }
});

router.get('/descuentos-rappeles/', function(req, res) {
    // confirmar que se han recibido correctamente los parámetros
    // parnom: Nombre parcial de los proveedores buscados
    var query = req.query;
    if (query.codprove) {
        proveedoresMysql.getDescuentosRappeles(query.codprove, function(err, proveedores) {
            if (err) {
                res.status(500).send(err.message);
            }
            if (proveedores) {
                res.json(proveedores)
            } else {
                res.status(404).send('No se han encontrado descuentos para este proveedor');
            }
        });
    } else {
        res.status(400).send('Formato de la petición incorrecto');
    }
});


// Exports
module.exports = router;