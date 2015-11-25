import * as http from 'http';
import * as fs from 'fs';
const httpProxy = require('http-proxy');
const proxy = httpProxy.createProxyServer({
  target: {
    host: '127.0.0.1',
    port: '3000'
  }
});
const apiPath = /\/api\/(.+)/

http.createServer((req, res) => {
  if (apiPath.test(req.url)) {
    req.url = req.url.replace(apiPath, '/$1');
    proxy.web(req, res);
  } else {
    let path = __dirname + req.url;
    fs.stat(path, (err, stats) => {
      if (stats.isDirectory()){
        path += 'index.html';
      }

      fs.exists(path, (exists) => {
        if (exists) {
          res.writeHead(200);
          fs.createReadStream(path).pipe(res);
        } else {
          res.writeHead(404);
          res.end();
        }
      });
    })
  }
}).listen(8080);
