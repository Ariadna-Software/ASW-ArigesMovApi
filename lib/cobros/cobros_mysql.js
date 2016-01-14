var mysql = require('mysql');
var conector = require('../comun/conector_mysql');

module.exports.getCobros = function(codmacta, callback) {
    var cobros = null;
    var sql = "SELECT";
    sql += " fecvenci AS fechavenci,";
    sql += " CONCAT(numserie,RIGHT(CONCAT('00000000',CAST(codfaccl AS CHAR)),7)) AS numfact,";
    sql += " fecfaccl AS fechafact,";
    sql += " nomforpa AS nomforpa,";
    sql += " impvenci+IF(gastos IS NULL,0,gastos)-IF(impcobro IS NULL,0,impcobro) AS total";
    sql += " FROM  scobro";
    sql += " INNER JOIN sforpa ON scobro.codforpa=sforpa.codforpa";
    sql += " WHERE scobro.codmacta = ?";
    sql += " AND impvenci+IF(gastos IS NULL,0,gastos)-IF(impcobro IS NULL,0,impcobro) <> 0";
    sql += " ORDER BY fecvenci";
    sql = mysql.format(sql, codmacta);
    var connection = conector.getConnectionConta();
    connection.query(sql, function(err, result) {
        if (err) {
            callback(err, null);
            closeConnection(connection);
            return;
        }
        if (result && (result.length > 0)) {
            cobros = result;
        }
        callback(null, cobros);
        conector.closeConnection(connection);
    });
};
