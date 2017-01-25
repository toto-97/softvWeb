'use strict';
angular
	.module('softvApp')
	.controller('HomeCtrl', function($localStorage, $location) {
		function drawMenu() {
			vm.menus = $localStorage.currentUser.Menu;
		}

		function logout() {
			delete $localStorage.currentUser;
			$location.path('/auth/');
		}

		var vm = this;
		vm.logout = logout;
		drawMenu();
	});
