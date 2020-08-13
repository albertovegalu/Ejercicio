'use strict';
app.factory('TiendaServiceFactory', ['$http', '$q', function ($http, $q) {
    var serviceBase = 'https://localhost:44307/';
    var tiendaServiceFactory = {};

    var _getAllStores = function () {
        var defered = $q.defer();
        var promise = defered.promise;

        $http.get(serviceBase + 'api/tiendas')
            .then(function (data) {
                defered.resolve(data);
            })
            .catch(function (err) {
                defered.reject(err);
            });

        return promise;
    };

    var _addStore = function (tienda) {
        var defered = $q.defer();
        var promise = defered.promise;

        $http.post(serviceBase + 'api/tiendas', tienda)
            .then(function (data) {
                defered.resolve(data);
            })
            .catch(function (err) {
                defered.reject(err);
            });

        return promise;
    };

    var _updateStore = function (tienda) {
        var defered = $q.defer();
        var promise = defered.promise;

        $http.put(serviceBase + 'api/tiendas', tienda)
            .then(function (data) {
                defered.resolve(data);
            })
            .catch(function (err) {
                defered.reject(err);
            });

        return promise;
    };

    var _deleteStore = function (idStore) {
        var defered = $q.defer();
        var promise = defered.promise;

        $http.delete(serviceBase + 'api/tiendas?idStore=' + idStore)
            .then(function (data) {
                defered.resolve(data);
            })
            .catch(function (err) {
                defered.reject(err);
            });

        return promise;
    };

    tiendaServiceFactory.getAllStores = _getAllStores;
    tiendaServiceFactory.addStore = _addStore;
    tiendaServiceFactory.updateStore = _updateStore;
    tiendaServiceFactory.deleteStore = _deleteStore;

    return tiendaServiceFactory;
}]);