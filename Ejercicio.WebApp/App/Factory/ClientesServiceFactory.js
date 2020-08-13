'use strict';
app.factory('ClientesServiceFactory', ['$http', '$q', function ($http, $q) {
    var serviceBase = 'https://localhost:44307/';
    var clientesServiceFactory = {};

    var _getAllClients = function () {
        var defered = $q.defer();
        var promise = defered.promise;

        $http.get(serviceBase + 'api/clientes')
            .then(function (data) {
                defered.resolve(data);
            })
            .catch(function (err) {
                defered.reject(err);
            });

        return promise;
    };

    var _addClient = function (cliente) {
        var defered = $q.defer();
        var promise = defered.promise;

        $http.post(serviceBase + 'api/clientes', cliente)
            .then(function (data) {
                defered.resolve(data);
            })
            .catch(function (err) {
                defered.reject(err);
            });

        return promise;
    };

    var _updateClient = function (cliente) {
        var defered = $q.defer();
        var promise = defered.promise;

        $http.put(serviceBase + 'api/clientes', cliente)
            .then(function (data) {
                defered.resolve(data);
            })
            .catch(function (err) {
                defered.reject(err);
            });

        return promise;
    };

    var _deleteClient = function (idCliente) {
        var defered = $q.defer();
        var promise = defered.promise;

        $http.delete(serviceBase + 'api/clientes?idClient='+ idCliente)
            .then(function (data) {
                defered.resolve(data);
            })
            .catch(function (err) {
                defered.reject(err);
            });

        return promise;
    };

    clientesServiceFactory.getAllClients = _getAllClients;
    clientesServiceFactory.addClient = _addClient;
    clientesServiceFactory.updateClient = _updateClient;
    clientesServiceFactory.deleteClient = _deleteClient;

    return clientesServiceFactory;
}]);