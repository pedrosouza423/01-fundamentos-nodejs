import http from 'node:http';

const users = [];

const server = http.createServer((req, res) => {
    const { url, method } = req;

    if (url === '/users' && method === 'GET') {
        return res
        .setHeader('Content-Type', 'application/json')
        .end(users.length ? JSON.stringify(users) : 'Nenhum usuário cadastrado');
    }

    if (url === '/users' && method === 'POST') {
        users.push({
            id: 1,
            name: 'John Doe',
            email: 'johndoe@exemple.com'
        });

        return res.writeHead(201).end();
    }

    return res.writeHead(404).end();
});

server.listen(3333);