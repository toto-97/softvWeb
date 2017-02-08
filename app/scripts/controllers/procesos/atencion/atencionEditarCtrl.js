'use strict';
angular
	.module('softvApp')
	.controller('AtencionEditarCtrl', function($uibModal, inMenu, atencionFactory, $state, $stateParams) {

		var vm = this;
		vm.bloquearContrato = true;
		vm.titulo = "Edita atención telefónica";
		vm.NumeroLlamada = $stateParams.id;
		atencionFactory.ConsultaLLamada(vm.NumeroLlamada).then(function(data) {
			console.log(data);
		});
		console.log($stateParams.id);
	});
