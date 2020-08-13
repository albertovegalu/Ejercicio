'use strict';
app.controller('MayoresComprasController', ['$scope', 'ClienteTiendaServiceFactory', '$rootScope', function ($scope, ClienteTiendaServiceFactory, $rootScope) {
    $scope.client = {};

    $scope.init = function () {
        $scope.getMajorPurchases();
    };

    $scope.getMajorPurchases = function () {
        ClienteTiendaServiceFactory.getMajorPurchases()
            .then(function (response) {
                if (response.status === 200) {
                    $scope.client = response.data;
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