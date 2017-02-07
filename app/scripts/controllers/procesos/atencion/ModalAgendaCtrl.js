'use strict';
angular
	.module('softvApp')
	.controller('ModalAgendaCtrl', function($uibModalInstance, $uibModal, options, atencionFactory, $rootScope, ngNotify, $localStorage) {

		function initialData() {
			atencionFactory.MuestraTecnicosAlmacen(options.Contrato).then(function(data) {
				vm.Tecnicos = data.GetMuestra_Tecnicos_AlmacenListResult;
				atencionFactory.ConsultaTurnos().then(function(data) {
					vm.Turnos = data.GetspConsultaTurnosListResult;
				});
			});

		}

		function ok() {
			options.Clv_Tecnico = vm.TecnicoAgenda.clv_Tecnico;
			options.Turno = vm.TurnoAgenda.ID;
			options.COMENTARIO = vm.ComentarioAgenda;

			atencionFactory.AgregaQueja(options).then(function(data) {
				var clv_queja = data.AddQuejasResult;
				ngNotify.set('El reporte se guardó correctamente');
				options.clv_queja = clv_queja;
				console.log(options);
				atencionFactory.ActualizaLlamada(options).then(function(data) {
					ngNotify.set('Se actualizo la llamada correctamente');

					var iduser = $localStorage.currentUser.idUsuario;
					if (iduser == 53) {
						atencionFactory.ActualizaLlamada(options).then(function(data) {

						});
					}
					ngNotify.set('El # de reportes es el: ' + clv_queja + ' y el número de atención telefónica es: ' + obj.clv_llamada);
				});
			});


		}

		function cancel() {
			$uibModalInstance.dismiss('cancel');
		}

		var vm = this;
		vm.cancel = cancel;
		vm.ok = ok;
		initialData();
	});
