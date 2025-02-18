import { createServer } from 'node:http';
import { createWriteStream } from 'node:fs';
import { readFile } from 'node:fs'; 
import { URL } from 'url';
const logStream = createWriteStream('log.txt', { flags: 'a' });
const server = createServer((req, res) => {
  const reqUrl = new URL(req.url, 'http://localhost');

  switch (reqUrl.pathname) {
    case '/': {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('Hello World!\n');
        break;
    }
    
    case '/user': {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('User\n');
        break;
    }
    
    case '/favicon.ico': {
        readFile("C:\\Users\\Fedor\\.vscode\\cli\\favicon.ico", (err, data) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'favicon.ico' });
                res.end('Error loading favicon.ico\n');
                return;
            }
            res.writeHead(200, { 'Content-Type': 'favicon.ico' });
            res.end(data);
        });
        break;
    }
    
    default: {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 not found\n');
        break;
    }
  }
  const clientIP = req.socket.remoteAddress;
  const userAgent = req.headers['user-agent'] || 'Unknown';
  const logEntry = `Time: ${new Date().toISOString()}, IP: ${clientIP}, User-Agent: ${userAgent} \n`;

  logStream.write(logEntry);
});

server.listen(4000, '127.0.0.1', () => {
  console.log('Listening on 127.0.0.1:4000');
});
