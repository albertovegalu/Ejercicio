'use strict';
app.controller('TiendaController', ['$scope', 'TiendaServiceFactory', '$rootScope', '$state', function ($scope, TiendaServiceFactory, $rootScope, $state) {
    $scope.store = $state.params.store != null ? $state.params.store : {};

    $scope.init = function () {

    };

    $scope.onSubmitForm = function (isValid) {
        if (isValid) {
            if ($scope.store.IdTienda) {
                $scope.updateStore($scope.store);
            }
            else {
                $scope.addStore($scope.store);
            }
        }
    };

    $scope.addStore = function (store) {
        TiendaServiceFactory.addStore(store)
            .then(function (response) {
                if (response.status === 200) {
                    $state.go('ConsultarTiendas', {});
                    $rootScope.showToast("Tienda registrada de manera exitosa.");
                }
                else {
                    $rootScope.showToast("Ocurrió un error");
                }
            })
            .catch(function (err) {
                $rootScope.showToast("Ocurrió un error");
            });
    };

    $scope.updateStore = function (store) {
        TiendaServiceFactory.updateStore(store)
            .then(function (response) {
                if (response.status === 200) {
                    $state.go('ConsultarTiendas', {});
                    $rootScope.showToast("Tienda actualizada de manera exitosa.");
                }
                else {
                    $rootScope.showToast("Ocurrió un error");
                }
            })
            .catch(function (err) {
                $rootScope.showToast("Ocurrió un error");
            });
    };

    $scope.backToStores = function () {
        $state.go('ConsultarTiendas', {});
    };

    $scope.init();
}]);