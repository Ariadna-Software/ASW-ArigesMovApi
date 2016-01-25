//-----------------------------------------------------------------
// trabajador_mysql
// implementa el acceso a la basde de datos mysql
//-----------------------------------------------------------------

var mysql = require('mysql');
var conector = require('../comun/conector_mysql');

// [export] getTrabajador
// 
module.exports.getTrabajador = function(login, callback){
    var trabajador = null;
    var sql = "SELECT"
    + " t.codtraba AS codtraba,"
    + " t.nomtraba AS nomtraba,"                
    + " t.login AS login,"
    + " a.codagent AS codagent,"
    + " a.nomagent AS nomagent"
    + " FROM straba AS t "
    + " LEFT JOIN sagent AS a ON a.codagent = t.codagent1"
    + " WHERE t.login = ?";
    sql = mysql.format(sql,login);
    var connection = conector.getConnectionAriges();
    connection.query(sql, function(err, result){
        if (err){
            callback(err, null);
            conector.closeConnection(connection);
            return;
        }
        if (result && (result.length > 0)){
            trabajador = result[0];
        }
        callback(null, trabajador);
        conector.closeConnection(connection);
    });

};

