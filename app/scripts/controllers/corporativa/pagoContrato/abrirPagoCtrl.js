'use strict';
angular.module('softvApp').controller('AbrirPagoCtrl', AbrirPagoCtrl);

function AbrirPagoCtrl($uibModal, $state, $rootScope, cajasFactory, ngNotify, inMenu, $uibModalInstance) {

	function initialData() {

	}

    function aceptar() {
        if (vm.tipo == 1) {
            vm.seleccion = false;
            vm.tipoCredito = true;
            vm.titulo = 'Escoja pagos';
            vm.subtitulo = '';
        }else{
            guardar();
        }
    }

    function guardar() {
        console.log('guardado');
    }

    function cancel() {
			$uibModalInstance.dismiss('cancel');
	}

    function cambio() {
        console.log('cambio');
        if (vm.tipo == 1) {
            vm.boton = 'Regresar';
        }
    }

    var vm = this;
    vm.aceptar = aceptar;
    vm.guardar = guardar;
    vm.cancel = cancel;
    vm.cambio = cambio;
    vm.boton = 'Cancelar';
    vm.titulo = 'Tipo de pago';
    vm.subtitulo = 'Selecciona el tipo de pago';
    vm.seleccion = true;
    vm.tipoCredito = false;
}
