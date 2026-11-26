const express = require('express');
const path = require('path');
const app = express();

// Serve arquivos estáticos da pasta atual (onde está o server.js e o index.html)
app.use(express.static(__dirname));

// Rota para a raiz
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
