'use strict';
angular.module('softvApp').controller('BajaServiciosCtrl', BajaServiciosCtrl);

function BajaServiciosCtrl($uibModalInstance, ordenesFactory, items) {
    var vm = this;
    vm.cancel = cancel;
    vm.transfer = transfer;
    vm.ok = ok;

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
                } else if (items.descripcion.includes('dpaqu') || items.descripcion.includes('dpaqt')) {
                    op = 20;
                } else if (items.descripcion.includes('rpaqu') || items.descripcion.includes('rpaqt')) {
                    op = 21;
                }
                var modem = {
                    contrato: item.CONTRATONET,
                    orden: items.clv_orden,
                    detalle: items.clv_detalle_orden,
                    op: op
                };
                ordenesFactory.detalleCableModem(modem)
                    .then(function (data) {
                        item.descripcion = data.GetMUESTRACONTNET_PorOpcionResult[0].DESCRIPCION;
                        item.unicaNet = data.GetMUESTRACONTNET_PorOpcionResult[0].CLV_UNICANET;
                        item.status = data.GetMUESTRACONTNET_PorOpcionResult[0].STATUS;
                    });
            });
            vm.objModems = {
                labelAll: 'Servicios De Internet Activos',
                labelSelected: 'Pasar a Baja Estos Servicios De Internet',
                items: vm.cableModems,
                selectedItems: []
            };
        });
    }

    function transfer(from, to, index) {
        if (index >= 0) {
            to.push(from[index]);
            from.splice(index, 1);
        } else {
            for (var i = 0; i < from.length; i++) {
                to.push(from[i]);
            }
            from.length = 0;
        }
    }

    function ok() {
        if (vm.objModems.selectedItems[0].unicaNet > 0) {
            if (items.descripcion.includes('ipaqu') || items.descripcion.includes('ipaqut')) {
                console.log('ipaqu');
            } else if (items.descripcion.includes('bpaqu') || items.descripcion.includes('bpaqt') || items.descripcion.includes('bpaad') || items.descripcion.includes('bsedi')) {
                console.log('bpaqu');
            } else if (items.descripcion.includes('dpaqu') || items.descripcion.includes('dpaqt')) {
                console.log('dpaqu');
            } else if (items.descripcion.includes('rpaqu') || items.descripcion.includes('rpaqt')) {
                console.log('rpaqu');
            }
            var obj = {
                'objIPAQU':
                {
                    'Clave': 731361,
                    'Clv_Orden': 324750,
                    'Contratonet': 681,
                    'Clv_UnicaNet': 686,
                    'Op': 0,
                    'Status': 'B'
                }
            };

            ordenesFactory.addIpaqu().then(function (data) {
                console.log(data);
            });
        } else {
            if (vm.objModems.selectedItems[0].CONTRATONET > 0) {
                if (items.descripcion.includes('ipaqu') || items.descripcion.includes('ipaqut')) {
                    console.log('ipaqu');
                } else if (items.descripcion.includes('bpaqu') || items.descripcion.includes('bpaqt') || items.descripcion.includes('bpaad') || items.descripcion.includes('bsedi')) {
                    console.log('bpaqu');
                } else if (items.descripcion.includes('dpaqu') || items.descripcion.includes('dpaqt')) {
                    console.log('dpaqu');
                } else if (items.descripcion.includes('rpaqu') || items.descripcion.includes('rpaqt')) {
                    console.log('rpaqu');
                }
            }
        }
    }

    function cancel() {
        $uibModalInstance.dismiss('cancel');
    }
}