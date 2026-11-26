const express = require('express');
const session = require('express-session');
const path = require('path');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({ secret: 'clipzone-secret', resave: false, saveUninitialized: true }));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.use(express.static(__dirname));

// Rota de Login
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    if (username === "admin" && password === "123") {
        req.session.user = username;
        return res.redirect('/dashboard');
    }
    res.send("Usuário ou senha incorretos. <a href='/'>Voltar</a>");
});

app.get('/dashboard', (req, res) => {
    if (!req.session.user) return res.redirect('/');
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(5000, () => console.log('Servidor rodando!'));
