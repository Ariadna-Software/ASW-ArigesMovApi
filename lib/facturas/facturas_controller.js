var express = require('express');
var router = express.Router();
var facturasMysql = require('./facturas_mysql');
var rp = require('request-promise');
var cfg = require("../../config/config.json");
var dbcfg = require("../../config/mysql_config.json");

// Devuelve todas las facturas de un cliente determinado
router.get('/cliente/:codclien', function(req, res) {
    var codclien = req.params.codclien;
    if (codclien) {
        facturasMysql.getFacturasCliente(codclien, function(err, facturas) {
            if (err) {
                return res.status(500).send(err.message);
            }
            return res.json(facturas)
        });
    } else {
        return res.status(400).send('Formato de la petición incorrecto');
    }
});

// Devuelve todas las facturas de un cliente determinado con las observaciones
router.get('/cliente/comentarios/:codclien', function(req, res) {
    var codclien = req.params.codclien;
    if (codclien) {
        facturasMysql.getFacturasClienteComentarios(codclien, function(err, facturas) {
            if (err) {
                return res.status(500).send(err.message);
            }
            return res.json(facturas)
        });
    } else {
        return res.status(400).send('Formato de la petición incorrecto');
    }
});

// Devuelve una factura individual
router.get('/facserie', function(req, res){
    // obtención de los parámetros de llamada
    var numserie = req.query.numserie;
    var cabfaccl = req.query.cabfaccl;
    var fecfaccl = req.query.fecfaccl;
    // control de que tenemos todo lo que necesitamos
    if (!numserie || !cabfaccl || !fecfaccl){
        return res.status(400).send('Formato de la petición incorrecto');
    }
    facturasMysql.getFacturaNumserie(numserie, cabfaccl, fecfaccl, function(err, facturas){
        if (err){
            return res.status(500).send(err.message);
        }
        if (facturas.length == 0){
            return res.status(404).send('No hay factura con estos criterios');
        }
        return res.json(facturas[0]);
    })
});

router.post('/enviar-s2', async (req, res) => {
    try {
        if (!req.body) {
            return res.status(400).send(new Error('Falta un cuerpo con información en el mensaje'));
        }
        if (!req.body.clave || !req.body.email) {
            return res.status(400).send(new Error('Debe incluir la clave y el correo en la solicitud del mensaje'));
        }
        var url = cfg.docUrl + '/intercambio';
        var sistema = dbcfg.database_ariges;
        var tipo = "FAC";
        var clave = req.body.clave;
        var email = req.body.email;
        var options = {
            method: 'POST',
            uri: url,
            body: {
                sistema,
                tipo,
                clave,
                email
            },
            json: true // Automatically stringifies the body to JSON
        };
        var respuesta = await rp(options);
        res.json(respuesta);
    } catch (error) {
        return res.status(500).send(error);
    }
});


//
module.exports = router;
