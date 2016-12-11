app.service('Auth', ['$rootScope', '$firebaseAuth', '$localStorage', '$q',
  function Auth($rootScope, $firebaseAuth, $localStorage, $q) {
    // var url = 'https://shopaholic-97fc6.firebaseio.com/';
    // var ref = new Firebase(url);
    var fireAuth = $firebaseAuth();
    var authUser = $localStorage.currentUser || { status: false, data: false };
    var _this = this;

    return {
      createUserByEmail: function (email, password) {
        var deferred = $q.defer();
        fireAuth.$createUserWithEmailAndPassword(email, password)
        .then(function (firebaseUser) {
          $localStorage.currentUser = firebaseUser;
          deferred.resolve(firebaseUser);
        }).catch(function(err) {
          deferred.reject(err);
        });
        return deferred.promise;
      },
      signInUserByEmail: function (email, password) {
        var deferred = $q.defer();
        fireAuth.$signInWithEmailAndPassword(email, password)
        .then(function (firebaseUser) {
          $localStorage.currentUser = firebaseUser;
          deferred.resolve(firebaseUser);
        }).catch(function(err) {
          deferred.reject(err);
        });
        return deferred.promise;
      },
      changeUserPass: function (email, password, newPassword) {
        firebaseObj.changePassword({
          email: email,
          oldPassword: password,
          newPassword: newPassword
        }, function (error) {
          if (error === null) {
            console.log("Password changed successfully");
          } else {
            console.log("Error changing password:", error);
          }
        });
      },
      resetAndSendPassword: function (email) {
        firebaseObj.resetPassword({
          email: email
        }, function (error) {
          if (error === null) {
            console.log("Password reset email sent successfully");
          } else {
            console.log("Error sending password reset email:", error);
          }
        });
      },
      deleteUser: function (email, password) {
        firebaseObj.removeUser({
          email: email,
          password: password
        }, function (error) {
          if (error === null) {
            console.log("User removed successfully");
          } else {
            console.log("Error removing user:", error);
          }
        });
      },
      getUserState: function () {
        console.info(authUser);
        if (authUser.data) {
          var data = firebaseObj.getAuth();
          authUser = {
            status: data ? true : false,
            data: (data == null) ? {} : data
          };
          $localStorage.currentUser = authUser;
        }
        return authUser.status;
      },
      logOut: function () {
        $firebaseAuth(firebaseObj).$unauth();
        $localStorage.currentUser = '';
        $rootScope.$userState = this.getUserState();
      },
      getCurrentUser: function () {
        console.log('Getting currentUser');
        return User.find($localStorage.currentUser).then(function (user) {
          _currentUser = user;
          return user;
        });
      },
      getAuthUser: function () {
        return authUser.data;
      }
    };
  }]);