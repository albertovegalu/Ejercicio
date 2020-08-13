var app = angular.module('TiendaApp', ['ngRoute', 'ui.router', 'ngMaterial', 'ngMessages'])
    .config(['$stateProvider', '$urlRouterProvider','$routeProvider', function ($stateProvider, $urlRouterProvider, $routeProvider) {

        $routeProvider
            .when('/Demo', {
                templateUrl: 'Views/Demo.html',
                controller: 'DemoController'
            })
            .when('/ConsultarClientes', {
                templateUrl: 'Views/Clientes/ConsultarClientes.html',
                controller: 'ClientesController'
            })
            .when('/Cliente', {
                templateUrl: 'Views/Clientes/Cliente.html',
                controller: 'ClienteController'
            })
            .when('/ConsultarTiendas', {
                templateUrl: 'Views/Tiendas/ConsultarTiendas.html',
                controller: 'TiendasController'
            })
            .when('/Tienda', {
                templateUrl: 'Views/Tiendas/Tienda.html',
                controller: 'TiendaController'
            })
            .when('/ConsultarVentas', {
                templateUrl: 'Views/Ventas/ConsultarVentas.html',
                controller: 'VentasController'
            })
            .when('/Venta', {
                templateUrl: 'Views/Ventas/Venta.html',
                controller: 'VentaController'
            })
            .when('/MayoresCompras', {
                templateUrl: 'Views/Ventas/MayoresCompras.html',
                controller: 'MayoresComprasController'
            })
            .otherwise({
                redirectTo: '/'
            });

        $stateProvider
            ///Demo
            .state('Demo', {
                url: "/Demo",
                templateUrl: "Views/Demo.html",
                controller: 'DemoController'
            })
            .state('ConsultarClientes', {
                url: "/ConsultarClientes",
                templateUrl: "Views/Clientes/ConsultarClientes.html",
                controller: 'ClientesController'
            })
            .state('Cliente', {
                url: "/Cliente",
                templateUrl: "Views/Clientes/Cliente.html",
                controller: 'ClienteController',
                params: { client: null }
            })
            .state('ConsultarTiendas', {
                url: "/ConsultarTiendas",
                templateUrl: "Views/Tiendas/ConsultarTiendas.html",
                controller: 'TiendasController'
            })
            .state('Tienda', {
                url: "/Tienda",
                templateUrl: "Views/Tiendas/Tienda.html",
                controller: 'TiendaController',
                params: { store: null }
            })
            .state('ConsultarVentas', {
                url: "/ConsultarVentas",
                templateUrl: "Views/Ventas/ConsultarVentas.html",
                controller: 'VentasController'
            })
            .state('Venta', {
                url: "/Venta",
                templateUrl: "Views/Ventas/Venta.html",
                controller: 'VentaController',
                params: { sell: null }
            })
            .state('MayoresCompras', {
                url: "/MayoresCompras",
                templateUrl: "Views/Ventas/MayoresCompras.html",
                controller: 'MayoresComprasController'
            });

        $urlRouterProvider.otherwise("/");
    }]);

app.config(function ($httpProvider) {

});

app.run(['$rootScope', '$location', '$state', '$mdToast', function ($rootScope, $location, $state, $mdToast) {
    $rootScope.redirection = function (viewName, parameter) {
        var param = parameter === null ? {} : parameter;

        $state.go(viewName, param);
    };

    ///Toast
    var last = {
        bottom: false,
        top: true,
        left: false,
        right: true
    };

    var toastPosition = angular.extend({}, last);

    function sanitizePosition() {
        var current = toastPosition;

        if (current.bottom && last.top) current.top = false;
        if (current.top && last.bottom) current.bottom = false;
        if (current.right && last.left) current.left = false;
        if (current.left && last.right) current.right = false;

        last = angular.extend({}, current);
    }

    function getToastPosition() {
        sanitizePosition();

        return Object.keys(toastPosition)
            .filter(function (pos) { return toastPosition[pos]; })
            .join(' ');
    }

    $rootScope.showToast = function (message) {
        var pinTo = getToastPosition();

        $mdToast.show(
            $mdToast.simple()
                .textContent(message)
                .position(pinTo)
                .hideDelay(3000)
        );
    };

    var host = $location.host();

    if (host === "localhost") {
        host += ":" + $location.port();
    }

    $rootScope.baseUrl = $location.protocol() + "://" + host;
}]);