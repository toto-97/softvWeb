'use strict';
angular
  .module('softvApp')
  .controller('ModalCancelaFacturaCtrl', function ($uibModalInstance, $uibModal, ContratoMaestroFactory, ngNotify, $rootScope, options) {
    this.$onInit = function () {
        console.log(options);
      vm.pregunta = options.pregunta;
    }

    function cancel() {
      $uibModalInstance.dismiss('cancel');
    }

    function ok() {
       ContratoMaestroFactory.GetCancelaPagoFacturaMaestro(options.contrato).then(function(response){
           $rootScope.$emit('reload', contrato);
ngNotify.set('La factura se ha cancelado correctamente','success')
       });
    }

    var vm = this;
    vm.cancel = cancel;
    vm.ok = ok;
    vm.titulo="Atención ";
  });
