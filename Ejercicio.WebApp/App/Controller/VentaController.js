'use strict';
app.controller('VentaController', ['$scope', 'ClientesServiceFactory', '$state', '$rootScope', 'TiendaServiceFactory', 'ClienteTiendaServiceFactory', function ($scope, ClientesServiceFactory, $state, $rootScope, TiendaServiceFactory, ClienteTiendaServiceFactory) {
    $scope.stores = [];
    $scope.clients = [];

    $scope.venta = $state.params.sell != null ? $state.params.sell : {};

    $scope.init = function () {
        $scope.getAllClients();
        $scope.getStores();
    };

    $scope.getStores = function () {
        TiendaServiceFactory.getAllStores()
            .then(function (response) {
                if (response.status === 200) {
                    if (response.data.length >= 1) {
                        $scope.stores = response.data;

                        if ($scope.venta.IdTienda) {
                            $scope.selectedStore = $scope.stores.filter(x => x.IdTienda == $scope.venta.IdTienda)[0].IdTienda;
                        }
                        else {
                            $scope.selectedStore = null;
                        }
                    }
                    else {
                        $rootScope.showToast("Registre al menos una tienda.");
                        $scope.backToSells();
                    }
                }
                else {
                    $rootScope.showToast("Ocurrió un error.");
                }
            })
            .catch(function () {
                $rootScope.showToast("Ocurrió un error.");
            });
    };

    $scope.getAllClients = function () {
        ClientesServiceFactory.getAllClients()
            .then(function (response) {
                if (response.status === 200) {
                    if (response.data.length >= 1) {
                        $scope.clients = response.data;

                        if ($scope.venta.IdCliente) {
                            $scope.selectedClient = $scope.clients.filter(x => x.IdCliente == $scope.venta.IdCliente)[0].IdCliente;
                        }
                        else {
                            $scope.selectedClient = {};
                        }
                    }
                    else {
                        $rootScope.showToast("Registre al menos un cliente.");
                        $scope.backToSells();
                    }
                }
                else {
                    $rootScope.showToast("Ocurrió un error.");
                }
            })
            .catch(function () {
                $rootScope.showToast("Ocurrió un error.");
            });
    };

    $scope.onSubmitForm = function (isValid) {
        if (isValid) {
            $scope.venta.IdCliente = $scope.selectedClient;
            $scope.venta.IdTienda = $scope.selectedStore;
            $scope.venta.FechaCliente = new Date().toLocaleString();

            if ($scope.venta.Fecha) {
                $scope.updateSell($scope.venta);
            }
            else {
                $scope.addVenta($scope.venta);
            }
        }
    };

    $scope.addVenta = function (sell) {
        ClienteTiendaServiceFactory.addSell(sell)
            .then(function (response) {
                if (response.status === 200) {
                    $scope.backToSells();
                    $rootScope.showToast("Venta registrada de manera exitosa.");
                }
                else {
                    $rootScope.showToast("Ocurrió un error");
                }
            })
            .catch(function (err) {
                $rootScope.showToast("Ocurrió un error");
            });
    };

    $scope.updateSell = function (sell) {
        ClienteTiendaServiceFactory.updateSell(sell)
            .then(function (response) {
                if (response.status === 200) {
                    $scope.backToSells();
                    $rootScope.showToast("Venta actualizada de manera exitosa.");
                }
                else {
                    $rootScope.showToast("Ocurrió un error");
                }
            })
            .catch(function (err) {
                $rootScope.showToast("Ocurrió un error");
            });
    };

    $scope.backToSells = function () {
        $state.go('ConsultarVentas', {});
    };



    $scope.init();
}]);