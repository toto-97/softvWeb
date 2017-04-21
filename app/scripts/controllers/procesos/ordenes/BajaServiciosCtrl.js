'use strict';
angular.module('softvApp').controller('BajaServiciosCtrl', BajaServiciosCtrl);

function BajaServiciosCtrl($uibModalInstance, ordenesFactory, items) {
    var vm = this;
    vm.cancel = cancel;

    this.$onInit = function () {
        ordenesFactory.getCableModemsCli(items.contrato).then(function (data) {
            vm.cableModems = data.GetMUESTRACABLEMODEMSDELCLI_porOpcionResult;
            vm.cableModems.forEach(function (item) {
                var op = 0;
                if (items.descripcion.includes('ipaqu') || items.descripcion.includes('ipaqt')) {
                    op = 1;
                } else if (items.descripcion.includes('bpaqu')
                    || items.descripcion.includes('bpaqt')
                    || items.descripcion.includes('bpaad')
                    || items.descripcion.includes('bsedi')) {
                    op = 10;
                    console.log('asdfasfasdfdasfsd');
                }else if(items.descripcion.includes('dpaqu') || items.descripcion.includes('dpaqt') ){
                    op = 20;
                }else if(items.descripcion.includes('rpaqu') || items.descripcion.includes('rpaqt') ){
                    op = 21;
                }
                var modem = {
                    contrato: item.CONTRATONET,
                    orden: items.clv_orden,
                    detalle: items.clv_detalle_orden,
                    op:op
                };
                ordenesFactory.detalleCableModem(modem)
                    .then(function (data) {
                        console.log(data);
                        item.descripcion = data.GetMUESTRACONTNET_PorOpcionResult[0].DESCRIPCION;
                        item.unicaNet = data.GetMUESTRACONTNET_PorOpcionResult[0].CLV_UNICANET;
                        item.status = data.GetMUESTRACONTNET_PorOpcionResult[0].STATUS;
                    });
            });
        });
    }

    function cancel() {
        $uibModalInstance.dismiss('cancel');
    }
}