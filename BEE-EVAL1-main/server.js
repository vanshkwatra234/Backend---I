const http = require('http');
const fs = require('fs');
const qs = require('querystring');

const server = http.createServer((req, res) => {
    if (req.method === 'GET') {
        if (req.url === '/') {

            fs.readFile('index.html', (err, data) => {
                if (err) {
                    res.writeHead(500);
                    res.end('Error loading registration page');
                } 
                else {
                    res.writeHead(200, { 'Content-Type': 'text/html' });
                    res.end(data);
                }
            });
        } 

        else if (req.url === '/allstudents') {
   
            fs.readFile('allstudents.html', (err, data) => {
                if (err) {
                    res.writeHead(500);
                    res.end('Error loading students page');
                } 
                else {
                    res.writeHead(200, { 'Content-Type': 'text/html' });
                    res.end(data);
                }
            });
        } 
        
        else if (req.url === '/api/users') {

            fs.readFile('User.json', (err, data) => {
                if (err) {
                    res.writeHead(500);
                    res.end('Error fetching users');
                } 
                else {
                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.end(data || '[]');
                }
            });
        } 
        
        else if (req.url === '/style.css') {

            fs.readFile('style.css', (err, data) => {
                if (err) {
                    res.writeHead(500);
                    res.end('Error loading CSS');
                } 
                else {
                    res.writeHead(200, { 'Content-Type': 'text/css' });
                    res.end(data);
                }
            });
        }
    } 
    
    else if (req.method === 'POST' && req.url === '/register') {

        let body = '';
        req.on('data', chunk => (body += chunk.toString()));
        req.on('end', () => {
            const user = qs.parse(body);
            
            fs.readFile('User.json', (err, data) => {
                const users = data ? JSON.parse(data) : [];
                users.push(user);
                fs.writeFile('User.json', JSON.stringify(users, null, 2), err => {
                    if (err) {
                        res.writeHead(500);
                        res.end('Error saving user');
                    } 
                    else {
                        res.writeHead(200, { 'Content-Type': 'text/html' });
                        res.end('<h1>Registration Successful!</h1><a href="/">Go Back</a>');
                    }
                });
            });
        });
    } 
    
    else {
        res.writeHead(404);
        res.end('Not Found');
    }
});

server.listen(3000, () => {
    console.log('Server running at http://localhost:3000/');
});
