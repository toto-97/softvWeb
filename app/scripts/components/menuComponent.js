'use strict';
var menuItems = {
	bindings: {
		items: '=',
	},
	controller: function($localStorage, $location, $window) {
		function logout() {
			delete $localStorage.currentUser;
			$window.location.reload();
		}
		if ($localStorage.currentUser) {
			this.usuario = $localStorage.currentUser.usuario;
		}

		this.logout = logout;
	},
	templateUrl: 'views/components/menu.html'
};

angular.module('softvApp').component('menuItems', menuItems);
