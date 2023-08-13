const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
    const url = req.url;
    const method = req.method;

    if (url === '/') {
        if (method === 'GET') {
            renderFormAndMessages(res);
        } else {
            handleFormSubmission(req, res);
        }
    } else {
        sendDefaultResponse(res);
    }
});

server.listen(5000, () => {
    console.log('Server is listening on port 5000');
});

function renderFormAndMessages(res) {
    fs.readFile('message.txt', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            sendDefaultResponse(res);
            return;
        }

        const messages = data.split('\n').filter(message => message.trim() !== '');
        res.setHeader('Content-Type', 'text/html');
        res.write('<html>');
        res.write('<head><title>Enter Message</title></head>');
        res.write('<body>');
        res.write('<ul>');
        messages.forEach(message => {
            res.write(`<li>${message}</li>`);
        });
        res.write('</ul>');
        res.write('<form action="/" method="POST"><input type="text" name="message"><button type="submit">Send</button></form>');
        res.write('</body>');
        res.write('</html>');
        return res.end();
    });
}

function handleFormSubmission(req, res) {
    const body = [];
    req.on('data', chunk => {
        body.push(chunk);
    });
    req.on('end', () => {
        const parsedBody = Buffer.concat(body).toString();
        const message = parsedBody.split('=')[1];
        
        fs.appendFile('message.txt', message + '\n', err => {
            if (err) {
                console.error(err);
            } else {
                console.log('Message appended to file.');
            }
            res.statusCode = 302;
            res.setHeader('Location', '/');
            return res.end();
        });
    });
}

function sendDefaultResponse(res) {
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head><title>My First Page</title></head>');
    res.write('<body><h1>Hello from my Node.js Server!</h1></body>');
    res.write('</html>');
    res.end();
}
