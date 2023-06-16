import { scrollDown} from "../services/LitlModules";
// import standardQuestions from "./standardQuestions";
// import quetionAdd from "../services/quetionAdd";
import openciCycle from "../services/openciCycle";

const openAllQuestion = (selector) => {
   

    let iconMaterialOpenAll = document.querySelector('.icon-material_gp'),
    countClick = 0;

    iconMaterialOpenAll.removeEventListener('click', scrollDown);
    iconMaterialOpenAll.addEventListener('click', startOpenCycle);
    
    iconMaterialOpenAll.parentElement.setAttribute('data-tooltip',"Показать все"); 
    iconMaterialOpenAll.classList.remove('icon-material_scrollDown');
    function startOpenCycle(e) {
      e.preventDefault(); 
      // if(document.querySelector('.tinRightIn'))
      openciCycle(selector);

      iconMaterialOpenAll.removeEventListener('click', startOpenCycle);
      // iconMaterialOpenAll = null;
      iconMaterialOpenAll.parentElement.setAttribute('data-tooltip',"Прокрутить вниз");  
      iconMaterialOpenAll.classList.add('icon-material_scrollDown');

      // iconMaterialOpenAll.parentElement.dataset = 
      iconMaterialOpenAll.addEventListener('click', scrollDown);

      console.log('============================');
}
// function scrollDown() {
//   document.querySelector('.wrapperPagestart').lastElementChild.scrollIntoView({block: "start", behavior: "smooth"});
// }
}
export default openAllQuestion
