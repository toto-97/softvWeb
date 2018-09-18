'use strict';
angular.module('softvApp').controller('reporteOrdenesMaestroCtrl', reporteOrdenesMaestroCtrl)
    .filter('myStrictFilter', function ($filter, $rootScope) {
        return function (input, predicate) {
            return $filter('filter')(input, predicate, true);
        }
    })
    .filter('unique', function () {
        return function (arr, field) {
            var o = {}, i, l = arr.length, r = [];
            for (i = 0; i < l; i += 1) {
                o[arr[i][field]] = arr[i];
            }
            for (i in o) {
                r.push(o[i]);
            }
            return r;
        };
    });

function reporteOrdenesMaestroCtrl($uibModal, ngNotify, inMenu, ContratoMaestroFactory, $timeout) {

    this.$onInit = function () {
        vm.csvheader = ['Clabe', 'ContratoMaestro', 'NombreComercial', 'Distribuidor', 'Email', 'FechaAsignacion'];
        vm.csvorder = ['Clabe', 'ContratoMaestro', 'Cliente', 'Plaza', 'Email', 'FechaAsignacion'];

        vm.csvheader2 = ['Clabe'];
        vm.csvorder2 = ['Clabe'];
        /*reportesCortesCorporativaFactory.GetReporteClabeMaestro().then(function (data) {
            vm.clabes = data.GetReporteClabeMaestroResult.ClabeMaestro;
            vm.displayCollection = data.GetReporteClabeMaestroResult.ClabeMaestro;
            vm.clabesDisponibles = data.GetReporteClabeMaestroResult.ClabeMaestroDisponible;
            vm.displayCollection2 = data.GetReporteClabeMaestroResult.ClabeMaestroDisponible;
        });*/

    }

    function Genera() {
        var parametros = {};
        parametros.ContratoCliente = vm.ContratoCliente;
        if (vm.ContratoMaestro == '') {
            parametros.ContratoMaestro = 0;
        }
        else {
            parametros.ContratoMaestro = vm.ContratoMaestro;
        }
        if (vm.FechaIni == undefined) {
            parametros.FechaIni = '19000101';
        }
        else {
            parametros.FechaIni = vm.FechaIni;
        }
        if (vm.FechaFin == undefined) {
            parametros.FechaFin = '19000101';
        }
        else {
            parametros.FechaFin = vm.FechaFin;
        }
        ContratoMaestroFactory.GetOrdenesGeneradasContratoMaestro(parametros).then(function (data) {
            vm.ordenes = data.GetOrdenesGeneradasContratoMaestroResult;
            vm.displayCollection = data.GetOrdenesGeneradasContratoMaestroResult;
            console.log(data);
        });

    }

    var vm = this;
    vm.Genera = Genera;
    vm.ContratoMaestro = '';
    vm.ContratoCliente = '';
}