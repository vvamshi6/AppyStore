angular.module('appyStore')
.controller('playerCtrl',function($scope,$stateParams,$sce){
  // $scope.trusted = function(url) {
  //       return $sce.trustAsResourceUrl(url);
  //   }
  console.log($stateParams.pcatid);
  console.log($stateParams.catid);
$scope.poster = $stateParams.poster;
    var url = $stateParams.url;
    url = $sce.trustAsResourceUrl(url);
  $scope.url = url;
  function changeUrl(url){
    $scope.url1 = url;
  }
  // $sce.trustAsResourceUrl($scope.url);
  console.log($stateParams.url);
})
