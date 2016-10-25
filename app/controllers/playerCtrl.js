/*
 * FileName:playerCtrl.js
 * CreatedBy: Vamsee
 * Date :16-10-2016
 * Purpose : Creating appyStore using AngularJS
 */

angular.module('appyStore')

    /*Creating the playerCtrl for the ionic app*/
    .controller('playerCtrl', function ($scope, $stateParams, $sce) {

        /*Reading the poster from the Stateparams*/
        $scope.poster = $stateParams.poster;
        var url = $stateParams.url;
        url = $sce.trustAsResourceUrl(url);
        $scope.url = url;
        console.log($stateParams.url);
    })
