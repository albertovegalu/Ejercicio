'use strict';
app.controller('VentasController', ['$scope', 'ClienteTiendaServiceFactory', '$state', '$rootScope', function ($scope, ClienteTiendaServiceFactory, $state, $rootScope) {
    $scope.sales = [];

    $scope.init = function () {
        $scope.getClientStore();
    };

    $scope.getClientStore = function () {
        ClienteTiendaServiceFactory.getClientStore()
            .then(function (response) {
                if (response.status === 200) {
                    $scope.sales = response.data;
                }
                else {
                    $rootScope.showToast("Ocurrió un error.");
                }
            })
            .catch(function () {
                $rootScope.showToast("Ocurrió un error.");
            });
    };

    $scope.addSell = function () {
        $state.go('Venta', { store: null });
    };

    $scope.updateSell = function (sellToUpdate) {
        $state.go('Venta', { sell: sellToUpdate });
    };

    $scope.deleteSell = function (idSell) {
        ClienteTiendaServiceFactory.deleteSell(idSell)
            .then(function (response) {
                if (response.status === 200) {
                    $scope.getClientStore();
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