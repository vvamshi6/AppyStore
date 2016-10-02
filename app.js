/*
* FileName:app.js
* CreatedBy: Vamsee
* Date :16-09-2016
* Purpose : Main Routing application
*/
/*Creating appystore module by using module function and adding required dependencies*/
angular.module('appyStore', ['ui.router', 'angular-carousel-3d', 'simplePagination', 'ngTouch', 'ui.bootstrap'])
    /*config method for routing and differnet states in routing*/
    .config(function($stateProvider, $urlRouterProvider) {
        console.log('config');
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
                url: '/?pcatid?catid',
                templateUrl: 'templates/Videos.html',
                controller: 'videoCtrl'
            })
            /*player state for playing the videos*/
            .state('player', {
                url: '/player?url?poster?pcatid?catid',
                templateUrl: 'templates/Play.html',
                controller: 'videoCtrl'
            })
    });
