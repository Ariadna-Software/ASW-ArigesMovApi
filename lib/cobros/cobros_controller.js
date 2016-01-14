var express = require('express');
var router = express.Router();
var cobrosMysql = require('./cobros_mysql');

router.get('/', function(req, res) {
    query = req.query;
    if (query.codmacta) {
        cobrosMysql.getCobros(query.codmacta, function(err, cobros) {
            if (err) {
                res.status(500).send(err.message);
            }
            if (cobros) {
                res.json(cobros)
            } else {
                res.status(404).send('No se han encontrado cobros para la cuenta');
            }
        });
    } else {
        res.status(400).send('Formato de la petición incorrecto');
    }

});



// Exports
module.exports = router;
