const express = require('express');
const User = require('../models/User');
const router = express.Router();

// Criar um novo usuário
router.post('/', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    console.log('Criando usuário:', { name, email }); // Log para depuração
    const user = new User({ name, email, password });
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    console.error('Erro ao criar usuário:', error);
    res.status(400).json({ message: 'Erro ao criar usuário', error: error.message });
  }
});

// Login de usuário
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log('Tentativa de login:', { email, password }); // Log para depuração
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'E-mail não encontrado' });
    }
    if (user.password !== password) {
      return res.status(400).json({ message: 'Senha incorreta' });
    }
    res.status(200).json({ message: 'Login bem-sucedido', user });
  } catch (error) {
    console.error('Erro no login:', error);
    res.status(500).json({ message: 'Erro ao fazer login', error: error.message });
  }
});

// Listar todos os usuários (opcional, para teste)
router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    console.error('Erro ao listar usuários:', error);
    res.status(500).json({ message: 'Erro ao listar usuários', error: error.message });
  }
});

module.exports = router;