angular
    .module('softvApp')
    .config(function($stateProvider){
        var states = [
            {
                name:'home.atencion',
                abstract: true,
                template: '<div ui-view></div>'
            },
            {
                name: 'home.atencion.todo',
                data: {
                    pageTitle: 'SOFTV | ATENCIÓN'
                },
                url: '/atencion',
                templateUrl: 'views/procesos/atencion.html',
                controller: 'AtencionCtrl',
                controllerAs: '$ctrl'
            },
            {
                name: 'home.atencion.detalle',
                data: {
                    pageTitle: 'SOFTV | ATENCIÓN'
                },
                url: '/atencion/detalle',
                templateUrl: 'views/procesos/atencionDetalle.html',
                controller: 'AtencionDetalleCtrl',
                controllerAs: '$ctrl'
            }
        ];
        states.forEach(function(state) {
            $stateProvider.state(state);
        });
    });
