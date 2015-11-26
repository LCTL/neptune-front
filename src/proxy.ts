import * as http from 'http';
import * as fs from 'fs';
const httpProxy = require('http-proxy');
const proxy = httpProxy.createProxyServer({
  target: 'http://127.0.0.1:3000'
});
const apiPath = /\/api\/(.+)/;
const serveAssetsFile = (req, res) => {
  let path = __dirname + req.url;
  fs.stat(path, (err, stat) => {
    if (stat) {
      if (stat.isDirectory()){
        req.url += 'index.html';
        serveAssetsFile(req, res);
        return;
      }
      res.writeHead(200);
      fs.createReadStream(path).pipe(res);
    } else {
      res.writeHead(404);
      res.end();
    }
  });
};
http.createServer((req, res) => {
  if (apiPath.test(req.url)) {
    req.url = req.url.replace(apiPath, '/$1');
    proxy.web(req, res, (err) => {
      res.writeHead(500);
      res.end(JSON.stringify({
        error: {
          status: 500,
          message: err.code
        }
      }));
    });
  } else {
    serveAssetsFile(req, res);
  }
}).listen(8080);
