import http from 'http';
import * as dotenv from 'dotenv';

dotenv.config();

const PORT: number = +(process.env.SERVER_PORT || 4000);

const server = http.createServer((req, res) => {
  console.log(`server is started on port ${PORT}`);
  res.end();
});

// server.listen(PORT, () => {
//   console.log(`running on port: ${PORT}`);
// });

server.on('clientError', (err, socket) => {
  socket.end('HTTP/1.1 400 Bad Request\r\n\r\n');
});

server.listen(PORT);
