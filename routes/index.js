'use strict';
var express = require('express');
var router = express.Router();
var path = require('path');
var walk = require('walk'),
      walker;

var Programa = require('../models/programs.js');

// Rutas de Prueba y Mantenimiento

// List of Files and Directories from our './public/programs' folder and return them as an array

router.get('/api/programas/list-dir', function(req, res) {

  var folder = path.join(__dirname, '../public/programs').toString(),
      result = [];

      walker = walk.walk(folder, {followLinks: true});

    walker.on('file', function (root, fileStats, next) {
        result.push(path.join(path.relative(path.join(__dirname, '../public/programs'), root), fileStats.name));
        next();
    });

    walker.on('directory', function (root, dirStatsArray, next) {

      next();
    });
    walker.on('errors', function (root, nodeStatsArray, next) {
      next();
    });

    walker.on('end', function () {
      console.log(result);
      res.json(result);
    });

}
);

// Wonderful route that give a 1.txt file for making proofs

/*
router.get('/api/masive', function(req, res){
  Programa.create({
    'nombre' : 'Algun Programa',
    'resumen' : 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Placeat maiores dolore voluptatem.',
    'url' : '\\programs\\1.txt',
    'descripcion' : 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempore harum quasi numquam eaque blanditiis ex earum aliquid, accusantium placeat iste recusandae laboriosam voluptatibus culpa, quas!',
    'rating' : 0,
    'tipo' : 'documento',
    'fecha' : 'Mon Feb 09 2015 19:35:56 GMT-0400 (Hora estándar oeste, Sudamérica)'
  }, function(err, done){
    if (err) {console.log(err);}
    console.log(done);
    res.redirect('/');
  });
});*/

// Load all programs in a GET
router.get('/api/programas', function(req, res) {
  Programa.find(function(err, programas) {
        if(err){
          res.send(err);
          console.log(err);
        }
        programas.user = [];
        programas.user.push(req.user);
        res.json(programas);
  });
});

// Load a specific Program in a GET

router.get('/api/programas/:programaId', function(req, res){
  Programa.findById(req.params.programaId, function(err, programa){
    if(err){res.send(err); console.log(err);}
    programa.user = [];
    programa.user.push(req.user);
    res.json(programa);
  });
});

router.post('/api/programas', function(req, res){
  var newPrograma = new Programa();

  console.log(req.body.nuevoPrograma);

  newPrograma = req.body.nuevoPrograma;
  newPrograma.url = newPrograma.generateURL(req.body.nuevoPrograma.url);

  newPrograma.save(function(err, programa) {
        if (err) {res.send(err);throw err;}
        console.log('Programa: "' + req.body.newPrograma.nombre +'" creado con exito');
        res.json(programa);
    });

});

// Update a specifc Program with PUT recibing the parameters

router.put('/api/programas/:programaId', function(req, res){
  Programa.findByIdAndUpdate(req.params.programaId, req.body.query, function(err, programa){
    if (err) {console.log(err);}
    console.log('Programa '+ programa.nombre +' Actualizado');
    Programa.find(function(err, programas) {
        if(err){
          res.send(err);
          console.log(err);
        }
        programas.user = [];
        programas.user.push(req.user);
        res.json(programas);
  });
  });
});

// Delete a specific Program. There are not masive delete method.

router.delete('/api/programas/:programaId', function(req, res){
  Programa.remove({_id: req.params.programaId}, function(err, programa){
    if(err){res.send(err); console.log(err);}
    programa.user = [];
    programa.user.push(req.user);
    res.json(programa);
  });
});

// When Trying to GET an Unspecified 'Categoria', You'll be reloaded to HOME (aka: '/api/programas')

router.get('/api/programas/categoria/', function(req, res) {
    res.redirect('/api/programas');
  });

// Load a set of programs from an specific 'Categoria' in a GET

router.get('/api/programas/categoria/:tipo', function(req, res) {
    Programa.find({tipo: req.params.tipo}, function(err, programas) {
      if(err){
          res.send(err);
          console.log(err);
        }
        programas.user = [];
        programas.user.push(req.user);
        res.json(programas);
    });
});

// The magic happens here where DOWNLOADS Starts

router.get('/api/programas/download/:programaId', function(req, res){
  Programa.findById(req.params.programaId, function(err, programa){
    if (err) {res.json(err);console.log('Programa no encontrado: '+ err); return;}
    var file = path.join(__dirname, '../public', programa.url);
    res.download(file, path.basename(file), function(err){
      if (err) {console.log('Error en Descarga: ' + err); res.json(err);}
      else{
        console.log('success');
      }
    });
  });
});
module.exports = router;
