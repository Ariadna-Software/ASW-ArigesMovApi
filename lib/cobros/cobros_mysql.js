var mysql = require('mysql');
var conector = require('../comun/conector_mysql');

module.exports.getCobros = function (codmacta, callback) {
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
    connection.query(sql, function (err, result) {
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

module.exports.putCobro = function (pago, callback) {
    var sql = "UPDATE scobro SET ? WHERE numserie = ? AND codfaccl = ? AND fecfaccl = ? AND numorden = ?";
    sql = mysql.format(sql, [pago, pago.numserie, pago.codfaccl, pago.fecfaccl, pago.numorden]);
    var connection = conector.getConnectionConta();
    connection.query(sql, function (err, result) {
        if (err) {
            callback(err, null);
            conector.closeConnection(connection);
            return;
        }
        callback(null, pago);
        conector.closeConnection(connection);
    });
};

// getLinsCobro
// Devuelve las lineas de cobro asociada con la clave primaria compuesta 
module.exports.getLinsCobro = function (numserie, codfaccl, fecfaccl, numorden, callback) {
    var sql = "SELECT * FROM scobrolin WHERE numserie = ? AND codfaccl = ? AND fecfaccl = ? AND numorden = ?";
    sql = mysql.format(sql, [numserie, codfaccl, fecfaccl, numorden]);
    var connection = conector.getConnectionConta();
    connection.query(sql, function (err, res) {
        conector.closeConnection(connection);
        if (err) {
            return callback(err, null);
        }
        callback(null, res);
    });
};

// getLinsCobroAgente
// Devuelve las lineas de cobro de un determinado agente 
module.exports.getLinsCobroAgente = function (codagent, callback) {
    var sql = "SELECT * FROM scobrolin WHERE true";
    if (codagent){
        sql += " AND codagent = ?";
        sql = mysql.format(sql, codagent);        
    }
    var connection = conector.getConnectionConta();
    connection.query(sql, function (err, res) {
        conector.closeConnection(connection);
        if (err) {
            return callback(err, null);
        }
        callback(null, res);
    });
};



// postLinCobro
// crea una linea de cobro
module.exports.postLinCobro = function (lincobro, callback) {
    getNextId(lincobro.numserie, lincobro.codfaccl, lincobro.fecfaccl, lincobro.numorden,
        function (err, res) {
            if (err) {
                return callback(err);
            }
            lincobro.id = res;
            // -- hay que montar una transacción porque se actualizan 
            // dos tablas.
            var sql = "";
            var connection = conector.getConnectionConta();
            connection.beginTransaction(function (err) {
                if (err) {
                    return callback(err);
                }
                sql = "INSERT INTO scobrolin SET ?";
                sql = mysql.format(sql, lincobro);
                connection.query(sql, function (err, result) {
                    if (err) {
                        return connection.rollback(function () {
                            return callback(err, null)
                        });
                    }
                    sql = "UPDATE scobro SET fecultco = ?, impcobro = impcobro + ?";
                    sql += " WHERE numserie = ?";
                    sql += " AND codfaccl = ?";
                    sql += " AND fecfaccl = ?";
                    sql += " AND numorden = ?";
                    connection.query(sql, [lincobro.fecha, lincobro.importe,
                        lincobro.numserie, lincobro.codfaccl, lincobro.fecfaccl, lincobro.numorden],
                        function (err, result) {
                            if (err) {
                                return connection.rollback(function () {
                                    return callback(err, null)
                                });
                            }
                            // hay que considerar que hemos podido equivocarnos en la línea
                            // y no hay una cabecera que se corresponda
                            if (result.changedRows == 0) {
                                return connection.rollback(function () {
                                    var err = new Error();
                                    err.message = 'No hay cobro asociado';
                                    return callback(err, null)
                                });
                            }
                            connection.commit(function (err) {
                                if (err) {
                                    return connection.rollback(function () {
                                        return callback(err, null)
                                    });
                                }
                                callback(null, lincobro);
                            });
                        });
                });
            });
        });
};

// deleteLinCobro
// eliminar una linea de cobro
module.exports.deleteLinCobro = function (numserie, codfaccl, fecfaccl, numorden, id, importe, callback) {
    // -- hay que montar una transacción porque se actualizan 
    // dos tablas.
    var sql = "";
    var connection = conector.getConnectionConta();
    connection.beginTransaction(function (err) {
        if (err) {
            return callback(err);
        }
        sql = "DELETE FROM scobrolin ";
        ql += " WHERE numserie = ?";
        sql += " AND codfaccl = ?";
        sql += " AND fecfaccl = ?";
        sql += " AND numorden = ?";
        sql += " AND id = ?";
        sql = mysql.format(sql, [numserie, codfaccl, fecfaccl, numorden, id]);
        connection.query(sql, function (err, result) {
            if (err) {
                return connection.rollback(function () {
                    return callback(err, null)
                });
            }
            sql = "UPDATE scobro SET impcobro = impcobro - ?";
            sql += " WHERE numserie = ?";
            sql += " AND codfaccl = ?";
            sql += " AND fecfaccl = ?";
            sql += " AND numorden = ?";
            connection.query(sql, [importe,
                numserie, codfaccl, fecfaccl, numorden],
                function (err, result) {
                    if (err) {
                        return connection.rollback(function () {
                            return callback(err, null)
                        });
                    }
                    // hay que considerar que hemos podido equivocarnos en la línea
                    // y no hay una cabecera que se corresponda
                    if (result.changedRows == 0) {
                        return connection.rollback(function () {
                            var err = new Error();
                            err.message = 'No hay cobro asociado';
                            return callback(err, null)
                        });
                    }
                    connection.commit(function (err) {
                        if (err) {
                            return connection.rollback(function () {
                                return callback(err, null)
                            });
                        }
                        callback(null, null);
                    });
                });
        });
    });
};

// getNextId
// obtiene el siguiente id de la tabla scobrolin
var getNextId = function (numserie, codfaccl, fecfaccl, numorden, callback) {
    var sql = "SELECT MAX(id) + 1 AS nxt FROM scobrolin WHERE numserie = ?";
    sql += " AND codfaccl = ?";
    sql += " AND fecfaccl = ?";
    sql += " AND numorden = ?";
    sql = mysql.format(sql, [numserie, codfaccl, fecfaccl, numorden]);
    var connection = conector.getConnectionConta();
    connection.query(sql, function (err, result) {
        conector.closeConnection(connection);
        if (err) {
            return callback(err, null);
        }
        var nxt = result[0].nxt;
        if (!nxt) nxt = 1;
        callback(null, nxt);
    });
};

