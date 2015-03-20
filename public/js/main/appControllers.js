(function() {
    'use strict';
    var controllers = angular.module('main.appControllers', ['main.appServices', 'ngAnimate']);

    function HomeCtrl($scope, $rootScope, APIService) {
        $rootScope.title = 'Spartan Downloader';
        $rootScope.selectedCategory = 'categorias';

        // Show all programs calling at the SERVICE

        APIService.getProgramas({query: ''}, function(data){
            if (!data[0]) {$scope.message.error = 'No se Encontraron Programas';}
            $scope.programas = data;
        });

        //Updated programs to have more rating
        $scope.upRatting = function(programId) {
                var update = {id: programId, query: {$inc: {rating: 1 }} };
                APIService.putPrograma(update, function(data){
                  $scope.programas = [];
                  $scope.programas = data;

                  toast('Archivo Descargado', 4000);
                });
        };
    }

    function CategoryCtrl($scope, $stateParams, $rootScope, APIService) {
        $rootScope.title = 'Categoria: ' + $stateParams.cat + ' - Spartan Downloader';
        $rootScope.selectedCategory = $stateParams.cat;

        // Load all programs from a Specific category

        $scope.message = [];

        APIService.getCategoria({tipo: $stateParams.cat}, function(data){
            if (!data[0]) {$scope.message.error = 'No se Encontraron Programas';}
            $scope.programas = data;
        });
    }

    function userController($scope, $state, $rootScope, SecurityService) {
      (function(){
         if ($rootScope.User) {
          $state.go('home');
         }
      })();

      $rootScope.title = 'Zona Administrativa - Spartan Downloader';
      $rootScope.selectedCategory = 'categorias';

        $scope.registrer = false;
        $scope.loginForm = function() {
            $scope.message = [];
            if (!$rootScope.userData) {
             var param = {password: $scope.password, username: $scope.username };

            SecurityService.logearUser(param, function(userData) {
              if (userData.message) {$scope.message.message = userData.message; $('#mensaje').addClass('animated shake'); return 0;}
              $rootScope.User = userData.user;
              $state.go('home');
            });
            }
        };
    }

function adminController($scope, $state, $rootScope, APIService){
   (function(){
         if (!$rootScope.User) {
          $state.go('login');
         }
      })();

      APIService.getProgramas({query: ''}, function(data){
            if (!data[0]) {$scope.message.error = 'No se Encontraron Programas';}
            $scope.programas = data;
        });

        //Updated programs to have more rating
        $scope.upRatting = function(programId) {
                var update = {id: programId, query: {$inc: {rating: 1 }} };
                APIService.putPrograma(update, function(data){
                  $scope.programas = [];
                  $scope.programas = data;

                  toast('Archivo Descargado', 4000);
                });
        };
}

controllers
    .controller('HomeCtrl', ['$scope', '$rootScope', 'APIService', HomeCtrl])
    .controller('CategoryCtrl', ['$scope', '$stateParams', '$rootScope', 'APIService', CategoryCtrl])
    .controller('adminController',['$scope', '$state', '$rootScope', 'APIService', adminController])
    .controller('userController', ['$scope', '$state', '$rootScope', 'SecurityService', userController]);
})();

// https://scotch.io/bar-talk/ideas-and-demos-for-animating-article-headers-on-scroll
// http://weblogs.asp.net/dwahlin/using-an-angularjs-factory-to-interact-with-a-restful-service
