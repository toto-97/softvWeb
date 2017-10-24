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
    vm.opcion = 0; //1--guardar conceptos 2--facturar -3.-refacturar
    vm.total = 0;
    vm.calcularmonto = calcularmonto;
    this.$onInit = function () {
      vm.clave = obj.clave;
      vm.status = obj.status;
      ContratoMaestroFactory.DameDetalle_FacturaMaestroFiscal(vm.clave).then(function (data) {
        vm.conceptos = data.GetDameDetalle_FacturaMaestroFiscalListResult;
        vm.conceptos.forEach(function (item) {
          vm.total = vm.total + item.Importe;
        });
      });
    };


    function cancel() {
      $uibModalInstance.dismiss('cancel');

    }


    function calcularmonto() {
      vm.total = 0;
      vm.conceptos.forEach(function (item) {
        vm.total += (item.Importe === undefined) ? 0 : item.Importe

      });
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
      if (vm.opcion === 1) {

        ContratoMaestroFactory.GetAddDetalleFacFiscal(vm.clave, array_).then(function (data) {
          $uibModalInstance.dismiss('cancel');
          $rootScope.$broadcast('actualizar_listado', vm.clave);
        });
      } else if (vm.opcion === 2 || vm.opcion === 3) {

        ContratoMaestroFactory.GetAddDetalleFacFiscal(vm.clave, array_).then(function (data) {
          ContratoMaestroFactory.ActualizaFacturaGeneraFiscal(vm.clave, tipo).then(function (response) {
            $uibModalInstance.dismiss('cancel');
            $rootScope.$broadcast('actualizar_listado', vm.clave);
          });
        });

      }
    }

  }
})();
