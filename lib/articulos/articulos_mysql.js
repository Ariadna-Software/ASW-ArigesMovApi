//-----------------------------------------------------------------
// clientes-agente_mysql
// implementa el acceso a la basde de datos mysql
//-----------------------------------------------------------------

var mysql = require('mysql');
var conector = require('../comun/conector_mysql');
var async = require('async');

// 
// 
module.exports.getArticulos = function (parnom, callback) {
    var articulos = null;
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
    connection.query(sql, function (err, result) {
        if (err) {
            callback(err, null);
            conector.closeConnection(connection);
            return;
        }
        if (result && (result.length > 0)) {
            articulos = result;
        }
        callback(null, articulos);
        conector.closeConnection(connection);
    });

};
// getArticulosExt
// versión extendida de la búsqueda de artículos, con los siguientes criterios
// parnom = 'nombre parcial del artículo'
// parpro = 'nombre parcial del proveedor'
// parfam = 'nombre parcial de familia'
// codigo = 'código del artículo'
// obsole = 'indicador sobre incluir obsoletos o no 
module.exports.getArticulosExt = function (parnom, parpro, parfam, codigo, obsole, callback) {
    var articulos = null;
    var sql = "SELECT";
    sql += " a.codartic,";
    sql += " a.nomartic,";
    sql += " p.codprove,";
    sql += " p.nomprove,";
    sql += " COALESCE(p.nomcomer,'') AS nomcomer,";
    sql += " COALESCE(p.domprove,'') AS domprove,";
    sql += " COALESCE(p.codpobla,'') AS codpobla,";
    sql += " COALESCE(p.pobprove,'') AS pobprove,";
    sql += " COALESCE(p.proprove,'') AS proprove,";
    sql += " COALESCE(p.nifPROVE,'') AS nifprove,";
    sql += " COALESCE(p.perprov1,'') AS perprov1,";
    sql += " COALESCE(p.telprov1,'') AS telprov1,";
    sql += " COALESCE(p.faxprov1,'') AS faxprov1,";
    sql += " COALESCE(p.perprov2,'') AS perprov2,";
    sql += " COALESCE(p.telprov2,'') AS relprov2,";
    sql += " COALESCE(p.faxprov2,'') AS faxprov2,";
    sql += " COALESCE(p.maiprov1,'') AS maiprov1,";
    sql += " COALESCE(p.maiprov2,'') AS maiprov2,";
    sql += " f.codfamia AS codfamia,";
    sql += " f.nomfamia AS nomfamia,";
    sql += " a.preciove AS preciove,";
    sql += " a.rotacion AS rotacion,";
    sql += " stk.stock AS stock,";
    sql += " COALESCE(slpr.pedido,0) AS pedido,";
    sql += " COALESCE(a.referprov,'') AS referprov,";
    sql += " COALESCE(slp.reservas,0) AS reservas";
    sql += " FROM sartic AS a";
    sql += " LEFT JOIN sprove AS p ON p.codprove = a.codprove";
    sql += " LEFT JOIN sfamia AS f ON f.codfamia = a.codfamia";
    sql += " LEFT JOIN (SELECT SUM(canstock) AS stock, codartic FROM salmac GROUP BY codartic) AS stk ON stk.codartic = a.codartic";
    sql += " LEFT JOIN (SELECT SUM(cantidad) AS reservas, codartic FROM sliped GROUP BY codartic) AS slp ON slp.codartic = a.codartic";
    sql += " LEFT JOIN (SELECT SUM(cantidad) AS pedido, codartic FROM slippr GROUP BY codartic) AS slpr ON slpr.codartic = a.codartic";
    sql += " WHERE TRUE";
    if (parnom) {
        sql += " AND a.nomartic LIKE ?"
        sql = mysql.format(sql, ['%' + parnom + '%']);
    }
    if (parpro) {
        sql += " AND p.nomprove LIKE ?"
        sql = mysql.format(sql, ['%' + parpro + '%']);
    }
    if (parfam) {
        sql += " AND f.nomfamia LIKE ?"
        sql = mysql.format(sql, ['%' + parfam + '%']);
    }
    if (codigo) {
        sql += " AND a.codartic = ?"
        sql = mysql.format(sql, codigo);
    }
    if (!obsole) {
        sql += " AND codstatu <> 1"
    }
    var connection = conector.getConnectionAriges();
    connection.query(sql, function (err, result) {
        if (err) {
            callback(err, null);
            conector.closeConnection(connection);
            return;
        }
        if (result && (result.length > 0)) {
            articulos = result;
        }
        callback(null, articulos);
        conector.closeConnection(connection);
    });

};
// Precios especiales
module.exports.getArticulosPreciosEspeciales = function (codclien, callback) {
    var articulos = null;
    var sql = "SELECT";
    sql += " sp.codartic,";
    sql += " sa.nomartic,";
    sql += " COALESCE(sp.precioac,0) AS precioac,";
    sql += " COALESCE(sp.dtoespec,0) AS dtoespe";
    sql += " FROM sprees AS sp";
    sql += " LEFT JOIN sartic AS sa ON sa.codartic = sp.codartic";
    sql += " WHERE sp.codclien = ?";
    sql = mysql.format(sql, codclien);
    var connection = conector.getConnectionAriges();
    connection.query(sql, function (err, result) {
        if (err) {
            callback(err, null);
            conector.closeConnection(connection);
            return;
        }
        if (result && (result.length > 0)) {
            articulos = result;
        }
        callback(null, articulos);
        conector.closeConnection(connection);
    });

};
// Descuentos especiales
module.exports.getArticulosDescuentosEspeciales = function (codclien, callback) {
    var articulos = null;
    var sql = "SELECT";
    sql += " d.codfamia,";
    sql += " f.nomfamia,";
    sql += " d.fechadto,";
    sql += " COALESCE(d.dtoline1,0) AS dtoline1,";
    sql += " COALESCE(d.dtoline2,0) AS dtoline2";
    sql += " FROM sdtofm AS d";
    sql += " LEFT JOIN sfamia AS f ON f.codfamia = d.codfamia";
    sql += " WHERE d.codclien = ?";
    sql = mysql.format(sql, codclien);
    var connection = conector.getConnectionAriges();
    connection.query(sql, function (err, result) {
        if (err) {
            callback(err, null);
            conector.closeConnection(connection);
            return;
        }
        if (result && (result.length > 0)) {
            articulos = result;
        }
        callback(null, articulos);
        conector.closeConnection(connection);
    });

};
// 
module.exports.getArticulosCliente = function (parnom, codclien, codtarif, codactiv, callback) {
    var articulos = [];
    var sql = "SELECT"
    sql += " a.codartic AS codartic,";
    sql += " a.nomartic AS nomartic,";
    sql += " a.preciove AS preciove,";
    sql += " a.codfamia AS codfamia,";
    sql += " a.codmarca AS codmarca,";
    sql += " al.stock AS stock";
    sql += " FROM sartic as a"
    sql += " LEFT JOIN (SELECT codartic, SUM(canstock) AS stock FROM salmac GROUP BY codartic) AS al";
    sql += " ON al.codartic = a.codartic";    
    sql += " WHERE a.nomartic LIKE ?"
    sql += " AND  a.codstatu <> 1"
    sql += " ORDER BY a.nomartic"
    sql = mysql.format(sql, ['%' + parnom + '%']);
    var connection = conector.getConnectionAriges();
    connection.query(sql, function (err, result) {
        if (err) {
            conector.closeConnection(connection);
            return callback(err, null);;
        }
        if (result && (result.length > 0)) {
            fnPreciosArticulos(result, codclien, codtarif, codactiv, function (err, res) {
                if (err) {
                    return callback(err);
                }
                articulos = res;
                return callback(null, articulos);
            });
        } else {
            conector.closeConnection(connection);
            return callback(null, articulos);
        }
    });

};

// --- Parametros
// articulos = un array de objetos artículo, normalmente devueltos por la db
// --- Devuelve
// llamada a callback (err, articulos)
// cada objeto de la el array de artículos devuelto incluye un objetio precio
// que detalle su precio correcto, descuentos aplicados y el origen de esos
// valores
var fnPreciosArticulos = function (articulos, codclien, codtarif, codactiv, callback) {
    async.eachSeries(articulos, function (articulo, calldone) {
        fnPrecioMinimo(function (err, res) {
            if (err) {
                return calldone(err);
            }
            // --
            if (!res) {
                // no se aplica precio mínimo
                // llamada secuencial a las las funciones por cada precio
                fnBuscaPrecios(articulo, codclien, codtarif, codactiv, function (err, precios) {
                    if (err) {
                        calldone(err);
                        return;
                    }
                    var p = {
                        pvp: 0
                    };
                    for (var i = 0; i < precios.length; i++) {
                        p = precios[i];
                        if (p.pvp != 0) break;
                    }
                    articulo.precio = p;
                    calldone();
                });
            } else {
                // se aplica precio mínimo
                fnBuscaPrecios(articulo, codclien, codtarif, codactiv, function (err, precios) {
                    if (err) {
                        calldone(err);
                        return;
                    }
                    var px = {
                        importe: 9999999,
                        origen: "ERROR"
                    };
                    for (var i = 0; i < precios.length; i++) {
                        var p = precios[i];
                        if (p.pvp != 0 && p.importe < px.importe) px = p;
                    }
                    articulo.precio = px;

                    calldone();
                });
            }
        });
    },
        function done(err) {
            // se llama cuando todos los artículos ha sido procesados 
            // o ha habido un error.
            if (err) {
                return callback(err);
            }
            return callback(null, articulos);
        });
};

var fnBuscaPrecios = function (articulo, codclien, codtarif, codactiv, callback) {
    var a = articulo;
    async.series([
        function (callback2) {
            fnPrecioPromocion(a.codartic, a.codfamia, a.codmarca,
                codclien, codtarif, codactiv,
                function (err, precio) {
                    if (err) return callback2(err);
                    return callback2(null, precio);
                })
        },
        function (callback2) {
            fnPrecioEspecial(a.codartic, a.codfamia, a.codmarca,
                codclien, codtarif, codactiv,
                function (err, precio) {
                    if (err) return callback2(err);
                    return callback2(null, precio);
                })
        },
        function (callback2) {
            fnPrecioTarifa(a.codartic, a.codfamia, a.codmarca,
                codclien, codtarif, codactiv,
                function (err, precio) {
                    if (err) return callback2(err);
                    return callback2(null, precio);
                })
        },
        function (callback2) {
            fnPrecioArticulo(a.preciove,
                function (err, precio) {
                    if (err) return callback2(err);
                    return callback2(null, precio);
                })
        },
    ],
        function (err, precios) {
            if (err) {
                callback(err);
                return;
            }
            callback(null, precios);
        });
};



// Consultar en los parámetros si hay un precio mínimo o nó
var fnPrecioMinimo = function (callback) {
    var res = false;
    var sql = "SELECT preciominimo FROM spara1";
    var connection = conector.getConnectionAriges();
    connection.query(sql, function (err, result) {
        if (err) {
            callback(err, null);
            conector.closeConnection(connection);
            return;
        }
        if (result && (result.length > 0)) {
            if (result[0].preciominimo) res = true;
        }
        callback(null, res);
        conector.closeConnection(connection);
    });
};

// fnPrecioPromocion
// devuelve al callback un obvjeto de tipo precio
var fnPrecioPromocion = function (codartic, codfamia, codmarca, codclien, codtarif, codactiv, callback) {
    var precio = {
        pvp: 0,
        dto1: 0,
        dto2: 0,
        importe: 0,
        origen: "P"
    };
    var dtopermi = false;
    async.series({
        // (1) spromo --> precioac
        p1: function (callback2) {
            var sql = "SELECT dtopermi, precioac from spromo";
            sql += " WHERE codartic = ?";
            sql += " AND codlista = ?";
            sql += " AND (fechaini <= ? AND fechafin >= ?)";
            sql = mysql.format(sql, [codartic, codtarif, new Date(), new Date()]);
            var connection = conector.getConnectionAriges();
            connection.query(sql, function (err, result) {
                if (err) {
                    conector.closeConnection(connection);
                    callback2(err);
                    return;
                }
                if (result && (result.length > 0)) {
                    var r = result[0];
                    precio.pvp = r.precioac;
                    dtopermi = r.dtopermi;
                }
                conector.closeConnection(connection);
                callback2();
            });
        },
        // (2) spromo --> precionu
        p2: function (callback2) {
            var sql = "SELECT dtopermi, precionu from spromo";
            sql += " WHERE codartic = ?";
            sql += " AND codlista = ?";
            sql += " AND (fechaini <= ? AND fechafin >= ?)";
            sql = mysql.format(sql, [codartic, codtarif, new Date(), new Date()]);
            var connection = conector.getConnectionAriges();
            connection.query(sql, function (err, result) {
                if (err) {
                    conector.closeConnection(connection);
                    callback2(err);
                    return;
                }
                if (result && (result.length > 0)) {
                    var r = result[0];
                    precio.pvp = r.precionu;
                    dtopermi = r.dtopermi;
                }
                conector.closeConnection(connection);
                callback2();
            });
        }
    },
        function (err, results) {
            if (err) {
                callback(err);
                return;
            }
            // antes de devolver el precio hay que calcular los descuentos
            if (precio.pvp != 0 && dtopermi) {
                // precio = getDescuento(codartic, codclien, precio); 
                getDescuento(codartic, codfamia, codmarca, codclien, codactiv, precio, function (err, res) {
                    if (err) {
                        callback(err);
                    } else {
                        calcularDescuento(res, function (err, res) {
                            if (err) {
                                callback(err);
                            } else {
                                callback(null, res);
                            }
                        });
                    }
                });
            } else {
                calcularDescuento(precio, function (err, res) {
                    if (err) {
                        callback(err);
                    } else {
                        callback(null, res);
                    }
                });
            }
        });
};

// fnPrecioEspecial
// devuelve al callback un objeto de tipo precio
var fnPrecioEspecial = function (codartic, codfamia, codmarca, codclien, codtarif, codactiv, callback) {
    var precio = {
        pvp: 0,
        dto1: 0,
        dto2: 0,
        importe: 0,
        origen: "E"
    };
    var dtopermi = false;
    async.series({
        // (1) spromo --> precioac
        p1: function (callback2) {
            var sql = "SELECT dtopermi, precioac, dtoespec from sprees";
            sql += " WHERE codclien = ?";
            sql += " AND codartic = ?";
            sql = mysql.format(sql, [codclien, codartic]);
            var connection = conector.getConnectionAriges();
            connection.query(sql, function (err, result) {
                if (err) {
                    conector.closeConnection(connection);
                    callback2(err);
                    return;
                }
                if (result && (result.length > 0)) {
                    var r = result[0];
                    precio.pvp = r.precioac;
                    dtopermi = r.dtopermi;
                    if (r.dtoespc) {
                        precio.dto1 = r.dtoespec;
                    }
                }
                conector.closeConnection(connection);
                callback2();
            });
        },
        // (2) spromo --> precionu
        p2: function (callback2) {
            var sql = "SELECT dtopermi, precionu, dtoespe1 from sprees";
            sql += " WHERE codclien = ?";
            sql += " AND codartic = ?";
            sql += " AND fechanue <= ?";
            sql = mysql.format(sql, [codclien, codartic, new Date()]);
            var connection = conector.getConnectionAriges();
            connection.query(sql, function (err, result) {
                if (err) {
                    conector.closeConnection(connection);
                    callback2(err);
                    return;
                }
                if (result && (result.length > 0)) {
                    var r = result[0];
                    precio.pvp = r.precionu;
                    dtopermi = r.dtopermi;
                    if (r.dtoespe1) {
                        precio.dto1 = r.dtoespe1;
                    }
                }
                conector.closeConnection(connection);
                callback2();
            });
        }
    },
        function (err, results) {
            if (err) {
                callback(err);
                return;
            }
            // antes de devolver el precio hay que calcular los descuentos
            if (precio.pvp != 0 && dtopermi) {
                // precio = getDescuento(codartic, codclien, precio); 
                getDescuento(codartic, codfamia, codmarca, codclien, codactiv, precio, function (err, res) {
                    if (err) {
                        callback(err);
                    } else {
                        calcularDescuento(res, function (err, res) {
                            if (err) {
                                callback(err);
                            } else {
                                callback(null, res);
                            }
                        });
                    }
                });
            } else {
                calcularDescuento(precio, function (err, res) {
                    if (err) {
                        callback(err);
                    } else {
                        callback(null, res);
                    }
                });
            }
        });
};

// fnPrecioTarifa
// devuelve al callback un objeto de tipo precio
var fnPrecioTarifa = function (codartic, codfamia, codmarca, codclien, codtarif, codactiv, callback) {
    var precio = {
        pvp: 0,
        dto1: 0,
        dto2: 0,
        importe: 0,
        origen: "T"
    };
    var dtopermi = false;
    async.series({
        // (1) spromo --> precioac
        p1: function (callback2) {
            var sql = "SELECT dtopermi, precioac from slista";
            sql += " WHERE codlista = ?";
            sql += " AND codartic = ?";
            sql = mysql.format(sql, [codtarif, codartic]);
            var connection = conector.getConnectionAriges();
            connection.query(sql, function (err, result) {
                if (err) {
                    conector.closeConnection(connection);
                    callback2(err);
                    return;
                }
                if (result && (result.length > 0)) {
                    var r = result[0];
                    precio.pvp = r.precioac;
                    dtopermi = r.dtopermi;
                }
                conector.closeConnection(connection);
                callback2();
            });
        },
        // (2) spromo --> precionu
        p2: function (callback2) {
            var sql = "SELECT dtopermi, precionu from slista";
            sql += " WHERE codlista = ?";
            sql += " AND codartic = ?";
            sql += " AND fechanue <= ?";
            sql = mysql.format(sql, [codtarif, codartic, new Date()]);
            var connection = conector.getConnectionAriges();
            connection.query(sql, function (err, result) {
                if (err) {
                    conector.closeConnection(connection);
                    callback2(err);
                    return;
                }
                if (result && (result.length > 0)) {
                    var r = result[0];
                    precio.pvp = r.precionu;
                    dtopermi = r.dtopermi;
                }
                conector.closeConnection(connection);
                callback2();
            });
        }
    },
        function (err, results) {
            if (err) {
                callback(err);
                return;
            }
            // antes de devolver el precio hay que calcular los descuentos
            if (precio.pvp != 0 && dtopermi) {
                // precio = getDescuento(codartic, codclien, precio); 
                getDescuento(codartic, codfamia, codmarca, codclien, codactiv, precio, function (err, res) {
                    if (err) {
                        callback(err);
                    } else {
                        calcularDescuento(res, function (err, res) {
                            if (err) {
                                callback(err);
                            } else {
                                callback(null, res);
                            }
                        });
                    }
                });
            } else {
                calcularDescuento(precio, function (err, res) {
                    if (err) {
                        callback(err);
                    } else {
                        callback(null, res);
                    }
                });
            }
        });
};

var fnPrecioArticulo = function (preciove, callback) {
    var precio = {
        pvp: preciove,
        dto1: 0,
        dto2: 0,
        importe: 0,
        origen: "A"
    };
    calcularDescuento(precio, function (err, res) {
        if (err) {
            callback(err);
        } else {
            callback(null, res);
        }
    });
}


// Zona de cálculo de descuentos
var getDescuento = function (codartic, codfamia, codmarca, codclien, codactiv, precio, callback) {
    // llamamos secuencialmente a las funciones
    async.series([
        function (callback2) {
            getDescuentoCFM(codartic, codfamia, codmarca, codclien, codactiv, precio, function (err, res) {
                if (err) {
                    callback2(err);
                    return;
                } else {
                    // lo que devuelve la función getDescuento es un objeto precio
                    callback2(null, res);
                }
            });
        },
        function (callback2) {
            getDescuentoCF(codartic, codfamia, codclien, precio, function (err, res) {
                if (err) {
                    callback2(err);
                    return;
                } else {
                    // lo que devuelve la función getDescuento es un objeto precio
                    callback2(null, res);
                }
            });
        },
        function (callback2) {
            getDescuentoCM(codartic, codmarca, codclien, precio, function (err, res) {
                if (err) {
                    callback2(err);
                    return;
                } else {
                    // lo que devuelve la función getDescuento es un objeto precio
                    callback2(null, res);
                }
            });
        },
        function (callback2) {
            getDescuentoAFM(codartic, codfamia, codmarca, codactiv, precio, function (err, res) {
                if (err) {
                    callback2(err);
                    return;
                } else {
                    // lo que devuelve la función getDescuento es un objeto precio
                    callback2(null, res);
                }
            });
        },
        function (callback2) {
            getDescuentoAF(codartic, codfamia, codactiv, precio, function (err, res) {
                if (err) {
                    callback2(err);
                    return;
                } else {
                    // lo que devuelve la función getDescuento es un objeto precio
                    callback2(null, res);
                }
            });
        },
        function (callback2) {
            getDescuentoAM(codartic, codmarca, codactiv, precio, function (err, res) {
                if (err) {
                    callback2(err);
                    return;
                } else {
                    // lo que devuelve la función getDescuento es un objeto precio
                    callback2(null, res);
                }
            });
        }
    ],
        function (err, results) {
            if (err) {
                callback(err);
                return;
            } else {
                // comprobamos secuencialmente la lista de resultados
                // devolvemos a la función llamante el precio cuyo primer descuento
                // no sea cero.
                var p2 = null;
                for (var i = 0; i < results.length; i++) {
                    p2 = results[i];
                    if (p2.dto1 > 0) {
                        // ya lo tenemos, no hay que mirar más
                        break;
                    }
                }
                callback(null, p2);
            }
        });
};

// descuento CFM (cliente / familia / marca)
var getDescuentoCFM = function (codartic, codfamia, codmarca, codclien, codactiv, precio, callback) {
    var sql = "SELECT dtoline1, dtoline2 from sdtofm";
    sql += " WHERE codclien = ?";
    sql += " AND codfamia = ?";
    sql += " AND codmarca = ?";
    sql += " AND fechadto <= ?";
    sql = mysql.format(sql, [codclien, codfamia, codmarca, new Date()]);
    var connection = conector.getConnectionAriges();
    connection.query(sql, function (err, result) {
        if (err) {
            conector.closeConnection(connection);
            callback(err);
            return;
        }
        if (result && (result.length > 0)) {
            var r = result[0];
            precio.dto1 = r.dtoline1;
            precio.dto2 = r.dtoline2;
        }
        conector.closeConnection(connection);
        callback(null, precio);
    });
}
// descuento CF (cliente / familia)
var getDescuentoCF = function (codartic, codfamia, codclien, precio, callback) {
    var sql = "SELECT dtoline1, dtoline2 from sdtofm";
    sql += " WHERE codclien = ?";
    sql += " AND codfamia = ?";
    sql += " AND fechadto <= ?";
    sql = mysql.format(sql, [codclien, codfamia, new Date()]);
    var connection = conector.getConnectionAriges();
    connection.query(sql, function (err, result) {
        if (err) {
            conector.closeConnection(connection);
            callback(err);
            return;
        }
        if (result && (result.length > 0)) {
            var r = result[0];
            precio.dto1 = r.dtoline1;
            precio.dto2 = r.dtoline2;
        }
        conector.closeConnection(connection);
        callback(null, precio);
    });
}

// descuento CM (cliente / marca)
var getDescuentoCM = function (codartic, codmarca, codclien, precio, callback) {
    var sql = "SELECT dtoline1, dtoline2 from sdtofm";
    sql += " WHERE codclien = ?";
    sql += " AND codmarca = ?";
    sql += " AND fechadto <= ?";
    sql = mysql.format(sql, [codclien, codmarca, new Date()]);
    var connection = conector.getConnectionAriges();
    connection.query(sql, function (err, result) {
        if (err) {
            conector.closeConnection(connection);
            callback(err);
            return;
        }
        if (result && (result.length > 0)) {
            var r = result[0];
            precio.dto1 = r.dtoline1;
            precio.dto2 = r.dtoline2;
        }
        conector.closeConnection(connection);
        callback(null, precio);
    });
}

// descuento AFM (actividad / familia / marca)
var getDescuentoAFM = function (codartic, codfamia, codmarca, codactiv, precio, callback) {
    var sql = "SELECT dtoline1, dtoline2 from sdtofm";
    sql += " WHERE codactiv = ?";
    sql += " AND codfamia = ?";
    sql += " AND codmarca = ?";
    sql += " AND fechadto <= ?";
    sql = mysql.format(sql, [codactiv, codfamia, codmarca, new Date()]);
    var connection = conector.getConnectionAriges();
    connection.query(sql, function (err, result) {
        if (err) {
            conector.closeConnection(connection);
            callback(err);
            return;
        }
        if (result && (result.length > 0)) {
            var r = result[0];
            precio.dto1 = r.dtoline1;
            precio.dto2 = r.dtoline2;
        }
        conector.closeConnection(connection);
        callback(null, precio);
    });
}

// descuento AF (actvidad / familia)
var getDescuentoAF = function (codartic, codfamia, codactiv, precio, callback) {
    var sql = "SELECT dtoline1, dtoline2 from sdtofm";
    sql += " WHERE codactiv = ?";
    sql += " AND codfamia = ?";
    sql += " AND fechadto <= ?";
    sql = mysql.format(sql, [codactiv, codfamia, new Date()]);
    var connection = conector.getConnectionAriges();
    connection.query(sql, function (err, result) {
        if (err) {
            conector.closeConnection(connection);
            callback(err);
            return;
        }
        if (result && (result.length > 0)) {
            var r = result[0];
            precio.dto1 = r.dtoline1;
            precio.dto2 = r.dtoline2;
        }
        conector.closeConnection(connection);
        callback(null, precio);
    });
}

// decuento AM (actividad / marca)
var getDescuentoAM = function (codartic, codmarca, codactiv, precio, callback) {
    var sql = "SELECT dtoline1, dtoline2 from sdtofm";
    sql += " WHERE codactiv = ?";
    sql += " AND codmarca = ?";
    sql += " AND fechadto <= ?";
    sql = mysql.format(sql, [codactiv, codmarca, new Date()]);
    var connection = conector.getConnectionAriges();
    connection.query(sql, function (err, result) {
        if (err) {
            conector.closeConnection(connection);
            callback(err);
            return;
        }
        if (result && (result.length > 0)) {
            var r = result[0];
            precio.dto1 = r.dtoline1;
            precio.dto2 = r.dtoline2;
        }
        conector.closeConnection(connection);
        callback(null, precio);
    });
}

var getSobreResto = function (callback2) {
    var sql = "SELECT tipodtos from spara1";
    var connection = conector.getConnectionAriges();
    connection.query(sql, function (err, result) {
        if (err) {
            conector.closeConnection(connection);
            callback2(err);
            return;
        }
        if (result && (result.length > 0)) {
            var r = result[0];
        }
        conector.closeConnection(connection);
        callback2(null, r === 1);
    });
}

var calcularDescuento = function (precio, callback2) {
    var p = precio;
    getSobreResto(function (err, res) {
        if (err) {
            callback2(err);
            return;
        } else {
            if (res) {
                // cálculo de descuento sobre el resto
                p.importe = p.pvp - ((p.pvp * p.dto1) / 100);
                p.importe = p.importe - ((p.importe * p.dto2) / 100);
            } else {
                // no sobre el resto
                p.importe = p.pvp - ((p.pvp * (p.dto1 + p.dto2)) / 100);
            }
            callback2(null, p);
        }
    });
}
