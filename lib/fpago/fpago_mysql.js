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
    sql += " WHERE true";
    sql += " AND tipforpa IN (0,2,3)"
    if (parnom) {
        sql += " AND nomforpa LIKE ?";
        sql = mysql.format(sql, ['%' + parnom + '%']);
    }
    sql += " order by nomforpa";
    var connection = conector.getConnectionConta();
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

