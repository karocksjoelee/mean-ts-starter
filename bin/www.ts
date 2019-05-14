// * Module dependencies.
import * as http from 'http';
import * as figlet from 'figlet';
import * as mongoose from 'mongoose';
import * as debug from 'debug';
import * as helper from '../utilities/helper';
import * as swaggerCodeGen from '../utilities/code-generator/swagger-json';

import { Request, Response, Application } from 'express';
import { LogType } from '../utilities/interfaces';

const config = require('../../config');
const app: Application = require('../app');
debug(`${config.name.toLowerCase()}:server`);

// * Get port from environment and store in Express.
const port = helper.normalizePort(process.env.PORT || `${config['dev-server-port']}`);
app.set('port', port);

// * MongoDB Connection
// ? https://github.com/Automattic/mongoose/issues/6922#issue-354147871
mongoose.set('useFindAndModify', false);

mongoose.connect(config.mongoDB.URI, { useNewUrlParser: true });
mongoose.connection.on('connected', () => {
  helper.logSuc(`${LogType.mongodb} Mongoose connected with ${config.mongoDB.URI}`);
});
mongoose.connection.on('error', (error: any) => {
  helper.logErr(`${LogType.mongodb} MongoDB Connect Error :`);
  helper.errLogger(error, LogType.mongodb);
});


// * Create HTTP server.
const server = http.createServer(app).listen(port, (req: Request, res: Response) => {
  helper.logSuc(figlet.textSync(`${config.name}`, { horizontalLayout: 'full' }));
  helper.logSuc(`${LogType.server} Running at ${port}`);
  // * CodeGen : Swagger JSON
  const allRoutes = swaggerCodeGen.getAllEndPoints(app._router.stack);
  swaggerCodeGen.generate(allRoutes);
});

// * Listen on provided port, on all network interfaces.
server.listen(port);

// * Event listener for HTTP server "error" event.
server.on('error', (error: any) => {
  if (error.syscall !== 'listen') {
    throw error;
  }
  const bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;
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
server.on('listening', () => {
  const addr = server.address();
  const bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
  debug('Listening on ' + bind);
});


