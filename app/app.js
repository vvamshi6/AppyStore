/*
* FileName:app.js
* CreatedBy: Vamsee
* Date :16-09-2016
* Purpose : Main Routing application
*/
/*Creating appystore module by using module function and adding required dependencies*/
angular.module('appyStore', ['ui.router', 'angular-carousel-3d', 'simplePagination', 'ngTouch', 'ui.bootstrap','infinite-scroll'])
    /*config method for routing and differnet states in routing*/
    .config(function($stateProvider, $urlRouterProvider,$httpProvider) {
        console.log('config');
        $httpProvider.defaults.useXDomain = true;
        // $httpProvider.defaults.withCredentials = true;
        delete $httpProvider.defaults.headers.common["X-Requested-With"];
        $httpProvider.defaults.headers.common["Accept"] = "application/json";
        $httpProvider.defaults.headers.common["Content-Type"] = "application/json";
        // $httpProvider.defaults.useXDomain = true;
        // delete $httpProvider.defaults.headers.common['X-Requested-With'];
    // $httpProvider.defaults.useXDomain = false;
    // $httpProvider.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
    // $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
    // delete $httpProvider.defaults.headers.common['Content-Type, X-Requested-With'];
        /*Default url for the Routing*/
        $urlRouterProvider.otherwise('/categories');
        $stateProvider
        /*Categories state for displaying the Category list*/
            .state('categories', {
                url: '/categories',
                templateUrl: 'templates/Categories.html',
                controller: 'categoryCtrl'
            })
            /*Videos state for displaying the Content/videos list*/
            .state('videos', {
                url: '/?pcatid?catid?caption?count',
                templateUrl: 'templates/Content.html',
                controller: 'videoCtrl'
            })
            /*player state for playing the videos*/
            .state('player', {
                url: '/player?url?poster?pcatid?catid?count',
                templateUrl: 'templates/Play.html',
                controller: 'videoCtrl'
            })
    });
