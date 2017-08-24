'use strict';
angular.module('softvApp').controller('prefacturasCtrl', prefacturasCtrl);

function prefacturasCtrl($state, corporativoFactory, ngNotify, $filter) {

  function Init() {}

  var buscar = function (op) {
    var parametros;
    if (op === 2) {
      parametros = {
        'Factura': vm.factura,
        'Fecha': '',
        'Todas': 0,
        'ContratoMaestro': 0,
        'Opcion': 2
      };
    } else if (op === 3) {

      parametros = {
        'Factura': 0,
        'Fecha': vm.fecha,
        'Todas': 0,
        'ContratoMaestro': 0,
        'Opcion': 3
      };
    } else if (op === 4) {

      parametros = {
        'Factura': 0,
        'Fecha': vm.fecha,
        'Todas': 0,
        'ContratoMaestro': 0,
        'Opcion': 3
      };
    } else {
      parametros = {
        'Factura': 0,
        'Fecha': '',
        'Todas': vm.solofacturadas,
        'ContratoMaestro': vm.contrato,
        'Opcion': 1
      };
    }

  };


  var vm = this;
  Init();
  vm.buscar = buscar;
}
