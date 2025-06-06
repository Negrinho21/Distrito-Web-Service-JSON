
const express = require('express');
const cors = require('cors');
const app = express();
const path = require('path');
const port = 8000;

// Dados simulados (JSON local)
const distritos = require('./data/distritos.json');

// Habilita CORS para todas as origens
app.use(cors());

// Parse de JSON no corpo (caso futuro de POST/PUT)
app.use(express.json());
app.use(express.static(path.join(__dirname)));

// Endpoint para listar todos os distritos
app.get('/api/distritos', (req, res) => {
  res.json(distritos);
});
app.get('/api/document', (req, res) => {
  res.sendFile(path.join(__dirname, 'doc.html'));
});
app.get('/', (req, res) => {
  res.redirect('/api/document');
});
// Endpoint para mostrar um distrito específico por ID
app.get('/api/distritos/id/:id', (req, res) => {
  const distrito = distritos.find(d => d.id == req.params.id);
  if (distrito) {
    res.json(distrito);
  } else {
    res.status(404).json({ message: 'Distrito não encontrado' });
  }
});

// Endpoint para buscar por nome (case‑insensitive)
app.get('/api/distritos/nome/:nome', (req, res) => {
  const nome = req.params.nome.toLowerCase();
  const distrito = distritos.find(d => d.nome.toLowerCase() === nome);
  if (distrito) {
    res.json(distrito);
  } else {
    res.status(404).json({ message: 'Distrito não encontrado' });
  }
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
