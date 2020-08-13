'use strict';
app.controller('TiendasController', ['$scope', 'TiendaServiceFactory', '$state', '$rootScope', function ($scope, TiendaServiceFactory, $state, $rootScope) {
    $scope.stores = [];

    $scope.init = function () {
        $scope.getStores();
    };

    $scope.getStores = function () {
        TiendaServiceFactory.getAllStores()
            .then(function (response) {
                if (response.status === 200) {
                    $scope.stores = response.data;
                }
                else {
                    $rootScope.showToast("Ocurrió un error.");
                }
            })
            .catch(function () {
                $rootScope.showToast("Ocurrió un error.");
            });
    };

    $scope.addStore = function () {
        $state.go('Tienda', { store: null });
    };

    $scope.updateStore = function (storeToUpdate) {
        $state.go('Tienda', { store: storeToUpdate });
    };

    $scope.deleteStore = function (idStore) {
        TiendaServiceFactory.deleteStore(idStore)
            .then(function (response) {
                if (response.status === 200) {
                    $scope.getStores();
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