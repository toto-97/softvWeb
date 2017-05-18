'use strict';
angular.module('softvApp').controller('PagoContratoMaestroCtrl', PagoContratoMaestroCtrl)
    .filter('myStrictFilter', function ($filter) {
        return function (input, predicate) {
            return $filter('filter')(input, predicate, true);
        }
    })
    .filter('unique', function () {
        return function (arr, field) {
            var o = {}, i, l = arr.length, r = [];
            for (i = 0; i < l; i += 1) {
                o[arr[i][field]] = arr[i];
            }
            for (i in o) {
                r.push(o[i]);
            }
            return r;
        };
    });

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
        vm.displayCollection = [].concat(vm.Contratos);
    }

    function reloadTable() {
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
    }

    $rootScope.$on('table', function () {
        reloadTable();
    });

    function ObtenerCiudades(x) {
        ContratoMaestroFactory.GetCiudadList(x.Clv_Plaza).then(function (data) {
            vm.Ciudades = data.GetListaCiudadesPorPlazaResult;
        });

    }

    function tablaContrato(x) {
        if (x == null || x == undefined || x == '') {
            ngNotify.set('Ingrese el contrato', 'error');
        }
        $('.buscarContrato').collapse('hide');
        var obj = {
            'RazonSocial': '',
            'NombreComercial': '',
            'ClvCiudad': x,
            'Op': 4
        };
        ContratoMaestroFactory.BuscarContratos(obj).then(function (data) {
            vm.Contratos = data.GetBusquedaContratoMaestroFacResult[0];
            if (vm.Contratos == undefined) {
                ngNotify.set('No se encontro el contrato.', 'error');
                resetBusquedas();
            } else {
                vm.muestraTablaCliente = false;
                vm.muestraCliente = true;
                pagosMaestrosFactory.cobraSaldoMaestro(vm.Contratos.IdContratoMaestro).then(function (data) {
                    vm.saldo = data.GetCobraContratoMaestroResult;
                    console.log(vm.saldo);
                    pagosMaestrosFactory.dameDetalle(vm.saldo.Clv_SessionPadre).then(function (detallePago) {
                        console.log(detallePago);
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
        vm.displayCollection = [].concat(vm.Contratos);
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
                    console.log(vm.saldo);
                    pagosMaestrosFactory.dameDetalle(vm.saldo.Clv_SessionPadre).then(function (detallePago) {
                        console.log(detallePago);
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
        vm.displayCollection = [].concat(vm.Contratos);
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

            vm.Contratos = data.GetBusquedaContratoMaestroFacResult;
            console.log(vm.Contratos)

            if (vm.Contratos == undefined) {
                ngNotify.set('No se encontro el contrato.', 'error');
                resetBusquedas();
            } else {
                vm.muestraTablaCliente = true;
                vm.muestraCliente = false;
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
        vm.displayCollection = [].concat(vm.Contratos);
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
            vm.Contratos = data.GetBusquedaContratoMaestroFacResult;
            if (vm.Contratos == undefined) {
                ngNotify.set('No se encontro el contrato.', 'error');
                resetBusquedas();
            } else {
                vm.muestraTablaCliente = true;
                vm.muestraCliente = false;
                pagosMaestrosFactory.cobraSaldoMaestro(vm.Contratos.IdContratoMaestro).then(function (data) {
                    vm.saldo = data.GetCobraContratoMaestroResult;
                    console.log(data.GetCobraContratoMaestroResult);
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
        vm.displayCollection = [].concat(vm.Contratos);
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
            vm.Contratos = data.GetBusquedaContratoMaestroFacResult;
            if (vm.Contratos == undefined) {
                ngNotify.set('No se encontro el contrato.', 'error');
                resetBusquedas();
            } else {
                vm.muestraTablaCliente = true;
                vm.muestraCliente = false;
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
        vm.displayCollection = [].concat(vm.Contratos);
    }

    function reset() {
        vm.Contratos = '';
        vm.showConceptos = false;
        vm.showDatosCliente = false;
        vm.muestraCliente = false;
        vm.muestraTablaCliente = false;
    }

    function resetBusquedas() {
        vm.contratobusqueda = '';
        vm.NombreComer = '';
        vm.RazonS = '';
        vm.Ciudad = '';
    }

    function abrirPago(x, y) {
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
                x: function () {
                    return x;
                },
                y: function () {
                    return y;
                }
            }
        });
    }

    function abrirDetalle(x) {
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
            size: 'lg',
            resolve: {
                x: function () {
                    return x;
                }
            }
        });
    }
    
    function edocta(){
        console.log(vm.Contratos.IdContratoMaestro);        
        ContratoMaestroFactory.ReporteEstadoCuentaNuevo(vm.saldo.Clv_SessionPadre,vm.Contratos.IdContratoMaestro,"").then(function(data){
            console.log(data);
            var options = {};
            options.Id = data.GetReporteEdoCuenta_CMResult[0].lineaTR;
			options.IdEstadoCuenta = 0;
			options.Contrato = 0;
			options.Tipo = 3;
			var modalInstance = $uibModal.open({
				animation: true,
				ariaLabelledBy: 'modal-title',
				ariaDescribedBy: 'modal-body',
				templateUrl: 'views/facturacion/modalEdoCuenta.html',
				controller: 'ModalNuevoEdoctaCtrl',
				controllerAs: 'ctrl',
				backdrop: 'static',
				keyboard: false,
				size: 'lg',
				resolve: {
					options: function () {
						return options;
					}
				}
			});


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
    vm.abrirDetalle = abrirDetalle;
    vm.tablaContrato = tablaContrato;
    vm.edocta=edocta;
    initialData();
}