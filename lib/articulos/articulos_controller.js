var express = require('express');
var router = express.Router();
var articulosMysql = require('./articulos_mysql');

router.get('/', function(req, res) {
    // confirmar que se han recibido correctamente los parámetros
    // parnom: Nombre parcial de los clientes buscados
    // agente: Agente del que se quieren los clientes
    query = req.query;
    if (query.parnom) {
        articulosMysql.getArticulos(query.parnom, function(err, articulos) {
            if (err) {
                res.status(500).send(err.message);
            }
            if (articulos) {
                res.json(articulos)
            } else {
                res.status(404).send('No se han encontrado articulos con esos criterios');
            }
        });
    } else {
        res.status(400).send('Formato de la petición incorrecto');
    }
});

router.get('/cliente', function(req, res){
    // Ahora buscamos artículos con relación a un cliente para obtener los precios que le
    // son aplicables
    query = req.query;
    if (query.parnom && query.codclien && query.codtarif) {
        articulosMysql.getArticulosCliente(query.parnom, query.codclien, query.codtarif, function(err, articulos) {
            if (err) {
                res.status(500).send(err.message);
            }
            if (articulos) {
                res.json(articulos)
            } else {
                res.status(404).send('No se han encontrado articulos con esos criterios');
            }
        });
    } else {
        res.status(400).send('Formato de la petición incorrecto');
    }
    
});


// Exports
module.exports = router;