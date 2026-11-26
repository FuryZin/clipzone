const express = require('express');
const session = require('express-session');
const path = require('path');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({ 
    secret: 'clipzone-secret', 
    resave: false, 
    saveUninitialized: true 
}));

// Serve arquivos estáticos da pasta atual
app.use(express.static(__dirname));

// Rota inicial
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Login
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    if (username === "admin" && password === "123") {
        req.session.user = username;
        return res.redirect('/dashboard');
    }
    res.send("Erro de login. <a href='/'>Voltar</a>");
});

// Rota do Dashboard (só acessa se logado)
app.get('/dashboard', (req, res) => {
    if (!req.session.user) return res.redirect('/');
    res.sendFile(path.join(__dirname, 'index.html'));
});

// O Railway exige que você use a porta que ele te der
const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
