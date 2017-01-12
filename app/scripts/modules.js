'use strict';

angular
    .module('softvApp')
    .config(function($stateProvider){
        var states = [
            {
              name: 'home',
              url: '/home',
              data: {
                  pageTitle: 'BIENVENIDO | SOFTV WEB'
              },
              views: {
                'homeview': {
                  template: '<div ui-view></div>',
                  controller: 'HomeCtrl',
                  controllerAs: '$ctrl'
                }
              },
            },
            {
              name: 'login',
              url: '/login',
              data: {
                  pageTitle: 'BIENVENIDO | SOFTV WEB'
              },
              views: {
                'loginview': {
                  templateUrl: 'views/login/login.html',
                  controller: 'LoginCtrl',
                  controllerAs: '$ctrl'
                }
              },
            }
        ];

        states.forEach(function(state) {
          $stateProvider.state(state);
        });
    });
