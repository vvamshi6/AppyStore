angular.module('appyStore')
.controller('videoCtrl', function($scope, $http,$stateParams,contentService,Pagination) {
    // var promise = contentService.getData();
  console.log('videoCtrl');
  $scope.pagination = Pagination.getNew(9);
  var pcatid = $stateParams.pcatid;
  var catid =  $stateParams.catid;
  $scope.pcatid = pcatid;
  $scope.catid = catid;
  // console.log(pcatid,catid);
  // console.log(CategoryService.getData(pcatid,catid));
  // console.log($stateParams.pcatid);
  // console.log($stateParams.catid);
  // var url = 'http://beta.appystore.in/appy_app/appyApi_handler.php?method=getContentList&content_type=videos&limit=10&offset=0&catid='+catid+'&pcatid='+pcatid+'&age=1.5&incl_age=5';
  var url = 'http://beta.appystore.in/appy_app/appyApi_handler.php?method=getContentList&content_type=videos&limit=133&offset=0&catid='+catid+'&pcatid='+pcatid+'&age=1.5&incl_age=5';



    // var url = 'http://beta.appystore.in/appy_app/appyApi_handler.php?method=getContentList&content_type=videos&limit=10&offset='+offset+'&catid='+catid+'&pcatid='+pcatid+'&age=1.5&incl_age=5';
    console.log(url);

    $http.get(url
    ,{headers:{'Access-Control-Allow-Origin': 'true','Access-Control-Allow-Methods': 'PUT, GET, POST','Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
    'X_APPY_USERID':'290903782','X_APPY_API_KEY':'gh610rt23eqwpll',
    'X_APPY_USERID':'290903782','X_APPY_IMEI':'353368070301951',
    'X_APPY_PCP_ID':'999','X_APPY_CAMPAIGN_ID':'8700441600',
    'X_APPY_APP_TYPE':'lite','X_APPY_TTR':'10800000',
    'X_APPY_UTYPE':'O','X_APPY_MSISDN':'0','X_APPY_IS_NEW_USER':'N',
    'X_APPY_UserAgent':'Mozilla/5.0 (Linux; Android 5.0.2; Panasonic ELUGA Switch Build/LRX22G; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/51.0.2704.81 Mobile Safari/537.36'
    }})
    .then(function(response) {
          // console.log(response.data);
            $scope.greeting = response.data.Responsedetails.data_array;
            console.log($scope.greeting);
            $scope.pagination.numPages = Math.ceil($scope.greeting.length/$scope.pagination.perPage);
        });
});
