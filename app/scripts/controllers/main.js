'use strict';
angular.module('softvApp')
  .controller('MainCtrl', function (ContratoMaestroFactory) {
    var vm = this;

	this.$onInit = function () {
    function getNotifications() {
      ContratoMaestroFactory.GetNotificacionContratoPorVencer()
        .then(function (data) {
          vm.notificaciones = data.GetNotificacionContratoPorVencerResult;
          console.log(vm.notificaciones);
        });
	}
}

  });
