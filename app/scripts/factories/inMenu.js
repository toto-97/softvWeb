'use strict';
angular.module('softvApp')
	.factory('inMenu', function($localStorage, $location) {
		var factory = {};
		factory.on = function(menu) {
			var aux = 0;
			$localStorage.currentUser.myArray.forEach(function(item) {
				if (item == menu) {
					aux += 1;
				}
			});
			if (aux == 0) {
				$location.path('/home');
			}
		};

		return factory;
	});
