'use strict'
const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const Schema = mongoose.Schema;

const LibroSchema = Schema({
    registro : {type:String,required:true,maxlength:100},
    autor: {type:String,required:true,maxlength:50},
    titulo:{type:String,required:true,maxlength:50},
    volumen:{type:String,maxlength:50},
    clasificacion:{type:String,required:true,maxlength:50},
    copia:{type:String,required:true,maxlength:20},
    editorial:{type:String,required:true,maxlength:50},
    anio:{type:Number,required:true},
    procedencia:{type:String,required:true,maxlength:30},
    fechaIngreso:{type:Date,required:true},
    estado:{type:String,maxlength:50},
    bp:{type:String,maxlength:100},
    observacion:{type:String,maxlength:500},
    coleccion:{type:String},
    codigoBarra:{type:String,maxlength:150},
    biblioteca:{type: mongoose.Schema.Types.ObjectId, ref: 'Biblioteca'},
    imagen:{type:String}
});

LibroSchema.plugin(mongoosePaginate);
const modelo = mongoose.model('Libro',  LibroSchema); 
modelo.paginate().then({}) // Usage
module.exports = modelo;
