'use strict'
const mongoose = require('mongoose');
const Biblioteca = require('../models/Biblioteca');
const Libro = require('../models/Libro');

//Muestra todos los libros (paginacion de 20)
function index(req, res) {
    /*const {page,perPage}=req.query;
    const options = {
        page: parseInt(page,10),
        limit: parseInt(perPage,10)
      };*/
    const { page } = req.query;
    const options = {
        page: parseInt(page, 10),
        limit: 20
    };
    Libro.paginate({}, options, function (err, result) {
        if (err) return res.status(500).send({ data: `Error con el servidor: ${err}` });
        return res.status(200).send({ data: result });
    });
}

//Muestro un libro segun su id
function show(req, res) {
    let libroId = req.params.libroId;

    Libro.findById(libroId).populate('biblioteca').exec((err, libro) => {
        if (err) return res.status(500).send({ data: `Error al conectar al servidor: ${err}` });
        if (!libro) return res.status(404).send({ data: "No es encontro libro con esa id" });

        res.status(200).send({ data: libro });
    });
}

//Elimina un libro segun su id
function eliminar(req, res) {
    let libroId = req.params.libroId;

    Libro.findById(libroId, (err, libro) => {
        if (err) return res.status(500).send({ data: `Error con el servidor: ${err}` });
        if (!libro) return res.status(404).send({ data: "No es encontro libro con esa id" });
        libro.remove(err => {
            if (err) return res.status(500).send({ data: `No se pudo borrar libro ${err}` });
            res.status(200).send({ data: 'Libro eliminado correctamente' });
        });
    });
}

//Crear un libro (se adjunto digito verificador)
function crear(req, res) {
    const libro = new Libro({
        registro: req.body.registro,
        autor: req.body.autor,
        titulo: req.body.titulo,
        volumen: req.body.volumen,
        clasificacion: req.body.clasificacion,
        copia: req.body.copia,
        editorial: req.body.editorial,
        anio: req.body.anio,
        procedencia: req.body.procedencia,
        fechaIngreso: req.body.fechaIngreso,
        estado: req.body.estado,
        bp: req.body.bp,
        observacion: req.body.observacion,
        coleccion: req.body.coleccion,
        codigiBarra: req.body.codigiBarra,
        biblioteca: req.body.biblioteca
    });
    Biblioteca.findById(req.body.biblioteca).exec((err, bibliotecas) => {
        if (err) return res.status(500).send({ data: `Error al conectar al servidor: ${err}` });
        if (!bibliotecas) return res.status(404).send({ data: "No es encontro biblioteca con esa id" });
        libro.registro = (bibliotecas.digitoVerificador) + (libro.registro);
        libro.save((err) => {
            if (err) return res.status(500).send({ data: `Error al crear libro ` + err });
            return res.status(200).send({ data: libro });
        });
    });
}

//Modifica un libro según su id
function modificar(req, res) {
    let libroId = req.params.libroId;
    Libro.findById(libroId).exec((err, libro) => {
        if (err) return res.status(500).send({ data: `Error al conectar al servidor: ${err}` });
        if (!libro) return res.status(404).send({ data: "No es encontro libro con esa id" });

        libro.registro = req.body.registro,
            libro.autor = req.body.autor,
            libro.titulo = req.body.titulo,
            libro.volumen = req.body.volumen,
            libro.clasificacion = req.body.clasificacion,
            libro.copia = req.body.copia,
            libro.editorial = req.body.editorial,
            libro.anio = req.body.anio,
            libro.procedencia = req.body.procedencia,
            libro.fechaIngreso = req.body.fechaIngreso,
            libro.estado = req.body.estado,
            libro.bp = req.body.bp,
            libro.observacion = req.body.observacion,
            libro.coleccion = req.body.coleccion,
            libro.codigiBarra = req.body.codigiBarra,
            libro.biblioteca = req.body.biblioteca

        Biblioteca.findById(req.body.biblioteca).exec((err, bibliotecas) => {
            if (err) return res.status(500).send({ data: `Error al conectar al servidor: ${err}` });
            if (!bibliotecas) return res.status(404).send({ data: "No es encontro biblioteca con esa id" });
            libro.registro = (bibliotecas.digitoVerificador) + (libro.registro);
            libro.save((err) => {
                if (err) return res.status(500).send({ data: `Error al crear libro ` + err });
                return res.status(200).send({ data: libro });
            });
        });

    });
}

module.exports = {
    index,
    show,
    eliminar,
    crear,
    modificar
}