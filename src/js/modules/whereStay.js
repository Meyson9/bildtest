import quetionAdd from '../services/quetionAdd';
import { openTextUserError } from '../services/LitlModules';
import burgerMenu from '../services/burgerMenuFunction';
import lostMicrophone from './lostMicrophone';
import widjetCircolLev from '../services/widjetCircolLev'; 
import clickIphone from '../services/clickIphone';
import { removeLocalStoregeQuestion } from '../services/LitlModules';
// import clickIphone from '../services/clickIphone';
let p = 0;      

const whereStay = (selector = false) => {

  try {
    if (selector) {
     return selector.addEventListener('click', (e)=> whereSt(e));
    }

  document.querySelector('#wheryIsty').addEventListener('click', (e)=> whereSt(e));
        
  } catch (error) {
    console.error(error);
  }
  function whereSt (e) {
    // try {
   e.preventDefault();
   const sel =  localStorage.getItem('WhereStayUser');
   
   if (!sel) {
     //сделать уведомления с надписью "я не знаю где ты остановился" 
     return openTextUserError('notInfoWheyStay','я не знаю где ты остановился')
   }

   // если вопрос уже существует просто долистаем до нее 
   const selen = document.querySelector('.'+sel);

   if(selen){
     return selen.scrollIntoView({block: "start", behavior: "smooth"})
   }
   

   // if (sel) {

   const selectorQuestionLevel =  sel.replace(/(question)(\d)+/,''); // узнаю к какой группе вопрос принадлежит
   const numberQuestion =  sel.replace(/(tick|cross|heart|flower)(question)/,'')-1 ,
   body = document.body,
   html = document.documentElement,
   width = Math.max( body.scrollWidth, body.offsetWidth, html.clientWidth, html.scrollWidth, html.offsetWidth ); // номер вопроса 
   let selectorQuestionopen;  
     
   // существуют ли вопросы 
   const selectorQues = document.querySelector(`.wrapper`);

   // есть? да значит смотрим что вопросы с какой группы сущесвтуют : вопроов нету
   selectorQues? selectorQuestionopen = selectorQues.classList[1].replace(/(question)(\d)+/,''):selectorQuestionopen = null;

   // с какого вопроса начать 
   let index = document.querySelectorAll('.tinRightIn').length||0

   // if(selectorQuestionopen === selectorQuestionLevel){
   //   console.log('нажимать на изменения урвоня нет смысла!');
   // }
   // console.log(`${selectorQuestionopen} !== ${selectorQuestionLevel} || !${selectorQuestionopen}`);

   if(selectorQuestionopen !== selectorQuestionLevel || !selectorQuestionopen){
    console.log('переклюать нужно для мобилок iphone!');
     window.quetiAddn = true; 
     if (global.mobaleMOde && width <= 775) {

      const btnsStart = document.querySelectorAll('.button'),
      wrapperTutle =  document.querySelector('.wrapperTutle'),
      buttonHolder =document.querySelector('.buttonHolder'),
      body = document.body,
      html = document.documentElement;
           
  let selectorListQ = [];
      let targetBtn = document.querySelector('.'+selectorQuestionLevel) ,
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

     window.modeloderad = false;
     
     if(document.querySelector('#navel').parentElement ==  document.querySelector('.time__segment') ){
        document.querySelector('#burger_men').appendChild(document.querySelector('#navel'))
     }

    //  const todoNumOne = document.querySelector('.tinRightIn');
     if(!document.querySelector('.tinRightIn')){
       wrapperTutle.classList.add('pps');
     }
    //  let time;
    //  time = setTimeout(() => {
            buttonHolder.classList.remove('hide');
            btnsStart.forEach(span=> {
            span.nextElementSibling.classList.remove('textActiveLevel');
            });
            targetBtn.nextElementSibling.classList.add('textActiveLevel');
            // clearTimeout(time);
            // time = null;
      // }, 100);

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
    // код для мобильных устройств
   
          if(navel.classList.contains('burger-menu_nav')){
        // бесполезная строка по моим предположениям
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

          document.querySelector('.gp_segment').addEventListener('click',()=>{clickIphone(selectorListQ)},{once:true});
  } else {
  console.log('пиздося');
      }

        removeLocalStoregeQuestion();
    

    //  let time4 = setTimeout(() => {
        let list = document.querySelector('.wrapperPagestart'),
            elem = document.querySelectorAll('.tinRightIn');
        if(elem){
            elem = null;

          list.replaceChildren();
          // document.body.style.height  = height +'px'
        } 

        localStorage.setItem('sel',sel);
     
        // window.selFoOpenAllquestion = sel;

        quetionAdd(false,sel);

        if(document.querySelector('[data-span2]')){
          document.querySelector('[data-span2]').classList.remove('opal');
        }
        widjetCircolLev(sel);
        // clearTimeout(time4);
        // time4 = null;
      // }, 800);  
     } else {
      console.log('переклюать надо для PC!');
       const eventMous = new MouseEvent("click", {
         view: window,
         bubbles: true,
         cancelable: true
        });
       document.querySelector(`.${selectorQuestionLevel}`).dispatchEvent(eventMous);      
     }
     
     // document.querySelector(`.${selectorQuestionLevel}`).click();
     index = 0;
    //  setTimeout(() => {
       if(global.mobaleMOde && width <= 775){
        name(numberQuestion,index);
        console.log('');
      } else {
        console.log('PC');
        setTimeout(() => { 
          pcsicle();
        },800 );
      }
       // name();
       // clickIphone(numberQuestion);
    //  }, 5000); 

   } else {
    console.log('эпереключать не нужно ');
     index = document.querySelectorAll('.tinRightIn').length-1;
     global.mobaleMOde && width <= 775?name(numberQuestion,index):pcsicle();
   } 
  
//  } catch (error) {console.error(error); }

    function name(numberQuestion,index) {
      let count = 0,
      lengthIteration = 20,
      element = document.querySelector('.modals_forms'),
      selectorListQ = numberQuestion + 1
      index = 0;
      element.classList.add('showModal');

      chicle();
      function chicle() {
  // console.log(lengthIteration+' '+selectorListQ);
        // if (lengthIteration >= selectorListQ) {
        //     lengthIteration = selectorListQ;
        // }
  
        for ( index ; index < lengthIteration; index++) {
          // console.log(++p);
          p++;
          count++;
          console.log(p+' p');
          console.log(count + ' count');
          console.log(index + ' index');
          console.log('llllllllllllllllllllllllll');
          quetionAdd(false,false,false,true);
          // if(p == selectorListQ){
          //   return console.log('все ребята!!!');
          // }
          if(p == selectorListQ -1){
            console.log('шутка чтоли ?!');
              document.querySelector('.wrapperPagestart').lastElementChild.scrollIntoView({block: "start", behavior: "smooth"});
              element.classList.remove('showModal');
              p = 0;
              return; 
          } 
        }        
        if(p >= selectorListQ) {
          console.log('цыкл разрыв');
          console.log(p);
          p = 0;
          console.log(p);
          index = 0;
            return console.log('все ребята!!!');
        } else {
          index = 0;
          console.log('цыкл не разрыв');
          let time3 = setTimeout(() => {
            chicle();
            clearTimeout(time3);
            time3 = null;
          }, 2500);
      }
      }
      // lengthIteration += 20;
      // index = count;
      // if(count  >= selectorListQ ){
      //     count = 0,
      //     lengthIteration = 20,
      //     index = 0;
      //     return;
      // } else {
      //     let time3 = setTimeout(() => {
      //     chicle();
      //     clearTimeout(time3);
      //     time3 = null;
      //     }, 2500);
      // }
      // for (index ; index < numberQuestion; index++) {
      //   // quetionAdd();
      //   quetionAdd(false,false,false,true);
      // }
      // document.querySelector('.wrapperPagestart').lastElementChild.scrollIntoView({block: "start", behavior: "smooth"});
    }
    function pcsicle() { 
      console.log(index);
      console.log(numberQuestion);
      for (index ; index < numberQuestion; index++) {
        // quetionAdd();
        console.log('llllllllllllllllllllllllllllll');
        quetionAdd(false,false,false,true);
      }
      setTimeout(() => {
        document.querySelector('.wrapperPagestart').lastElementChild.scrollIntoView({block: "start", behavior: "smooth"});
      }, 5000);
    }
  }
}

export default whereStay