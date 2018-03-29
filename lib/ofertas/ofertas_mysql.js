var mysql = require('mysql');
var conector = require('../comun/conector_mysql');

// getOfertas
// devuelve todos los ofertas de la base de datos
module.exports.getOferta = function (numofert, callback) {
    var sql = "SELECT";
    sql += " sc.numofert AS numofert,";
    sql += " sc.codclien AS codclien,";
    sql += " sc.fecofert AS fecofert,";
    sql += " sc.fecentre AS fecentre,";
    sql += " sc.aceptado AS aceptado,";
    sql += " sl2.total AS totalofe,";
    sql += " sl.numlinea AS numlinea,";
    sql += " sl.codartic AS codartic,";
    sql += " sl.nomartic AS nomartic,";
    sql += " sl.precioar AS precioar,";
    sql += " sl.cantidad AS cantidad,";
    sql += " sl.dtoline1 AS dtoline1,";
    sql += " sl.dtoline2 AS dtoline2,";
    sql += " sl.importel AS importel";
    sql += " FROM scapre AS sc";
    sql += " LEFT JOIN slipre AS sl ON sl.numofert = sc.numofert";
    sql += " LEFT JOIN (SELECT numofert, SUM(importel) AS total";
    sql += " FROM slipre";
    sql += " LEFT JOIN sclien as cl ON cl.codclien = sc.codclien";
    sql += " LEFT JOIN sagent as ag ON ag.codagent = sc.codagent";
    sql += " LEFT JOIN slipre AS sl ON sl.numofert = sc.numofert";
    sql += " LEFT JOIN (SELECT numofert, SUM(importel) AS total";
    sql += " FROM slipre";
    sql += " GROUP BY numofert) AS sl2 ON sl2.numofert = sc.numofert";
    sql += " WHERE sc.numofert = ?";
    sql += " ORDER BY sc.fecpedcl DESC,sc.numofert,sl.numlinea;";
    sql = mysql.format(sql, numofert);
    var connection = conector.getConnectionAriges();
    connection.query(sql, function (err, result) {
        if (err) {
            callback(err, null);
            conector.closeConnection(connection);
            return;
        }
        // hay que procesar a JSON
        callback(null, fnOfertasFromDbToJson(result));
        conector.closeConnection(connection);
    });
};


// getOfertasAgente
// devuelve todos los ofertas del agente pasado

module.exports.getOfertasAgente = function (codagent, callback) {
    var sql = "SELECT";
    sql += " sc.numofert AS numofert,";
    sql += " sc.codclien AS codclien,";
    sql += " sc.fecofert AS fecofert,";
    sql += " sc.fecentre AS fecentre,";
    sql += " sc.aceptado AS aceptado,";
    sql += " sl2.total AS totalofe,";
    sql += " sl.numlinea AS numlinea,";
    sql += " sl.codartic AS codartic,";
    sql += " sl.nomartic AS nomartic,";
    sql += " sl.precioar AS precioar,";
    sql += " sl.cantidad AS cantidad,";
    sql += " sl.dtoline1 AS dtoline1,";
    sql += " sl.dtoline2 AS dtoline2,";
    sql += " sl.importel AS importel";
    sql += " FROM scapre AS sc";
    sql += " LEFT JOIN slipre AS sl ON sl.numofert = sc.numofert";
    sql += " LEFT JOIN (SELECT numofert, SUM(importel) AS total";
    sql += " FROM slipre";
    sql += " LEFT JOIN sclien as cl ON cl.codclien = sc.codclien";
    sql += " LEFT JOIN sagent as ag ON ag.codagent = sc.codagent";
    sql += " LEFT JOIN slipre AS sl ON sl.numofert = sc.numofert";
    sql += " LEFT JOIN (SELECT numofert, SUM(importel) AS total";
    sql += " FROM slipre";
    sql += " GROUP BY numofert) AS sl2 ON sl2.numofert = sc.numofert";
    if (codagent) {
        sql += " WHERE sc.codagent = ?";
    }
    sql += " ORDER BY sc.fecpedcl DESC,sc.numofert,sl.numlinea;";
    sql = mysql.format(sql, codagent);
    var connection = conector.getConnectionAriges();
    connection.query(sql, function (err, result) {
        if (err) {
            callback(err, null);
            conector.closeConnection(connection);
            return;
        }
        // hay que procesar a JSON
        callback(null, fnOfertasFromDbToJson(result));
        conector.closeConnection(connection);
    });
};


// getOfertas
// devuelve todos los ofertas de la base de datos
module.exports.getOfertas = function (callback) {
    var sql = "SELECT"
    var sql = "SELECT";
    sql += " sc.numofert AS numofert,";
    sql += " sc.codclien AS codclien,";
    sql += " sc.fecofert AS fecofert,";
    sql += " sc.fecentre AS fecentre,";
    sql += " sc.aceptado AS aceptado,";
    sql += " sl2.total AS totalofe,";
    sql += " sl.numlinea AS numlinea,";
    sql += " sl.codartic AS codartic,";
    sql += " sl.nomartic AS nomartic,";
    sql += " sl.precioar AS precioar,";
    sql += " sl.cantidad AS cantidad,";
    sql += " sl.dtoline1 AS dtoline1,";
    sql += " sl.dtoline2 AS dtoline2,";
    sql += " sl.importel AS importel";
    sql += " FROM scapre AS sc";
    sql += " LEFT JOIN slipre AS sl ON sl.numofert = sc.numofert";
    sql += " LEFT JOIN (SELECT numofert, SUM(importel) AS total";
    sql += " FROM slipre";
    sql += " GROUP BY numofert) AS sl2 ON sl2.numofert = sc.numofert";
    sql += " ORDER BY sc.fecpedcl DESC,sc.numofert,sl.numlinea;";
    var connection = conector.getConnectionAriges();
    connection.query(sql, function (err, result) {
        if (err) {
            callback(err, null);
            conector.closeConnection(connection);
            return;
        }
        // hay que procesar a JSON
        callback(null, fnOfertasFromDbToJson(result));
        conector.closeConnection(connection);
    });
};


module.exports.getOfertasCliente = function (codclien, callback) {
    var ofertas = [];
    var sql = "SELECT";
    sql += " sc.numofert AS numofert,";
    sql += " sc.codclien AS codclien,";
    sql += " sc.nomclien AS nomclien,";
    sql += " ag.nomagent AS nomagent,";
    sql += " sc.fecofert AS fecofert,";
    sql += " sc.fecentre AS fecentre,";
    sql += " sc.aceptado AS aceptado,";
    sql += " sl2.total AS totalofe,";
    sql += " sl.numlinea AS numlinea,";
    sql += " sl.codartic AS codartic,";
    sql += " sl.nomartic AS nomartic,";
    sql += " sl.precioar AS precioar,";
    sql += " sl.cantidad AS cantidad,";
    sql += " sl.dtoline1 AS dtoline1,";
    sql += " sl.dtoline2 AS dtoline2,";
    sql += " sl.importel AS importel";
    sql += " FROM scapre AS sc";
    sql += " LEFT JOIN sagent as ag ON ag.codagent = sc.codagent";
    sql += " LEFT JOIN slipre AS sl ON sl.numofert = sc.numofert";
    sql += " LEFT JOIN (SELECT numofert, SUM(importel) AS total";
    sql += " FROM slipre";
    sql += " GROUP BY numofert) AS sl2 ON sl2.numofert = sc.numofert";
    sql += " WHERE sc.codclien = ?";
    sql += " ORDER BY sc.fecofert DESC,sc.numofert,sl.numlinea;";
    sql = mysql.format(sql, codclien);
    var connection = conector.getConnectionAriges();
    connection.query(sql, function (err, result) {
        conector.closeConnection(connection);
        if (err) {
            return callback(err, null);
        }
        // hay que procesar a JSON
        return callback(null, fnOfertasFromDbToJson(result));
    });
};

var fnOfertasFromDbToJson = function (ofertas) {
    var ofJs = [];
    var cabJs = null;
    var linJs = null;
    var numofertAnt = 0;
    for (var i = 0; i < ofertas.length; i++) {
        var oferta = ofertas[i];
        if (numofertAnt != oferta.numofert) {
            // es una oferta nueva
            // si ya habiamos procesado una la pasamos al vector
            if (cabJs) {
                ofJs.push(cabJs);
            }
            cabJs = {
                numofert: oferta.numofert,
                fecofert: oferta.fecofert,
                fecentre: oferta.fecentre,
                totalofe: oferta.totalofe,
                aceptado: oferta.aceptado,
                lineas: []
            };
            numofertAnt = oferta.numofert;
        }
        // siempre se procesa una linea
        if (oferta.numlinea) {
            linJs = {
                numlinea: oferta.numlinea,
                codartic: oferta.codartic,
                nomartic: oferta.nomartic,
                precioar: oferta.precioar,
                cantidad: oferta.cantidad,
                dtoline1: oferta.dtoline1,
                dtoline2: oferta.dtoline2,
                importel: oferta.importel
            };
            cabJs.lineas.push(linJs);
        }
    }
    if (cabJs) {
        ofJs.push(cabJs);
    }
    return ofJs;
}

// postCabOferta
// crea una cabecera de oferta
module.exports.postCabOferta = function (oferta, callback) {
    getNextNumpedcl(function (err, res) {
        if (err) {
            callback(err);
            return;
        }
        oferta.numofert = res;
        var sql = "INSERT INTO scapre SET ?";
        sql = mysql.format(sql, oferta);
        var connection = conector.getConnectionAriges();
        connection.query(sql, function (err, result) {
            conector.closeConnection(connection);
            if (err) {
                return callback(err, null);
            }
            callback(null, oferta);
        });
    });
};

// putCabOferta
// modifica la cabecera de oferta
module.exports.putCabOferta = function (oferta, callback) {
    var sql = "UPDATE scapre SET ? WHERE numofert = ?";
    sql = mysql.format(sql, [oferta, oferta.numofert]);
    var connection = conector.getConnectionAriges();
    connection.query(sql, function (err, result) {
        conector.closeConnection(connection);
        if (err) {
            return callback(err, null);
        }
        return callback(null, oferta);
    });
}

// deleteCabOferta
// modifica la cabecera de oferta
module.exports.deleteCabOferta = function (numofert, callback) {
    deleteLineasPed(numofert, function (err, res) {
        if (err) {
            return callback(err);
        }
        var sql = "DELETE FROM scapre WHERE numofert = ?";
        sql = mysql.format(sql, numofert);
        var connection = conector.getConnectionAriges();
        connection.query(sql, function (err, result) {
            conector.closeConnection(connection);
            if (err) {
                return callback(err, null);
            }
            return callback(null, numofert);
        });
    });
}

// ---------------------------------------------------------------------
// postLinOferta
// crea una linea de oferta
module.exports.postLinOferta = function (linOferta, callback) {
    getNextNumlinea(linOferta.numofert, function (err, res) {
        if (err) {
            return callback(err);
        }
        linOferta.numlinea = res;
        var sql = "INSERT INTO slipre SET ?";
        sql = mysql.format(sql, linOferta);
        var connection = conector.getConnectionAriges();
        connection.query(sql, function (err, result) {
            conector.closeConnection(connection);
            if (err) {
                return callback(err, null);
            }
            return callback(null, linOferta);
        });
    });
};

// putLinOferta
// modifica la linea de oferta
module.exports.putLinOferta = function (linOferta, callback) {
    var sql = "UPDATE slipre SET ? WHERE numofert = ? AND numlinea = ?";
    sql = mysql.format(sql, [linOferta, linOferta.numofert, linOferta.numlinea]);
    var connection = conector.getConnectionAriges();
    connection.query(sql, function (err, result) {
        conector.closeConnection(connection);
        if (err) {
            return callback(err, null);
        }
        return callback(null, linOferta);
    });
}

// deleteLinOferta
// elimina la línea de oferta
module.exports.deleteLinOferta = function (numofert, numlinea, callback) {
    var sql = "DELETE FROM slipre WHERE numofert = ? AND numlinea = ?";
    sql = mysql.format(sql, [numofert, numlinea]);
    var connection = conector.getConnectionAriges();
    connection.query(sql, function (err, result) {
        conector.closeConnection(connection);
        if (err) {
            return callback(err, null);
        }
        return callback(null, null);
    });
}


// getNextNumpedcl
// obtiene el siguiente número de oferta según el orden dado
var getNextNumpedcl = function (callback) {
    var sql = "SELECT MAX(contador) + 1 AS nxt FROM stipom WHERE codtipom = 'OFE'";
    var connection = conector.getConnectionAriges();
    connection.query(sql, function (err, result) {
        if (err) {
            conector.closeConnection(connection);
            return callback(err, null);
        }
        var nxt = result[0].nxt;
        if (!nxt) {
            nxt = 1;
        }
        sql = "UPDATE stipom SET contador = ? WHERE codtipom = 'OFE'";
        sql = mysql.format(sql, nxt);
        connection.query(sql, function (err, result) {
            conector.closeConnection(connection);
            if (err) {
                return callback(err, null);
            }
            return callback(null, nxt);
        });
    });
};

var getNextNumlinea = function (numofert, callback) {
    var sql = "SELECT MAX(numlinea) + 1 AS nxt FROM slipre WHERE numofert=?";
    sql = mysql.format(sql, numofert);
    var connection = conector.getConnectionAriges();
    connection.query(sql, function (err, result) {
        conector.closeConnection(connection);
        if (err) {
            return callback(err, null);
        }
        var nxt = result[0].nxt;
        if (!nxt) nxt = 1;
        return callback(null, nxt);
    });
};

// deleteLineasPed
// elimina las líneas de un oferta
var deleteLineasPed = function (numofert, callback) {
    var sql = "DELETE FROM slipre WHERE numofert = ?";
    sql = mysql.format(sql, numofert);
    var connection = conector.getConnectionAriges();
    connection.query(sql, function (err, result) {
        conector.closeConnection(connection);
        if (err) {
            return callback(err, null);
        }
        return callback(null, null);
    });
}

