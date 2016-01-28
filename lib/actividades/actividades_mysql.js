//-----------------------------------------------------------------
// familias_mysql
// implementa el acceso a la basde de datos mysql
//-----------------------------------------------------------------

var mysql = require('mysql');
var conector = require('../comun/conector_mysql');

// getActividades
// devuelve las actividades cuyo nombre coincide con el
// parcial pasado
module.exports.getActividades = function (parnom, callback) {
    var clientes = null
    var sql = "SELECT * from sactiv";
    sql += " WHERE nomactiv LIKE ?";
    sql += " order by nomactiv";
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

