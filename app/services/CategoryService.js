angular.module('appyStore')
.factory('CategoryService', function($http,$q) {
            var factory = {};
            var defferred = $q.defer();
            factory.getData = function(catid, pcatid) {
              console.log(catid,pcatid);
              var url = 'http://beta.appystore.in/appy_app/appyApi_handler.php?method=getContentList&content_type=videos&limit=10&offset=0&catid='+catid+'&pcatid='+pcatid+'&age=1.5&incl_age=5'
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
                        greeting = response.data;
                        console.log(greeting);
                        // console.log($scope.greeting);
                    });
                    return defferred.promise;
            }
            return factory;
         });
