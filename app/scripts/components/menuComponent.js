'use strict';
var menuItems = {
	bindings: {
		items: '=',
	},
	controller: function($localStorage, $location) {
		function logout() {
			delete $localStorage.currentUser;
			$location.path('/auth/');
		}
		this.usuario = $localStorage.currentUser.usuario;
		this.logout = logout;
	},
	templateUrl: 'views/components/menu.html'
};

angular.module('softvApp').component('menuItems', menuItems);
