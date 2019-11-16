(function () {
    'use strict';
  
    angular
      .module('softvApp')
      .controller('ModalDetalleFacturaCtrl', ModalDetalleFacturaCtrl);
  
      ModalDetalleFacturaCtrl.inject = ['globalService','$sce','$uibModalInstance', '$uibModal', '$rootScope', 'ngNotify', 'ContratoMaestroFactory', 'url'];
  
    function ModalDetalleFacturaCtrl(globalService,$sce,$uibModalInstance, $uibModal, $rootScope, ngNotify, ContratoMaestroFactory, url) {
      var vm = this;
      vm.cancel = cancel;
  
      /// Muestra el boton hacia los reportes
      this.$onInit = function () {
        vm.url = $sce.trustAsResourceUrl(globalService.getReporteUrlMizar() + '/Reportes/' + url);
      };
  
      /// Cancela la operacion
      function cancel() {
        $uibModalInstance.dismiss('cancel');
      }  
  
    }
  })();
  