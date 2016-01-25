var mysql = require('mysql');
var conector = require('../comun/conector_mysql');

module.exports.getCobros = function(codmacta, callback) {
    var cobros = null;
    var sql = "SELECT";
    sql += " fecvenci AS fechavenci,";
    sql += " numserie as numserie,";
    sql += " codfaccl as codfaccl,";
    sql += " numorden as numorden,";
    sql += " CONCAT(numserie,RIGHT(CONCAT('00000000',CAST(codfaccl AS CHAR)),7)) AS numfact,";
    sql += " fecfaccl AS fechafact,";
    sql += " scobro.codforpa AS codforpa,";
    sql += " nomforpa AS nomforpa,";
    sql += " impcobro AS impcobro,";
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
        if (result) {
            cobros = result;
        }
        callback(null, cobros);
        conector.closeConnection(connection);
    });
};

module.exports.putCobro = function(pago, callback){
    var sql = "UPDATE scobro SET ? WHERE numserie = ? AND codfaccl = ? AND fecfaccl = ? AND numorden = ?";
    sql = mysql.format(sql, [pago, pago.numserie, pago.codfaccl, pago.fecfaccl, pago.numorden]);
    var connection = conector.getConnectionConta();
    connection.query(sql, function(err, result) {
        if (err) {
            callback(err, null);
            conector.closeConnection(connection);
            return;
        }
        callback(null, pago);
        conector.closeConnection(connection);
    });
};
