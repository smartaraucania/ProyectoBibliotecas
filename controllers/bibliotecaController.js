'use strict'
const mongoose = require('mongoose');
const Biblioteca = require('../models/Biblioteca')


function getBibliotecas(req, res) {
    Biblioteca.find({}, (err, bibliotecas) => {
        if (err) return res.status(500).send({ data: `Error al conectar al servidor: ${err}` })
        if (!bibliotecas) return res.status(404).send({ data: 'No hay bibliotecas registradas' })
        return res.status(200).send({ data: bibliotecas })
    })
}

function getBiblioteca(req, res) {
    let bibliotecaId = req.params.bibliotecaId;

    Biblioteca.findById(bibliotecaId).exec((err, bibliotecas) => {
        if (err) return res.status(500).send({ data: `Error al conectar al servidor: ${err}` });
        if (!bibliotecas) return res.status(404).send({ data: "No es encontro biblioteca con esa id" });

        res.status(200).send({ data: bibliotecas });
    });
}

function setBiblioteca(req, res) {
    let bibliotecaId = req.params.bibliotecaId;

    Biblioteca.findById(bibliotecaId).exec((err, bibliotecas) => {
        if (err) return res.status(500).send({ data: `Error al conectar al servidor: ${err}` });
        if (!bibliotecas) return res.status(404).send({ data: "No es encontro biblioteca con esa id" });

        bibliotecas.nombre = req.body.nombre,
        bibliotecas.direccion = req.body.direccion,
        bibliotecas.ciudad = req.body.ciudad,
        bibliotecas.digitoVerificador = req.body.digitoVerificador,
        bibliotecas.latitud = req.body.latitud,
        bibliotecas.longitud = req.body.longitud

        bibliotecas.save((err) => {
            if (err) return res.status(401).send({ data: `Error con el servidor: ${err}` });
            res.status(200).send({data:bibliotecas});
        });

    });
}


function deleteBiblioteca(req, res) {
    let bibliotecaId = req.params.bibliotecaId;

    Biblioteca.findById(bibliotecaId, (err, bibliotecas) => {
        if (err) return res.status(500).send({ data: `Error con el servidor: ${err}` });
        if (!bibliotecas) return res.status(404).send({ data: "No es encontro biblioteca con esa id" });
        bibliotecas.remove(err => {
            if (err) return res.status(500).send({ data: `No se pudo borrar biblioteca ${err}` });
            res.status(200).send({ data: 'Biblioteca eliminada correctamente' });
        });
    });
}

function createBiblioteca(req, res) {
    const biblioteca = new Biblioteca({
        nombre : req.body.nombre,
        direccion : req.body.direccion,
        ciudad : req.body.ciudad,
        digitoVerificador : req.body.digitoVerificador,
        latitud : req.body.latitud,
        longitud : req.body.longitud
    })

    biblioteca.save((err) => {
        if (err) return res.status(500).send({ data: `Error al crear biblioteca ` + err });
        return res.status(200).send({ data: biblioteca });
    });
}

function getBibliotecaDigitoVerificador(req,res) {
    let digito = req.params.digito;
    Biblioteca.findOne({
        digitoVerificador: digito
    }).exec((err, biblioteca) => {
        if (err) return res.status(500).send({ data: `Error al conectar al servidor: ${err}` });
        if (!biblioteca) return res.status(404).send({ data: "No es encontro biblioteca con ese digito verificador" });

        res.status(200).send({ data: biblioteca });
    });
}


module.exports = {
    createBiblioteca,
    deleteBiblioteca,
    setBiblioteca,
    getBiblioteca,
    getBibliotecas,
    getBibliotecaDigitoVerificador
}