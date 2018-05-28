//-----------------------------------------------------------------
// fpago_mysql
// implementa el acceso a la basde de datos mysql
//-----------------------------------------------------------------

var mysql = require('mysql');
var conector = require('../comun/conector_mysql');
var dbcfg = require("../../config/mysql_config.json");

// getFPago
// devuelve las formas de pago cuyo nombre coincide con el
// parcial pasado
module.exports.getFPago = function (parnom, callback) {
    var clientes = null
    var sql = "SELECT * from sforpa";
    sql += " WHERE true";
    sql += " AND tipforpa IN (0,2,3)"
    if (parnom) {
        sql += " AND nomforpa LIKE ?";
        sql = mysql.format(sql, ['%' + parnom + '%']);
    }
    sql += " order by nomforpa";
    var connection = conector.getConnectionConta();
    connection.query(sql, function (err, result) {
        conector.closeConnection(connection);
        if (err) {
            return callback(err, null);
        }
        if (result && (result.length > 0)) {
            clientes = result;
        }
        return callback(null, clientes);
    });

};

module.exports.getTFormaPago = function (parnom, callback) {
    var formasPago = null
    var sql = "SELECT * from tipofpago";
        sql += " WHERE true";
        sql += " AND tipoformapago IN (0,2,3,6)"
        if (parnom) {
            sql += " AND descformapago LIKE ?";
            sql = mysql.format(sql, ['%' + parnom + '%']);
        }
    sql += " order by tipoformapago";
    var connection = conector.getConnectionConta();
    connection.query(sql, function (err, result) {
        conector.closeConnection(connection);
        if (err) {
            return callback(err, null);
        }
        if (result && (result.length > 0)) {
            formasPago = result;
        }
        return callback(null, formasPago);
    });

};

