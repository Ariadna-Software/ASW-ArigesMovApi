//-----------------------------------------------------------------
// fpago_mysql
// implementa el acceso a la basde de datos mysql
//-----------------------------------------------------------------

var mysql = require('mysql');
var conector = require('../comun/conector_mysql');

// getFPago
// devuelve las formas de pago cuyo nombre coincide con el
// parcial pasado
module.exports.getFPago = function (parnom, callback) {
    var clientes = null
    var sql = "SELECT * from sforpa";
    sql += " WHERE nomforpa LIKE ?";
    sql += " order by nomforpa";
    sql = mysql.format(sql, ['%' + parnom + '%']);
    var connection = conector.getConnectionAriges();
    connection.query(sql, function (err, result) {
        if (err) {
            callback(err, null);
            conector.closeConnection(connection);
            return;
        }
        if (result && (result.length > 0)) {
            clientes = result;
        }
        callback(null, clientes);
        conector.closeConnection(connection);
    });

};

