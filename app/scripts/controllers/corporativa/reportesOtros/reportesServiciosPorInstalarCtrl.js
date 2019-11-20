'use strict';
angular.module('softvApp').controller('reportesServiciosPorInstalarCtrl', reportesServiciosPorInstalarCtrl)
    .filter('myStrictFilter', function ($filter, $rootScope) {
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

function reportesServiciosPorInstalarCtrl($uibModal, ngNotify, inMenu, pagosMaestrosFactory, $timeout) {

    /// Busca un contrato dependiendo de los parametros
    function buscaContrato() {
        var parametros;
        if (vm.ContratoMaestro == undefined || vm.ContratoMaestro == '') {
            ngNotify.set('Seleccione un contrato.', 'error');
        } else {
            parametros = {
                'ContratoMaestro': vm.ContratoMaestro
            };
            pagosMaestrosFactory.ReporteServiciosPorInstalar(parametros).then(function (data) {
                vm.contratos = data.GetReporteServiciosPorInstalarListResult.List1;
                vm.displayCollection =data.GetReporteServiciosPorInstalarListResult.List1;
                vm.resumen = data.GetReporteServiciosPorInstalarListResult.List2;
                vm.displayCollection2 =data.GetReporteServiciosPorInstalarListResult.List2;
            });
            
            vm.predicates = ['Contrato', 'Servicio', 'Direccion', 'OrdenGenerada', 'FechaOrden', 'Clv_Orden'];
            vm.selectedPredicate = vm.predicates[0];
        }
        
    }

    /// Genera un CSV con la informaciond e los contratos
    function crearTodoAsCsv() {
        $timeout(function () {
            for (var i = 0; i < vm.contratos.length; i++) {
                delete vm.contratos[i].BaseIdUser;
                delete vm.contratos[i].BaseRemoteIp;
                delete vm.contratos[i].$$hashKey;
            }

            initArray();

            for (var i = 0; i < vm.contratos.length; i++) {
                vm.arrayReporte.push(vm.contratos[i]);
            }

            angular.element('#csvDos').triggerHandler('click');
        });
    }

    /// Crea el formato del reporte
    function initArray() {
        vm.arrayReporte = [];
        vm.arrayReporte = [{
            'Contrato': 'Contrato',
            'Servicio': 'Servicio',
            'Direccion': 'Dirección',
            'OrdenGenerada': 'Orden Generada',
            'FechaOrden': 'Fecha Orden',
            'Clv_Orden': '# Orden'
        }];
    }

    /// Genera un PDF con la informaciond e los contratos
    function createPdfTodo() {
        var rows = [[0, 0, 0, 0, 0, 0,]];
        var r = 1;
        var c = 0;
        var ro = 0;
        ro = vm.contratos.length;
        var cols = 21;
        var columns = ['Contrato', 'Servicio', 'Dirección', 'Orden Generada', 'Fecha Orden', '# Orden'];
        for (var i = r; i < ro; i++) {
            rows.push([]);
        }
        for (var i = 0; i < ro; i++) {
            rows[i][0] = vm.contratos[i].Contrato;
            rows[i][1] = vm.contratos[i].Servicio;
            rows[i][2] = vm.contratos[i].Direccion;
            rows[i][3] = vm.contratos[i].OrdenGenerada;
            rows[i][4] = vm.contratos[i].FechaOrden;
            rows[i][5] = vm.contratos[i].Clv_Orden;
        }
        var doc = new jsPDF({
            orientation: 'landscape',
            format: 'A4'
        });
        var totalPagesExp = "{total_pages_count_string}";
        var pageContent = function (data) {
            var str = "Page " + data.pageCount;
            if (typeof doc.putTotalPages === 'function') {
                str = str + " of " + totalPagesExp;
            }
            doc.setFontSize(9);
            doc.text(doc.internal.pageSize.width - 28, doc.internal.pageSize.height - 8, str);
        };
        // doc.addImage(img, 'jpeg', 5, 5, 40, 15);
        doc.setFontSize(14);
        doc.setFontType("bold");
        var fontSize = doc.internal.getFontSize(); // Get current font size
        var pageWidth = doc.internal.pageSize.width;
        var txtWidth = doc.getStringUnitWidth(reportHeaderPdf) * fontSize / doc.internal.scaleFactor;
        var x = (pageWidth - txtWidth) / 2;    // Calculate text's x coordinate    
        doc.text(reportHeaderPdf, x, 14);   // Posición text at x,y
        var laFechaHoy = '07/05/2017';
        doc.setFontSize(11);
        doc.setFontType("normal");
        doc.text(doc.internal.pageSize.width - 45, 20, laFechaHoy);
        doc.setPage(1);
        jsPDF.autoTableSetDefaults({
            headerStyles:
            {
                fontSize: 8.2
            },
            bodyStyles: {
                fontSize: 7.4
            }
        });
        doc.autoTable(columns, rows, {
            startY: 27,
            theme: 'plain',
            styles: {
                overflow: 'linebreak',
            },
            columnStyles: {
                17: { columnWidth: 98 },
            },
            margin: { top: 10, right: 10, bottom: 16, left: 10 },
            addPageContent: pageContent
        });
        if (typeof doc.putTotalPages === 'function') {
            doc.putTotalPages(totalPagesExp);
        }
        doc.save(vm.filename + '.pdf');
    }

    /// Genera un link para crear un PDF
    function getImageDataURL() {
        var url = document.getElementById("pdflogoimage").src;
        var data, canvas, ctx;
        img.onload = function () {
            canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;
            ctx = canvas.getContext("2d");
            ctx.drawImage(img, 0, 0);
            data = canvas.toDataURL();
        }
        img.src = url;
    }

    /// Busca un contrato
    function enterContrato(event, opcion) {
        if (event.which === 13) {
            buscaContrato();
        }
    }

    // this.$onInit = function () {
    //     getImageDataURL();
    // }

    var vm = this;
    vm.buscaContrato = buscaContrato;
    vm.crearTodoAsCsv = crearTodoAsCsv;
    vm.createPdfTodo = createPdfTodo;
    vm.filename = 'Reporte_servicios_por_instalar';
    var reportHeaderPdf = "Reporte Servicios Por Instalar";
    vm.csvDosHide = true;
    var img = new Image();
    img.crossOrigin = "";
    vm.enterContrato = enterContrato;
}