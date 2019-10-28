'use strict'

const express = require('express');
const authRouter = express.Router();
const usuarioController=require('../controllers/authController');

authRouter.post('/registro',usuarioController.registrarBibliotecario);
authRouter.post('/login',usuarioController.loginUsuario);


module.exports = authRouter;