const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path'); // Adicionar
const userRoutes = require('./routes/users');
const campanhaRoutes = require('./routes/campanhas');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, '../uploads'))); // Servir imagens

// Rota de teste
app.get('/test', (req, res) => {
  console.log('Requisição recebida em /test');
  res.status(200).json({ message: 'Servidor está respondendo!' });
});

// Rotas
app.use('/api/users', userRoutes);
app.use('/api/campanhas', campanhaRoutes);

// Conexão com MongoDB
const MONGODB_URI = 'mongodb+srv://Pedro:G7FVoWXtkvoQXJWw@cluster0.fp4j1.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Conectado ao MongoDB'))
  .catch((err) => console.error('Erro ao conectar ao MongoDB:', err));

// Iniciar servidor
const PORT = 5000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor rodando na porta ${PORT} em todas as interfaces (0.0.0.0)`);
});