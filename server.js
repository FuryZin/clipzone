const express = require('express');
const path = require('path');
const cors = require('cors');
const app = express();

app.use(cors());

// A parte mágica: isso diz ao servidor para servir os arquivos da pasta frontend
app.use(express.static(path.join(__dirname, '../frontend')));

// Rota principal para carregar o index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
