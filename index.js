const fs = require("fs");
const http = require("http");
const url = require("url");
const port = 8000;

const server = http.createServer((req, res) => {
  path = req.url;
  if ((path == "/") | (path == "/overview")) {
    res.end("afojgjghsaalgj");
  } else if (path == "/products") {
  } else {
    res.writeHead(404, { "Content-type": "text/html" });
    res.end("Page not Found");
  }
});

server.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
