require("dotenv").config();

const http = require("http");
const port = process.env.PORT || 8080;
const host = process.env.HOST || "localhost";

// Array di frasi ispirazionali
const ispiration_quotes = [
    "Il successo &egrave; la somma di piccoli sforzi ripetuti giorno dopo giorno.",
    "Trasforma le tue ferite in saggezza.",
    "La migliore preparazione per domani &egrave; fare il tuo meglio oggi.",
    "Stai guardando le onde, ma ignori il mare."
];

// Funzione che recupera una frase random dall'array delle frasi ispirazionali
function getRandomQuote() {
    return ispiration_quotes[Math.floor(Math.random() * ispiration_quotes.length)];
}

const server = http.createServer((req, res) => {
    console.log(`${req.method} | ${req.url} effettuata`);

    if (req.url === '/favicon.ico') {
        res.writeHead(404);
        res.end();
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
})

server.listen(port, host, () => {
    console.log(`Server in ascolto su http://${host}:${port}/`);
});