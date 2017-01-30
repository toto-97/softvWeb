'use strict';
angular
	.module('softvApp')
	.controller('HomeCtrl', function($localStorage, $location) {
		function initialData() {
			if ($localStorage.currentUser) {
				vm.menus = $localStorage.currentUser.Menu;
				console.log(vm.menus);
			} else {
				location.href === '/auth/';
			}
		}

		var vm = this;
		initialData();
	});
