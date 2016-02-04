var express = require('express');
var router = express.Router();
var facturasMysql = require('./facturas_mysql');

// Devuelve todas las facturas de un cliente determinado
router.get('/cliente/:codclien', function(req, res) {
    var codclien = req.params.codclien;
    if (codclien) {
        facturasMysql.getFacturasCliente(codclien, function(err, facturas) {
            if (err) {
                res.status(500).send(err.message);
            }
            res.json(facturas)
        });
    } else {
        res.status(400).send('Formato de la petición incorrecto');
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
        res.json(facturas[0]);
    })
});

//
module.exports = router;
