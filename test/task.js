const http = require('http');

const server = http.createServer((req, res) => {
    const url = req.url;

    if (url === '/home') {
        res.setHeader('Content-Type', 'text/plain');
        res.write('Welcome home');
        res.end();
    } else if (url === '/about') {
        res.setHeader('Content-Type', 'text/plain');
        res.write('Welcome to About Us page');
        res.end();
    } else if (url === '/node') {
        res.setHeader('Content-Type', 'text/plain');
        res.write('Welcome to my Node Js project');
        res.end();
    } else {
        res.setHeader('Content-Type', 'text/html');
        res.write('<html>');
        res.write('<head><title>My First Page</title></head>');
        res.write('<body><h1>Hello from my Node.js Server!</h1></body>');
        res.write('</html>');
        res.end();
    }
});

server.listen(5000, () => {
    console.log('Server is listening on port 5000');
});
