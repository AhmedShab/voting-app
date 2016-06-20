var app = angular.module('votingApp', []);

app.controller('newPollController', ['$scope', '$http', '$window', '$location', function ($scope, $http, $window, $location) {

  $scope.options = [];


  $scope.addOption = function () {
    console.log("Here");
    $scope.options.push({
      text: "text",
      class: "form-control",
      placeholder: "",
      choice : ""
    });
  };


  $scope.saveMyPolls = function () {

    if ( $scope.pollName === undefined || ($scope.optionOne === undefined || $scope.optionTwo === undefined) ) {

      return $window.alert("Please select at least two options with a title");
    }
    var choices = [$scope.optionOne, $scope.optionTwo];

     $scope.options.map((item) => {
       choices.push(item.choice);
     });

    $http.post('/profile/polls', {
      pollName: $scope.pollName,
      options: choices
    } )
      .then(
        function (respond) {
    },
        function (respond) {

    });

    console.log($location);
    $window.location.href = 'polls/my-polls';

  };

  $scope.myPolls = function () {
    console.log("My polls");


  };


}]);

app.controller('getPollsController', ['$scope', '$http', '$window', function ($scope, $http, $window) {
  $scope.polls;
  $http.get('/profile/created-polls', {
  } )
    .then(
      function (respond) {
        // console.log(respond.data);
        $scope.polls = respond.data;
        console.log($scope.polls);
  },
      function (respond) {
  });

  console.log($scope.polls);

}]);

app.controller('pollsController', ['$scope', '$http', '$window', function ($scope, $http, $window) {
  $scope.url =["/profile", "polls/my-polls"];

}]);
