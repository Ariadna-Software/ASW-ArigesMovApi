// conector_mysql.js

var config = require('../../config/mysql_config.json');
var mysql = require('mysql');

module.exports.getConnectionUsuarios = function () {
    var connection = mysql.createConnection( {
        host: config.server,
        user: config.user,
        password: config.password,
        database: config.database_usuarios,
        port: config.port
    });
    connection.connect(function (err) {
        if (err) throw err;
    });
    return connection;
};

module.exports.getConnectionAriges = function () {
    var connection = mysql.createConnection( {
        host: config.server,
        user: config.user,
        password: config.password,
        database: config.database_ariges,
        port: config.port
    });
    connection.connect(function (err) {
        if (err) throw err;
    });
    return connection;
};

module.exports.getConnectionConta = function () {
    var connection = mysql.createConnection( {
        host: config.server,
        user: config.user,
        password: config.password,
        database: config.database_conta,
        port: config.port
    });
    connection.connect(function (err) {
        if (err) throw err;
    });
    return connection;
};


module.exports.closeConnection = function (connection) {
    connection.end(function(err){
        if (err) throw err;
    });
};