'use strict';

/**
 * @ngdoc function
 * @name softvApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the softvApp
 */
angular.module('softvApp')
  .controller('MainCtrl', function ($rootScope) {
      var vm =  this;
      vm.init = [];
      $rootScope.$on('showMenus', function () {
          showMenuStates();
      });
      $rootScope.$on('hideMenus', function () {
          hideMenuStates();
      });

      function showMenuStates(){
      	  vm.showMenus = true;
          vm.showNavbar = true;
      }

      function hideMenuStates(){
          vm.showMenus = false;
          vm.showNavbar = false;
  	  }
  });
