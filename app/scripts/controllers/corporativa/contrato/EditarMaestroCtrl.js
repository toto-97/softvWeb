(function() {
  "use strict";

  angular.module("softvApp").controller("EditarMaestroCtrl", EditarMaestroCtrl);

  EditarMaestroCtrl.inject = [
    "$uibModal",
    "$rootScope",
    "corporativoFactory",
    "cajasFactory",
    " $filter",
    "ngNotify",
    "$state",
    "$stateParams",
    "ContratoMaestroFactory"
  ];

  function EditarMaestroCtrl(
    $uibModal,
    $rootScope,
    corporativoFactory,
    cajasFactory,
    $filter,
    ngNotify,
    $state,
    $stateParams,
    ContratoMaestroFactory
  ) {
    var vm = this;
    var vm = this;
    vm.abrirContratos = abrirContratos;
    vm.guardarContrato = guardarContrato;
    vm.CambioTipoPago = CambioTipoPago;
    vm.MuestraReferencia = false;
    vm.CambioTipo = CambioTipo;
    vm.MuestraBanco = false;
    vm.MuestraAutorizacion = false;
    vm.desconexion = desconexion;
    vm.generarFacturaPrueba = generarFacturaPrueba;
    vm.getEstadoCiudadPais = getEstadoCiudadPais;
    vm.buscarCP = buscarCP;
    vm.getCiudades = getCiudades;

    this.$onInit = function() {
      corporativoFactory.singleContrato($stateParams.id).then(function(data) {
        vm.contratoMaestro = data.GetRelContratosResult[0];
        corporativoFactory.getDistribuidores().then(function(data) {
          vm.distribuidores = data.GetDistribuidoresResult;
          vm.distribuidores.forEach(function(entry, index) {
            if (entry.Clv_Plaza == vm.contratoMaestro.Distribuidor) {
              vm.distribuidor = vm.distribuidores[index];
            }
          });
        });

        ContratoMaestroFactory.GetUsoCFDI().then(function(data) {
          vm.listaCDFI = data.GetUsoCFDIResult;
          vm.listaCDFI.forEach(function(item) {
            if (item.id_UsoCFDI == vm.contratoMaestro.id_UsoCFDI) {
              vm.CDFI=item;
            }
          });
        });

        //Nos traemos las cuentas clabes disponibles en caso de que no se haya asignado alguna
        if (vm.contratoMaestro.IdClabe === 0) {
          ContratoMaestroFactory.GetCuentaCableMaestro().then(function(data) {
            vm.Clabes = data.GetCuentaCableMaestroResult;
          });
        } else {
          //Si ya hay asignada, solo mostramos la que está asignada
          vm.Clabes = [
            {
              Id: vm.contratoMaestro.IdClabe,
              Clabe: vm.contratoMaestro.Clabe
            }
          ];
          vm.selectedClabe = vm.Clabes[0];
        }

        corporativoFactory.getCortes().then(function(data) {
          vm.cortes = data.GetTiposCortesClientesListResult;
          vm.cortes.forEach(function(entry, index) {
            if (entry.Id == vm.contratoMaestro.TipoCorteCli) {
              vm.tipocorte = vm.cortes[index];
            }
          });
        });
        corporativoFactory.getTipoPagos().then(function(data) {
          vm.tipoPagos = data.GetTipoPagosFacturasListResult;
          vm.tipoPagos.forEach(function(entry, index) {
            if (entry.Id == vm.contratoMaestro.TipoPago) {
              vm.formapago = vm.tipoPagos[index];
              if (vm.formapago.Cuenta == true) {
                vm.MuestraReferencia = true;
              } else {
                vm.MuestraReferencia = false;
              }
            }
          });
        });
        cajasFactory.dameBancos().then(function(data) {
          vm.bancos = data.GetMuestraBancosListResult;
          if (vm.contratoMaestro.ClvBanco) {
            vm.MuestraBanco = true;
            vm.bancos.forEach(function(entry, index) {
              if (vm.contratoMaestro.ClvBanco == entry.Clave) {
                vm.selectedBanco = vm.bancos[index];
              }
            });
          }
        });
        if (vm.contratoMaestro.Referencia2) {
          vm.MuestraAutorizacion = true;
        }
        if (vm.contratoMaestro.Prepago) {
          vm.prepago = "prepago";
          vm.DesReactiva = true;
          vm.reactivacion = "manual";
        } else {
          vm.prepago = "postpago";
          vm.DesReactiva = false;
          vm.reactivacion = "manual";
        }
        if (vm.contratoMaestro.PagoFac) {
          vm.tipopago = "factura";
        } else {
          vm.tipopago = "estado";
        }
        if (vm.contratoMaestro.ReactivarMan) {
          vm.reactivacion = "manual";
          vm.bloqueageneracion = false;
        } else {
          vm.reactivacion = "factura";
          vm.bloqueageneracion = true;
        }

        vm.razon = vm.contratoMaestro.RazonSocial;
        vm.nombrecomercial = vm.contratoMaestro.NombreComercial;
        vm.numerointerior = vm.contratoMaestro.NumInt;
        vm.numeroexterior = vm.contratoMaestro.NumExt;
        vm.dolares = vm.contratoMaestro.FacturacionDolares;

        vm.rfc = vm.contratoMaestro.RFC;
        vm.diascredito = vm.contratoMaestro.DiasCredito;
        vm.diasgracia = vm.contratoMaestro.DiasGracia;
        vm.limitecredito = parseInt(vm.contratoMaestro.LimiteCredito);
        vm.Referencia = vm.contratoMaestro.Referencia;
        var date = vm.contratoMaestro.FechaFac.replace(/[^0-9\.]+/g, "");
        var pattern = /(\d{2})(\d{2})(\d{4})/;
        date = new Date(date.replace(pattern, "$2/$1/$3"));
        vm.fecha = vm.contratoMaestro.FechaFac;
        vm.autorizacion = vm.contratoMaestro.Referencia2;
        vm.EntreCalles = vm.contratoMaestro.EntreCalles;
        vm.Telefono = vm.contratoMaestro.Tel;
        vm.Email = vm.contratoMaestro.Email;
        vm.Fax = vm.contratoMaestro.Fax;
        vm.calle = vm.contratoMaestro.Calle;
        vm.localidad = vm.contratoMaestro.Localidad;
        //vm.Pais = vm.contratoMaestro.Pais;

        var date2 = new Date(vm.contratoMaestro.FechaVencimiento);
        var date = vm.contratoMaestro.FechaVencimiento.replace(
          /[^0-9\.]+/g,
          ""
        );
        var pattern = /(\d{2})(\d{2})(\d{4})/;
        date = new Date(date.replace(pattern, "$2/$1/$3"));
        vm.fechaVigencia = date;

        vm.contratoMaestro.LocalidadDes;
        vm.contratoMaestro.CalleDes;

        vm.cp = vm.contratoMaestro.CodigoPostal;
        getEstadoCiudadPais(true);
      });
    };

    function buscarCP() {
      var modalInstance = $uibModal.open({
        animation: true,
        ariaLabelledBy: "modal-title",
        ariaDescribedBy: "modal-body",
        templateUrl: "views/corporativa/modalCodigoPostal.html",
        controller: "modalCodigoPostalCtrl",
        controllerAs: "$ctrl",
        backdrop: "static",
        keyboard: false,
        size: "sm",
        resolve: {}
      });
      modalInstance.result.then(
        function(item) {
          vm.cp = item.id_CodigoPostal;
          getEstadoCiudadPais(false);
        },
        function() {}
      );
    }

    function getCiudades() {
      ContratoMaestroFactory.GetMunicipiosMizar(
        vm.cp,
        vm.estado.id_Estado
      ).then(function(data) {
        vm.ciudades = data.GetMunicipiosMizarResult;
      });
    }

    function getEstadoCiudadPais(onload) {
      ContratoMaestroFactory.GetPaisesMizar(vm.cp).then(function(data) {
        vm.paises = data.GetPaisesMizarResult;

        if (onload) {
          vm.paises.forEach(function(item) {
            if (item.Descripcion === vm.contratoMaestro.Pais) {
              vm.Pais = item;
            }
          });
        }

        ContratoMaestroFactory.GetEstadosMizar(vm.cp).then(function(result) {
          vm.estados = result.GetEstadosMizarResult;

          if (onload) {
            vm.estados.forEach(function(item) {
              if (item.Descripcion === vm.contratoMaestro.EstadoDes) {
                vm.estado = item;
              }
            });
          }

          ContratoMaestroFactory.GetColoniasMizar(vm.cp).then(function(data) {
            vm.colonias = data.GetColoniasMizarResult;
            if (onload) {
              vm.colonias.forEach(function(item) {
                if (item.Descripcion === vm.contratoMaestro.ColoniaDes) {
                  vm.colonia = item;
                }
              });
            }

            var idestado = vm.estado ? vm.estado.id_Estado : "";

            ContratoMaestroFactory.GetMunicipiosMizar(vm.cp, idestado).then(
              function(data) {
                vm.ciudades = data.GetMunicipiosMizarResult;
                if (onload) {
                  vm.ciudades.forEach(function(item) {
                    if (item.Descripcion === vm.contratoMaestro.CiudadDes) {
                      vm.ciudad = item;
                    }
                  });
                }
              }
            );
          });
        });
      });
    }

    function desconexion(tipo) {
      vm.contratoMaestro.tipo = tipo;
      var modalInstance = $uibModal.open({
        animation: true,
        ariaLabelledBy: "modal-title",
        ariaDescribedBy: "modal-body",
        templateUrl: "views/corporativa/desconexion.html",
        controller: "DesconexionCtrl",
        controllerAs: "$ctrl",
        backdrop: "static",
        keyboard: false,
        size: "md",
        resolve: {
          contrato: function() {
            return vm.contratoMaestro;
          }
        }
      });
    }

    function abrirContratos() {
      var auxFecha = $filter("date")(vm.fecha, "dd/MM/yyyy");
      var fechaHoy = new Date();
      fechaHoy = $filter("date")(fechaHoy, "dd/MM/yyyy");
      var fechaVigenciaAux = $filter("date")(vm.fechaVigencia, "dd/MM/yyyy");
      if (fechaVigenciaAux <= fechaHoy) {
        ngNotify.set(
          "El contrato maestro se encuentra vencido, los contratos que se agreguen no se verán afectados",
          "info"
        );
      }

      var detalle = {};
      detalle.ContratosSoftv = vm.contratoMaestro.lstCliS;
      detalle.IdContratoMaestro = vm.contratoMaestro.IdContratoMaestro;
      detalle.Action = "EDIT";
      if (vm.distribuidor == null) {
        ngNotify.set("Selecciona una distribuidor", "error");
        return;
      }
      detalle.Distribuidor = vm.distribuidor;
      var modalInstance = $uibModal.open({
        animation: true,
        ariaLabelledBy: "modal-title",
        ariaDescribedBy: "modal-body",
        templateUrl: "views/corporativa/contratosLigados.html",
        controller: "ContratosLigadosCtrl",
        controllerAs: "$ctrl",
        backdrop: "static",
        keyboard: false,
        size: "md",
        resolve: {
          detalle: function() {
            return detalle;
          }
        }
      });
    }

    function guardarContrato() {
      if (vm.MuestraBanco) {
        if (!vm.selectedBanco) {
          ngNotify.set("Selecciona un banco por favor.", "error");
          return;
        } else {
          vm.clvBanco = vm.selectedBanco.Clave;
        }
      } else {
        vm.clvBanco = 0;
      }
      if (vm.MuestraAutorizacion) {
        if (!vm.autorizacion) {
          ngNotify.set("Indroduce el número de autorización.", "error");
          return;
        } else {
          vm.Referencia2 = vm.autorizacion;
        }
      } else {
        vm.Referencia2 = "";
      }
      if (vm.prepago == "prepago") {
        vm.prep = 1;
        vm.posp = 0;
      } else {
        vm.prep = 0;
        vm.posp = 1;
      }
      if (vm.reactivacion == "manual") {
        vm.reacMan = 1;
        vm.reacPag = 0;
      } else {
        vm.reacMan = 0;
        vm.reacPag = 1;
      }
      if (vm.tipopago == "estado") {
        vm.pagEdo = 1;
        vm.pagFac = 0;
      } else {
        vm.pagEdo = 0;
        vm.pagFac = 1;
      }
      if (vm.dolares) {
        vm.FacturacionDolaresAux = 1;
      } else {
        vm.FacturacionDolaresAux = 0;
      }
      var IdClabe = 0;
      if (vm.contratoMaestro.IdClabe === 0) {
        if (vm.selectedClabe != undefined) {
          IdClabe = vm.selectedClabe.Id;
        }
      } else {
        IdClabe = vm.contratoMaestro.IdClabe;
      }
      if (vm.EntreCalles === undefined){
        vm.EntreCalles = '';
      }

      var fechaHoy = new Date();
      fechaHoy = $filter("date")(fechaHoy, "dd/MM/yyyy");
      var fechaVigenciaAux = $filter("date")(vm.fechaVigencia, "dd/MM/yyyy");

      var auxFecha = $filter("date")(vm.fecha, "dd/MM/yyyy");
      var contrato = {
        objContratoMaestroFac: {
          IdContratoMaestro: vm.contratoMaestro.IdContratoMaestro,
          RazonSocial: vm.razon,
          NombreComercial: vm.nombrecomercial,
          Distribuidor: vm.distribuidor.Clv_Plaza,
          Estado: vm.estado.Descripcion,
          Ciudad: vm.ciudad.Descripcion,
          Localidad: vm.localidad,
          Colonia: vm.colonia.Descripcion,
          Calle: vm.calle,
          NumExt: vm.numeroexterior,
          NumInt: vm.numerointerior,
          CodigoPostal: vm.cp,
          RFC: vm.rfc,
          Prepago: vm.prep,
          PostPago: vm.posp,
          DiasCredito: vm.diascredito,
          DiasGracia: vm.diasgracia,
          LimiteCredito: vm.limitecredito,
          FechaFac: vm.fecha + "/01/2000",
          PagoEdoCuetna: vm.pagEdo,
          PagoFac: vm.pagFac,
          TipoCorteCli: vm.tipocorte.Id,
          ReactivarMan: vm.reacMan,
          ReactivarPagoFac: vm.reacPag,
          TipoPago: vm.formapago.Id,
          Referencia: vm.Referencia,
          Referencia2: vm.Referencia2,
          ClvBanco: vm.clvBanco,
          FacturacionDolares: vm.FacturacionDolaresAux,
          EntreCalles: vm.EntreCalles,
          Pais: vm.Pais.Descripcion,
          Fax: vm.Fax,
          Tel: vm.Telefono,
          Email: vm.Email,
          FechaVencimiento: fechaVigenciaAux,
          IdClabe: IdClabe,
          id_UsoCFDI: vm.CDFI ? vm.CDFI.id_UsoCFDI : ""
        }
      };
      corporativoFactory.updateContrato(contrato).then(function(data) {
        ngNotify.set("Contrato maestro actualizado correctamente.", "success");
      });
    }

    function CambioTipoPago(x) {
      if (x == "postpago") {
        vm.DesReactiva = false;
        vm.reactivacion = "manual";
      } else {
        vm.DesReactiva = true;
        vm.reactivacion = "manual";
      }
    }

    function CambioTipo(x) {
      if (x.Cuenta == true) {
        vm.MuestraReferencia = true;
      } else {
        vm.MuestraReferencia = false;
      }
      if (x.Descripcion == "Tarjeta") {
        vm.MuestraBanco = true;
        vm.MuestraAutorizacion = true;
      } else if (x.Descripcion == "Cheque") {
        vm.MuestraBanco = true;
        vm.MuestraAutorizacion = false;
      } else {
        vm.MuestraBanco = false;
        vm.MuestraAutorizacion = false;
      }
    }

    function generarFacturaPrueba(contrato) {
      ContratoMaestroFactory.GetGeneraFacturaMaestroPrueba(contrato).then(
        function(data) {
          if (data.GetGeneraFacturaMaestroPruebaResult.Error == 0) {
            ngNotify.set("Se ha generado la factura con éxito.", "info");
          } else {
            ngNotify.set("No se generó la factura.", "error");
          }
        }
      );
    }
  }
})();
