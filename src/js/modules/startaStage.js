import quetionAdd from "../services/quetionAdd";
import openAllQuestion from "./openAllQuestion";
import whereStay from "./whereStay";
import lostMicrophone from "./lostMicrophone";
import widjetCircolLev from "../services/widjetCircolLev";
import { stopVoiseLisenerAll,createElementMobaile, removeLocalStoregeQuestion,scrollDown } from "../services/LitlModules";
import burgerMenu from "../services/burgerMenuFunction";
import clickIphone from "../services/clickIphone";

const startaStage = () =>{
  const btnsStart = document.querySelectorAll('.button'),
        wrapperTutle =  document.querySelector('.wrapperTutle'),
        buttonHolder =document.querySelector('.buttonHolder'),
        body = document.body,
        html = document.documentElement;
        
  let selectorListQ = [];
  btnsStart.forEach((item)=> {
    item.addEventListener('click', (e)=>{
      e.preventDefault();
      selectorListQ = [];
      // console.log(e);
      
     let targetBtn = e.target,
         time,
         navel = document.querySelector('#navel'),
         burger_men = document.querySelector('#burger_men'),
         btnBurge_men = document.querySelector('#btnBurge_men'),
         spanBurger_man = document.querySelector('#spanBurger_man'),
         overlowBurger = document.querySelector('#overlowBurger'),
         sel = 'tick',
         localSel = targetBtn.classList[2],
         width = Math.max( body.scrollWidth, body.offsetWidth, html.clientWidth, html.scrollWidth, html.offsetWidth ),
         btn = document.querySelector('.staet');
        //  console.log(targetBtn);
        //  console.log(localSel);
     window.modeloderad = false;
     
     if(document.querySelector('#navel').parentElement ==  document.querySelector('.time__segment') ){
        document.querySelector('#burger_men').appendChild(document.querySelector('#navel'))
     }

    //  const todoNumOne = document.querySelector('.tinRightIn');
     if(!document.querySelector('.tinRightIn')){
       wrapperTutle.classList.add('pps');
     }
    //  let time;
     time = setTimeout(() => {
            buttonHolder.classList.remove('hide');
            btnsStart.forEach(span=> {
            span.nextElementSibling.classList.remove('textActiveLevel');
            });
            targetBtn.nextElementSibling.classList.add('textActiveLevel');
            clearTimeout(time);
            time = null;
      }, 100);

            // selectorListQ = [];
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
                selectorListQ = window.objectAllCor[localSel];
                sel = 'flower'
                break;
            }
        localSel= null;
  // if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) && width <= 775) {
  if (global.mobaleMOde && width <= 775) {
    // //         // код для мобильных устройств
    // if(!btn.classList.contains('hide')){
    //   btn.classList.add('hide');
    // }
          if(navel.classList.contains('burger-menu_nav')){
        // бесполезная строка по моим предполоениям
            // let menu = document.querySelector('.burger-menu');
            document.querySelector('.burger-menu').classList.remove('burger-menu_active');
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
          const iconMaterialOpenAll = document.querySelector('.icon-material_gp');
          const elementList = document.querySelector('.gp_segment');
          
          elementList.removeEventListener('click', scrollDown);
          elementList.removeEventListener('click',()=>{clickIphone(selectorListQ)}, {once:true})
          
          elementList.addEventListener('click',()=>{clickIphone(selectorListQ)}, {once:true});
          

          iconMaterialOpenAll.parentElement.setAttribute('data-tooltip',"Показать все"); 
          iconMaterialOpenAll.classList.remove('icon-material_scrollDown');

  } else {
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

        removeLocalStoregeQuestion();
        const boolean = global.mobaleMOde && width <= 775
        if(boolean){
          let list = document.querySelector('.wrapperPagestart'),
              elem = document.querySelectorAll('.tinRightIn');
          if(elem){
              elem = null;
  
            list.replaceChildren();
            // document.body.style.height  = height +'px'
          } 
          wrapperTutle.classList.add('pps');

        }
     let time4 = setTimeout(() => {
      if(!boolean){
        let list = document.querySelector('.wrapperPagestart'),
            elem = document.querySelectorAll('.tinRightIn');
        if(elem){
            elem = null;

          list.replaceChildren();
          // document.body.style.height  = height +'px'
        } 
      }
        localStorage.setItem('sel',sel);
     
        // window.selFoOpenAllquestion = sel;

        quetionAdd(false,sel);

        if(document.querySelector('[data-span2]')){
          document.querySelector('[data-span2]').classList.remove('opal');
        }
        widjetCircolLev(sel);
        clearTimeout(time4);
        time4 = null;
      },boolean? 400:800);  
    })
  })
  
}
export default startaStage
