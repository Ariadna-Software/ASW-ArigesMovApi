var express = require('express');
var router = express.Router();
var articulosMysql = require('./articulos_mysql');

router.get('/', function(req, res) {
    // confirmar que se han recibido correctamente los parámetros
    // parnom: Nombre parcial de los clientes buscados
    // agente: Agente del que se quieren los clientes
    var query = req.query;
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

router.get('/ext', function(req, res) {
    // confirmar que se han recibido correctamente los parámetros
    var query = req.query;
    if (query.parnom || query.parpro || query.parfam || query.codigo || query.obsole) {
        articulosMysql.getArticulosExt(query.parnom, query.parpro, query.parfam, query.codigo, query.obsole, function(err, articulos) {
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

router.get('/precios-especiales', function(req, res) {
    // confirmar que se han recibido correctamente los parámetros
    var query = req.query;
    if (query.codclien) {
        articulosMysql.getArticulosPreciosEspeciales(query.codclien, function(err, articulos) {
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

router.get('/descuentos-especiales', function(req, res) {
    // confirmar que se han recibido correctamente los parámetros
    var query = req.query;
    if (query.codclien) {
        articulosMysql.getArticulosDescuentosEspeciales(query.codclien, function(err, articulos) {
            if (err) {
                res.status(500).send(err.message);
            }
            if (articulos) {
                res.json(articulos)
            } else {
                res.status(404).send('No se han encontrado familias con esos criterios');
            }
        });
    } else {
        res.status(400).send('Formato de la petición incorrecto');
    }
});

router.get('/cliente', function(req, res){
    // Ahora buscamos artículos con relación a un cliente para obtener los precios que le
    // son aplicables
    var query = req.query;
    if (query.parnom && query.codclien && query.codtarif && query.codactiv) {
        articulosMysql.getArticulosCliente(query.parnom, query.codclien, query.codtarif, query.codativ, function(err, articulos) {
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