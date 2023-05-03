// var Vector = require('vectorjs');
import down from '../db/dowan.json' 
const obj = {
  'tickquestion':[],
  'crossquestion':[],
  'heartquestion':[],
  'flowerquestion':[]
}

let db

const exportQuestion = (dba) => {
  // console.log(dba);
  db = dba
  // let db = window.dbasce
  // console.log(db);
  function o() {
    portDB('tickquestion')
    portDB('crossquestion')
    portDB('heartquestion')
    portDB('flowerquestion')
   
    function portDB(params) {
      // console.log(db);
    let transaction = db.transaction([params],"readonly");
    let store = transaction.objectStore(params);
    let p = store.getAll()
    // console.log(p);
  
    p.onsuccess = function() {  
      // console.log(p['result']); // arra
      // console.log(p.source.name); // namecuestion Name
      
      compare(p.source.name,p['result']);
      if( p.source.name === 'flowerquestion'){
        // console.log('=1=1=1=1=1==1==');
        save('filename', obj);
      } 
  
    }
    
    
      function compare(selector,arrResolt) {
        if(selector == p.source.name){
          let arr = arrResolt;
          obj[p.source.name] = arr;
        }
      }
      function save(filename, data) {
        // console.log(data);
        const blob = new Blob([JSON.stringify(data)], {type: 'application/json'});
        if(window.navigator.msSaveOrOpenBlob) {
            window.navigator.msSaveBlob(blob, filename);
        } else {
          // console.log('-----elooo');
          const elem = window.document.querySelector('#ifads');
          // console.log('elooo');
           
            elem.href = window.URL.createObjectURL(blob);
            elem.download = filename; 
            elem.click();
            elem.download = false; 
            elem.href = ''
        }
      }
      
    }
    
  }

  document.querySelector('#ifadsBtn').addEventListener('click',o)


  



 }

export default exportQuestion;