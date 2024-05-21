require("dotenv").config();

const http = require("http");
const port = process.env.PORT || 8080;
const host = process.env.HOST || "localhost";

const server = http.createServer((req, res) => {
    console.log(`${req.method} | ${req.url} effettuata`);

    if (req.url === '/favicon.ico') {
        res.writeHead(404);
        res.end();
        return;
    }

    if (req.url === '/') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(`<h1>${process.env.VAR_HELLO_WORLD}</h1>`);
        return;
    }
})

server.listen(port, host, () => {
    console.log(`Server in ascolto su http://${host}:${port}/`);
});