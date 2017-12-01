'use strict';
angular.module('softvApp')
  .controller('MainCtrl', function ($scope) {
    this.awesomeThings = ['HTML5 Boilerplate', 'AngularJS', 'Karma'];
   
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
   // this.$onInit = function () {
     
    /*   ContratoMaestroFactory.GetNotificacionContratoPorVencer()
        .then(function (data) {
          vm.notificaciones = data.GetNotificacionContratoPorVencerResult;
          console.log(vm.notificaciones);
        }); */

   // };
   
   // var vm = this;

  });
