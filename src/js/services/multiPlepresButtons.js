const multiPlepresButtons = (disable = true,selectorActivBtn) => {
    let button = document.querySelector(selectorActivBtn),
          allButton = document.querySelectorAll('.start-stop');
      
          if (disable) {
            
            allButton.forEach((item)=>{
              
              item.setAttribute('disabled', true ) 
        
              if (item == button) {
         
              } else {
                item.classList.add('btnDeactiv') 
              }
            })
          } else {
            allButton.forEach((item)=>{
              item.classList.remove('btnDeactiv') 
  
              item.removeAttribute('disabled' ) 
            })
          }
          allButton= null;
          button = null;
          selectorActivBtn = null;
          disable = null;
  
}

export default multiPlepresButtons