/**
 * Created by Nokid on 12/07/16.
 */
'use strict';

var model={
    questions:[],
    user:{},
    countOfChapters:5
};

var brmApp = angular.module("brmApp",['ui.materialize','pdf']);

brmApp.controller("MainAppCtrl", function ($scope,$http) {
    $scope.data=model;

    $scope.servUrl="http://85.214.195.89:8080";
    $scope.testUrl="questions.json";

    $http.get($scope.servUrl+'/questions/getAll').success(function (data, status, headers, config) {
        if(data){
            $scope.data.questions=data;
            $scope.actualQuestion=$scope.data.questions[0];
        }
    });
    $scope.testPostQuestion=[
        {

            content: "What the fuck is going on????",
            possibleAnswers: ["Answer 1","Answer 2","Answer 3","Answer 4"],
            rightAnswerIndex: 0,
            thema: '',
            kapitel: 1,
            hint: '',
            rightAnswered: false
        }
    ];

    $scope.pdfUrl = 'f.txt.pdf';
    /*$http.post($scope.servUrl+'/questions/pushQuestions',$scope.testPostQuestion).then(function successCallback(response) {
        // this callback will be called asynchronously
        // when the response is available
        console.log(response);
    }, function errorCallback(response) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
        console.log(response);
    });*/

    $scope.getNavStyle = function(scroll) {
        if(scroll > 100) return 'pdf-controls fixed';
        else return 'pdf-controls';
    };

    $scope.goToQuestion=function (question) {
        $scope.actualQuestion=question;
    };

    $scope.getRangeForChapters=function () {
        return new Array($scope.data.countOfChapters);
    };

});