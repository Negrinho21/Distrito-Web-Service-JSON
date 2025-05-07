const express = require('express');
const app = express();
const port = 800;

// Dados simulados
const distritos = require('./data/distritos.json');

// Endpoint para listar todos os distritos
app.get('/api/distritos', (req, res) => {
    res.json(distritos);
});

// Endpoint para mostrar um distrito específico
app.get('/api/distritos/id/:id', (req, res) => {
    const distrito = distritos.find(d => d.id == req.params.id);
    if (distrito) {
        res.json(distrito);
    } else {
        res.status(404).send({ message: 'Distrito não encontrado' });
    }
});

app.get('/api/distritos/nome/:nome', (req, res) => {
    const nome = req.params.nome.toLowerCase();
    const distrito = distritos.find(d => d.nome.toLowerCase() === nome);
    if (distrito) {
        res.json(distrito);
    } else {
        res.status(404).send({ message: 'Distrito não encontrado' });
    }
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
