'use strict';
app.factory('ClienteTiendaServiceFactory', ['$http', '$q', function ($http, $q) {
    var serviceBase = 'https://localhost:44307/';
    var clienteTiendaServiceFactory = {};

    var _getClientStore = function () {
        var defered = $q.defer();
        var promise = defered.promise;

        $http.get(serviceBase + 'api/clientestiendas')
            .then(function (data) {
                defered.resolve(data);
            })
            .catch(function (err) {
                defered.reject(err);
            });

        return promise;
    };

    var _addSell = function (sell) {
        var defered = $q.defer();
        var promise = defered.promise;

        $http.post(serviceBase + 'api/clientestiendas', sell)
            .then(function (data) {
                defered.resolve(data);
            })
            .catch(function (err) {
                defered.reject(err);
            });

        return promise;
    };

    var _updateSell = function (sell) {
        var defered = $q.defer();
        var promise = defered.promise;

        $http.put(serviceBase + 'api/clientestiendas', sell)
            .then(function (data) {
                defered.resolve(data);
            })
            .catch(function (err) {
                defered.reject(err);
            });

        return promise;
    };

    var _deleteSell = function (idSell) {
        var defered = $q.defer();
        var promise = defered.promise;

        $http.delete(serviceBase + 'api/clientestiendas?idSell=' + idSell)
            .then(function (data) {
                defered.resolve(data);
            })
            .catch(function (err) {
                defered.reject(err);
            });

        return promise;
    };

    var _getMajorPurchases = function () {
        var defered = $q.defer();
        var promise = defered.promise;

        $http.get(serviceBase + 'api/clientestiendas/purchases')
            .then(function (data) {
                defered.resolve(data);
            })
            .catch(function (err) {
                defered.reject(err);
            });

        return promise;
    };

    clienteTiendaServiceFactory.getClientStore = _getClientStore;
    clienteTiendaServiceFactory.addSell = _addSell;
    clienteTiendaServiceFactory.updateSell = _updateSell;
    clienteTiendaServiceFactory.deleteSell = _deleteSell;
    clienteTiendaServiceFactory.getMajorPurchases = _getMajorPurchases;

    return clienteTiendaServiceFactory;
}]);