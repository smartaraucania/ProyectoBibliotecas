'use strict'

const mongoose = require('mongoose');
const User = require('../models/Usuario');
const Biblioteca=require('../models/Biblioteca');
const bcrypt = require('bcrypt-nodejs');

//Para encryptar password
const saltRounds = 10;
var salt = bcrypt.genSaltSync(saltRounds);

function getUsuarioLog(req, res) {

}

function getUsuarios(req, res) {
    
}

function modificarUsuario(req, res) {
    
}

function eliminarUsuario(req, res) {
    
}

function editPassUsuarioLog(req, res) {
    
}

function editMe(req, res) {
    
}

function getUserRut(req, res) {
    
}

module.exports = {
    getUsuarioLog,
    getUsuarios,
    modificarUsuario,
    eliminarUsuario,
    editPassUsuarioLog,
    editMe,
    getUserRut
}

