'use strict'

const jwt = require('jsonwebtoken');
const config = require('../config');
const User = require('../models/Usuario');

function isAuth(req, res, next){
    if(!req.headers.authorization){
        return res.status(403).send({'Error':'Debe estar logeado'});
    }

    const token = req.headers.authorization.split(" ")[1];
    const payload = jwt.decode(token, config.secret);
    User.findById(payload.id).select('+token').exec((err,user)=>{ 
        if(err) return res.status(406).send({ 'error': 'No se encontro un usuario asociado a la sesion' });
        if(user.token != token) return res.status(403).send({'Error':'Token ya expiro'});
        req.user = user;
        next();
    });
}

function HasRole(role) {
    return function(req, res, next) {
      if(!req.headers.authorization){
        return res.status(403).send({'Error':'Debe estar logeado'});
      }
      const token = req.headers.authorization.split(" ")[1];
      const payload = jwt.decode(token, config.secret);    
      if (role != payload.rol) return res.status(401).send({'Error':'No tiene permisos para acceder'});
      else next();
    }//End function
}//end HasRola

function permitHeader(req, res, next){
  // Dominio que tengan acceso (ej. 'http://example.com')
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Metodos de solicitud que deseas permitir
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');

  // Encabecedados que permites (ej. 'X-Requested-With,content-type')
  res.setHeader('Access-Control-Allow-Headers', '*');

  next();
}


module.exports = {
        isAuth,
        HasRole,
        permitHeader
};