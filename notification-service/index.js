const http = require('http');
const sendEmail = require('./sendMail');
require('dotenv').config()

const server = http.createServer((req, res) => {
    // Configurar encabezados de respuesta
    const url = req.url;
    const method = req.method;
    if (url === "/mail" || url === '/mail/' && method === "POST") {
        let body = '';

        req.on('data', (chunk) => {
            body += chunk;
        });

        req.on("end", async ()=>{
            try {
                const {to, link} = JSON.parse(body);
                await sendEmail(to, link)
                res.writeHead(200, { 'Content-Type': 'text/plain' });
                return res.end('Mail enviado exitosamente');
            } catch (error) {
                res.writeHead(400, { 'Content-Type': 'text/plain' });

                return res.end(error.toString());
            }

        })
    } else {
        // Ruta no encontrada
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Ruta no encontrada\n');
    }

});



const port = process.env.BACK_PORT
server.listen(port, () => {
    console.log(`Servidor en ejecución en http://localhost:${port}/`);
});

