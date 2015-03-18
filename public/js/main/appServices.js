(function(){
  'use strict';

var servicios = angular.module('main.appServices', ['ngResource']);
var API = '/api/programas/:id';

function APIService($resource){

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


/*

 var MyResource = $resource('/api/:action/:query',{
        query:'@query'
    }, {
        search: {
            method: 'GET',
            params: {
                action: "search",
                query: '@query'
            }
        }
    });
    return MyResource;

*/

}

function getCategory($http){

  return $http.get(API);

}
servicios
  .factory('APIService', ['$resource', APIService])
  .factory('getCategory', ['$resource', getCategory]);

})();
