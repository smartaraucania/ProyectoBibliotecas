'use strict'
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BibliotecaSchema = Schema({
    nombre : {type:String,required:true,maxlength:50},
    direccion: {type:String,required:true,maxlength:50},
    ciudad:{type:String,required:true,maxlength:50},
    digitoVerificador:{type:String,required:true,maxlength:10,unique:true},
    latitud:{type:String,maxlength:20},
    longitud:{type:String,maxlength:20}
});
module.exports = mongoose.model('Biblioteca', BibliotecaSchema);
