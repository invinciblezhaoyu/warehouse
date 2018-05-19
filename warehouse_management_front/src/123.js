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


  function batchIn(event){
    var vm = this;
    if(!event.target.files[0]) {
       return;
    }
    var file = event.target.files[0];
    var reader = new FileReader();
    reader.onload = function(event) {
      var data = event.target.result;
      var wb = XLSX.read(data, {
          type: 'binary'
      });
      var multiStudent = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]);
      vm.batchInStudent(multiStudent);
      vm.successMessage();
      vm.findAllStudent(vm.currentPage);
    };
    reader.readAsBinaryString(file);
  };

  
// exportExcel() {
//       let list = [
//         {
//           "_id":"5ac30a24a98487003f87d79b",
//           "expiresAt":"2018-10-03T04:59:16.916Z",
//           "createTime":"2018-04-03T04:59:16.916Z",
//           "__v":0,
//           "status":"none",
//           "cameraId":"201801171824323393_3",
//           "reportId":"5ac30a50a98487003f87d79c",
//           "imgSrc":"api/behavior-detection/image/5ac30a24a98487003f87d79b"
//         },{
//           "_id":"5ac30a06a98487003f87d79a",
//           "expiresAt":"2018-10-03T04:58:46.917Z",
//           "createTime":"2018-04-03T04:58:46.917Z",
//           "__v":0,
//           "status":"ok",
//           "cameraId":"201801171824323393_3",
//           "reportId":"5ac30a50a98487003f87d79c",
//           "imgSrc":"api/behavior-detection/image/5ac30a06a98487003f87d79a"
//         },{
//           "_id":"5ac309e8a98487003f87d799",
//           "expiresAt":"2018-10-03T04:58:16.916Z",
//           "createTime":"2018-04-03T04:58:16.916Z",
//           "__v":0,
//           "status":"none",
//           "cameraId":"201801171824323393_2",
//           "reportId":"5ac30a50a98487003f87d79c",
//           "imgSrc":"api/behavior-detection/image/5ac309e8a98487003f87d799"
//         },{
//           "_id":"5ac309caa98487003f87d798",
//           "expiresAt":"2018-10-03T04:57:46.915Z",
//           "createTime":"2018-04-03T04:57:46.915Z",
//           "__v":0,
//           "status":"none",
//           "cameraId":"201801111145147481_0",
//           "reportId":"5ac30a50a98487003f87d79c",
//           "imgSrc":"api/behavior-detection/image/5ac309caa98487003f87d798"
//         }
//       ];
//       let list1 = list.map(item => {
//         return{
//           id:item._id,
//           // createTime:moment(item.createTime).format('YYYY-MM-DD hh:mm:ss'),
//           createTime:item.createTime,
//           status:item.status === 'none' ? '未处理' : item.status === 'confirm' ? '已确认' : '已忽略',
//           cameraId:"201801111145147481_0",
//           imgSrc:"api/behavior-detection/image/5ac309caa98487003f87d798"
//         }
//       });
//       var workbook = new Excel.Workbook();
//       workbook.views = [
//         {
//           x: 0, y: 0, width: 10000, height: 20000,
//           firstSheet: 0, activeTab: 1, visibility: 'visible'
//         }
//       ];
//       var worksheet = workbook.addWorksheet('sheet', {properties: {showGridLines: false,tabColor:{argb:'FF00FF00'}}});
//       let a = 123;
      
//       worksheet.mergeCells('A1:E2');
//       worksheet.getCell('A1').value = `报告${a}`;
//       worksheet.getCell('A1').alignment = { vertical: 'top', horizontal: 'center' };
//       worksheet.getCell('A1').font = {
//         name: '微软雅黑',
//         family: 4,
//         size: 16,
//         underline: false,
//         bold: true
//       };
//       worksheet.mergeCells('A3:E3');
//       worksheet.getCell('A3').value = `共${a}条记录`;
//       worksheet.getCell('A3').alignment = { vertical: 'top', horizontal: 'right' };
//       worksheet.mergeCells('A4:E4');
//       worksheet.getCell('A4').value = `报告生成时间：${'2018-02-03'}`;
//       worksheet.getCell('A4').alignment = { vertical: 'top', horizontal: 'right' };

//       worksheet.columns = [
//         {  key: 'id', width: 20 },
//         {  key: 'cameraId', width: 20},
//         {  key: 'status', width: 10},
//         {  key: 'createTime', width: 30 },
//         {  key: 'img', width: 30, height:40}
//       ];
//       worksheet.addRow(['id', '来源','状态', '时间', '图片']);
//       const beginRow = 6;
//       list1.forEach((record, index) => {
//         const row = worksheet.addRow(record);
//         row.height = 150;
//         row.alignment = {vertical: 'middle', horizontal: 'left'};
//         var img = document.getElementById('img');
//         this.getBase64Img(img.src);
//         const imageId = workbook.addImage({
//           base64: this.img,
//           extension: 'jpg',
//         });
//         worksheet.addImage(imageId, `E${index + beginRow}:E${index + beginRow}`);
//       });

//       workbook.xlsx.writeBuffer()
//       .then((data) => {
//         var blob = new Blob([data.buffer]);
//         var fileReader = new FileReader();
//         fileReader.readAsBinaryString(blob);
//         fileReader.onload = (evt) => {
//           if(evt.target.readyState == FileReader.DONE){  
//               var Flag = evt.target.result;
//               this.saveAs(new Blob([this.s2ab(Flag)]),'123.xlsx');
//           }
//         }
//       }).catch((err) => {
//         console.log('发生错误',err);
//       });
//     },
//     getBase64Img(img_path){ 
//       var img = new Image();
//       img.src =img_path;
//       img.onload = (() => {
//         var canvas = document.createElement('canvas');
//         var context = canvas.getContext('2d');  
//         var w = img.width,
//             h = img.height;
//         canvas.width = w;
//         canvas.height = h;
//         context.drawImage(img, 0, 0, w, h);
//         var type = 'image/jpeg';
//         var dataurl = canvas.toDataURL(type);
//         this.img = dataurl;
//       })();
//     },
//     s2ab(s) { 
//       var buf = new ArrayBuffer(s.length);
//       var view = new Uint8Array(buf);
//       for (var i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
//       return buf;
//     },
//     saveAs(blob, filename) {
//       var type = blob.type;
//       var force_saveable_type = 'application/octet-stream';
//       if (type != force_saveable_type) { 
//           var slice = blob.slice || blob.webkitSlice || blob.mozSlice;
//           blob = slice.call(blob, 0, blob.size, force_saveable_type);
//       }
//       var url = URL.createObjectURL(blob);
//       var a = document.createElement('a');
//       a.href = url;
//       a.download = filename;
//       var event = document.createEvent('MouseEvents');
//       event.initMouseEvent('click');
//       a.dispatchEvent(event);
//       URL.revokeObjectURL(url);
//     }