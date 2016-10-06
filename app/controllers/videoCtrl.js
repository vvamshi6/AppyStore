/*
* FileName:videoCtrl.js
* CreatedBy: Vamsee
* Date :16-10-2016
* Purpose : Creating appyStore using AngularJS
*/

angular.module('appyStore')
/*Creating the videoCtrl for showing the content list*/
.controller('videoCtrl', function($scope, $http,$stateParams,CategoryService,Pagination,$sce) {
  console.log('videoCtrl');
  /* Pagination for dividing list of items */
  $scope.pagination = Pagination.getNew(10);
  /*Taking state params for different ids*/
  var pcatid = $stateParams.pcatid;
  var catid =  $stateParams.catid;
  var count = $stateParams.count;
  $scope.count = count;
  /*Adding the stateparams to the scope object*/
  $scope.pcatid = pcatid;
  $scope.catid = catid;
  $scope.caption = $stateParams.caption;
  /*Reading the stateparams object*/
  if($stateParams.poster){
    $scope.poster = $stateParams.poster;
  }
  if($stateParams.url){
    var url = $stateParams.url;
    url = $sce.trustAsResourceUrl(url);
    $scope.url = url;
  }
  $scope.images = [1, 2, 3, 4, 5, 6, 7, 8];

  $scope.loadMore = function() {
  var last = $scope.images[$scope.images.length - 1];
    for(var i = 1; i <= 8; i++) {
      $scope.images.push(last + i);
    }
  };
  /* ChangeUrl function for changing the poster and url */
  $scope.changeUrl = function(url,poster){
    console.log(url);
    url = $sce.trustAsResourceUrl(url);
    $scope.url = url;
    var video = document.getElementById("myVideo")
    console.log(poster);
    isSupp = video.canPlayType("video/mp4");
      if (isSupp == "") {
      video.src = "movie.ogg";
  } else {
      video.src = url;
      video.poster = poster;
  }
  video.load();
    if(video){
      console.log("Id is found");
    }
  }
/*Rest api url*/
  var url = 'http://beta.appystore.in/appy_app/appyApi_handler.php?method=getContentList&content_type=videos&limit='+count+'&offset=0&catid='+catid+'&pcatid='+pcatid+'&age=1.5&incl_age=5';
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
            $scope.data = response.data.Responsedetails.data_array;
            console.log($scope.data);
            $scope.pagination.numPages = Math.ceil($scope.data.length/$scope.pagination.perPage);
        });
});
