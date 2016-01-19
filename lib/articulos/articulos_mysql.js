//-----------------------------------------------------------------
// clientes-agente_mysql
// implementa el acceso a la basde de datos mysql
//-----------------------------------------------------------------

var mysql = require('mysql');
var conector = require('../comun/conector_mysql');

// [export] getTrabajador
// 
module.exports.getArticulos = function(parnom, callback) {
    var clientes = null;
    var sql = "SELECT"
    sql += " codartic AS codartic,";
    sql += " nomartic AS nomartic,";
    sql += " preciove AS preciove,";
    sql += " codfamia AS codfamia,";
    sql += " codmarca AS codmarca";
    sql += " FROM sartic"
    sql += " WHERE nomartic LIKE ?"
    sql += " AND  codstatu <> 1"
    sql += " ORDER BY nomartic"
    sql = mysql.format(sql, ['%' + parnom + '%']);
    var connection = conector.getConnectionAriges();
    connection.query(sql, function(err, result) {
        if (err) {
            callback(err, null);
            closeConnection(connection);
            return;
        }
        if (result && (result.length > 0)) {
            clientes = result;
        }
        callback(null, clientes);
        conector.closeConnection(connection);
    });

};
