'use strict';
angular.module('softvApp').controller('reporteCuentaClabeCtrl', reporteCuentaClabeCtrl)
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

function reporteCuentaClabeCtrl($uibModal, ngNotify, inMenu, reportesCortesCorporativaFactory, $timeout) {

    this.$onInit = function () {
        vm.csvheader = ['Clabe', 'ContratoMaestro', 'NombreComercial', 'Distribuidor', 'Email', 'FechaAsignacion'];
        vm.csvorder = ['Clabe', 'ContratoMaestro', 'Cliente', 'Plaza', 'Email', 'FechaAsignacion'];

        vm.csvheader2 = ['Clabe'];
        vm.csvorder2 = ['Clabe'];
        reportesCortesCorporativaFactory.GetReporteClabeMaestro().then(function (data) {
            vm.clabes = data.GetReporteClabeMaestroResult.ClabeMaestro;
            vm.displayCollection = data.GetReporteClabeMaestroResult.ClabeMaestro;
            vm.clabesDisponibles = data.GetReporteClabeMaestroResult.ClabeMaestroDisponible;
            vm.displayCollection2 = data.GetReporteClabeMaestroResult.ClabeMaestroDisponible;
            console.log('vm.clabes',vm.clabes);
            console.log('vm.displayCollection',vm.displayCollection);
            console.log('vm.clabesDisponibles',vm.clabesDisponibles);
            console.log('vm.displayCollection2',vm.displayCollection2);
        });

    }

    var vm = this;
}