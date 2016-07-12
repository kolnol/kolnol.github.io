/**
 * Created by Nokid on 12/07/16.
 */
'use strict';

var model={
    questions:[],
    user:{},
    countOfChapters:5
};

var brmApp = angular.module("brmApp",['ui.materialize']);

brmApp.controller("MainAppCtrl", function ($scope,$http) {
    $scope.data=model;

    $scope.servUrl="http://85.214.195.89:8080/questions/getAll";
    $scope.testUrl="questions.json";

    $http.get($scope.testUrl).success(function (data, status, headers, config) {
        if(data){
            $scope.data.questions=data;
            $scope.actualQuestion=$scope.data.questions[0];
        }
    });

    $scope.goToQuestion=function (question) {
        $scope.actualQuestion=question;
    };

    $scope.getRangeForChapters=function () {
        return new Array($scope.data.countOfChapters);
    }

});