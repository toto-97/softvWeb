'use strict';
angular
	.module('softvApp')
	.controller('LoginCtrl', function($stateParams, authFactory, $location, $localStorage) {
		function initData() {
			if ($localStorage.currentUser) {
				$location.path('/home');
			} else {
				if ($stateParams.token) {
					authFactory.getAuthentication($stateParams.token).then(function(data) {
						if (data == true) {
							$location.path('/home');
						}
					});
				}
			}
		}

		var vm = this;
		initData();
	});
