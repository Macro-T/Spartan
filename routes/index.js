'use strict';
String.prototype.capitalize = function(){
    return this.charAt(0).toUpperCase() + this.slice(1).toLowerCase();
};

var express = require('express');
var router = express.Router();
var path = require('path');

var Programa = require('../models/programs.js');


router.get('/api/masive', function(req, res){
  Programa.create({
    'nombre' : 'Algun Programa',
    'resumen' : 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Placeat maiores dolore voluptatem.',
    'url' : '\\programs\\1.txt',
    'descripcion' : 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempore harum quasi numquam eaque blanditiis ex earum aliquid, accusantium placeat iste recusandae laboriosam voluptatibus culpa, quas!',
    'rating' : 0,
    'tipo' : 'IDE',
    'fecha' : 'Mon Feb 09 2015 19:35:56 GMT-0400 (Hora estándar oeste, Sudamérica)'
  }, function(err, done){
    if (err) {console.log(err);}
    console.log(done);
    res.redirect('/');
  });
});




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
    console.log(programa);
    res.json({message: 'Borrado Satisfactoriamente'});
  });
});

router.post('/api/programas/:programaId', function(req, res){
  Programa.findByIdAndUpdate(req.params.programaId, req.body.query, function(err, programa){
    if (err) {console.log(err);}
    Programa.find(function(err, programas) {
        if(err){
          res.send(err);
          console.log(err);
        }
        res.json(programas);
  });
  });
});

router.get('/api/programas/download/:programaId', function(req, res){
  Programa.findById(req.params.programaId, function(err, programa){
    if (err) {res.json(err);console.log('Programa no encontrado: '+ err); return;}
    var file = path.join(__dirname, '../public', programa.url);
    console.log(file);
    res.download(file, path.basename(file), function(err){
      if (err) {console.log('Error en Descarga: ' + err); res.json(err);}
      else{
        console.log('success');
      }
    });
  });
});

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
router.get('/api/category/:tipo', function(req, res) {
    Programa.find({tipo: req.params.tipo}, function(err, programas) {
      if(err){
          res.send(err);
          console.log(err);
        }
        res.json(programas);
    });
});
module.exports = router;
