(function(){
'use strict';
var controllers = angular.module('appControllers', []);


function HomeCtrl($scope, $http) {
    // when landing on the page, get all programs  and show them
    $http.get('/api/programas')
        .success(function(data) {
            $scope.programas = data;
            console.log(data);
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });
}
function CategoryCtrl($scope, $http) {
    // when landing on the page, get just a kind of Program and show them
    $http.get('/api/programas/category/IDE ')
        .success(function(data) {
            $scope.programas = data;
            console.log(data);
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });
}


controllers
  .controller('HomeCtrl', HomeCtrl)
  .controller('CategoryCtrl', CategoryCtrl);
}
)();
