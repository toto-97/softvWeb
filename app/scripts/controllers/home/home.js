'use strict';
angular
	.module('softvApp')
	.controller('HomeCtrl', function($localStorage, $location, $window) {
		function initialData() {
			if ($localStorage.currentUser) {
				vm.menus = $localStorage.currentUser.Menu;
				console.log(vm.menus);
				vm.usuario = $localStorage.currentUser.usuario;
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
