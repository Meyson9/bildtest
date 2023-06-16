import quetionAdd from "./quetionAdd";
import { scrollDown } from "./LitlModules";
let clickIphone = (selectorListQ) => {
    let count = 0,
        lengthIteration = 10,
        element = document.querySelector('.modals_forms'),
        iconMaterialOpenAll = document.querySelector('.icon-material_gp'),
        index = document.querySelectorAll('.tinRightIn').length !== 0?document.querySelectorAll('.tinRightIn').length : 0;
        element.classList.add('showModal');

    chicle();
    function chicle() {

      if (lengthIteration >= selectorListQ) {
          lengthIteration = selectorListQ;
      }

      for ( index ; index < lengthIteration; index++) {
          count++;
          quetionAdd(false,false,false,true);
          if(index  == selectorListQ -2){
              document.querySelector('.wrapperPagestart').lastElementChild.scrollIntoView({block: "start", behavior: "smooth"});
              element.classList.remove('showModal');
          }
      }

      lengthIteration += 20;
      index = count
        
      if(count  >= selectorListQ ){
        // const iconMaterialOpenAll = document.querySelector('.icon-material_gp');
        const elementList = document.querySelector('.gp_segment');

        iconMaterialOpenAll.parentElement.setAttribute('data-tooltip',"Прокрутить вниз");  
       
        iconMaterialOpenAll.classList.add('icon-material_scrollDown');
  
        // iconMaterialOpenAll.parentElement.dataset = 
        elementList.addEventListener('click', scrollDown);
  
          count = 0,
          lengthIteration = 10,
          index = 0
          return;
      } else {
          let time3 = setTimeout(() => {
          chicle();
          clearTimeout(time3);
          time3 = null;
          }, 1500);
      }
    }

         
        }
export default clickIphone
