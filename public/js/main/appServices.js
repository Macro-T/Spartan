(function(){
  'use strict';

var servicios = angular.module('main.appServices', ['ngResource']);

function APIService($resource){

  var API = '/api/programas/:id';

  var request = $resource(API, {
    id: '@id'
  },{
    getProgramas : {
      method: 'GET',
      params: {id: '@id'},
      isArray: true
    },
    getCategoria : {
      method: 'GET',
      url: '/api/programas/categoria/:tipo',
      params: {tipo: '/@tipo'},
      isArray: true
    },
    putPrograma : {
      method: 'PUT',
      params: {id: '@id', query: '@query'},
      isArray: true
    }
  });

  return request;
}

function SecurityService($resource){
  var API = '/api/secure/';

  var request = $resource(API, {},{
    logearUser : {
      url: API + 'login',
      method: 'PUT',
      params: {password: '@password', username: '@user'},
      headers: { 'auth-token': 'C3PO R2D2' },
      isArray: false
    }
  });

  return request;

}

servicios
  .factory('APIService', ['$resource', APIService])
  .factory('SecurityService', ['$resource', SecurityService]);

})();
