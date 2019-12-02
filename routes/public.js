'use strict'

const express = require('express');
const publicRouter = express.Router();
const bibliotecaController= require('../controllers/bibliotecaController');
const libroController=require('../controllers/libroController');
//rutas biblioteca
publicRouter.get('/bibliotecas',bibliotecaController.getBibliotecas);
publicRouter.get('/bibliotecas/:bibliotecaId',bibliotecaController.getBiblioteca);
publicRouter.get('/bibliotecadigito/:digito',bibliotecaController.getBibliotecaDigitoVerificador);
//Rutas libros
publicRouter.get('/libros',libroController.index);
publicRouter.get('/libros/:libroId',libroController.show);

module.exports = publicRouter;