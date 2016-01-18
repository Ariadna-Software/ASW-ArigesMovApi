// AriGesMovApi
console.log("AriGesMovApi --------");
// Cargar los módulos básicos
var express = require('express');
var bodyParser = require("body-parser"); // proceso de los cuerpos de mensaje
var pjson = require('./package.json'); // read vrs and more information
var cors = require('cors'); // cross origin resopurce sharing management

// modulos encargados de las rutas
var usuario_router = require('./lib/usuario/usuario_controller');
var trabajador_router = require('./lib/trabajador/trabajador_controller');
var clientes_router = require('./lib/clientes/clientes_controller');
var cobros_router = require('./lib/cobros/cobros_controller');
var ofertas_router = require('./lib/ofertas/ofertas_controller');
var pedidos_router = require('./lib/pedidos/pedidos_controller');
var albaranes_router = require('./lib/albaranes/albaranes_controller');
var indicadores_router = require('./lib/indicadores/indicadores_controller');
var facturas_router = require('./lib/facturas/facturas_controller');
// express
var app = express();

// leyendo la configuracion 
var config = require('./config/config.json');

// activar el procesador de los cuerpos de mensajes
app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

// CORS management
app.use(cors());


//-------------------------------------------------------------
// RUTAS
//-------------------------------------------------------------

var router = express.Router();

// paso común de cualquier ruta
router.use(function(req, res, next){
	// aquí va el código común
	// ----------------------------
	// continúa la ejecución
	next();
});

// ruta raiz
router.get('/', function (req, res){
    var str = JSON.stringify(pjson, null, 2); //
    res.end(str);
});

//---------- Rutas relacionadas con los usuarios
app.use('/api/usuarios', usuario_router);
//---------- Rutas relacionadas con los trabajadores
app.use('/api/trabajadores', trabajador_router);
//---------- Rutas relacionadas con los clientes
app.use('/api/clientes', clientes_router);
//---------- Rutas relacionadas con la gestión de cobros
app.use('/api/cobros', cobros_router);
//---------- Rutas relacionadas con ofertas
app.use('/api/ofertas', ofertas_router);
//---------- Rutas relacionadas con pedidos
app.use('/api/pedidos', pedidos_router);
//---------- Rutas relacionadas con albaranes
app.use('/api/albaranes', albaranes_router);
//---------- Rutas relacionadas con indicadores
app.use('/api/indicadores', indicadores_router);
//---------- Rutas relacionadas con facturas
app.use('/api/facturas', facturas_router);

// Registrar rutas base
app.use('/api', router);

// START SERVER
//==========================
app.listen(config.apiPort);
console.log("AtriGesMovApiNode en puerto: ", config.apiPort);