angular.module('appyStore')
    .controller('searchCtrl', function ($scope, SearchService, $state) {
        if (!$scope.loading) {
            $scope.loading = true;
        }
        $scope.loading = true;
          $scope.goBack = function() {
                 window.history.back();
             };
        $scope.changeKeyWord = function (keyword) {
            $scope.data = "";
            /*If user not enter the keyword then alerting the user to enter the message*/
            if (!keyword)
                alert('Please	enter	a	search	text');
            /*adding the keyword to textbox variable in scope to display in input box*/
            $scope.textbox = keyword;
            /*Url for searchapi*/
            var url = 'http://beta.appystore.in/appy_app/appyApi_handler.php?method=search&keyword=' + keyword + '&content_type=appsgames&limit=5&offset=0&age=1&incl_age=6';
            console.log(url);
            /*Calling the search service*/
            SearchService.getData(url).then(function (data) {
                /*Taking the count and data from SearchService*/
                $scope.count = data.data.Responsedetails[0].total_count;
                // $scope.data = data.data.Responsedetails[0].data_array;
                console.log($scope.data);
                var url = 'http://beta.appystore.in/appy_app/appyApi_handler.php?method=search&keyword=' + keyword + '&content_type=appsgames&limit=' + $scope.count + '&offset=0&age=1&incl_age=6';
                SearchService.getData(url).then(function (data) {
                    $scope.loading = false;
                    console.log(data);
                    /*Taking the count and data from SearchService*/
                    // $scope.count = data.data.Responsedetails[0].total_count;
                    $scope.data = data.data.Responsedetails[0].data_array;
                    console.log($scope.data);
                });
            });
            /*if user enters the value then sending to searchresult state*/
            if ($scope.textbox) {
                $state.go('.searchResult');
            }
        }
    })