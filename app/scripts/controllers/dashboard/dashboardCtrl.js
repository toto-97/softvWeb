'use strict';
angular.module('softvApp')
	.controller('dashboardCtrl', function(ContratoMaestroFactory,ngNotify) {
		var vm=this;
		getNotifications();
		
			function getNotifications() {
			  ContratoMaestroFactory.GetNotificacionContratoPorVencer()
				.then(function (data) {
				vm.notificaciones=data.GetNotificacionContratoPorVencerResult;
				 
				  ngNotify.set('ATENCION: Existen :'+vm.notificaciones.length+' contratos con una vigencia vencida/por vencer ', {
					position: 'bottom',
					type: 'warn',
					sticky: true
				});
				});
			}
	});
