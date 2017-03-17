'use strict';
angular
	.module('softvApp')
	.controller('ModalBonificacionCtrl', function($uibModalInstance, $uibModal, $rootScope, ngNotify, $localStorage, $state, detalle, quejasFactory) {

		function initialData() {
			console.log(detalle);
			quejasFactory.DameBonificacion(detalle.Queja).then(function(data) {
				vm.bonificacion = data.GetDameBonificacionListResult[0];

			});


		}

		function ok() {

		}

		function Eliminar() {
			$uibModalInstance.dismiss('cancel');
		}

		function cancel() {
			$uibModalInstance.dismiss('cancel');
		}

		function CambioTipo() {
			if (vm.Tipo == 'D') {
				vm.ShowConceptosDia = true;
				vm.ShowConceptosMonto = false;
			} else {
				vm.ShowConceptosDia = false;
				vm.ShowConceptosMonto = true;
			}
		}



		var vm = this;
		vm.cancel = cancel;
		vm.ok = ok;
		vm.Eliminar = Eliminar;
		vm.CambioTipo = CambioTipo;
		vm.ShowConceptosDia = true;
		vm.Tipo = 'D';
		initialData();
	});
