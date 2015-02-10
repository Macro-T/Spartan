(function(){
'use strict';
var controllers = angular.module('appControllers', []);


function HomeCtrl($scope, $http, $timeout) {
    // when landing on the page, get all programs  and show them
    $http.get('/api/programas')
        .success(function(data) {
        $scope.programas = [];
          $timeout(function () {
            for (var count = 0; count < data.length; count++) {
              $scope.programas.push(data[count]);
            }
          }).then(function(){
                 $timeout(function(){
                    new WOW().init({offset: 500});
          });
            console.log(data);
        });
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
