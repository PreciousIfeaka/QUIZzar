const app = require('./app');
const http = require('http');
const log = require("./utils/logger");
const port = process.env.PORT || 8080;

const server = http.createServer(app);

server.listen(port, () => {
  log.info(`Starting server, listening on localhost:${port}`);
});
