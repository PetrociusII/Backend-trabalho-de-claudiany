const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Campanha = require('../models/campanha');

// Verificar se a pasta Uploads existe
const uploadPath = path.join(__dirname, '../../Uploads');
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
}

// Configurar multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

// Criar campanha
router.post('/', upload.single('image'), async (req, res) => {
  try {
    console.log('Recebida requisição POST /api/campanhas');
    console.log('Body:', req.body);
    console.log('File:', req.file);

    const { title, description, goal } = req.body;
    if (!title || !description || !goal) {
      return res.status(400).json({ message: 'Campos obrigatórios ausentes' });
    }

    const image = req.file ? req.file.path.replace(/^.*Uploads/, 'uploads') : null;
    console.log('Dados da campanha:', { title, description, goal: parseFloat(goal), image });

    const campanha = new Campanha({
      title,
      description,
      goal: parseFloat(goal),
      image,
    });

    console.log('Salvando campanha no MongoDB...');
    await campanha.save();
    console.log('Campanha salva:', campanha);

    res.status(201).json(campanha);
  } catch (error) {
    console.error('Erro ao criar campanha:', {
      message: error.message,
      stack: error.stack,
    });
    res.status(500).json({ message: 'Erro ao criar campanha', error: error.message });
  }
});

// Listar todas as campanhas
router.get('/', async (req, res) => {
  try {
    console.log('Recebida requisição GET /api/campanhas');
    const campanhas = await Campanha.find();
    console.log('Campanhas encontradas:', campanhas);
    res.status(200).json(campanhas);
  } catch (error) {
    console.error('Erro ao listar campanhas:', {
      message: error.message,
      stack: error.stack,
    });
    res.status(500).json({ message: 'Erro ao listar campanhas', error: error.message });
  }
});

// Buscar campanha por ID
router.get('/:id', async (req, res) => {
  try {
    console.log(`Recebida requisição GET /api/campanhas/${req.params.id}`);
    const campanha = await Campanha.findById(req.params.id);
    if (!campanha) {
      return res.status(404).json({ message: 'Campanha não encontrada' });
    }
    console.log('Campanha encontrada:', campanha);
    res.status(200).json(campanha);
  } catch (error) {
    console.error('Erro ao buscar campanha:', {
      message: error.message,
      stack: error.stack,
    });
    res.status(500).json({ message: 'Erro ao buscar campanha', error: error.message });
  }
});

// Atualizar campanha
router.put('/:id', upload.single('image'), async (req, res) => {
  try {
    console.log(`Recebida requisição PUT /api/campanhas/${req.params.id}`);
    console.log('Body:', req.body);
    console.log('File:', req.file);

    const { title, description, goal } = req.body;
    if (!title || !description || !goal) {
      return res.status(400).json({ message: 'Campos obrigatórios ausentes' });
    }

    const updateData = {
      title,
      description,
      goal: parseFloat(goal),
    };

    if (req.file) {
      updateData.image = req.file.path.replace(/^.*Uploads/, 'uploads');
    }

    const campanha = await Campanha.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!campanha) {
      return res.status(404).json({ message: 'Campanha não encontrada' });
    }

    console.log('Campanha atualizada:', campanha);
    res.status(200).json(campanha);
  } catch (error) {
    console.error('Erro ao atualizar campanha:', {
      message: error.message,
      stack: error.stack,
    });
    res.status(500).json({ message: 'Erro ao atualizar campanha', error: error.message });
  }
});

// Registrar doação
router.post('/:id/doacoes', async (req, res) => {
  try {
    console.log(`Recebida requisição POST /api/campanhas/${req.params.id}/doacoes`);
    console.log('Body:', req.body);

    const { amount } = req.body;
    if (!amount || amount <= 0) {
      return res.status(400).json({ message: 'Valor da doação inválido' });
    }

    const campanha = await Campanha.findById(req.params.id);
    if (!campanha) {
      return res.status(404).json({ message: 'Campanha não encontrada' });
    }

    campanha.donations.push({ amount: parseFloat(amount) });
    campanha.totalRaised += parseFloat(amount);

    console.log('Salvando doação no MongoDB...');
    await campanha.save();
    console.log('Doação salva:', campanha);

    res.status(200).json({ message: 'Doação registrada com sucesso', campanha });
  } catch (error) {
    console.error('Erro ao registrar doação:', {
      message: error.message,
      stack: error.stack,
    });
    res.status(500).json({ message: 'Erro ao registrar doação', error: error.message });
  }
});

// Excluir campanha
router.delete('/:id', async (req, res) => {
  try {
    console.log(`Recebida requisição DELETE /api/campanhas/${req.params.id}`);
    const campanha = await Campanha.findByIdAndDelete(req.params.id);
    if (!campanha) {
      return res.status(404).json({ message: 'Campanha não encontrada' });
    }
    console.log('Campanha excluída:', campanha);
    res.status(200).json({ message: 'Campanha excluída com sucesso' });
  } catch (error) {
    console.error('Erro ao excluir campanha:', {
      message: error.message,
      stack: error.stack,
    });
    res.status(500).json({ message: 'Erro ao excluir campanha', error: error.message });
  }
});

module.exports = router;