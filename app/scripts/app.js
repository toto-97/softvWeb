'use strict';
angular
	.module('softvApp', [
		'angular-loading-bar',
		'ngAnimate',
		'ui.router',
		'ui.bootstrap',
		'ngNotify',
		'ngStorage'
	])
	.config(function($provide, $urlRouterProvider, $httpProvider, cfpLoadingBarProvider, $qProvider) {
		$urlRouterProvider.otherwise('/auth');
		cfpLoadingBarProvider.includeSpinner = false;
		$qProvider.errorOnUnhandledRejections(true);
		$provide.factory('ErrorHttpInterceptor', function($q, $injector) {
			function notifyError(rejection) {
				var notify = $injector.get('ngNotify');
				var content = '¡Se ha generado un error! \n' + rejection.data;
				notify.set(content, {
					type: 'error',
					duration: 4000
				});
			}
			return {
				requestError: function(rejection) {
					notifyError(rejection);
					return $q.reject(rejection);
				},
				responseError: function(rejection) {
					notifyError(rejection);
					sessionStorage.clear();
					//location.href = '/login';
					return $q.reject(rejection);
				}
			};
		});
		$httpProvider.interceptors.push('ErrorHttpInterceptor');
		$httpProvider.defaults.headers.post['Content-Type'] = 'application/json; charset=utf-8';
		delete $httpProvider.defaults.headers.common['X-Requested-With'];
	})
	.constant('APP_CONFIG', window.appConfig)
	.run(function($rootScope, $state, $stateParams) {
		$rootScope.$state = $state;
		$rootScope.$stateParams = $stateParams;
	});
