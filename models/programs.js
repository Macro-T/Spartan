'use strict';
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var programaSchema = new Schema({
  nombre: {type: String},
  resumen: {type: String},
  url: {type:String},
  descripcion: {type: String},
  fecha: {type: Date, default: Date.now()},
  rating: {type: Number},
  tipo: {type: String, enum: [
      'os', 'crack', 'ide', 'seguridad', 'diseno', 'utilidades', 'documento', 'otros'
    ], default: 'otros'}

});

programaSchema.method.generateURL = function(fileName){
  return '\\programs\\' + fileName;
};

var Programa = mongoose.model('Programa', programaSchema);

module.exports =  Programa;
