'use strict'

const express = require('express');
const privateRouter = express.Router();
const middleware = require('../middleware/middleware');
const bibliotecaController= require('../controllers/bibliotecaController');
const usuarioController= require('../controllers/usuarioController');
const libroController=require('../controllers/libroController');
//Rutas biblioteca
privateRouter.post('/bibliotecas',middleware.isAuth,middleware.HasRole(1),bibliotecaController.createBiblioteca);
privateRouter.put('/bibliotecas/:bibliotecaId',middleware.isAuth,middleware.HasRole(1),bibliotecaController.setBiblioteca);
privateRouter.delete('/bibliotecas/:bibliotecaId',middleware.isAuth,middleware.HasRole(1),bibliotecaController.deleteBiblioteca);
//Rutas Usuario
privateRouter.get('/usuariolog',middleware.isAuth,usuarioController.getUsuarioLog);
privateRouter.get('/usuario',middleware.isAuth,usuarioController.getUsuarios);
privateRouter.delete('/usuario/:usuarioId',middleware.isAuth,middleware.HasRole(1),usuarioController.eliminarUsuario);
privateRouter.post('/usuario/editpass',middleware.isAuth,usuarioController.editPassUsuarioLog);
privateRouter.post('/usuario/editme',middleware.isAuth,usuarioController.editMe);
privateRouter.get('/usuariorut/:rut',middleware.isAuth,usuarioController.getUserRut);
privateRouter.post('/usuario/:usuarioId',middleware.isAuth,usuarioController.modificarUsuario);
//rutas libros
privateRouter.post('/libros',middleware.isAuth,middleware.HasRole(1),libroController.crear);
privateRouter.delete('/libros/:libroId',middleware.isAuth,middleware.HasRole(1),libroController.eliminar);
privateRouter.put('/libros/:libroId',middleware.isAuth,middleware.HasRole(1),libroController.modificar);


module.exports = privateRouter;