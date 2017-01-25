'use strict';
angular
	.module('softvApp')
	.controller('HomeCtrl', function($localStorage, $location) {
		function initialData() {
			vm.menus = $localStorage.currentUser.Menu;
			vm.usuario = $localStorage.currentUser.usuario;
			console.log(vm.menus);
		}

		function logout() {
			delete $localStorage.currentUser;
			$location.path('/auth/');
		}

		var vm = this;
		vm.logout = logout;
		initialData();
	});
