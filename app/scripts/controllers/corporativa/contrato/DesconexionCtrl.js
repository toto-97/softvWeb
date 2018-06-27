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
        vm.ContratosOriginales = [];

        this.$onInit = function () {
            vm.ContratosOriginales = vm.contrato.lstCliS;
            if (contrato.tipo == 'desconexion') {
                vm.titulo = 'Desconexión';
                vm.proceso = 1;
                ContratoMaestroFactory.GetObtieneContratosLigadosPorStatus(vm.contrato.IdContratoMaestro, 'I').then(function (data) {
                    vm.contrato.lstCliS = data.GetObtieneContratosLigadosPorStatusResult;
                });
            } else if (contrato.tipo == 'reconexion') {
                vm.titulo = 'Reconexión';
                vm.proceso = 2;
                ContratoMaestroFactory.GetObtieneContratosLigadosPorStatus(vm.contrato.IdContratoMaestro, 'D').then(function (data) {
                    vm.contrato.lstCliS = data.GetObtieneContratosLigadosPorStatusResult;
                });
            } else {
                vm.titulo = 'Generar Ordenes';
                vm.proceso = 3;
                ContratoMaestroFactory.GetObtieneContratosLigadosPorStatus(vm.contrato.IdContratoMaestro, 'C').then(function (data) {
                    vm.contrato.lstCliS = data.GetObtieneContratosLigadosPorStatusResult;
                });
            }
        }

        function ValidaArchivo() {
            var files = $('#inputFile2').get(0).files;
            if (files.length == 0) {
                ngNotify.set('Se necesita seleccionar un archivo válido', 'error');
                return;
            }

            ContratoMaestroFactory.UploadFileDesconexion(files, vm.contrato.IdContratoMaestro).then(function (data) {

                if (data.contratosValidos.length == 0 || data.contratosValidos == null) {
                    ngNotify.set('No se encontraron contratos válidos en el archivo.', 'error');
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
            var contratos_enviar = {
                'objprocesa': {
                    'Contratos': [
                    ],
                    'Idcontrato': vm.contrato.IdContratoMaestro,
                    'Proceso': vm.proceso
                }
            };

            vm.contrato.lstCliS.forEach(function (item) {
                if (item.checado) {
                    var _contrato = {
                        'ContratoCom': item.ContratoCom,
                        'contratoReal': item.ContratoReal,
                        'Estatus': true,
                        'detalle': ''
                    };
                    contratos_enviar.objprocesa.Contratos.push(_contrato);
                }
            });
            if (contratos_enviar.objprocesa.Contratos.length > 0) {
                console.log('contratos_enviar',contratos_enviar);
                ContratoMaestroFactory.ProcesaDesconexion(contratos_enviar).then(function (data) {
                    ngNotify.set('El proceso se ejecuto correctamente', 'success');
                    vm.contrato.lstCliS = vm.ContratosOriginales;
                    $uibModalInstance.dismiss('cancel');
                    deseleTodo();
                });
            }
            else{
                ngNotify.set('No hay contratos por procesar', 'info');
            }
        }

        function cancel() {
            $uibModalInstance.dismiss('cancel');
            deseleTodo();
            vm.contrato.lstCliS = vm.ContratosOriginales;
        }
    }
})();