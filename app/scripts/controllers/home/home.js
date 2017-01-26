'use strict';
angular
	.module('softvApp')
	.controller('HomeCtrl', function($localStorage, $location) {
		function initialData() {
			vm.menus = $localStorage.currentUser.Menu;
			console.log(vm.menus);
		}

		var vm = this;
		initialData();
	});
