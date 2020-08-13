'use strict';
app.controller('ClientesController', ['$scope', 'ClientesServiceFactory', '$state', '$rootScope', function ($scope, ClientesServiceFactory, $state, $rootScope) {
    $scope.clients = [];

    $scope.init = function () {
        $scope.getClients();
    };

    $scope.getClients = function () {
        ClientesServiceFactory.getAllClients()
            .then(function (response) {
                if (response.status === 200) {
                    $scope.clients = response.data;
                }
                else {
                    $rootScope.showToast("Ocurrió un error.");
                }
            })
            .catch(function () {
                $rootScope.showToast("Ocurrió un error.");
            });
    };

    $scope.redirection = function (viewName) {
        $state.go(viewName, {});
    };

    $scope.addClient = function () {
        $state.go('Cliente', { client: null });
    };

    $scope.updateClient = function (clientToUpdate) {
        $state.go('Cliente', { client: clientToUpdate });
    };

    $scope.deleteClient = function (idClient) {
        ClientesServiceFactory.deleteClient(idClient)
            .then(function (response) {
                if (response.status === 200) {
                    $scope.getClients();
                    $rootScope.showToast("Registro eliminado.");
                }
                else {
                    $rootScope.showToast("Ocurrió un error.");
                }
            })
            .catch(function () {
                $rootScope.showToast("Ocurrió un error.");
            });
    };

    $scope.init();
}]);