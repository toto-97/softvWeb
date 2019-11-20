'use strict';
angular.module('softvApp').controller('reportesFacturasVencidasCtrl', reportesFacturasVencidasCtrl)
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

function reportesFacturasVencidasCtrl($uibModal, ngNotify, inMenu, pagosMaestrosFactory, $timeout, $filter) {

    /// Busca los contratos de una fecha en especifico
    function buscaContrato() {
        var parametros;
        if (vm.FechaInicio == undefined || vm.FechaInicio == '' || vm.FechaFin == undefined || vm.FechaFin == '') {
            ngNotify.set('Seleccione fechas válidas.', 'error');
        } else {
            if (vm.Vencidas == undefined || vm.Vencidas == false){
                vm.Vencidas=0;
            }else{
                vm.Vencidas=1;
            }
            if (vm.PorVencer == undefined || vm.PorVencer == false){
                vm.PorVencer=0;
            }else{
                vm.PorVencer=1
            }
            if (vm.Pagadas == undefined || vm.Pagadas == false){
                vm.Pagadas=0;
            }else{
                vm.Pagadas=1
            }
            parametros = {
                'FechaInicio': $filter('date')(vm.FechaInicio, 'dd/MM/yyyy HH:mm:ss'),
                'FechaFin': $filter('date')(vm.FechaFin, 'dd/MM/yyyy HH:mm:ss'),
                'Vencidas': vm.Vencidas,
                'PorVencer': vm.PorVencer,
                'Pagadas': vm.Pagadas
            };
            pagosMaestrosFactory.ReporteFacturasVencidas(parametros).then(function (data) {
                vm.contratos = data.GetReporteFacturasMaestrasVencidasListResult;
                vm.displayCollection =data.GetReporteServiciosPorInstalarListResult;
            });
            
            vm.predicates = ['ContratoMaestro','Factura','Ticket','Contacto', 'Telefono', 'SaldoVencido', 'FechaVencimiento', 'FechaEmision', 'DiasCredito','ImporteFactura','TotalAbonado','TotalNotas'];
            vm.selectedPredicate = vm.predicates[0];
        }
        
    }

    /// Crea un CSV con la informacion de los contratos
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

    /// Da formato al reporte
    function initArray() {
        vm.arrayReporte = [];
        vm.arrayReporte = [{
            'ContratoMaestro':'ContratoMaestro',
            'Factura':'Factura',
            'Ticket':'Ticket',
            'Contacto':'Contacto', 
            'Telefono':'Telefono', 
            'SaldoVencido':'SaldoVencido', 
            'FechaVencimiento':'FechaVencimiento', 
            'FechaEmision':'FechaEmision', 
            'DiasCredito':'DiasCredito',
            'ImporteFactura':'ImporteFactura',
            'TotalAbonado':'TotalAbonado',
            'TotalNotas':'TotalNotas'
        }];
    }

    /// Crea un PDF con la informacion de los contratos
    function createPdfTodo() {
        var rows = [[0, 0, 0, 0, 0, 0,]];
        var r = 1;
        var c = 0;
        var ro = 0;
        ro = vm.contratos.length;
        var cols = 21;
        var columns = ['Contrato Maestro','Factura','Ticket','Contácto', 'Teléfono', 'Saldo Vencido', 'Fecha Vencimiento', 'Fecha Emisión', 'Dias Credito','Importe Factura','Total Abonado','Total Notas de Crédito'];
        for (var i = r; i < ro; i++) {
            rows.push([]);
        }
        for (var i = 0; i < ro; i++) {
            rows[i][0] = vm.contratos[i].ContratoMaestro;
            rows[i][1] = vm.contratos[i].Factura;
            rows[i][2] = vm.contratos[i].Ticket;
            rows[i][3] = vm.contratos[i].Contacto;
            rows[i][4] = vm.contratos[i].Telefono;
            rows[i][5] = vm.contratos[i].SaldoVencido;
            rows[i][6] = vm.contratos[i].FechaVencimiento;
            rows[i][7] = vm.contratos[i].FechaEmision;
            rows[i][8] = vm.contratos[i].DiasCredito;
            rows[i][9] = vm.contratos[i].ImporteFactura;
            rows[i][10] = vm.contratos[i].TotalAbonado;
            rows[i][11] = vm.contratos[i].TotalNotas;
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

    /// Crea un vinculo para crea el PDF
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

    /// Busca los contratos
    function enterContrato(event, opcion) {
        if (event.which === 13) {
            buscaContrato();
        }
    }

    // this.$onInit = function () {
    //     getImageDataURL();
    // }


    /// Valida las facturas vencidas
    function CambiaSeleccion(Opcion){
        if(vm.Vencidas && Opcion == 1 ){
            vm.PorVencer = false;
            vm.Pagadas = false;
        }
        if(vm.PorVencer && Opcion == 2){
            vm.Vencidas = false;
            vm.Pagadas = false;
        }
        if(vm.Pagadas && Opcion == 3){
            vm.PorVencer = false;
            vm.Vencidas = false;
        }
    }

    var vm = this;
    vm.buscaContrato = buscaContrato;
    vm.crearTodoAsCsv = crearTodoAsCsv;
    vm.createPdfTodo = createPdfTodo;
    vm.filename = 'ReporteFacturasVencidas';
    var reportHeaderPdf = "Reporte Facturas Vencidas / Por Vencer";
    vm.csvDosHide = true;
    var img = new Image();
    img.crossOrigin = "";
    vm.enterContrato = enterContrato;
    vm.CambiaSeleccion = CambiaSeleccion;
}