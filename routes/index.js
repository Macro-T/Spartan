'use strict';
String.prototype.capitalize = function(){
    return this.charAt(0).toUpperCase() + this.slice(1).toLowerCase();
};

var express = require('express');
var router = express.Router();

var Programa = require('../models/programs.js');

// GET home page.
router.get('/api/programas', function(req, res) {
  Programa.find(function(err, programas) {
        if(err){
          res.send(err);
          console.log(err);
        }
        res.json(programas);
  });
});

router.get('/api/programa/:programaId', function(req, res){
  Programa.findById(req.params.programaId, function(err, programa){
    if(err){res.send(err); console.log(err);}
    res.json(programa);
  });
});


router.delete('/api/programa/:programaId', function(req, res){
  Programa.remove({_id: req.params.programaId}, function(err, programa){
    if(err){res.send(err); console.log(err);}
    res.json({message: 'Borrado Satisfactoriamente'});
  });
});

router.put('/api/programas/:programaId', function(req, res){
  Programa.findById(req.params.programaId, function(err, programa){
    if(err){res.send(err); console.log('Erro en find: ' + err);}
    programa.nombre = req.body.nombre;
    programa.resumen = req.body.resumen;
    programa.url = req.body.url;
    programa.descripcion = req.body.descripcion;
    programa.fecha = req.body.fecha;
    programa.rating = req.body.rating;
    programa.tipo = req.body.tipo;
  });
});

//Middleware for get the Right Category
function isRightURL (req, res, next) {
  var rigthURI = req.params.tipo.toString().capitalize();
  if (rigthURI !== req.params.tipo.toString()) {
    res.redirect('/api/category/'+rigthURI);
  }else{
    next();
  }
}
router.get('/api/category/', function(req, res) {
  Programa.find(function(err, programas) {
        if(err){
          res.send(err);
          console.log(err);
        }
        res.json(programas);
  });
});

//Get the Category Page
router.get('/api/category/:tipo', isRightURL, function(req, res) {
    Programa.find({tipo: req.params.tipo}, function(err, programas) {
      if(err){
          res.send(err);
          console.log(err);
        }
        if (programas.length === 0) {
             programas = { errMessage: 'No se han encontrado Programas' };
             console.log('Error '+ programas);
        }else{
          res.json(programas);
          console.log('Exito '+ programas);
        }
    });
});
module.exports = router;
