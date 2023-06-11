import voiceQuestion from "./voiceQuestion";
import { stopVoiseLisenerAll,stopVoiseSpeecAll } from "./LitlModules";

const modeNonStop = (btnStartVoise,letstop,selPahtVoid,openAll) => {
  const nonStop = document.querySelector('.icon-material_tw_NonStop'); 
  const nonstopeLocalSorege = localStorage.getItem('nonstope');
  // const modeNonStop = NonStop.classList.contains('icon-material_tw_NonStop');

  

  // воспроизвести голос 

  
 let time2 = setTimeout(() => {
      const icon_material_li = document.querySelector('.icon-material_li');
      let opol = localStorage.getItem('nevosprozwodi');

      if (!icon_material_li.classList.contains('icon-material_li_mute') && !opol) {
        stopVoiseSpeecAll()
        voiceQuestion(document.querySelector(selPahtVoid),openAll) //должно быть false чтобы говориал 
        }
        clearTimeout(time2);
        time2 = null;
    }, 1200);

    if(nonStop && nonstopeLocalSorege){

      let vois =  document.querySelector(selPahtVoid);
  
       stopVoiseLisenerAll();
  
      //  vois.onended = function() {
      //   let time = setTimeout(() => {
          
      //       btnStartVoise.click(); 
  
      //       clearTimeout(time);
      //       time = null
      //     }, 700);
      //   };
  
        
      vois = null;
  
    }
   
}

export default modeNonStop