'use strict';
angular.module('softvApp').controller('BajaServiciosCtrl', BajaServiciosCtrl);

function BajaServiciosCtrl($uibModalInstance, ordenesFactory, items){
    var vm = this;
    vm.cancel = cancel;

    this.$onInit = function(){
        ordenesFactory.getCableModemsCli(items.contrato).then(function (data) {
            vm.cableModems = data.GetMUESTRACABLEMODEMSDELCLI_porOpcionResult;
        });
    }

    function cancel() {
        $uibModalInstance.dismiss('cancel');
    }
}