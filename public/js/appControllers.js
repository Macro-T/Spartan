(function(){
'use strict';
var controllers = angular.module('appControllers', []);


function HomeCtrl($scope, $http, $timeout) {
    // when landing on the page, get all programs  and show them
    $http.get('/api/programas')
        .success(function(data) {
          if (data.length<1) {$scope.message = {error:'Nada encontrado'};}
          $scope.programas = [];
          $timeout(function () {
            for (var count = 0; count < data.length; count++) {
            $scope.programas.push(data[count]);
            }
          }).then(function(){
            $timeout(function(){
            new WOW().init({offset: 1500});
          });
          });
      })
        .error(function(data) {
            console.log('Error: ' + data);
        });

    $scope.upRatting = function(programId) {
      var URI = '/api/programas/'+programId,
            update = {query:{$inc:{rating:1}}};
      $http.post(URI, update)
      .success(function(data){
          $scope.programas = [];

          $timeout(function () {
            for (var count = 0; count < data.length; count++) {
            $scope.programas.push(data[count]);
            }
          }).then(function(){
            $timeout(function(){
            new WOW().init({offset: 1500});
          });
          });
          toast('Archivo Descargado', 4000);
        }
        )
        .error(function(error){
                  toast('Error :(  <a href="#"  class="red darken-2 white-text" ng-click="getDownload('+ programId +')">Reintentar</a>', 4000);
                }
          );
    };
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
