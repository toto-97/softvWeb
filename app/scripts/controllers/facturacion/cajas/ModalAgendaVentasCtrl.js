'use strict';

function ModalAgendaVentasCtrl($uibModalInstance, cajasFactory, orden, ngNotify) {
	this.$onInit = function() {
		cajasFactory.getTurnos().then(function(data) {
			vm.turnos = data.GetspConsultaTurnosListResult;
		});
	}

	function ok() {
		var obj = {
			'objGenera_Cita_OrdserFac': {
				'ClvTecnico': 0,
				'ClvQueja': orden,
				'Turno': vm.TurnoAgenda.TURNO,
				'Fecha': vm.FechaAgenda,
				'Comentario': vm.ComentarioAgenda
			}
		};
		cajasFactory.guardarAgenda(obj).then(function(data) {
			$uibModalInstance.dismiss('cancel');
			ngNotify.set('Datos agendados correctamente.', 'success');
		});
	}

	var vm = this;
	vm.ok = ok;
	vm.ComentarioAgenda = '';
}

angular.module('softvApp').controller('ModalAgendaVentasCtrl', ModalAgendaVentasCtrl);
