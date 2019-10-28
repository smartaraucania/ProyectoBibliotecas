'use strict'

const express = require('express');
const privateRouter = express.Router();
const bibliotecaController= require('../controllers/bibliotecaController');

privateRouter.post('/bibliotecas',bibliotecaController.createBiblioteca);
privateRouter.put('/bibliotecas/:bibliotecaId',bibliotecaController.setBiblioteca);
privateRouter.delete('/bibliotecas/:bibliotecaId',bibliotecaController.deleteBiblioteca);


module.exports = privateRouter;