//-----------------------------------------------------------------
// usuario_mysql
// implementa el acceso a la basde de datos mysql
//-----------------------------------------------------------------

var mysql = require('mysql');
var conector = require('../comun/conector_mysql');
var config = require('../../config/mysql_config.json');


// [export] getLogin
// 
module.exports.getLogin = function (login, password, callback) {
    var usuario = null;
    var sql = "SELECT u.*, ua.*, a.*, t.*, sp.tipodtos";
    sql += " FROM usuarios AS u";
    sql += " LEFT JOIN empresasariges AS ua ON ua.ariges = '" + config.database_ariges + "'";
    sql += " LEFT JOIN " + config.database_ariges + ".straba AS t ON t.login = u.login";
    sql += " LEFT JOIN " + config.database_ariges + ".sagent AS a ON a.codagent = t.codagent1";
    sql += " LEFT JOIN " + config.database_ariges + ".spara1 AS sp ON 1=1";
    sql += " WHERE u.login = ? AND u.passwordpropio = ?";
    sql = mysql.format(sql, [login, password]);
    var connection = conector.getConnectionUsuarios();
    connection.query(sql, function (err, result) {
        conector.closeConnection(connection);
        if (err) {
            return callback(err, null);
        }
        if (result && (result.length > 0)) {
            usuario = result[0];
        }
        return callback(null, usuario);
    });

};

