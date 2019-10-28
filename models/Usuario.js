'use strict'
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UsuarioSchema = Schema({
    rut : {type:String,unique:true,required:true,minlength:7,maxlength:13},
    pass: {type:String,required:true,select:false},
    rol:{type: Number, enum: [1, 2,3], required: true, select: false },
    token:{type:String,select:false},
    nombre:{type:String,maxlength:60},
    biblioteca:{ type: mongoose.Schema.Types.ObjectId, ref: 'Biblioteca',select:false },
    cargo:{type:String,maxlength:60},
    email:{type:String,unique:true,maxlength:100}
});
module.exports = mongoose.model('Usuario', UsuarioSchema);

//Crear un Admin
var User = mongoose.model('Usuario', UsuarioSchema);
const bcrypt = require('bcrypt-nodejs');
const saltRounds = 10;
var salt = bcrypt.genSaltSync(saltRounds);
var pass = bcrypt.hashSync('GaloSepulveda2019', salt);
var adminUser = new User({
    rut : 99999999,
    pass: pass,
    rol:1,
    nombre:admin,
    cargo:admin,
    email:admin
});
User.create(adminUser, function (error) {
});