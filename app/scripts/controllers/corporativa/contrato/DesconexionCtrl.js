(function () {
    'use strict';

    angular
        .module('softvApp')
        .controller('DesconexionCtrl', DesconexionCtrl);

    DesconexionCtrl.inject = ['$uibModalInstance', 'contrato', 'ngNotify', 'ContratoMaestroFactory'];
    function DesconexionCtrl($uibModalInstance, contrato, ngNotify, ContratoMaestroFactory) {
        var vm = this;
        vm.cancel = cancel;
        vm.contrato = contrato;
        vm.seleccionar = true;
        vm.seleTodo = seleTodo;
        vm.deseleTodo = deseleTodo;
        vm.ok = ok;
        vm.ValidaArchivo = ValidaArchivo;

        this.$onInit = function () {
            console.log(contrato);
            if (contrato.tipo == 'desconexion') {
                vm.titulo = 'Desconexión';
            } else if (contrato.tipo == 'reconexion') {
                vm.titulo = 'Reconexión';
            } else {
                vm.titulo = 'Generar Ordenes';
            }
        }

        function ValidaArchivo() {
            var files = $("#inputFile2").get(0).files;
            if (files.length == 0) {
                ngNotify.set('Se necesita seleccionar un archivo válido', 'error');
                return;
            }

            ContratoMaestroFactory.UploadFileDesconexion(files, vm.contrato.IdContratoMaestro).then(function (data) {
                if (data.contratosValidos.length == 0) {
                    ngNotify.set('No se encontraron contratos válidos en el archivo csv.', 'error');
                } else {
                    data.contratosValidos.forEach(function (item) {
                        for (var i = 0; i < vm.contrato.lstCliS.length; i++) {
                            if (item.ContratoCom == vm.contrato.lstCliS[i].ContratoCom) {
                                vm.contrato.lstCliS[i].checado = item.Estatus;
                            }
                        }
                    });
                }

            });
        }


        function seleTodo() {
            vm.seleccionar = false;
            vm.contrato.lstCliS.forEach(function (item) {
                item.checado = true;
            });
        }

        function deseleTodo() {
            vm.seleccionar = true;
            vm.contrato.lstCliS.forEach(function (item) {
                item.checado = false;
            });
        }

        function ok() {
            console.log(vm.contrato);
        }

        function cancel() {
            $uibModalInstance.dismiss('cancel');
            deseleTodo();
        }
    }
})();