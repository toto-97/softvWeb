'use strict';
angular.module('softvApp').controller('notaCreditoCtrl', notaCreditoCtrl);

function notaCreditoCtrl($uibModal, $state, $rootScope, ngNotify, ContratoMaestroFactory) {

  function InitalData() {
    buscar(0);

  }

  function buscar(id) {
    if (id == 1) {
      var parametros = {
        'Op': 1,
        'lv_NotadeCredito': vm.folio,
        'Fecha': '',
        'ContratoMaestro': 0
      }

    } else if (id == 2) {

      var parametros = {
        'Op': 2,
        'lv_NotadeCredito': 0,
        'Fecha': '',
        'ContratoMaestro': vm.contrato
      }
    } else if (id == 3) {
      var parametros = {
        'Op': 3,
        'lv_NotadeCredito': 0,
        'Fecha': vm.Fecha,
        'ContratoMaestro': 0
      }

    } else {
      var parametros = {
        'Op': 0,
        'lv_NotadeCredito': 0,
        'Fecha': '',
        'ContratoMaestro': 0
      }
    }

    ContratoMaestroFactory.FiltrosBusquedaNotasDeCredito(parametros).then(function (data) {
        console.log(data,id);     
    });
  }
 

  var vm = this;
  InitalData();
  vm.buscar = buscar;
}
