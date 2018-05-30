'use strict';
angular
	.module('softvApp')
	.controller('HomeCtrl', function($localStorage, $location, $window, $state,ContratoMaestroFactory,$rootScope) {
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

		$rootScope.$on('actualiza_notificaciones', function (e, bnd) {			
			ContratoMaestroFactory.GetNotificacionContratoPorVencer()
			.then(function (data) {
			  vm.notificaciones = data.GetNotificacionContratoPorVencerResult;
			  console.log(vm.notificaciones);
			});		
		});

		function logout() {
			delete $localStorage.currentUser;
			$window.location.reload();
		}



		var vm = this;
		vm.logout = logout;
		initialData();
	});
