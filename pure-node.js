// const fs = require('fs');

// fs.writeFile('user-data.txt', 'username=Alex', err => {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log('Wrote to file!');
//     }
// });

// fs.readFile('user-data.txt', (err, data) => {
//     if (err) {
//         console.log(err);
//         return;
//     }
//     console.log(data.toString());
// });

const http = require('http');

const server = http.createServer((request, response) => {
    let body = [];
    console.log(request.method, request.url);

    request.on('data', (chunk) => {
        body.push(chunk);
    });
    request.on('end', () => {
        body = Buffer.concat(body).toString();
        let userName = 'unknown user';

        if (body) {
            userName = body.split('=')[1];
        }

        response.setHeader('Content-Type', 'text/html');
        response.write(
            `<h1>Hi ${userName}</h1><form method="POST" action="/"><input name="username" type="text"><button type="submit">Send</button></form>`
        );
        response.end();
    });
});

server.listen(3000);
