(function() {
    'use strict';
    var controllers = angular.module('appControllers', []);

    function HomeCtrl($scope, $http, $timeout) {
        // when landing on the page, get all programs  and show them
        $http.get('/api/programas')
            .success(function(data) {
                if (data.length < 1) {
                    $scope.message = {
                        error: 'Aun no se han Agregado Programas'
                    };
                }
                $scope.programas = [];
                $timeout(function() {
                    for (var count = 0; count < data.length; count++) {
                        $scope.programas.push(data[count]);
                    }
                }).then(function() {
                    $timeout(function() {
                        new WOW().init({
                            offset: 1500
                        });
                    });
                });
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });

        //Updated programs to have more rating
        $scope.upRatting = function(programId) {
            var URI = '/api/programas/' + programId,
                update = {
                    query: {
                        $inc: {
                            rating: 1
                        }
                    }
                };
            $http.post(URI, update)
                .success(function(data) {
                    $scope.programas = [];

                    $timeout(function() {
                        for (var count = 0; count < data.length; count++) {
                            $scope.programas.push(data[count]);
                        }
                    }).then(function() {
                        $timeout(function() {
                            new WOW().init({
                                offset: 1500
                            });
                        });
                    });
                    toast('Archivo Descargado', 4000);
                })
                .error(function(error) {
                    console.log(error);
                });
        };
    }

    function CategoryCtrl($scope, $http, $stateParams, $timeout) {
        // when landing on the page, get just a kind of Program and show them
        $scope.category = $stateParams.cat;
        $http.get('/api/category/' + $scope.category)
            .success(function(data) {
                if (data.length < 1) {
                    $scope.message = {
                        error: 'Nada encontrado en '
                    };
                }
                $scope.programas = [];
                $timeout(function() {
                    for (var count = 0; count < data.length; count++) {
                        $scope.programas.push(data[count]);
                    }
                }).then(function() {
                    $timeout(function() {
                        new WOW().init({
                            offset: 1500
                        });
                    });
                });
            })
            .error(function(data) {
                console.log('Error: ' + data);
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

        userGet();

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

//https://scotch.io/bar-talk/ideas-and-demos-for-animating-article-headers-on-scroll
