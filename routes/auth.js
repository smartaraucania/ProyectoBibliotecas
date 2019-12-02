'use strict'

const express = require('express');
const authRouter = express.Router();
const middleware = require('../middleware/middleware');
const usuarioController=require('../controllers/authController');

authRouter.post('/registroBibliotecario',usuarioController.registrarBibliotecario);
authRouter.post('/registroAdmin',middleware.isAuth,middleware.HasRole([1]),usuarioController.registrarAdmin);
authRouter.post('/registroUser',usuarioController.registrarUsaurio);
authRouter.post('/login',usuarioController.loginUsuario);


module.exports = authRouter;