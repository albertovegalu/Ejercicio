'use strict';
app.controller('DemoController', ['$scope', 'ClientesServiceFactory', function ($scope, ClientesServiceFactory) {

    $scope.init = function () {
        $scope.getClients();
    };

    $scope.getClients = function () {
        ClientesServiceFactory.getAllClients()
            .then(function (response) {
                if (response.status === 200) {
                    $scope.categories = response.data;
                }
                else {
                    $rootScope.showToast(response.data.Message);
                }
            })
            .catch(function () {
                //$rootScope.showToast('Ocurrió un error.');
            });
    };

    $scope.init();
}]);