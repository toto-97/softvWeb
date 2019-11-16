(function () {
  'use strict';

  angular
    .module('softvApp')
    .controller('ModalHazPreguntaCtrl', ModalHazPreguntaCtrl);

  ModalHazPreguntaCtrl.inject = ['$uibModalInstance', '$uibModal', '$rootScope', 'object', 'ngNotify', 'ContratoMaestroFactory'];

  function ModalHazPreguntaCtrl($uibModalInstance, $uibModal, $rootScope, object, ngNotify, ContratoMaestroFactory) {
    var vm = this;
    vm.ok = ok;
    vm.cancel = cancel;
    vm.titulo='Atención';

    /// Muestra los mensajes para la spregutnas
    this.$onInit = function () {     
      console.log(object);
        vm.pregunta = object.pregunta;
        vm.MesesAdelantados = object.MesesAdelantados;
    }

    /// Cancela las operaciones
    function cancel() {
      $uibModalInstance.dismiss('cancel');
    }

    /// Guarda las pregutnas hechas
    function ok() {
       ContratoMaestroFactory.GetDeeAfirmacionPregunta_CM(object.contrato,
       vm.MesesAdelantados,900,object.clv_session).then(function(data){
       
        $uibModalInstance.dismiss('cancel');
        $rootScope.$broadcast('reload_detalle', object);
         
       });
     
    }

  }
})();
