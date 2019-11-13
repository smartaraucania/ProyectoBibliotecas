'use strict'

const mongoose = require('mongoose');
const User = require('../models/Usuario');
const Biblioteca = require('../models/Biblioteca');
const bcrypt = require('bcrypt-nodejs');

//Para encryptar password
const saltRounds = 10;
var salt = bcrypt.genSaltSync(saltRounds);

function getUsuarioLog(req, res) {
    User.findById(req.user.id).select('+rol').exec((err, usuario) => {
        if (err) return res.status(500).send({ data: `Request: ${req}` });
        if (!usuario) return res.status(404).send({ data: "No es encontro usuario con esa id" });
        return res.status(200).send({data:usuario});
    });
}

function getUsuarios(req, res) {
    User.find({}, (err, usuarios) => {
        if (err) return res.status(500).send({ data: `Error al conectar al servidor: ${err}` })
        if (!usuarios) return res.status(404).send({ data: 'No hay usuario registrados' })
        return res.status(200).send({ data: usuarios })
    })
}

function eliminarUsuario(req, res) {
    let usuarioId = req.params.usuarioId;

    User.findById(usuarioId, (err, usuario) => {
        if (err) return res.status(500).send({ data: `Error con el servidor: ${err}` });
        if (!usuario) return res.status(404).send({ data: "No es encontro usuario con esa id" });
        usuario.remove(err => {
            if (err) return res.status(500).send({ data: `No se pudo borrar usuario ${err}` });
            res.status(200).send({ data: 'Usuario eliminado correctamente' });
        });
    });
}

function editPassUsuarioLog(req, res) {
    var oldPassword = req.body.oldPassword || '';
    var newPassword = req.body.newPassword || '';
    var confirmPasword = req.body.confirmPasword || '';

    User.findById(req.user.id).select('+password').exec((err, user) => {
        if (err) return res.status(500).send(err.message);
        if (oldPassword == '' || newPassword == '' || confirmPasword == '') return res.status(401).send({ data: "ingrese datos necesarios" });
        if (!bcrypt.compareSync(oldPassword, user.password)) return res.status(402).send({ data: "Contraseña antigua incorrecta" });
        if (newPassword != confirmPasword) return res.status(403).send({ data: "Las contraseñas no coinciden" });
        user.password = bcrypt.hashSync(newPassword, salt);
        user.save((err) => {
            if (err) return res.status(401).send({ data: "Un error ha ocurrido con la Base de datos" });
            return res.status(200).send({data:user});
        });
    });
}

function editMe(req, res) {
    User.findById(req.user.id).exec((err, user) => {
        if (err) return res.status(500).send(err.message);
        if (!user) return res.status(404).send({ data: "No es encontro usuario con esa id" });
        user.rut = req.body.rut,
            user.nombre = req.body.nombre,
            user.email = req.body.email,
            user.save((err) => {
                if (err) return res.status(401).send({ data: `Error con el servidor: ${err}` });

                return res.status(200).send({data:user});
            });
    })
}

function getUserRut(req, res) {
    let rut = req.params.rut;
    User.findOne({
        rut: rut
    }).exec((err, usuario) => {
        if (err) return res.status(500).send({ data: `Error al conectar al servidor: ${err}` });
        if (!usuario) return res.status(404).send({ data: "No es encontro usuario con ese rut" });

        res.status(200).send({ data: usuario });
    });
}

function modificarUsuario(req, res) {
    let userId = req.params.userId
    User.findById(userId).exec((err, usuario) => {
        if (err) return res.status(500).send({ data: err.message });
        if (!usuario) return res.status(404).send({ data: 'No se encontro usuario con esa id' });
        usuario.rut= req.body.rut,
        usuario.nombre= req.body.nombre,
        usuario.biblioteca= req.body.biblioteca,
        usuario.cargo=req.body.cargo,
        usuario.email= req.body.email
        Biblioteca.findById(req.body.biblioteca).exec((err,biblioteca)=>{
            if (err) return res.status(500).send({ data: err.message });
            if (!biblioteca) return res.status(404).send({ data: 'No se encontro biblioteca con esa id' });
            usuario.save((err) => {
                if (err) return res.status(401).send({ data: `Error con el servidor: ${err}` });
                return res.status(200).send({ data: usuario });
            });
        });

    })
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

