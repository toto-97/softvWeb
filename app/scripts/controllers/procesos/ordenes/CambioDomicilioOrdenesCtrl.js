'use strict';
angular
    .module('softvApp')
    .controller('CambioDomicilioOrdenesCtrl', CambioDomicilioOrdenesCtrl);

function CambioDomicilioOrdenesCtrl($uibModalInstance, cajasFactory, items, $rootScope, ngNotify, ordenesFactory) {
    var vm = this;
    vm.cancel = cancel;
    vm.changeCiudad = changeCiudad;
    vm.changeLocalidad = changeLocalidad;
    vm.changeColonia = changeColonia;
    vm.ok = ok;

    this.$onInit = function () {
        if (items.isUpdate) {

        } else {
            cajasFactory.dameCiudades(items.contrato).then(function (data) {
                vm.ciudades = data.GetCiudadCAMDOListResult;
            });
        }
    }


    function changeCiudad() {
        cajasFactory.dameLocalidades(items.contrato, vm.selectedCiudad.Clv_Ciudad).then(function (data) {
            vm.localidades = data.GetLocalidadCAMDOListResult;
        });
    }

    function changeLocalidad() {
        cajasFactory.dameColonias(items.contrato, vm.selectedLocalidad.Clv_Localidad).then(function (data) {
            vm.colonias = data.GetColoniaCAMDOListResult;
        });
    }

    function changeColonia() {
        cajasFactory.dameCalles(items.contrato, vm.selectedColonia.CLV_COLONIA).then(function (data) {
            vm.calles = data.GetCalleCAMDOListResult;
        });
    }

    function ok() {
        var objCAMDOFAC = {
            clv_detalle: items.clv_detalle_orden,
            clv_orden: items.clv_orden,
            contrato: items.contrato,
            calle: vm.selectedCalle.Clv_calle,
            numero: vm.numero,
            entrecalles: vm.entreCalles,
            colonia: vm.selectedColonia.CLV_COLONIA,
            telefono: vm.telefono,
            ciudad: vm.selectedCiudad.Clv_Ciudad,
            numinterior: vm.numeroInterior,
            localidad: vm.selectedLocalidad.Clv_Localidad
        };
        console.log(objCAMDOFAC);
        ordenesFactory.addCambioDomicilio(objCAMDOFAC).then(function (data) {
            console.log(data);
        });
        // cajasFactory.addAdicionales(items.Session, items.Texto, items.Contrato, items.Tipo).then(function (data) {
        //     $uibModalInstance.dismiss('cancel');
        //     $rootScope.$emit('realoadPagos', {});
        // });
    }

    function cancel() {
        $uibModalInstance.dismiss('cancel');
    }

}
