const app = require('./app');
const http = require('http');
const PORT = process.env.PORT || 5001;

const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`Starting server, listening on localhost:${PORT}`);
});
