import quetionAdd from "./quetionAdd";
let clickIphone = (selectorListQ) => {
    let  count = 0,
    lengthIteration = 10,
    element = document.querySelector('.modals_forms'),
    index = document.querySelectorAll('.tinRightIn').length !== 0?document.querySelectorAll('.tinRightIn').length : 0;
    element.classList.add('showModal')
    
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
          count = 0,
          lengthIteration = 30,
          index = 0
          return;
      }else {
          let time3 = setTimeout(() => {
          chicle();
          clearTimeout(time3);
          time3 = null;
          }, 1500);
      }
    }

         
        }
export default clickIphone
