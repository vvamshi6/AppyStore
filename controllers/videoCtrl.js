angular.module('appyStore')
.controller('videoCtrl', function($scope, $http) {
  console.log('videoCtrl');
  var url = 'http://beta.appystore.in/appy_app/appyApi_handler.php?method=getContentList&content_type=videos&limit=5&offset=0&catid=175&pcatid=174&age=1.5&incl_age=5';
    $http.get('http://beta.appystore.in/appy_app/appyApi_handler.php?method=getContentList&content_type=videos&limit=5&offset=0&catid=175&pcatid=174&age=1.5&incl_age=5'
    ,{headers:{'Access-Control-Allow-Origin': 'true','Access-Control-Allow-Methods': 'PUT, GET, POST','Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept','X_APPY_USERID':'290903782','X_APPY_API_KEY':'gh610rt23eqwpll'}})
    .then(function(response) {
          console.log(response.data);
            $scope.greeting = response.data;
        });
});
