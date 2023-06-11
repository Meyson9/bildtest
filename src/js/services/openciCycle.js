// import { stopVoiseLisenerAll,stopVoiseSpeecAll } from "./LitlModules";
// import standardQuestions from "../modules/standardQuestions";
import quetionAdd from "./quetionAdd";
// import dbArr from '../db/dbArr.json'
// let selectorDB,selectorDBLenght

const openciCycle = (localSel) => {
 
  let selectorListQ = null

        switch (localSel) {
          case 'tick':
            // selectorListQ = dbArr['styles'][0];
            selectorListQ = window.objectAllCor[localSel];
            break;
          case 'cross':
            selectorListQ = window.objectAllCor[localSel];;
            break;
          case 'heart':
            selectorListQ = window.objectAllCor[localSel];
            break;
          case 'flower':
            selectorListQ = window.objectAllCor[localSel];
            break;
        }
        // let index = document.querySelectorAll('.tinRightIn').length
        
        //  selectorListQ = selectorListQ.length;
  // stopVoiseLisenerAll();
  // stopVoiseSpeecAll();
  let index = document.querySelectorAll('.tinRightIn').length
  for (index ; index < selectorListQ; index++) {
    // console.log(index + " : " + (selectorListQ -1));
    // console.log(selectorListQ);
    
    if(index == selectorListQ-1) {
      // console.log('true');
      quetionAdd(false,false,false,false);

    } else {
      quetionAdd(false,false,false,true);
    }
    
  }

  selectorListQ= null;
  localSel = null;

}
export default openciCycle;