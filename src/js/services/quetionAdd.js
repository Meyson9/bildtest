// import voiceQuestion from "./voiceQuestion";
import standardQuestions from "../modules/standardQuestions";
import dbArr from '../db/dbArr.json' 
import { stopVoiseLisenerAll, stopVoiseSpeecAll } from "../services/LitlModules";
  let counter = 0,
      arlist = [],
      seler = null,
      selectorListQ = [];

const quetionAdd = (vioseSkib, sel, e, prop = false) => { 

  if(e){
    e.preventDefault();
  }

  if(sel){
    counter = 0;
      switch (sel) {
        case 'tick':
            arlist = dbArr['styles'][0];
            sel = 'tick';
          break;
        case 'cross':
            arlist = dbArr['styles'][1];
            sel = 'cross';
          break;
        case 'heart':
            arlist = dbArr['styles'][2];
            sel = 'heart';
          break;
        case 'flower':
            arlist = dbArr['styles'][3];
            sel = 'flower';
          break;
      }
  }

  if(sel){
    seler = sel;
  }

  if(document.querySelectorAll('.tinRightIn').length !== 0 &&  window.modeloderad){
    counter = document.querySelectorAll('.tinRightIn').length;
  }

  // if (window.quetiAddn) {
  //   window.quetiAddn = false
  //   return ''
  // }


  if (counter > arlist.length-1) {
    arlist = [];
    return console.log("ну все !");
  }
  if(!prop){
    stopVoiseLisenerAll();
  }

  if(vioseSkib){
    return arlist = [];
  }
  
  const wrapperTutle =  document.querySelector('.wrapperTutle');

  if(wrapperTutle.classList.contains('pps')){
    wrapperTutle.classList.remove('pps');
  }

  standardQuestions(arlist[counter],seler,counter+1,prop,arlist.length);

  counter++;
}
export default quetionAdd;