angular
	.module('softvApp')
	.controller('HomeCtrl', function($rootScope) {
		$rootScope.$emit("showMenus", {});
	});
