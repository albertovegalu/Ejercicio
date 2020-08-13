'use strict';
app.controller('IndexController', ['$scope', '$mdSidenav', '$state', function ($scope, $mdSidenav, $state) {
    $scope.init = function () {};

    $scope.redirection = function (viewName) {
        $state.go(viewName, {});
        $mdSidenav('left').close();
    };

    $scope.toggleLeft = function () {
        $mdSidenav('left').toggle()
            .then(function () {
               
            });
    };

    $scope.close = function () {
        $mdSidenav('left').close()
            .then(function () {
               
            });
    };

    $scope.init();
}]);