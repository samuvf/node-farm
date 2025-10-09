const fs = require("fs");
const http = require("http");
const url = require("url");
const replaceTemplate = require("./modules/replaceTemplate");
const port = 8000;

const tempOverview = fs.readFileSync(
  `${__dirname}/templates/template-overview.html`,
  "utf-8"
);
const tempCard = fs.readFileSync(
  `${__dirname}/templates/template-card.html`,
  "utf-8"
);
const tempProduct = fs.readFileSync(
  `${__dirname}/templates/template-product.html`,
  "utf-8"
);

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
const dataObj = JSON.parse(data);

const server = http.createServer((req, res) => {
  const { query, pathname } = url.parse(req.url, true);

  if ((pathname === "/") | (pathname === "/overview")) {
    res.writeHead(200, { "Content-type": "text/html" });

    const cardHtml = dataObj
      .map((el) => replaceTemplate(tempCard, el))
      .join("");
    const overview = tempOverview.replace("{%PRODUCT_CARD%}", cardHtml);
    res.end(overview);
  } else if (pathname === "/product") {
    res.writeHead(200, { "Content-type": "text/html" });

    const product = dataObj[query.id];
    const output = replaceTemplate(tempProduct, product);
    res.end(output);
  } else {
    res.writeHead(404, { "Content-type": "text/html" });
    res.end("<h1>Page not Found</h1>");
  }
});

server.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
