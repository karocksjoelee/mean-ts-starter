import { Request, Response } from 'express';

// * Module dependencies.
const app = require('../app');
const debug = require('debug')('mean-ts-starter:server');
const http = require('http');
const figlet = require('figlet');
const helper = require('../utilities/helper');


// * Get port from environment and store in Express.
const port = helper.normalizePort(process.env.PORT || '7000');
app.set('port', port);


// * Create HTTP server.
const server = http.createServer(app).listen(port, (req: Request, res: Response) => {
  helper.logSuc(figlet.textSync('MEAN-TS-STARTER', { horizontalLayout: 'full' }));
  helper.logSuc(`[SERVER] Running at ${port}`);
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


