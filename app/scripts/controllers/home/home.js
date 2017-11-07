'use strict';
angular
	.module('softvApp')
	.controller('HomeCtrl', function($localStorage, $location, $window, $state,ContratoMaestroFactory) {
		function initialData() {
			if ($localStorage.currentUser) {
				vm.menus = $localStorage.currentUser.Menu;
				vm.usuario = $localStorage.currentUser.usuario;
				
					ContratoMaestroFactory.GetNotificacionContratoPorVencer()
					  .then(function (data) {
						vm.notificaciones = data.GetNotificacionContratoPorVencerResult;
						console.log(vm.notificaciones);
					  });
				  
				//$state.go('home.dashboard');
			} else {
				location.href === '/auth/';
			}
		}

		function logout() {
			delete $localStorage.currentUser;
			$window.location.reload();
		}



		var vm = this;
		vm.logout = logout;
		initialData();
	});
