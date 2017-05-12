'use strict';
angular.module('softvApp').controller('PagoContratoMaestroCtrl', PagoContratoMaestroCtrl);

function PagoContratoMaestroCtrl($uibModal, $state, $rootScope, cajasFactory, ngNotify, inMenu, pagosMaestrosFactory, ContratoMaestroFactory) {

    function initialData() {
        ContratoMaestroFactory.GetContratoList().then(function (data) {
            vm.Contratos = data.GetContratos_CSResult;
            ContratoMaestroFactory.GetDistribuidores().then(function (data) {
                vm.Distribuidores = data.GetDistribuidoresResult;
                ContratoMaestroFactory.GetCiudadList(vm.Distribuidores[0].Clv_Plaza).then(function (data) {
                    vm.Ciudades = data.GetListaCiudadesPorPlazaResult;
                });

            });

        });
    }

    function ObtenerCiudades(x) {
        ContratoMaestroFactory.GetCiudadList(x.Clv_Plaza).then(function (data) {
            vm.Ciudades = data.GetListaCiudadesPorPlazaResult;
        });

    }

    function Buscarporcontrato() {
        if (vm.contratobusqueda == null || vm.contratobusqueda == undefined || vm.contratobusqueda == '') {
            ngNotify.set('Ingrese el contrato', 'error');
        }
        $('.buscarContrato').collapse('hide');
        var obj = {
            'RazonSocial': '',
            'NombreComercial': '',
            'ClvCiudad': vm.contratobusqueda,
            'Op': 4
        };
        ContratoMaestroFactory.BuscarContratos(obj).then(function (data) {
            vm.Contratos = data.GetBusquedaContratoMaestroFacResult[0];
            if (vm.Contratos == undefined) {
                ngNotify.set('No se encontro el contrato.', 'error');
                resetBusquedas();
            } else {
                vm.muestraCliente = true;
                pagosMaestrosFactory.cobraSaldoMaestro(vm.Contratos.IdContratoMaestro).then(function (data) {
                    vm.saldo = data.GetCobraContratoMaestroResult;
                    pagosMaestrosFactory.dameDetalle(vm.saldo.Clv_SessionPadre).then(function (detallePago) {
                        if (detallePago.GetDetalleContratosMaestrosListResult.length == 0) {
                            vm.blockBaja = true;
                            vm.blockPagar = true;
                        } else {
                            vm.blockBaja = false;
                            vm.blockPagar = false;
                        }
                        vm.detallePago = detallePago.GetDetalleContratosMaestrosListResult.lista;
                        vm.sumaPagos = detallePago.GetDetalleContratosMaestrosListResult.datosdetalle;
                        vm.detallePagoAux = vm.detallePago;
                    });
                });
                resetBusquedas();
                $('.datosCliente').collapse('show');
                $('.conceptosCliente').collapse('show');
            }
        });
    }


    function BuscarNombrec() {
        if (vm.NombreComer == null || vm.NombreComer == undefined || vm.NombreComer == '') {
            ngNotify.set('Ingrese el nombre comercial', 'error');
        }
        $('.buscarContrato').collapse('hide');
        var obj = {
            'RazonSocial': '',
            'NombreComercial': vm.NombreComer,
            'ClvCiudad': 0,
            'Op': 2
        }

        ContratoMaestroFactory.BuscarContratos(obj).then(function (data) {
            vm.Contratos = data.GetBusquedaContratoMaestroFacResult[0];
            if (vm.Contratos == undefined) {
                ngNotify.set('No se encontro el contrato.', 'error');
                resetBusquedas();
            } else {
                vm.muestraCliente = true;
                pagosMaestrosFactory.cobraSaldoMaestro(vm.Contratos.IdContratoMaestro).then(function (data) {
                    vm.saldo = data.GetDeepCobraSaldoContratoMaestroResult;
                    cajasFactory.dameDetallePago(vm.saldo.ClvSession).then(function (detallePago) {
                        if (detallePago.GetDameDetalleListResult.length == 0) {
                            vm.blockBaja = true;
                            vm.blockPagar = true;
                        } else {
                            vm.blockBaja = false;
                            vm.blockPagar = false;
                        }
                        vm.detallePago = detallePago.GetDameDetalleListResult;
                        vm.detallePagoAux = vm.detallePago;
                    });
                    cajasFactory.dameSumaPago(vm.saldo.ClvSession).then(function (sumaPago) {
                        vm.sumaPagos = sumaPago.GetSumaDetalleListResult;
                    });
                    // cajasFactory.obtenEdoCuenta(vm.Contratos.IdContratoMaestro,vm.saldo.ClvSession).then(function(data) {
                    //     vm.edoCuenta = data.GetObtieneEdoCuentaSinSaldarListResult;
                    // });
                });
                resetBusquedas();
                $('.datosCliente').collapse('show');
                $('.conceptosCliente').collapse('show');
            }
        });
    }

    function BuscarRazonS() {
        if (vm.RazonS == null || vm.RazonS == undefined || vm.RazonS == '') {
            ngNotify.set('Ingrese la razon social', 'error');
        }
        $('.buscarContrato').collapse('hide');
        var obj = {
            'RazonSocial': vm.RazonS,
            'NombreComercial': '',
            'ClvCiudad': 0,
            'Op': 1
        };
        ContratoMaestroFactory.BuscarContratos(obj).then(function (data) {
            vm.Contratos = data.GetBusquedaContratoMaestroFacResult[0];
            if (vm.Contratos == undefined) {
                ngNotify.set('No se encontro el contrato.', 'error');
                resetBusquedas();
            } else {
                vm.muestraCliente = true;
                pagosMaestrosFactory.cobraSaldoMaestro(vm.Contratos.IdContratoMaestro).then(function (data) {
                    vm.saldo = data.GetDeepCobraSaldoContratoMaestroResult;
                    cajasFactory.dameDetallePago(vm.saldo.ClvSession).then(function (detallePago) {
                        if (detallePago.GetDameDetalleListResult.length == 0) {
                            vm.blockBaja = true;
                            vm.blockPagar = true;
                        } else {
                            vm.blockBaja = false;
                            vm.blockPagar = false;
                        }
                        vm.detallePago = detallePago.GetDameDetalleListResult;
                        vm.detallePagoAux = vm.detallePago;
                    });
                    cajasFactory.dameSumaPago(vm.saldo.ClvSession).then(function (sumaPago) {
                        vm.sumaPagos = sumaPago.GetSumaDetalleListResult;
                    });
                    // cajasFactory.obtenEdoCuenta(vm.Contratos.IdContratoMaestro,vm.saldo.ClvSession).then(function(data) {
                    //     vm.edoCuenta = data.GetObtieneEdoCuentaSinSaldarListResult;
                    // });
                });
                resetBusquedas();
                $('.datosCliente').collapse('show');
                $('.conceptosCliente').collapse('show');
            }
        });
    }

    function BuscarCiudad() {
        if (vm.Ciudades.Clv_Ciudad == undefined) {
            ngNotify.set('Ingrese distribuidor y ciudad.', 'error');
        }
        $('.buscarContrato').collapse('hide');
        var obj = {
            'RazonSocial': '',
            'NombreComercial': '',
            'ClvCiudad': vm.Ciudades.Clv_Ciudad,
            'Op': 3
        };
        ContratoMaestroFactory.BuscarContratos(obj).then(function (data) {
            vm.Contratos = data.GetBusquedaContratoMaestroFacResult[0];
            if (vm.Contratos == undefined) {
                ngNotify.set('No se encontro el contrato.', 'error');
                resetBusquedas();
            } else {
                vm.muestraCliente = true;
                pagosMaestrosFactory.cobraSaldoMaestro(vm.Contratos.IdContratoMaestro).then(function (data) {
                    vm.saldo = data.GetDeepCobraSaldoContratoMaestroResult;
                    cajasFactory.dameDetallePago(vm.saldo.ClvSession).then(function (detallePago) {
                        if (detallePago.GetDameDetalleListResult.length == 0) {
                            vm.blockBaja = true;
                            vm.blockPagar = true;
                        } else {
                            vm.blockBaja = false;
                            vm.blockPagar = false;
                        }
                        vm.detallePago = detallePago.GetDameDetalleListResult;
                        vm.detallePagoAux = vm.detallePago;
                    });
                    cajasFactory.dameSumaPago(vm.saldo.ClvSession).then(function (sumaPago) {
                        vm.sumaPagos = sumaPago.GetSumaDetalleListResult;
                    });
                    // cajasFactory.obtenEdoCuenta(vm.Contratos.IdContratoMaestro,vm.saldo.ClvSession).then(function(data) {
                    //     vm.edoCuenta = data.GetObtieneEdoCuentaSinSaldarListResult;
                    // });
                });
                resetBusquedas();
                $('.datosCliente').collapse('show');
                $('.conceptosCliente').collapse('show');
            }
        });
    }

    function reset() {
        vm.Contratos = '';
        vm.showConceptos = false;
        vm.showDatosCliente = false;
        vm.muestraCliente = false;
        vm.muestraClientesTable = false;
    }

    function resetBusquedas() {
        vm.contratobusqueda = '';
        vm.NombreComer = '';
        vm.RazonS = '';
        vm.Ciudad = '';
    }

    function abrirPago() {
        pagosMaestrosFactory.dimeSiYaGrabeFacMaestro(vm.Contratos.IdContratoMaestro).then(function (data) {
            if (data.GetDimeSiYaGrabeUnaFacMaestroResult.Valida == 0) {
                cajasFactory.sumaTotalDetalle(vm.saldo.ClvSession).then(function (data) {
                    var items = {
                        Contrato: vm.Contratos.IdContratoMaestro,
                        Compania: vm.saldo.IdCompania,
                        Distribuidor: vm.saldo.IdDistribuidor,
                        Session: vm.saldo.ClvSession,
                        SessionPadre: vm.saldo.ClvSessionPadre,
                        Monto: data.GetDeepSumaTotalDetalleResult.Monto
                    };
                    vm.animationsEnabled = true;
                    var modalInstance = $uibModal.open({
                        animation: vm.animationsEnabled,
                        ariaLabelledBy: 'modal-title',
                        ariaDescribedBy: 'modal-body',
                        templateUrl: 'views/corporativa/abrirPago.html',
                        controller: 'AbrirPagoCtrl',
                        controllerAs: '$ctrl',
                        backdrop: 'static',
                        keyboard: false,
                        size: 'sm',
                        resolve: {
                            items: function () {
                                return items;
                            }
                        }
                    });
                });
            } else {
                cajasFactory.sumaTotalDetalle(vm.saldo.ClvSession).then(function (data) {
                    var items = {
                        Contrato: vm.Contratos.IdContratoMaestro,
                        Compania: vm.saldo.IdCompania,
                        Distribuidor: vm.saldo.IdDistribuidor,
                        Session: vm.saldo.ClvSession,
                        SessionPadre: vm.saldo.ClvSessionPadre,
                        Monto: data.GetDeepSumaTotalDetalleResult.Monto
                    };
                    vm.animationsEnabled = true;
                    var modalInstance = $uibModal.open({
                        animation: vm.animationsEnabled,
                        ariaLabelledBy: 'modal-title',
                        ariaDescribedBy: 'modal-body',
                        templateUrl: 'views/corporativa/yaPago.html',
                        controller: 'YaPagoCtrl',
                        controllerAs: '$ctrl',
                        backdrop: 'static',
                        keyboard: false,
                        size: 'md',
                        resolve: {
                            items: function () {
                                return items;
                            }
                        }
                    });
                });
            }
        });
    }

    function abrirDetalle() {
        // var items = {
        //     Contrato: vm.Contratos.IdContratoMaestro,
        //     Compania: vm.saldo.IdCompania,
        //     Distribuidor: vm.saldo.IdDistribuidor,
        //     Session: vm.saldo.ClvSession,
        //     SessionPadre: vm.saldo.ClvSessionPadre,
        //     Monto: data.GetDeepSumaTotalDetalleResult.Monto
        // };
        vm.animationsEnabled = true;
        var modalInstance = $uibModal.open({
            animation: vm.animationsEnabled,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: 'views/corporativa/abrirDetalle.html',
            controller: 'AbrirDetalleCtrl',
            controllerAs: '$ctrl',
            backdrop: 'static',
            keyboard: false,
            size: 'lg'
            // resolve: {
            //     items: function () {
            //         return items;
            //     }
            // }
        });
    }

    var vm = this;
    $('.buscarContrato').collapse();
    vm.BuscarNombrec = BuscarNombrec;
    vm.BuscarRazonS = BuscarRazonS;
    vm.BuscarCiudad = BuscarCiudad;
    vm.ObtenerCiudades = ObtenerCiudades;
    vm.Buscarporcontrato = Buscarporcontrato;
    vm.abrirPago = abrirPago;
    initialData();
}