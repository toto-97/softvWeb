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

    this.$onInit = function () {

      ContratoMaestroFactory.uspHaz_Pregunta(object.contrato, 900).then(function (data) {
        vm.pregunta = data.GetDeepuspHaz_Pregunta_CMResult.Pregunta;
        vm.MesesAdelantados = data.GetDeepuspHaz_Pregunta_CMResult.MesesAdelantados;
        console.log(data);
      });
    }

    function cancel() {
      $uibModalInstance.dismiss('cancel');
    }

    function ok() {
       ContratoMaestroFactory.GetDeeAfirmacionPregunta_CM(object.contrato,
       vm.MesesAdelantados,900,object.clv_session).then(function(data){
        console.log(data);
        $uibModalInstance.dismiss('cancel');
        $rootScope.$broadcast('reload_detalle', object.contrato);
         
       });
     
    }

  }
})();
