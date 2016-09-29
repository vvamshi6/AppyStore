angular.module('appyStore', ['ui.router','angular-carousel-3d','simplePagination','ngTouch','ui.bootstrap'])
    .config(function($stateProvider, $urlRouterProvider) {
      console.log('config');
        $urlRouterProvider.otherwise('/categories');
        $stateProvider
            // .state('player', {
            //     url: '/player',
            //     templateUrl: 'template/player.html',
            //     controller: 'playerCtrl'
            // })
            .state('categories', {
                url: '/categories',
                templateUrl: 'templates/categories.html',
                controller: 'categoryCtrl'
            })
            .state('videos',{
              url: '/?pcatid?catid',
              templateUrl : 'templates/videos.html',
              controller : 'videoCtrl'
            })
            .state('player',{
              url:'/player?url?poster?pcatid?catid',
              templateUrl:'templates/play.html',
              controller:'videoCtrl'
            })
    });
