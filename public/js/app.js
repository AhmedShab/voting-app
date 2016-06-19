var app = angular.module('votingApp', []);

app.controller('newPollController', ['$scope', '$http', '$window', function ($scope, $http, $window) {

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
          console.log(respond.data);
    },
        function (respond) {

    });

    // console.log(choices);

  };

}]);
