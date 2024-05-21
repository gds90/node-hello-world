require("dotenv").config();

const http = require("http");
const path = require("path");
const fs = require("fs");

const port = process.env.PORT || 8080;
const host = process.env.HOST || "localhost";
const favicon = path.join(__dirname, 'public', 'favicon.ico');

// Array di frasi ispirazionali
const ispirationQuotes = [
    "Il successo &egrave; la somma di piccoli sforzi ripetuti giorno dopo giorno.",
    "Trasforma le tue ferite in saggezza.",
    "La migliore preparazione per domani &egrave; fare il tuo meglio oggi.",
    "Stai guardando le onde, ma ignori il mare."
];

// Funzione che recupera una frase random dall'array delle frasi ispirazionali
function getRandomQuote() {
    return ispirationQuotes[Math.floor(Math.random() * ispirationQuotes.length)];
}

const server = http.createServer((req, res) => {
    console.log(`${req.method} | ${req.url} effettuata`);

    if (req.url === '/favicon.ico') {
        fs.readFile(favicon, (err, data) => {
            if (err) {
                res.writeHead(404)
                res.end();
                return;
            }
            res.writeHead(200, { 'Content-Type': 'image/*' });
            res.end(data);
        });
        return;
    }

    if (req.url === '/') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(`
            <h1>${process.env.VAR_HELLO_WORLD}</h1>
            <h1>${getRandomQuote()}</h1>
        `);
        return;
    }

    // Gestione delle richieste non trovate
    res.writeHead(404, { 'Content-Type': 'text/html' });
    res.end('<h1>404 - Page not found</h1>');
});

server.listen(port, host, () => {
    console.log(`Server in ascolto su http://${host}:${port}/`);
});