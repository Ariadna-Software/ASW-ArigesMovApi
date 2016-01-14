//-----------------------------------------------------------------
// usuario_mysql
// implementa el acceso a la basde de datos mysql
//-----------------------------------------------------------------

var mysql = require('mysql');
var conector = require('../comun/conector_mysql');


// [export] getLogin
// 
module.exports.getLogin = function(login, password, callback){
    var usuario = null;
    var sql = "SELECT * FROM usuarios WHERE login = ? AND passwordpropio = ?";
    sql = mysql.format(sql,[login, password]);
    var connection = conector.getConnectionUsuarios();
    connection.query(sql, function(err, result){
        if (err){
            callback(err, null);
            closeConnection(connection);
            return;
        }
        if (result && (result.length > 0)){
            usuario = result[0];
        }
        callback(null, usuario);
        conector.closeConnection(connection);
    });

};

