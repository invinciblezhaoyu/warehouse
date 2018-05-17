import Excel from 'exceljs/dist/exceljs.min.js';
function exportExcel(list) {
    var workbook = new Excel.Workbook();
    workbook.xlsx.writeBuffer()
    .then((data) => {
      var blob = new Blob([data.buffer]);
      this.saveAs(new Blob(blob),'123.xlsx');
    }).catch((err) => {
      console.log('发生错误',err);
    });
  }
  function saveAs(blob, filename) {
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url;
    a.download = filename;
    var event = document.createEvent('MouseEvents');
    event.initMouseEvent('click');
    a.dispatchEvent(event);
    URL.revokeObjectURL(url);
  }