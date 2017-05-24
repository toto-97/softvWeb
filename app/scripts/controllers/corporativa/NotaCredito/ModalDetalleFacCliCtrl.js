(function () {
  'use strict';

  angular
    .module('softvApp')
    .controller('ModalDetalleFacCliCtrl', ModalDetalleFacCliCtrl);

  ModalDetalleFacCliCtrl.inject = ['$uibModalInstance', '$uibModal', '$rootScope', 'ngNotify', 'ContratoMaestroFactory','options'];

  function ModalDetalleFacCliCtrl($uibModalInstance, $uibModal, $rootScope, ngNotify, ContratoMaestroFactory, options) {
    var vm = this;
    vm.cancel = cancel;
    vm.ok = ok;
    this.$onInit = function () {
     
   ContratoMaestroFactory.DameDetalle_FacturaporCli(options.Clv_FacturaCli, options.clv_session).then(function (response) {
     
        vm.conceptos=response.GetDameDetalle_FacturaporCliListResult;

      });
    }

    function cancel() {
      $uibModalInstance.dismiss('cancel');
    }

    function ok() {
      var claves=[];
     for(var a=0; a<vm.conceptos.length; a++){
       if(vm.conceptos[a].Se_Cobra==true){
        claves.push({'Clv_Detalle':vm.conceptos[a].CLV_DETALLE})
       }
      
     }     
      ContratoMaestroFactory.GetAgregaDetalleNotaDeCreditoMaestroList(
        options.contratocom, options.clv_session, options.Clv_FacturaCli, claves).then(function(response){
           $rootScope.$emit('actualiza_detalle', options);
           $uibModalInstance.dismiss('cancel');
        });
      
     
     
    }

  }
})();
