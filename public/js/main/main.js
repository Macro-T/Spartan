(function(){
  'use strict';
  var app = angular.module('main.SpartanD', ['ui.router', 'main.appControllers']);

  app.config(function($stateProvider, $urlRouterProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
    $urlRouterProvider.otherwise('/');

    $stateProvider
      .state('home', {
        url:'/',
        views:{
          'main':{
            templateUrl: '/templates/main.tpl.html',
            controller:'HomeCtrl'
          }
        }
      })
      .state('category', {
        url:'/category/:cat',
         views:{
          'main':{
            templateUrl: '/templates/main.tpl.html',
            controller:'CategoryCtrl'
          }
        }
      }).state('login',{
          url : '/login',
          views: {
            'main':{
              templateUrl : 'templates/login.tpl.html',
              controller: 'userController'
            }
          }
      }).state('admin',{
          url : '/admin',
          views: {
            'main':{
              templateUrl : 'templates/admin.tpl.html',
              controller: 'adminController'
            }
          }
      });
  });
  app.filter('capitalize', function () {
    return function (input, format) {
      if (!input) {
        return input;
      }
      format = format || 'all';
      if (format === 'first') {
        // Capitalize the first letter of a sentence
        return input.charAt(0).toUpperCase() + input.slice(1).toLowerCase();
      } else {
        var words = input.split(' ');
        var result = [];
        words.forEach(function(word) {
          if (word.length === 2 && format === 'team') {
            // Uppercase team abbreviations like FC, CD, SD
            result.push(word.toUpperCase());
          } else {
            result.push(word.charAt(0).toUpperCase() + word.slice(1).toLowerCase());
          }
        });
        return result.join(' ');
      }
    };
  });

function getUser($http){

}
app.run(['$rootScope', '$http', function($rootScope, $http){
  $rootScope.categorialst = [
    {cat: 'os', nombre: 'OS'},
    {cat: 'crack', nombre: 'Crack'},
    {cat: 'ide', nombre: 'IDE'},
    {cat: 'seguridad', nombre: 'Seguridad'},
    {cat: 'diseno', nombre: 'Diseño'},
    {cat: 'documento', nombre: 'Documentos'},
    {cat: 'utilidades', nombre: 'Utilidades'},
    {cat: 'otros', nombre: 'Otros'} ];

    $http.get('/api/secure/admin')
    .success(function(data){
      if (!data.message) {
        console.log('Encontre al Usuario Logeado');
        console.log(data.user);
        $rootScope.User = data.user;
      }
    }).error(function(err){console.error('Error > '+err); });

}]);
}
)();
