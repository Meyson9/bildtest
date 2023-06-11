// import voiceQuestion from "./voiceQuestion";
import standardQuestions from "../modules/standardQuestions";
import dbArr from '../db/dbArr.json' 
import { stopVoiseLisenerAll, stopVoiseSpeecAll } from "../services/LitlModules";
  let counter = 0,
      arlist = [],
      seler = null,
      audio,
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
  // console.log(!prop);
  let NoneStopMode = document.querySelector('#non_stop_mode_icon').classList.contains('icon-material_tw_NonStop'); 
  if(NoneStopMode){
    // document.querySelector('.pause').click();
    const recognizer = global.recog;
    recognizer.stop();
    document.querySelectorAll('.start-stop').forEach((item)=>{
      item.classList.remove('btnDeactiv') 

      item.removeAttribute('disabled' ) 
    })
  }

  let time = setTimeout(() => {
    if (!prop) { // октрываем все !нет 
      const localMute = localStorage.getItem('muteVoise'),
            icon_material_li = document.querySelector('.icon-material_li');

    // if(/Macintosh|iPhone|iPad|iPod/i.test(navigator.userAgent) && !localMute && !icon_material_li.classList.contains('icon-material_li_mute')){ // мобилка 
    if(global.appleMode && !localMute && !icon_material_li.classList.contains('icon-material_li_mute')){ // мобилка 
    // console.log('прошел !');
      if(audio) {
        let audio_button = document.querySelector(`#voise_aa${counter}`) 
        audio_button.classList.remove('audio_pause');
        audio_button.classList.add('audio_play');
        audio.pause();
      }
      audio = new Audio(arlist[counter-1][2]);
    
      let set = setTimeout(() => {
        let countThis = counter
        countThis+1
        // let btn = document.querySelector();
        playVid(audio,`#voise_aa${countThis}`,`.progress__current${countThis}`,`.progress__bar${countThis}`,countThis);
        
        clearTimeout(set);
        set = null;

    }, 1000);
  
    // console.log(`#voise_aa${countThis}`);
    function playVid(track,audio_but,key,progress__bar,countThis) {
          track.play();
          localStorage.setItem('iphoneLocalVoise', '');

          let audio_button = document.querySelector(audio_but);

          audio_button.addEventListener('click', pauseEL)
          
          function pauseEL() {
            if (!audio_button.classList.contains('audio_play')) {
              track.pause();
              localStorage.setItem('iphoneLocalVoise', false)
              audio_button.classList.remove('audio_pause');
              audio_button.classList.add('audio_play');

              track.currentTime = 0;
            } 
            audio_button.removeEventListener('click', pauseEL);
          }
        track.onpause = () => {
          audio_button.classList.remove('audio_pause');
          audio_button.classList.add('audio_play');
          audio_button.removeEventListener('click', pauseEL);
        }

        track.onplay = function() {
          audio_button.classList.remove('audio_play');
          audio_button.classList.add('audio_pause');
        };
      
        track.onended  = function() {
          audio_button.classList.remove('audio_pause');
          audio_button.classList.add('audio_play');
          track.currentTime = 0;
          audio_button.removeEventListener('click', pauseEL);
          if(NoneStopMode) { 
            let tiem = setTimeout(() => {
              document.querySelector('.start-stop'+countThis).click();
              clearTimeout(tiem);
          }, 900);
          } 
            };
      
        track.ontimeupdate = function(e) {myFunction(e)};
          function myFunction(e) {
            // console.log(e);
              const { duration, currentTime } = e.srcElement;
              const progressPercent = (currentTime / duration) * 100;
              document.querySelector(key).style.width = `${progressPercent}%`;
          }
        }
      }
  }
  clearTimeout(time);
  time = null;
}, 0);


  // работает 
  // const audio = new Audio(arlist[counter][2]);
  
  // // audio.autoplay = true;
  // setTimeout(() => {
  //   // alert('artr1')
  //   audio.play();
  //   // audio.play();
  //   // audio.play();
  // }, 1000);



  if (counter > arlist.length-1) {
    arlist = [];
    // console.log("ну все !");
    return
  }
  if(!prop){
    // stopVoiseLisenerAll();
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