'use strict';

const http = require('node:http');
const fs = require('node:fs/promises');
const path = require('node:path');

const root = path.join(__dirname, 'public');
const port = Number(process.env.PORT || 3000);
const types = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.webp': 'image/webp',
  '.woff2': 'font/woff2'
};

const server = http.createServer(async (req, res) => {
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    res.writeHead(405, { Allow: 'GET, HEAD' });
    res.end('Method Not Allowed');
    return;
  }

  let pathname;
  try {
    pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
  } catch {
    res.writeHead(400);
    res.end('Bad Request');
    return;
  }

  const filePath = path.resolve(root, `.${pathname === '/' ? '/index.html' : pathname}`);
  const relative = path.relative(root, filePath);
  if (relative.startsWith('..') || path.isAbsolute(relative) || /[\0:]/.test(relative)) {
    res.writeHead(403);
    res.end('Forbidden');
    return;
  }

  try {
    const stat = await fs.stat(filePath);
    if (!stat.isFile()) {
      res.writeHead(404);
      res.end('Not Found');
      return;
    }
    const content = req.method === 'HEAD' ? null : await fs.readFile(filePath);
    res.writeHead(200, {
      'Content-Type': types[path.extname(filePath).toLowerCase()] || 'application/octet-stream',
      'Content-Length': stat.size,
      'Cache-Control': 'no-cache',
      'X-Content-Type-Options': 'nosniff'
    });
    res.end(content);
  } catch (error) {
    const missing = error.code === 'ENOENT' || error.code === 'ENOTDIR';
    res.writeHead(missing ? 404 : 500);
    res.end(missing ? 'Not Found' : 'Internal Server Error');
  }
});

server.on('error', error => {
  console.error(`Server could not start: ${error.message}`);
  process.exitCode = 1;
});

server.listen(port, '127.0.0.1', () => {
  console.log(`Local: http://localhost:${server.address().port}`);
  console.log('Press Ctrl+C to stop.');
});
