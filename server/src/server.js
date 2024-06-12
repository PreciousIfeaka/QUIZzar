const app = require('./app');
const http = require('http');
const port = process.env.PORT || 8080;

const server = http.createServer(app);

server.listen(port, () => {
  console.log(`Starting server, listening on localhost:${port}`);
});
