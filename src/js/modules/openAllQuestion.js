// import { stopVoiseLisenerAll, stopVoiseSpeecAll } from "../services/LitlModules";
// import standardQuestions from "./standardQuestions";
// import quetionAdd from "../services/quetionAdd";
import openciCycle from "../services/openciCycle";

const openAllQuestion = (selector) => {
   

    let iconMaterialOpenAll = document.querySelector('.icon-material_gp');
    
    iconMaterialOpenAll.addEventListener('click', startOpenCycle)

    function startOpenCycle(e) {
      e.preventDefault(); 

      openciCycle(selector)

      iconMaterialOpenAll.removeEventListener('click', startOpenCycle)
      iconMaterialOpenAll = null;
}

}
export default openAllQuestion
