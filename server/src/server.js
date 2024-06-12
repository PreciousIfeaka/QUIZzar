const app = require('./app');
const http = require('http');
const PORT = process.env.PORT || 8080;

const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`Starting server, listening on localhost:${PORT}`);
});
