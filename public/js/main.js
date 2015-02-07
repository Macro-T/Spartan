'use strict';
var app = angular.module('SpartanD', []);

function mainController($scope, $http) {
    $scope.formData = {};

    // when landing on the page, get all todos and show them
    $http.get('/api/programas')
        .success(function(data) {
            $scope.programas = data;
            console.log(data);
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });
}
app.controller('mainController', mainController);
