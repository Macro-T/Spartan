(function() {
    'use strict';
    var controllers = angular.module('main.appControllers', ['main.appServices', 'ngAnimate']);

    function HomeCtrl($scope, $timeout, $rootScope, APIService) {
        $rootScope.title = 'Spartan Downloader';
        $rootScope.selectedCategory = 'categorias';

        // Show all programs calling at the SERVICE

        APIService.getProgramas({query: ''}, function(data){
            if (!data) {$scope.message.error = 'No se Encontraron Programas';}
            $scope.programas = data;
            console.log(data.user);
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

    function CategoryCtrl($scope, $stateParams, $timeout, $rootScope, APIService) {
        $rootScope.title = 'Categoria: ' + $stateParams.cat + ' - Spartan Downloader';
        $rootScope.selectedCategory = $stateParams.cat;

        // Load all programs from a Specific category

        $scope.message = [];

        APIService.getCategoria({tipo: $stateParams.cat}, function(data){
            if (!data[0]) {$scope.message.error = 'No se Encontraron Programas';}
            $scope.programas = data;
        });
    }

    function userController($scope, $http) {

        function userGet(){
          $http.get('/admin')
                  .success(function(data){
                    console.log(data);
                    if (!data.message) {
                      $scope.user = data.user.local.username;
                    }else{
                      $scope.user = 'Login';
                    }
                  })
                  .error(function(err){
                    console.log('Error > '+err);
                    $scope.user = 'Login';
                  });
        }

        $scope.registrer = false;
        $scope.processForm = function() {
            var param = {};

            if (!$scope.registrer) {
                console.log('Voy a Logearme');
                param = {
                    username: $scope.username,
                    password: $scope.password
                };

                $http.post('/login', param)
                    .success(function(data) {
                        $scope.message = data;
                        if (!data.message) {
                            $('#loginModal').closeModal();
                            console.log(data.local.username);
                            $scope.username = data.local.username;
                        }
                    })
                    .error(function(err) {
                        $scope.message = err;
                        console.log('ERROR' + err);
                    });
            } else {
                if ($scope.password !== $scope.repeatPassword) {
                    $scope.message = {
                        message: ['Contraseñas no Coinciden']
                    };
                } else {
                    param = {
                        username: $scope.username,
                        password: $scope.password,
                        email: $scope.email
                    };
                    $http.post('/signup', param)
                        .success(function(data) {
                            console.log('Done ' + data);
                        })
                        .error(function(err) {
                            console.log('Error ' + err);
                        });
                }
            }
        };
    }

controllers
    .controller('HomeCtrl', HomeCtrl)
    .controller('CategoryCtrl', CategoryCtrl)
    .controller('userController', userController);
})();

// https://scotch.io/bar-talk/ideas-and-demos-for-animating-article-headers-on-scroll
// http://weblogs.asp.net/dwahlin/using-an-angularjs-factory-to-interact-with-a-restful-service
