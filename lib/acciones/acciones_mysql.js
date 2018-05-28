var mysql = require('mysql');
var conector = require('../comun/conector_mysql');

// getAcciones
//devuelve todas las acciones con el tipo >= a 21

module.exports.getAcciones = function (tipo, callback) {
    var acciones = null
    var sql = "SELECT ac.*, tip.denominacion AS denominacion FROM scrmacciones AS ac";
    sql += " LEFT JOIN scrmtipo AS tip ON tip.codigo = ac.tipo";
    sql += " WHERE tipo >=  ?";
    sql = mysql.format(sql, tipo);
    var connection = conector.getConnectionAriges();
    connection.query(sql, function (err, result) {
        conector.closeConnection(connection);
        if (err) {
            return callback(err, null);
        }
        if (result && (result.length > 0)) {
            acciones = result;
        }
        callback(null, acciones );
    });

};