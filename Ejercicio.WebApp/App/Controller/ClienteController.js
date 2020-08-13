'use strict';
app.controller('ClienteController', ['$scope', 'ClientesServiceFactory', '$rootScope', '$state', function ($scope, ClientesServiceFactory, $rootScope, $state) {
    $scope.client = $state.params.client != null ? $state.params.client  : { };

    $scope.init = function () {
       
    };

    $scope.onSubmitForm = function (isValid) {
        if (isValid) {
            if ($scope.client.IdCliente) {
                $scope.updateClient($scope.client);
            }
            else {
                $scope.addClient($scope.client);
            }
        }
    };

    $scope.addClient = function (client) {
        ClientesServiceFactory.addClient(client)
            .then(function (response) {
                if (response.status === 200) {
                    $state.go('ConsultarClientes', {});
                    $rootScope.showToast("Cliente registrado de manera exitosa.");
                }
                else {
                    $rootScope.showToast("Ocurrió un error");
                }
            })
            .catch(function (err) {
                $rootScope.showToast("Ocurrió un error");
            });
    };

    $scope.updateClient = function (client) {
        ClientesServiceFactory.updateClient(client)
            .then(function (response) {
                if (response.status === 200) {
                    $state.go('ConsultarClientes', {});
                    $rootScope.showToast("Cliente actualizado de manera exitosa.");
                }
                else {
                    $rootScope.showToast("Ocurrió un error");
                }
            })
            .catch(function (err) {
                $rootScope.showToast("Ocurrió un error");
            });
    };

    $scope.backtoClients = function () {
        $state.go('ConsultarClientes', {});
    };

    $scope.init();
}]);