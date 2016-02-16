var express = require('express');
var router = express.Router();
var actividadesMysql = require('./actividades_mysql');

router.get('/', function(req, res) {
    // confirmar que se han recibido correctamente los parámetros
    // parnom: Nombre parcial de las actividades buscadas
    var query = req.query;
    if (query.parnom) {
        actividadesMysql.getActividades(query.parnom, function(err, actividades) {
            if (err) {
                return res.status(500).send(err.message);
            }
            if (actividades) {
                return res.json(actividades)
            } else {
                return res.status(404).send('No se han encontrado actividades con esos criterios');
            }
        });
    } else {
        return res.status(400).send('Formato de la petición incorrecto');
    }
});


// Exports
module.exports = router;