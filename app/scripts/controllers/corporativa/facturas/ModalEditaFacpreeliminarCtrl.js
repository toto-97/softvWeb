(function () {
  'use strict';

  angular
    .module('softvApp')
    .controller('ModalEditaFacpreeliminarCtrl', ModalEditaFacpreeliminarCtrl);

  ModalEditaFacpreeliminarCtrl.inject = ['$uibModalInstance', '$uibModal', '$rootScope', 'ngNotify', 'ContratoMaestroFactory', 'obj'];

  function ModalEditaFacpreeliminarCtrl($uibModalInstance, $uibModal, $rootScope, ngNotify, ContratoMaestroFactory, obj) {
    var vm = this;
    vm.cancel = cancel;
    vm.ok = ok;
    vm.opcion = 0;

    this.$onInit = function () {
      vm.clave = obj.clave;
      vm.status = obj.status;
      ContratoMaestroFactory.DameDetalle_FacturaMaestroFiscal(vm.clave).then(function (data) {
        vm.conceptos = data.GetDameDetalle_FacturaMaestroFiscalListResult;
        vm.conceptos.forEach(function (item) {

        });
      });
    };


    function cancel() {
      $uibModalInstance.dismiss('cancel');

    }

    function ok() {
      var array_ = [];
      vm.conceptos.forEach(function (item) {
        var obj = {};
        obj.Clv_Detalle = item.Clv_Detalle;
        obj.Descripcion = item.Descripcion;
        obj.Importe = item.Importe;
        array_.push(obj);
      });

      var tipo = (vm.status === 'Por Facturar') ? 1 : 3;
      if (vm.status === 'Por Facturar') {
        ContratoMaestroFactory.GetAddDetalleFacFiscal(vm.clave, array_).then(function (data) {
          $uibModalInstance.dismiss('cancel');
          $rootScope.$emit('actualizar_listado');
        });
      } else {

        ContratoMaestroFactory.GetAddDetalleFacFiscal(vm.clave, array_).then(function (data) {
          ContratoMaestroFactory.ActualizaFacturaGeneraFiscal(vm.clave, tipo).then(function (response) {
            $uibModalInstance.dismiss('cancel');
            $rootScope.$emit('actualizar_listado');
          });
        });
      }




    }

  }
})();
