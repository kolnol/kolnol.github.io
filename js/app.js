/**
 * Created by Nokid on 12/07/16.
 */
'use strict';

var model={
    questions:[],
    user:{},
    countOfChapters:5,
    lectures:[]
};

var brmApp = angular.module("brmApp",['ui.materialize','pdf','ui.router']);

//Router Provider
brmApp.config(function ($stateProvider,$urlRouterProvider) {
    $urlRouterProvider.otherwise('/');

    $stateProvider
        .state('home',{
         url:'/',
         template:'<h1>Home</h1>'
     })
        .state('questions',{
            url:'/questions',
            templateUrl:'html/questionsTab.html',
            controller:'MainAppCtrl'
    })
        .state('pdfLectures',{
            url:'/pdfLectures',
            controller:'PdfLecturesController',
            templateUrl: 'html/pdfTab.html'

    })
        .state('exercises',{
            url:'/exercises',
            templateUrl:'html/exercisesTab.html',
            controller:'MainAppCtrl'
    });
});


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


    /*$http.post($scope.servUrl+'/questions/pushQuestions',$scope.testPostQuestion).then(function successCallback(response) {
        // this callback will be called asynchronously
        // when the response is available
        console.log(response);
    }, function errorCallback(response) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
        console.log(response);
    });*/



    $scope.goToQuestion=function (question) {
        $scope.actualQuestion=question;
    };

    $scope.getRangeForChapters=function () {
        return new Array($scope.data.countOfChapters);
    };

});

brmApp.controller('PdfLecturesController',function ($scope, $http) {

    $scope.pdfUrl = 'f.txt.pdf';

    $scope.data=model;

    $scope.data.lectures=[{
        title:'Einführung',
        pdfUrl:'08-Persistenz.pdf'
    },{
        title:'Second Session',
        pdfUrl:'f.txt.pdf'
    },{
        title:'Third Session',
        pdfUrl:'08-Persistenz.pdf'
    },{
        title:'Final Session',
        pdfUrl:'f.txt.pdf'
    }];

    $scope.getNavStyle = function(scroll) {
        if(scroll > 100) return 'pdf-controls fixed';
        else return 'pdf-controls';
    };

    $scope.getRangeForLectures=function () {
        return $scope.data.lectures;
    };

    $scope.goToLecture=function (lecture) {
        $scope.pdfUrl = lecture.pdfUrl;
    };
});