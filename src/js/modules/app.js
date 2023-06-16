import multiPlepresButtons  from "../services/multiPlepresButtons";
import chech  from "../services/chech";
// import automationSizeInput from "../services/automationSizeInput";
// import voiceQuestion from "../services/voiceQuestion";
// import buzz from "buzz";
import elemScroll from "../services/elemScroll";
// import modeNonStop from "../services/modeNonStop";
import { openTextUserError, removeAttributNadClass } from "../services/LitlModules";
// import { stopVoiseLisenerAll,stopVoiseSpeecAll, openTextUserError } from "../services/LitlModules";
import widjetCircolLev from "../services/widjetCircolLev";
// let count = 0
// let  app = (selStart, selStop, selRemove, selTextare, selPahtVoid, selLocal, selBtnResp,selVoisIcPuls,openAll,key,viosId,viosPath = 'assets/voise/samCh.mp3',progress__bar) => {
let mySound;

let  app = (key, selStart,selLocal,selLocalRepl, openAll,viosPath = 'assets/voise/samCh.mp3') => {
  const recognizer = global.recog;
  recognizer.stop();
  const params = {
    btnStartVoise : document.querySelector(selStart),
    letstop : document.querySelector('.pause'+key),
    remove : document.querySelector('.btn-remove'+key),
    textare : document.querySelector('.lasss' + key,),
    btnResp : document.querySelector('#btnResp'+ key),
    material_fb : document.querySelector('.icon-material_fb')
  };
 let audio_button = document.querySelector('#voise_aa'+key),
  curtiem;

  mySound &&  pauseVid(mySound);
  mySound = new Audio(viosPath);  
  // if (!openAll) {
  // }


    document.querySelector('.progress__bar'+key).addEventListener('click', setProgress);
  function setProgress(e) {
    const width = this.clientWidth,
          clickX = e.offsetX,
          duration = mySound.duration;
    curtiem = (clickX / width) * duration;
    mySound.currentTime = (clickX / width) * duration;
  }

  mySound.ontimeupdate = function(e) {myFunction(e)};
  function myFunction(e) {
    // console.log(e);
    if(!document.querySelector('.progress__current'+key)) return
      const { duration, currentTime } = e.srcElement,
            progressPercent = (currentTime / duration) * 100;
      document.querySelector('.progress__current'+key).style.width = `${progressPercent}%`;
  }

  function playVid(track) {
   
    // console.log(track.readyState);
    // recognizer.stop();
      track.play();

  
    track.onplay = function() {
      // alert("The video has started to play");
      audio_button.classList.remove('audio_play');
      audio_button.classList.add('audio_pause');
    };

    track.onpause = function() {
      curtiem = track.currentTime;
    };
    
    track.onended  = function() {
      // console.log("The audio has ended function axmedet");
      audio_button.classList.remove('audio_pause');
      audio_button.classList.add('audio_play');
      track.currentTime,curtiem = 0;
      let NoneStopMode = document.querySelector('#non_stop_mode_icon').classList.contains('icon-material_tw_NonStop'); 
      if(NoneStopMode){
        // recognizer.stop();
        let time = setTimeout(() => {
          startVoise();
          clearTimeout(time);
        }, 900);
      }
        };

    track.ontimeupdate = function(e) {myFunction(e)};
    // function myFunction(e) {
    //   // console.log(e);
    //   if(!document.querySelector(progress__current)) return
    //     const { duration, currentTime } = e.srcElement;
    //     const progressPercent = (currentTime / duration) * 100;
    //     document.querySelector(progress__current).style.width = `${progressPercent}%`;
    // }
  }

  function pauseVid(track) {
    track.pause();
    audio_button.classList.remove('audio_pause');
    audio_button.classList.add('audio_play');
    // console.log('вызвался');
  }

  
  
  // console.log(global.appleMode);
  // mySound.play();
  // if(/Macintosh|iPhone|iPad|iPod/i.test(navigator.userAgent)) {
  if(global.appleMode) {
        let b,i,c;
       i = setInterval(() => {
          if(localStorage.getItem('iphoneLocalVoise')) {
            setListeerBtnPlay();
            c = true
            clearInterval(i);
            clearTimeout(b);
            i = null;
            b = null;
          }
        }, 100);

        mySound.onloadedmetadata = function() {
          let b =  setTimeout(() => {
            // console.log('clear nau');  
            // clearInterval(i);
              if(c!==true) setListeerBtnPlay();

            clearInterval(i);
            clearTimeout(b);
              i = null;
              b = null;
            }, (mySound.duration*1000));
          };
          
          if (!openAll) {
            let time = setTimeout(() => {
              elemScroll(selLocal);

              // очистка
              clearTimeout(time);
              time = null;
            }, global.mobaleMOde? 400:700);
          }

      } else { // кроме apple

        // !openAll && playVid(mySound);
        setListeerBtnPlay();
        if (!openAll) {
          let btnVoiseMute = document.querySelector('#voise_mudte_icon').classList.contains('icon-material_li_mute');
          if(!btnVoiseMute) {
            recognizer.stop();
            playVid(mySound);
          } 
          elemScroll(selLocal);
        }
      }

  function setListeerBtnPlay() {        
    audio_button.addEventListener('click', (e) =>{
        e.preventDefault();
        if (audio_button.classList.contains('audio_play')) {

            mySound && mySound.pause();
            mySound = new Audio(viosPath);
          
            if(curtiem) {
               mySound.currentTime = curtiem;
               curtiem = null;
            }
          
            playVid(mySound);
           } else {
             pauseVid(mySound);
           }
      })
    }




  let resal = true;
  // let setinte;
  localStorage.removeItem('nevosprozwodi');
  // recognizer events

  recognizer.onstart = (e) => { 
    localStorage.setItem('nevosprozwodi','zapis')
    // console.log("Распознавание голоса запущено" + selStart);
    // multiPlepresButtons(true,selStart) не был включен
  };

  recognizer.onerror = ({ error }) => {
    console.error(error);
    resal = false;
    stop();
    switch (error) {
      case 'no-speech':
        openTextUserError('no_speech','Не молчи, слово молви добрый человек');
        break;
      case 'not-allowed':
        openTextUserError('not_allowed','Вы не дали доступ к микрофону!', 'https://knowledge.granatum.solutions/2020/04/02/access-to-the-camera-and-microphone-in-different-browsers/',20000);
        break;
      case 'network':
        openTextUserError('network','Отсутствует соединение к интернету!')
        break;
      // case 'aborted':
      //   openTextUserError('aborted','Что-то вызвало резкий обрыв записи!',null,4000);
      //   break;
    }
  };

  // recognizer.onsoundend = (event) => {
  //   // console.log(event);
  //   console.log("Sound has stopped being received");
  // };

  // recognizer.onspeechend = (e) => {
  //   // console.log(e);
  //   console.log("ты перестал говорить");
  // };

  recognizer.onend = () => {
    console.log("Распознавание голоса закончено " + selStart +new Date().toLocaleTimeString());
    stop();
    removeAttributNadClass();
    // console.log(localStorage.getItem(selLocal));
    addAnswer(localStorage.getItem(selLocal));
     
    // !global.mobaleMOde && openTextUserError('net','Распознование голоса завершилось!',null,3000);
    multiPlepresButtons(false,selStart); //был включен
    if(params.textare.value.length < 3) widjetCircolLev();
    
    localStorage.removeItem('nevosprozwodi');
    // console.log(!resal);
    if (!resal) return;
    // recognizer.start();
    startVoise();
  };

  // EventListeners

  params.btnResp.addEventListener('click', respBtn);          // open respons
  params.remove.addEventListener('click', removebt);          // clear this input user 
  params.btnStartVoise.addEventListener('click', startVoise); // start listener vois 
  params.letstop.addEventListener('click', stop);             // stol listen vios 
  params.textare.addEventListener('input', textf);            // input listeer 


  function respBtn(e) {
    e.preventDefault();


    this.classList.toggle("active");

    let panel = this.nextElementSibling;

    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
    } else {
      panel.style.cssText  = `max-height: ${panel.scrollHeight}px; `;
    }
    panel= null;
  }

  function removebt(e){
    e.preventDefault();
    params.textare.value = '';
    params.textare.innerHTML = '';
    localSet('');
    removeAnswer(selLocal);
    widjetCircolLev();
  }


  function startVoise(event) { 
    event && event.preventDefault();
    if (params.btnStartVoise.classList.contains('iconActive')) return;
    
    // stopVoiseSpeecAll();
    
    //set localStorage Where Stay user 
    localStorage.setItem('WhereStayUser',selLocal);
    params.material_fb.classList.add('icon-material_Pulsev');
    
    resal = true;
    document.querySelector('#voisIconi'+key).classList.add('iconActive');
    // document.querySelector(selVoisIcPuls).classList.add('iconActive');

    recognizer.start();
    recognizer.onresult = function (event) {
      let result = event.results[event.resultIndex];
      saveResultTranscript(result.isFinal?true:false, result,selLocal );
      
      result = null;
    };
    multiPlepresButtons(true,selStart); // был включен
  }

  function stop(event) {
    event&& event.preventDefault();
    params.material_fb.classList.remove('icon-material_Pulsev');
    console.log(params.btnStartVoise);
    params.btnStartVoise.children[0].classList.remove('iconActive');
    params.btnStartVoise.classList.add('start')
    resal = false;
    recognizer.stop();
  }
 

  function textf(event) {
    event.preventDefault();
    localSet(params.textare.value);
    addAnswer(localStorage.getItem(selLocal));
    if(params.textare.value.length == 0){
      removeAnswer(selLocal)
    }
    if(params.textare.value.length <= 1){
      widjetCircolLev();
    }
  }
  // let db= window.dbasce;

  function removeAnswer(key) {
    // let ap = selLocal.replace(/(\d)+/,'');
    let db= window.dbasce,
        ap = selLocalRepl,
        transaction = db.transaction([ap],"readwrite"),
        store = transaction.objectStore(ap),
        request = store.delete(key);
    //
    request.onsuccess = function(e) {
        // console.log('удивленно нахуй');
        db,ap,transaction,store,request = null;
    }	
  }
 
  function getAnswer() {
    
    if (getAnswer.isRun) {
      return 
    }
    // let ap = selLocal.replace(/(\d)+/,'')
    let db= window.dbasce,
        ap = selLocalRepl,
        transaction = db.transaction([ap],"readonly"),
        store = transaction.objectStore(ap),
        request = store.get(selLocal);
  
  //
    request.onsuccess = function(e) {
      let result = e.target.result;
      // console.log(result);
        result? saveResultTranscript(true, false, selLocal,result['value']):'';
        db,ap,transaction,store,request,result = null;
        
      }	
      getAnswer.isRun = true
  }
  
  getAnswer()



  

  function addAnswer(value) {
    let db= window.dbasce,
        ap = selLocalRepl,
        transaction = db.transaction([ap],"readwrite"),
        store = transaction.objectStore(ap),
        person = {
          name:selLocal,
          value:value,
        },
        request = store.put(person);
        // let ap = selLocal.replace(/(\d)+/,'')

  
    request.onerror = function(e) {
      //some type of error handler
      db,ap,transaction,store,person,request = null;
    }
  
    // request.onsuccess = function(e) {
    //   // console.log(e);
    //   // console.log("Транзакция закончилась успешно!");
    // }
  }
  
  if (localStorage.getItem(selLocal) !== null) {
    saveResultTranscript(true, false, selLocal,localStorage.getItem(selLocal))
  }

  function saveResultTranscript(save = true, result, selLocal,oneSeveer=false) {
    //target result
    widjetCircolLev();
    
    // automationSizeInput(textare);
    oneSeveer?localStorage.setItem(selLocal,oneSeveer):'';

    // …то отображаем его содержимое в нашем редакторе
    let local = localStorage.getItem(selLocal),
    cor = (local?local:'') +' '+ (result? result[0].transcript:'');
    // params.textare.value = chech(cor);  //был включен
    params.textare.value = cor;  //был включен

    if (save) {
       params.textare.value = chech(cor).trim();  //был включен
        localSet(cor);
        // addAnswer(cor);
      }
      local = null;
      cor = null;
  }

  function localSet(params) {
    localStorage.setItem(selLocal,chech(params).trim()); 
  }


  
}

//     // modeNonStop(params.btnStartVoise,params.letstop,selPahtVoid,openAll)

export default app



