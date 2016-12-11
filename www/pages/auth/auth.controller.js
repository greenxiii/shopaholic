'use strict';

app.controller('AuthCtrl', ['$scope', 'Auth', '$state', '$ionicPopup', 
  function ($scope, Auth, $state, $ionicPopup) {
  var sh = this;
  $scope.userState = Auth.getUserState();

  $scope.signInUserByEmail = function (formValues) {
    Auth.signInUserByEmail(formValues.email.$modelValue, formValues.password.$modelValue)
      .then(function (response) {
        console.log('User is logged in');
        $state.go('tab.dash');
      }).catch(function (err) {
        $ionicPopup.alert({
          title: 'Error',
          template: err.message
        });
        console.log(err);
      });
  };

  $scope.goToRegistration = function () {
    $state.go('signup');
  };

  $scope.goToLogin = function () {
    $state.go('login');
  };

  $scope.signUpUserByEmail = function (formValues) {
    Auth.createUserByEmail(formValues.email.$modelValue, formValues.password.$modelValue)
      .then(function (response) {
        console.log('User is logged in');
        $state.go('tab.dash');
      }).catch(function (err) {
        $ionicPopup.alert({
          title: 'Error',
          template: err.message
        });
        console.log(err);
      });
  };
}]);
