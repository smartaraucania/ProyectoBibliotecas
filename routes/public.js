'use strict'

const express = require('express');
const publicRouter = express.Router();
const bibliotecaController= require('../controllers/bibliotecaController');

publicRouter.get('/bibliotecas',bibliotecaController.getBibliotecas);
publicRouter.get('/bibliotecas/:bibliotecaId',bibliotecaController.getBiblioteca);

module.exports = publicRouter;