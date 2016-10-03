/*
* FileName:categoryCtrl.js
* CreatedBy: Vamsee
* Date :16-10-2016
* Purpose : Creating appyStore using AngularJS
*/
angular.module('appyStore')
/*Creating the categoryCtrl for showing the categorylist*/
.controller('categoryCtrl', function($scope,$http,$q) {
  /*Url which contains the category list*/
  var url = 'http://beta.appystore.in/appy_app/appyApi_handler.php?method=getCategoryList&content_type=videos&limit_start=0&age=1.5&incl_age=5';
    /*Calling the Rest api*/
    $http.get('http://beta.appystore.in/appy_app/appyApi_handler.php?method=getCategoryList&content_type=videos&limit_start=0&age=1.5&incl_age=5'
    ,{headers:{'Access-Control-Allow-Origin': 'true','Access-Control-Allow-Methods': 'PUT, GET, POST','Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept','X_APPY_USERID':'290903782','X_APPY_API_KEY':'gh610rt23eqwpll'}}).
        then(function(response) {
            console.log(response.data);
            $scope.result = response.data.Responsedetails.category_id_array;
            console.log($scope.result);
            $scope.slides = [];
            $scope.options = {
            sourceProp: 'src',
            visible: 7,
           perspective: 35,
           startSlide: 0,
           border: 0,
           dir: 'rtl',
           width: 500,
           height: 320,
           space: 220,
           clicking:true,
           scrolling:true,
           autoRotationSpeed: 15000,
           loop: true
       };
            angular.forEach($scope.result,function(i){
              $scope.slides.push({'src': i.image_path['50x50'],
              'caption':i.category_name,'catid':i.category_id,'pcatid':i.parent_category_id});
            })
            console.log($scope.slides);
            });
});