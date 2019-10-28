'use strict'

const mongoose = require('mongoose');
const User = require('../models/Usuario');
const Biblioteca=require('../models/Biblioteca');
const Service = require('../services/services');
const bcrypt = require('bcrypt-nodejs');

//Para encryptar password
const saltRounds = 10;
var salt = bcrypt.genSaltSync(saltRounds);

function registrarBibliotecario(req, res) {
    var hashPass = bcrypt.hashSync(req.body.pass, salt);
    const user = new User({
        rut: req.body.rut,
        pass: hashPass,
        rol: 2,
        nombre: req.body.nombre,
        biblioteca: req.body.biblioteca,
        cargo: req.body.cargo,
        email: req.body.email
    }) 
    Biblioteca.findById(req.body.biblioteca).exec((err, bibliotecas) => {
        if (err) return res.status(500).send({ data: `Error al conectar al servidor: ${err}` });
        if (!bibliotecas) return res.status(404).send({ data: "No es encontro biblioteca con esa id" });
        user.save((err) => {
            if (err) return res.status(500).send({ data: `Error al crear usuario ` + err });
            return res.status(200).send({ data: user });
        });
    });

}

//metodo que permite logearse al sistema
function loginUsuario(req, res) {
    User.findOne({
        rut: req.body.rut
    }).select('+pass +rol +token').exec((err, user) => {
        if (err) return res.status(500).send(err.message);

        if (user == null) return res.status(404).send({
            "error": "Usuario no encontrado"
        });

        bcrypt.compare(req.body.pass, user.pass, (err, decrypt) => {
            if (err) return res.status(500).send(err.message);

            if (decrypt) {
                var token = Service.createToken(user);
                user.token = token;

                user.save((err, user) => {
                    if (err) {
                        return res.status(401).send({
                            data: "Un error ha ocurrido con la Base de datos"
                        });
                    }

                    return res.status(200).send({
                        data: token
                    });
                });

            } else {
                return res.status(401).send({
                    data: "Contraseña no corresponde"
                });
            }
        });
    });
}



module.exports = {
    registrarBibliotecario,
    loginUsuario
}