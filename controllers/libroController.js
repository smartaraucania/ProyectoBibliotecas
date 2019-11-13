'use strict'
const mongoose = require('mongoose');
const Biblioteca = require('../models/Biblioteca');
const Libro = require('../models/Libro');

//Muestra todos los libros (paginacion de 20)
function index(req, res) {
    Libro.find({}, (err, libros) => {
        if (err) return res.status(500).send({ data: `Error al conectar al servidor: ${err}` })
        if (!libros) return res.status(404).send({ data: 'No hay libros registrados' })
        return res.status(200).send({ data: libros })
    })
}

/*
router.get('/products/:page', (req, res, next) => {
  let perPage = 9;
  let page = req.params.page || 1;

  Product
    .find({}) // finding all documents
    .skip((perPage * page) - perPage) // in the first page the value of the skip is 0
    .limit(perPage) // output just 9 items
    .exec((err, products) => {
      Product.count((err, count) => { // count to calculate the number of pages
        if (err) return next(err);
        res.render('products/products', {
          products,
          current: page,
          pages: Math.ceil(count / perPage)
        });
      });
    });
});
*/




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

        libro.registro= req.body.registro,
        libro.autor= req.body.autor,
        libro.titulo= req.body.titulo,
        libro.volumen= req.body.volumen,
        libro.clasificacion= req.body.clasificacion,
        libro.copia= req.body.copia,
        libro.editorial= req.body.editorial,
        libro.anio= req.body.anio,
        libro.procedencia= req.body.procedencia,
        libro.fechaIngreso= req.body.fechaIngreso,
        libro.estado= req.body.estado,
        libro.bp= req.body.bp,
        libro.observacion= req.body.observacion,
        libro.coleccion= req.body.coleccion,
        libro.codigiBarra= req.body.codigiBarra,
        libro.biblioteca= req.body.biblioteca

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