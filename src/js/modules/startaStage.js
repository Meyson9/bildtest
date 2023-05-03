// import standardQuestions from "./standardQuestions"; 
import quetionAdd from "../services/quetionAdd";
// import db from "../db/db.json"
// import dbArr from "../db/dbArr.json"
import openAllQuestion from "./openAllQuestion";
import whereStay from "./whereStay";
// import togallVois from "./togallVois";
import lostMicrophone from "./lostMicrophone";
import widjetCircolLev from "../services/widjetCircolLev";
import { stopVoiseLisenerAll,createElementMobaile } from "../services/LitlModules";
// import elemScroll from "../services/elemScroll";


const startaStage = () =>{
  const btnsStart = document.querySelectorAll('.button'),
        wrapperTutle =  document.querySelector('.wrapperTutle'),
        buttonHolder =document.querySelector('.buttonHolder');

  // const body = document.body,
  //       html = document.documentElement;
        
  let selectorListQ = [];

    // let height = Math.max( body.scrollHeight, body.offsetHeight, 
    //                     html.clientHeight, html.scrollHeight, html.offsetHeight );

   
// console.log(height);
  btnsStart.forEach((item)=> {

    item.addEventListener('click', (e)=>{
      selectorListQ = [];
      console.log(e);
     let targetBtn = e.target;
     window.modeloderad = false;

     const todoNumOne = document.querySelector('.tinRightIn');
     if(!todoNumOne){
       wrapperTutle.classList.add('pps');
     }
    let time;
    time = setTimeout(() => {

          buttonHolder.classList.remove('hide');
          btnsStart.forEach(span=> {
          span.nextElementSibling.classList.remove('textActiveLevel');
          });
          targetBtn.nextElementSibling.classList.add('textActiveLevel');
          clearTimeout(time);
          time = null;
        }, 100);

        let navel = document.querySelector('#navel'),
            burger_men = document.querySelector('#burger_men'),
            btnBurge_men = document.querySelector('#btnBurge_men'),
            spanBurger_man = document.querySelector('#spanBurger_man'),
            overlowBurger = document.querySelector('#overlowBurger');

            let sel = 'tick',
            localSel = targetBtn.classList[2];
            selectorListQ = [];
        switch (targetBtn.classList[2]) {
          case 'tick':
            selectorListQ = window.objectAllCor[localSel];    
            sel = 'tick';
            break;
          case 'cross':
             selectorListQ = window.objectAllCor[localSel];
            sel = 'cross';
            break;
          case 'heart':
             selectorListQ = window.objectAllCor[localSel];
            sel = 'heart';
            break;
          case 'flower':
          // selectorListQ = dbArr['styles'][3];
           selectorListQ = window.objectAllCor[localSel];
          sel = 'flower'
            break;

        }
        localSel= null;
        // selectorListQ = selectorListQ.length;
        let btn = document.querySelector('.staet')
  if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    // //         // код для мобильных устройств
    if(!btn.classList.contains('hide')){
      btn.classList.add('hide');
    }
          // document.querySelector('.staet').classList.add('hide');

          window.mobaleMOde = true;
          if(navel.classList.contains('burger-menu_nav')){
        // бесполезная строка по моим предполоениям
            let menu = document.querySelector('.burger-menu');

            menu.classList.remove('burger-menu_active');
          } else {
            navel.classList.add('burger-menu_nav');
            burger_men.classList.add('burger-menu');
            btnBurge_men.classList.add('burger-menu_button');
            spanBurger_man.classList.add('burger-menu_lines');
            overlowBurger.classList.add('burger-menu_overlay');
            
            burgerMenu('.burger-menu');
          } 

          if(!document.querySelector('.downloadedBtn').children[0].classList.contains('fabSegment')){
            createElementMobaile();
          }
          
          // whereStay(document.querySelector('.wher'));
          // togallVois(true);
          lostMicrophone(true);
          console.log('код для мобильных устройств 180');
          

          document.querySelector('.gp_segment').addEventListener('click',clickIphone,{once:true})
            
          function  clickIphone() {
            // createElement('.wraperAllToll')
            // alert('----11');
            
            let  count = 0,
            lengthIteration = 10,
            element = document.querySelector('.modals_forms'),
            index = document.querySelectorAll('.tinRightIn').length !== 0?document.querySelectorAll('.tinRightIn').length : 0;
            // index = 0;
            element.classList.add('showModal')
            
            chicle();
           
                  function chicle() {
                    if (lengthIteration >= selectorListQ) {
                      lengthIteration = selectorListQ;
                    }

                    for ( index ; index < lengthIteration; index++) {
                      count++;
                      // console.log(`${count} : ${selectorListQ}`);
                      // console.log(`${index}  == ${selectorListQ -1}`);
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
                      // console.log('мы тут вызываем');

                     let time3 = setTimeout(() => {
                        chicle();
                        clearTimeout(time3);
                        time3 = null;
                      }, 1500);
                    }
                  }

                 
                }
            

  } else {
          window.mobaleMOde = false;
          if(btn.classList.contains('hide')){
            btn.classList.remove('hide');
          }
          openAllQuestion(sel);
          buttonHolder.classList.add('holeOut');

          if(navel.classList.contains('burger-menu_nav')){
            navel.classList.remove('burger-menu_nav');
            burger_men.classList.remove('burger-menu');
            btnBurge_men.classList.remove('burger-menu_button');
            spanBurger_man.classList.remove('burger-menu_lines');
            overlowBurger.classList.remove('burger-menu_overlay');
          }

          // код для обычных устройств
          buttonHolder.classList.remove('holeOut');

          buttonHolder.classList.add('buttonHolderStatic');

          if(!buttonHolder.classList.contains('bord')){
            buttonHolder.classList.add('hide');
            buttonHolder.classList.add('bord');
          }
          buttonHolder.classList.add('gridAct');
        }

      // }, 300);
      
     
      // selectorListQ ? console.log('не пуст') : console.log("пуст");

      // clearLocalStoreg();
      (function () {
        for(let [key] of Object.entries(localStorage)) {
          let selectorQuestionLevel =  key.search(/(tick|cross|heart|flower)(question)/);
          
          if (selectorQuestionLevel === 0) {
            localStorage.removeItem(key);
          }
          selectorQuestionLevel = null;
        }
      }());
      // clearLocalStoreg();
      // function clearLocalStoreg() {
      //   for(let [key] of Object.entries(localStorage)) {
      //     let selectorQuestionLevel =  key.search(/(tick|cross|heart|flower)(question)/);
          
      //     if (selectorQuestionLevel === 0) {
      //       localStorage.removeItem(key);
      //     }
      //     selectorQuestionLevel  = null;
      //   }
      // }
      // document.querySelector('#pizda')/addEventListener('click', clearListener);
      // function clearListener() {
      //   let elem = document.querySelectorAll('.tinRightIn');
      //   for (let index = 0; index < elem.length; index++) {
      //     const element = elem[index];
          
      //     element.children[0].children[1].children[0].removeEventListener('click',window.res[0]);
      //     element.children[0].children[0].children[0].children[1].children[1].removeEventListener('click',window.res[1]);
      //     element.children[0].children[0].children[0].children[1].children[2].removeEventListener('click',window.res[2]);
      //     element.children[0].children[0].children[0].children[1].children[3].removeEventListener('click',window.res[3]);
      //     element.children[0].children[0].children[0].children[2].removeEventListener('click',window.res[4]);
      //       // element.remove();
           
      //     }
      //     elem = null;
      // }

     let time4 = setTimeout(() => {
        let list = document.querySelector('.wrapperPagestart');
        
        let elem = document.querySelectorAll('.tinRightIn');
        if(elem){
          // console.log('true list ===_');
          // stopVoiseLisenerAll();
          // при смене уровня сложности меняет на стандартную высоту страницы 
          // for (let index = 0; index < elem.length; index++) {
          //   const element = elem[index];
            
          //   element.children[0].children[1].children[0].removeEventListener('click',window.res[0]);
          //   element.children[0].children[0].children[0].children[1].children[1].removeEventListener('click',window.res[1]);
          //   element.children[0].children[0].children[0].children[1].children[2].removeEventListener('click',window.res[2]);
          //   element.children[0].children[0].children[0].children[1].children[3].removeEventListener('click',window.res[3]);
          //   element.children[0].children[0].children[0].children[2].removeEventListener('click',window.res[4]);
          //     // element.remove();
             
          //   }
            elem = null;

          list.replaceChildren();
          // document.body.style.height  = height +'px'
        } 

        localStorage.setItem('sel',sel);
     

        window.selFoOpenAllquestion = sel;

        quetionAdd(false,sel);

        if(document.querySelector('[data-span2]')){
          document.querySelector('[data-span2]').classList.remove('opal');
        }
        widjetCircolLev(sel)
        clearTimeout(time4);
        time4 = null;
      }, 800);  
    })
  })
  




  
  function burgerMenu(selector) {
    let menu = document.querySelector(selector);

    let button = document.querySelector('.burger-menu_button');
    let butto1 = document.querySelector('.burger-menu_lines');
    let links = document.querySelector('.burger-menu_link');
    let overlay = document.querySelector('.burger-menu_overlay');
    
    button.addEventListener('click', (e) => {
      e.preventDefault();
      toggleMenu();
    });
    butto1.addEventListener('click', (e) => {
      e.preventDefault();
      toggleMenu();
    menu.classList.contains('losharablt');
      if (menu.classList.contains('burger-menu_active')) {
        menu.classList.remove('burger-menu_active')
        
      } else {
        menu.classList.add('burger-menu_active');
        
      }
    });
    
    overlay.addEventListener('click', () => toggleMenu());
    
    function toggleMenu(){
      const spaner = document.querySelector('[data-span2]') ;
      if(menu.classList.contains('burger-menu_active')){
        menu.classList.remove('burger-menu_active');
        spaner.classList.remove('opal');
        // document.querySelector('.burger-menu_lines').style = 'opacity: 1;'
      } else {
        // document.querySelector('.burger-menu_lines').style = 'opacity: 0;'
        menu.classList.add('burger-menu_active');
        spaner.classList.add('opal');

      }
      
      // if (menu.classList.contains('burger-menu_active')) {
      //   document.querySelector('body').style='overlow= hidden';
      // } else {
      //   document.querySelector('body').style='overlow= visible';
      // }
    }
  }
}
export default startaStage
