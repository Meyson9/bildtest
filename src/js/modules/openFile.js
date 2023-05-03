import widjetCircolLev from "../services/widjetCircolLev";
function openFile(db, openRequest) {
    const opneBtn = document.querySelector('#openFileBtn'),
          input = document.querySelector('#inputFile');
    const obj = {
      'tickquestion':0,
      'crossquestion':0,
      'heartquestion':0,
      'flowerquestion':0
    }
    
 
          

    const open = ()=> {
      if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
      return input.click();
      }

      checet('tickquestion');
      checet('crossquestion');
      checet('heartquestion');
      checet('flowerquestion');
    
      function checet(params) {
        
        

        const transaction = db.transaction([params],"readonly");
        const store = transaction.objectStore(params);
        const p = store.getAll()
        
        // console.log(p);
        
        p.onsuccess = function() {  
          
          const lorf = p.result[0]
          // console.log(lorf);
          
          if (lorf) {
            // console.log(p.result[0]['value']); 
            obj[params] = true
          } else {
            obj[params] = false
          }
          if(params !== 'flowerquestion'){
            return
          }
          if(obj['tickquestion'] || obj['crossquestion'] || obj['heartquestion'] || obj['flowerquestion'] && params === 'flowerquestion'){
            lllll();
            // console.log('=1=1=1=1=1==1==');
          } else {
            input.click();
          }
        }
      }
      
    }


function lllll() {
  
  const div = document.createElement('div');
  div.innerHTML = `
  <div id="myModal" class="modal">
    <span class="clouse">×</span>
    <div class="modal_slid_contnt">
    <p style="font-size: 25px; padding: 0px 0px 21px 0px;"
    >Ваши ответы исчезнут! Продолжаем ?</p>
      <div style="
        display: flex;
        justify-content: center;
      ">
        <button id="BtnYes" class="btnFile">Да</button> 
        <button id="BtnNoo" class="btnFile">Нет</button> 
      </div>
    </div>
  </div>
  `
  document.querySelector('body').append(div)

 
  // console.log( document.querySelector('#BtnYes'));
  const btnYes = document.querySelector('#BtnYes'),
        btnNoo = document.querySelector('#BtnNoo'),
        clouse = document.querySelector('.clouse');
       
        const yes = () =>  {
          input.click()
          btnYes.removeEventListener('click', yes);
          document.querySelector('#myModal').remove()
        };
        const noo = () => {
          document.querySelector('#myModal').remove()
          btnNoo.removeEventListener('click', noo);
          clouse.removeEventListener('click', noo);
        };
       
        btnYes.addEventListener('click', yes)
        btnNoo.addEventListener('click', noo)
        clouse.addEventListener('click', noo)
}
    const chaengeHend = (event)=> {

      if (!event.target.files.length){
        return
      }
      
      const files = Array.from(event.target.files);

      files.forEach(file=> {
      
        // console.log(file);
      
        const reader = new FileReader();
        reader.readAsText(file);
        reader.onload = (ev)=> {

          const obfect = JSON.parse(ev.target.result);
         
          for (const key in obfect) {
              const element = obfect[key];
              // console.log(key);
              // console.log(element);
                
              const arr = Object.values(openRequest.result.objectStoreNames);
                // console.log(arr);
                if(arr.includes(key)){
                      let transaction = db.transaction([key],"readwrite");
                      let store = transaction.objectStore(key);
                      for (const iterator of element) {
                       store.put(iterator);
                      }
                      
                }
            
          }
          // console.log('=1==1=1=1==23=1eoigjf.kmds,aDkoejfvn cmf');
          widjetCircolLev();
        }
      })
    };




    opneBtn.addEventListener('click', open);
    input.addEventListener('change', chaengeHend);
 
}

export default openFile

