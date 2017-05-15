'use strict';
angular.module('softvApp')
  .factory('ContratoMaestroFactory', function ($http, $q, globalService, $localStorage) {
    var factory = {};
    var paths = {
      GetContratoList: '/ContratoMaestroFac/GetContratos_CS',
      BuscarContratos: '/ContratoMaestroFac/GetBusquedaContratoMaestroFac',
      GetDistribuidores: '/DomicilioFiscal/GetDistribuidores',
      GetCiudadList: '/DomicilioFiscal/GetListaCiudadesPorPlaza',
      GetMuestraFacturasMaestroList: '/MuestraFacturasMaestro/GetMuestraFacturasMaestroList',
      BuscaFacturasMaestro: '/BuscaFacturasMaestro/GetBuscaFacturasMaestroList',
      UploadFile: '/ContratoMaestroFac/GetLayoutFac',
      UploadFileDesconexion: '/ContratoMaestroFac/GetValidarContratosLayout',
      ProcesaDesconexion: '/ContratoMaestroFac/GetProcesaContratosLayout',
      FiltrosBusquedaNotasDeCredito: '/NotasDeCredito_ContraMaeFac/GetBusquedaNotasList',
      DAME_FACTURASDECLIENTE: '/DAME_FACTURASDECLIENTE/GetDAME_FACTURASDECLIENTEList',
      GetObtieneDatosTicketList: '/NotasDeCredito_ContraMaeFac/GetObtieneDatosTicketList',
      GetDetalle_NotasdeCreditoList: '/Detalle_NotasdeCredito/GetDetalle_NotasdeCreditoList',
      GetCalcula_monto: '/Calcula_monto/GetCalcula_monto',
      StatusNotadeCredito: '/StatusNotadeCredito/GetStatusNotadeCreditoList',
      GetAddNotaCredito: '/NotasDeCredito_ContraMaeFac/GetAddNotaCredito',
      AddMovSist: '/MovSist/AddMovSist',
      DeleteNotasDeCredito_ContraMaeFac: '/NotasDeCredito_ContraMaeFac/DeleteNotasDeCredito_ContraMaeFac',
      GetGuarda_DetalleNota: '/NotasDeCredito_ContraMaeFac/GetGuarda_DetalleNota',
      GetNotasDeCredito_ContraMaeFacList: '/NotasDeCredito_ContraMaeFac/GetNotasDeCredito_ContraMaeFacList',
      GetProcedimientoCancelar:'/NotasDeCredito_ContraMaeFac/GetProcedimientoCancelar',
      GetCrearNotaCreditoCM:'/CrearNotaCredito/GetCrearNotaCreditoCM',
      ConceptosTicketNotasCredito:'/ConceptosTicketNotasCredito/GetConceptosTicketNotasCreditoCM'
    

    };

    factory.ProcesaDesconexion = function (contratos) {
      var deferred = $q.defer();
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      $http.post(globalService.getUrl() + paths.ProcesaDesconexion, JSON.stringify(contratos), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response);
      });
      return deferred.promise;
    };

    factory.GetContratoList = function () {
      var deferred = $q.defer();
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      $http.get(globalService.getUrl() + paths.GetContratoList, config).then(function (response) {
        console.log(response);
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response);
      });
      return deferred.promise;
    };



    factory.GetMuestraFacturasMaestroList = function () {
      var deferred = $q.defer();
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      $http.get(globalService.getUrl() + paths.GetMuestraFacturasMaestroList, config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response);
      });
      return deferred.promise;
    };


    factory.BuscaFacturasMaestro = function (objeto) {
      var deferred = $q.defer();
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      var parametros = {
        'Fecha': objeto.Fecha,
        'Ticket': objeto.Ticket,
        'ContratoMaestro': objeto.ContratoMaestro,
        'Cliente': objeto.Cliente,
        'Op': objeto.Op,
        'Saldada': objeto.Saldada
      };

      $http.post(globalService.getUrl() + paths.BuscaFacturasMaestro, JSON.stringify(parametros), config).then(function (response) {

        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response);
      });
      return deferred.promise;

    };



    factory.BuscarContratos = function (objeto) {
      var deferred = $q.defer();
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      var parametros = {
        'RazonSocial': objeto.RazonSocial,
        'NombreComercial': objeto.NombreComercial,
        'ClvCiudad': objeto.ClvCiudad,
        'Op': objeto.Op
      };
      $http.post(globalService.getUrl() + paths.BuscarContratos, JSON.stringify(parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response);
      });
      return deferred.promise;

    };

    factory.GetDistribuidores = function () {
      var deferred = $q.defer();
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      $http.get(globalService.getUrl() + paths.GetDistribuidores, config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response);
      });
      return deferred.promise;

    };

    factory.GetCiudadList = function (Clv_Plaza) {

      var deferred = $q.defer();
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      var parametros = {
        'Clv_Plaza': Clv_Plaza
      };
      $http.post(globalService.getUrl() + paths.GetCiudadList, JSON.stringify(parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response);
      });
      return deferred.promise;

    };



    factory.GetObtieneDatosTicketList = function (Factura) {

      var deferred = $q.defer();
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      var parametros = {
        'Factura': Factura,

      };
      $http.post(globalService.getUrl() + paths.GetObtieneDatosTicketList, JSON.stringify(parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response);
      });
      return deferred.promise;

    };



    factory.DAME_FACTURASDECLIENTE = function (contrato) {

      var deferred = $q.defer();
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      var parametros = {
        'ContratoMaestro': contrato,
        'ClvNota': 0
      };
      $http.post(globalService.getUrl() + paths.DAME_FACTURASDECLIENTE, JSON.stringify(parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response);
      });
      return deferred.promise;

    };




    factory.GetDetalle_NotasdeCreditoList = function (factura) {

      var deferred = $q.defer();
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      var parametros = {
        'ClvFactura': factura,
        'ClvNota': 0
      }
      $http.post(globalService.getUrl() + paths.GetDetalle_NotasdeCreditoList, JSON.stringify(parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response);
      });
      return deferred.promise;

    };



    factory.GetCalcula_monto = function (factura) {
      var deferred = $q.defer();
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      var parametros = {
        'ClvFactura': factura,
        'Op': 0
      }
      $http.post(globalService.getUrl() + paths.GetCalcula_monto, JSON.stringify(parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response);
      });
      return deferred.promise;

    };



    factory.StatusNotadeCredito = function () {
      var deferred = $q.defer();
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };

      $http.get(globalService.getUrl() + paths.StatusNotadeCredito, config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response);
      });
      return deferred.promise;

    };




    factory.GetAddNotaCredito = function (data) {

      var deferred = $q.defer();
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      console.log(JSON.stringify(data));
      $http.post(globalService.getUrl() + paths.GetAddNotaCredito, JSON.stringify(data), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response);
      });
      return deferred.promise;

    };


    factory.AddMovSist = function (factura, monto) {

      var deferred = $q.defer();
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };

      var parametros = {
        "objMovSist": {
          "usuario": $localStorage.currentUser.usuario,
          "contrato": factura,
          "Sistema": "Facturación",
          "Pantalla": "FrmNotasdeCredito",
          "control": "Se Hizo una Nueva nota de Crédito",
          "valorant": 0,
          "valornuevo": monto
        }
      }
      console.log(JSON.stringify(obj));
      $http.post(globalService.getUrl() + paths.AddMovSist, JSON.stringify(parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response);
      });
      return deferred.promise;

    };





    factory.FiltrosBusquedaNotasDeCredito = function (data) {

      var deferred = $q.defer();
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      var parametros = {
        'Op': data.Op,
        'Clv_NotadeCredito': data.Clv_NotadeCredito,
        'Fecha': data.Fecha,
        'ContratoMaestro': data.ContratoMaestro
      }
      console.log(JSON.stringify(parametros));

      $http.post(globalService.getUrl() + paths.FiltrosBusquedaNotasDeCredito, JSON.stringify(parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response);
      });
      return deferred.promise;

    };




    factory.GetNotasDeCredito_ContraMaeFacList = function (nota) {
      var deferred = $q.defer();
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      var parametros = {
        'Clv_NotadeCredito': nota
      }
      $http.post(globalService.getUrl() + paths.GetNotasDeCredito_ContraMaeFacList, JSON.stringify(parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response);
      });
      return deferred.promise;
    };






    factory.GetGuarda_DetalleNota = function (factura, nota) {

      var deferred = $q.defer();
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      var parametros = {
        'Factura': factura,
        'Clv_NotadeCredito': nota,
      }
      $http.post(globalService.getUrl() + paths.GetGuarda_DetalleNota, JSON.stringify(parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response);
      });
      return deferred.promise;

    };




factory.GetProcedimientoCancelar = function (factura) {
      var deferred = $q.defer();
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      var parametros = {
        'Factura': factura,
        'Op': 0,
      }
      $http.post(globalService.getUrl() + paths.GetProcedimientoCancelar, JSON.stringify(parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response);
      });
      return deferred.promise;
    };

    factory.DeleteNotasDeCredito_ContraMaeFac = function (factura, nota) {

      var deferred = $q.defer();
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      var parametros = {
        'Factura': factura,
        'Clv_NotadeCredito': nota,
      }
      $http.post(globalService.getUrl() + paths.DeleteNotasDeCredito_ContraMaeFac, JSON.stringify(parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response);
      });
      return deferred.promise;
    };

     factory.GetCrearNotaCreditoCM = function (factura) {

      var deferred = $q.defer();
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      var parametros = {
        'Clv_Factura': factura        
      }
      $http.post(globalService.getUrl() + paths.GetCrearNotaCreditoCM, JSON.stringify(parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response);
      });
      return deferred.promise;
    };

      factory.ConceptosTicketNotasCredito = function (factura) {

      var deferred = $q.defer();
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      var parametros = {
        'Clv_Factura': factura        
      }
      $http.post(globalService.getUrl() + paths.ConceptosTicketNotasCredito, JSON.stringify(parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response);
      });
      return deferred.promise;
    };


    




    factory.UpdateFile = function (file, contrato, distribuidor) {
      var deferred = $q.defer();
      var data = new FormData();
      for (var i = 0; i < file.length; i++) {
        data.append('file' + i, file[i]);
      }
      data.append('Distrib', distribuidor);
      data.append('idcontrato', contrato);
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token,
          'Content-Type': undefined
        }
      };
      $http.post(globalService.getUrl() + paths.UploadFile, data, config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response);
      });

      return deferred.promise;
    };

    factory.UploadFileDesconexion = function (file, contrato) {
      var deferred = $q.defer();
      var data = new FormData();
      for (var i = 0; i < file.length; i++) {
        data.append('file' + i, file[i]);
      }
      data.append('idcontrato', contrato);
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token,
          'Content-Type': undefined
        }
      };
      $http.post(globalService.getUrl() + paths.UploadFileDesconexion, data, config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response);
      });

      return deferred.promise;
    };

    return factory;


  });
