angular
    .module('softvApp')
    .controller('LoginCtrl', function($rootScope){
        $rootScope.$emit("hideMenus", {});
    });
