"use strict";
exports.__esModule = true;
// * Module dependencies.
var http = require("http");
var figlet = require("figlet");
var mongoose = require("mongoose");
var debug = require("debug");
var interfaces_1 = require("../utilities/interfaces");
var helper = require('../utilities/helper');
var config = require('../../config');
var app = require('../app');
var swaggerCodeGen = require('../utilities/code-generator/swagger-json');
debug(config.name.toLowerCase() + ":server");
// * Get port from environment and store in Express.
var port = helper.normalizePort(process.env.PORT || '7000');
app.set('port', port);
// * MongoDB Connection
// ? https://github.com/Automattic/mongoose/issues/6922#issue-354147871
mongoose.set('useFindAndModify', false);
mongoose.connect(config.mongoDB.URI, { useNewUrlParser: true });
mongoose.connection.on('connected', function () {
    helper.logSuc(interfaces_1.LogType.mongodb + " Mongoose connected with " + config.mongoDB.URI);
});
mongoose.connection.on('error', function (error) {
    helper.logErr(interfaces_1.LogType.mongodb + " MongoDB Connect Error :");
    helper.errLogger(error, interfaces_1.LogType.mongodb);
});
// * Create HTTP server.
var server = http.createServer(app).listen(port, function (req, res) {
    helper.logSuc(figlet.textSync("" + config.name, { horizontalLayout: 'full' }));
    helper.logSuc(interfaces_1.LogType.server + " Running at " + port);
    // * CodeGen : Swagger JSON
    var allRoutes = swaggerCodeGen.getAllEndPoints(app._router.stack);
    swaggerCodeGen.generate(allRoutes);
});
// * Listen on provided port, on all network interfaces.
server.listen(port);
// * Event listener for HTTP server "error" event.
server.on('error', function (error) {
    if (error.syscall !== 'listen') {
        throw error;
    }
    var bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;
    // * handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
});
// * Event listener for HTTP server "listening" event.
server.on('listening', function () {
    var addr = server.address();
    var bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
    debug('Listening on ' + bind);
});
