'use strict';
angular
	.module('softvApp', [
		'angular-loading-bar',
		'ngAnimate',
		'ui.router',
		'ui.bootstrap',
		'ngNotify',
		'ngStorage',
		'angularUtils.directives.dirPagination',
		'blockUI',
		'ngValidate'
	])
	.config(function($provide, $urlRouterProvider, $httpProvider, cfpLoadingBarProvider, $qProvider, blockUIConfig) {
		$urlRouterProvider.otherwise('/auth/');
		cfpLoadingBarProvider.includeSpinner = false;
		$qProvider.errorOnUnhandledRejections(false);
		blockUIConfig.templateUrl = 'views/components/loading.html';
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
	.run(function($rootScope, $state, $stateParams, $localStorage, $location) {
		$rootScope.$state = $state;
		$rootScope.$stateParams = $stateParams;
		$rootScope.$on('$locationChangeStart', function(event, next, current) {
			if ($location.path() != '/auth/') {
				if (!$location.path().includes('/auth/')) {
					if (!$localStorage.currentUser) {
						$location.path('/auth/');
					}
				}
			}
		});
	});
