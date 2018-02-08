angular
  .module('softvApp')
  .controller('reporteContratoVencidoCtrl', reporteContratoVencidoCtrl);

function reporteContratoVencidoCtrl(ContratoMaestroFactory, relacionIngresosFactory, $filter, $sce, globalService, ngNotify) {
  var vm = this;
  vm.filename = 'Reporte_servicios_por_instalar';
  var reportHeaderPdf = "Reporte contratos vencidos / por vencer";
  vm.createpdf = createpdf;
  vm.predicates = ['Distribuidor', 'IdContratoMaestro', 'RazonSocial', 'FechaVencimiento'];  
  vm.buscar=buscar;

  this.$onInit = function () {
    ContratoMaestroFactory.GetDistribuidores().then(function (result) {
      vm.distribuidores = result.GetDistribuidoresResult;
    });
    buscar(0);
  }

  function buscar(Op) {

    var parametros = {
      'Op': Op,
      'FechaVencimiento': (Op === 2) ? $filter('date')(vm.fecha, 'yyyy/MM/dd') : '1900/01/01',
      'ContratoMaestro': (Op === 1) ? vm.contratomaestro : 0,
      'IdDistribuidor': (Op === 3) ? vm.distribuidor.Clv_Plaza : 0
    };

    ContratoMaestroFactory.GetReporteMaestroPorVencer(parametros)
      .then(function (result) {
        console.log(result);
        vm.contratos = result.GetReporteMaestroPorVencerResult;
        vm.displayCollection = result.GetReporteMaestroPorVencerResult;
      });
  }

  function createpdf() {

    var columns = ['Distribuidor', 'IdContratoMaestro', 'RazonSocial', 'FechaVencimiento'];
    var rows = [];
    vm.contratos.forEach(function (item) {
      var arr = [item.Distribuidor, item.IdContratoMaestro, item.RazonSocial, item.FechaVencimiento];
      rows.push(arr);
    });
    var doc = new jsPDF({
      orientation: 'portrait',
      format: 'letter'
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
    var x = (pageWidth - txtWidth) / 2; // Calculate text's x coordinate    
    doc.text(reportHeaderPdf, x, 14); // Posición text at x,y
    var laFechaHoy = '07/05/2017';
    doc.setFontSize(11);
    doc.setFontType("normal");
    doc.text(doc.internal.pageSize.width - 45, 20, laFechaHoy);
    doc.setPage(1);
    jsPDF.autoTableSetDefaults({
      headerStyles: {
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
        17: {
          columnWidth: 98
        },
      },
      margin: {
        top: 10,
        right: 10,
        bottom: 16,
        left: 10
      },
      addPageContent: pageContent
    });
    if (typeof doc.putTotalPages === 'function') {
      doc.putTotalPages(totalPagesExp);
    }
    doc.save(vm.filename + '.pdf');
  }

}
