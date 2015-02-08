(function(){
  'use strict';
  var app = angular.module('SpartanD', ['ui.router', 'appControllers']);

  app.config(function($stateProvider, $urlRouterProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
    $urlRouterProvider.otherwise('/');

    $stateProvider
      .state('home', {
        url:'/',
        controller:'HomeCtrl'
      })
      .state('category', {
        url:'/',
        controller:'CategoryCtrl'
      });
  });
}
)();
