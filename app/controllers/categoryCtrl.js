/*
 * FileName:categoryCtrl.js
 * CreatedBy: Vamsee
 * Date :16-10-2016
 * Purpose : Creating appyStore using AngularJS
 */
angular.module('appyStore')

    /*Creating the categoryCtrl for showing the categorylist*/
    .controller('categoryCtrl', function ($scope, $http, $q) {

        /*Url which contains the category list*/
        var url = 'http://beta.appystore.in/appy_app/appyApi_handler.php?method=getCategoryList&content_type=videos&limit_start=0&age=1.5&incl_age=5';

        /*Calling the Rest api*/
        $http.get('http://beta.appystore.in/appy_app/appyApi_handler.php?method=getCategoryList&content_type=videos&limit_start=0&age=1.5&incl_age=5', {
            headers: {
                'Access-Control-Allow-Origin': 'true',
                'Access-Control-Allow-Methods': 'PUT, GET, POST,PATCH,OPTIONS,DELETE',
                'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept,X-Auth-Token',
                'X_APPY_USERID': '290903782',
                'X_APPY_API_KEY': 'gh610rt23eqwpll',
                'X_APPY_USERID': '290903782',
                'X_APPY_IMEI': '353368070301951',
                'X_APPY_PCP_ID': '999',
                'X_APPY_CAMPAIGN_ID': '8700441600',
                'X_APPY_APP_TYPE': 'lite',
                'X_APPY_TTR': '10800000',
                'X_APPY_UTYPE': 'O',
                'X_APPY_MSISDN': '0',
                'X_APPY_IS_NEW_USER': 'N',
                'X_APPY_UserAgent': 'Mozilla/5.0 (Linux; Android 5.0.2; Panasonic ELUGA Switch Build/LRX22G; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/51.0.2704.81 Mobile Safari/537.36'
            }
            
            /*Reading the response from the user */
        }).then(function (response) {
            console.log(response);
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
                dir: 'ltr',
                width: 360,
                height: 220,
                space: 220,
                clicking: true,
                scrolling: true,
                //  autoRotationSpeed: 15000,
                loop: true
            };

            /*Iterating through the result and adding to the scope.slides object */
            angular.forEach($scope.result, function (i) {
                $scope.slides.push({
                    'src': i.image_path['50x50'],
                    'caption': i.category_name,
                    'catid': i.category_id,
                    'pcatid': i.parent_category_id,
                    'count': i.content_count
                });
            })
            console.log($scope.slides);
        });
    });
