var express = require('express');
var router = express.Router();
var trabajadorMysql = require('./trabajador_mysql');

router.get('/', function(req, res) {
    // confirmar que se han recibido correctamente los parámetros
    // login: identificador del trabajador para el login
    // password: password asignada
    query = req.query;
    if (query.login) {
        trabajadorMysql.getTrabajador(query.login, function(err, trabajador) {
            if (err) {
                return res.status(500).send(err.message);
            }
            if (trabajador) {
                return res.json(trabajador)
            } else {
                return res.status(404).send('Trabajador no encontrado');
            }
        });
    } else {
        return res.status(400).send('Formato de la petición incorrecto');
    }
});

// Exports
module.exports = router;
