const express = require('express');
const router = express.Router();

router.get('/categories', (req, res) => {
   res.send('Categories Criada Com Sucesso!');
});

router.get('/admin/new/categories', (req, res) => {
   res.send('Nova Categories Criada com Sucesso!');
});

module.exports = router;
