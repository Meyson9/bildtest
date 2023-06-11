// import dbArr from '../db/dbArr.json'
let selector = null;
const obj = {
  'tickquestion':0,
  'crossquestion':0,
  'heartquestion':0,
  'flowerquestion':0
}
const widjetCircolLev = (sel) => {
// const btns = document.querySelectorAll('.startPage')

    if (sel) {
      selector = sel;
    }

    //получить все значений нужной мне колонки и сделать подсчет строк 
    let db= window.dbasce
    // console.log(db);

    if(document.querySelector('.tinRightIn')) {
      switch (selector+'question') {
        case 'tickquestion':
          // console.log('tickquestion 1');
          portDB('tickquestion',true);
          break;
        case 'crossquestion':
          // console.log('crossquestion 2');
          portDB('crossquestion',true);
          break;
        case 'heartquestion':
          // console.log('heartquestion 3');
          portDB('heartquestion',true);
          break;
        case 'flowerquestion':
          // console.log('flowerquestion 4');
          portDB('flowerquestion',true);
          break;               
          }
        
  } else {
        portDB('tickquestion',true)
        portDB('crossquestion',true)
        portDB('heartquestion',true)
        portDB('flowerquestion',true)
      }

    function portDB(params,start = false) {
// console.log(params);
    let transaction = db.transaction([params],"readonly");
    let store = transaction.objectStore(params);
    let p = store.getAll()
    p.onsuccess = function() {  

      let arr = p.result.length;
      // arr
      // console.log(params);
      if(start) {
        // console.log(obj);
        obj[p.source.name] = arr;
        // console.log(obj);
      }

      name();
      transaction = null;
      p = null;
      store = null;
    }
    
    
}
      


    // 2 / 10 * 100 = 2
    function name() {

      document.querySelectorAll('.startPage').forEach(item =>{
      // console.dir(item);
      let selectbivider,
      localSel = item.classList[2];
      switch (localSel) {
        case 'tick':
          // selectbivider = dbArr['styles'][0].length;
          selectbivider = window.objectAllCor[localSel];
          // console.log(selectbivider);
          break;
        case 'cross':
          // selectbivider = dbArr['styles'][1].length;
          selectbivider = window.objectAllCor[localSel];
          // console.log(selectbivider);
          break;
        case 'heart':
          // selectbivider = dbArr['styles'][2].length;
          selectbivider = window.objectAllCor[localSel];
                    // console.log(selectbivider);
          break;
        case 'flower':
          // selectbivider = dbArr['styles'][3].length;
          selectbivider = window.objectAllCor[localSel];
                    // console.log(selectbivider);
          break;
      }
      
      let counterProcent = (Math.round(obj[item.classList[2]+"question"] / selectbivider * 100))
      item.textContent = counterProcent + '%';
      item.style.setProperty('--pie-p', counterProcent + '%')
      localSel = null;
    })
    // console.timeEnd('ti');
  }
}

export default widjetCircolLev