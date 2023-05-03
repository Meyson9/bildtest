import multiPlepresButtons  from "../services/multiPlepresButtons";
import chech  from "../services/chech";
import automationSizeInput from "../services/automationSizeInput";
// import voiceQuestion from "../services/voiceQuestion";
import elemScroll from "../services/elemScroll";
import modeNonStop from "../services/modeNonStop";
import { stopVoiseLisenerAll,stopVoiseSpeecAll, openTextUserError } from "../services/LitlModules";
import widjetCircolLev from "../services/widjetCircolLev";
let count = 0
/*
multiPlepresButtons
chech
elemScroll
modeNonStop
widjetCircolLev
*/
const  app = (selStart, selStop, selRemove, selTextare, selPahtVoid, selLocal, selBtnResp,selVoisIcPuls,openAll,key) => {
 



  const recognizer = global.recog;

  const params = {
    btnStartVoise : document.querySelector(selStart),
    letstop : document.querySelector(selStop),
    remove : document.querySelector(selRemove),
    textare : document.querySelector(selTextare),
    btnResp : document.querySelector(selBtnResp),
    material_fb : document.querySelector('.icon-material_fb')
  };

  let resal = true;
  let setinte;
  localStorage.removeItem('nevosprozwodi');

  recognizer.onstart = (e) => {
   
    localStorage.setItem('nevosprozwodi','zapis')
    // console.log("Распознавание голоса запущено" + selStart);

    // multiPlepresButtons(true,selStart) не был включен
  };

  recognizer.onerror = ({ error }) => {
    console.error(error);
    console.log(error);
    // console.log('erorrrr======');
    resal = false;
    stop();
    // let count = 0 
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
      case 'aborted':
        openTextUserError('aborted','Что-то вызвало резкий обрыв записи!',null,4000);
        break;
    }
    // if (error == 'no-speech') {
    //   // resal = false;
    //   // stop();
    //  return openTextUserError('Не молчи, слово молви добрый человек')
    // } 
    // if (error == 'not-allowed') {
    //   // resal = false;
    //   // stop();
    //   return openTextUserError('Вы не дали доступ к микрофону!', 'https://knowledge.granatum.solutions/2020/04/02/access-to-the-camera-and-microphone-in-different-browsers/');
    // } 
    // if (error == 'network') {
    //   // resal = false;
    //   // stop();

    //   return openTextUserError('Отсутствует соединение к интернету!')
    //   // recognizer.start();
    // }
    // if (error == 'aborted') {
    //   // resal = false;
    //   // stop();
    //   return openTextUserError('Что-то вызвало резкий обрыв записи!',null,4000);
    // }
  };

  recognizer.onend = () => {
    // console.log("Распознавание голоса закончено" + selStart);
    stop();
    // openTextUserError('Распознование голоса завершилось!',null,4000);
    multiPlepresButtons(false,selStart); //был включен
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
    e.preventDefault()


    let target = e.target.parentNode.nextElementSibling;
    // if(e.target.localName === "button") {
    //   target = e.target.parentNode.nextElementSibling
    // } else {
    //   target = e.target.parentNode.parentNode.nextElementSibling
    // }
    target.value = '';
    target.innerHTML = '';
    localSet('');
    removeAnswer(selLocal);
    // localStorage.setItem(selLocal, '');
    widjetCircolLev()
    target= null;
  }


  // automationSizeInput(textare)


     

  function startVoise(event) { 
    event.preventDefault();
    if (params.btnStartVoise.classList.contains('iconActive')) {
      return
    }
    stopVoiseSpeecAll();
    
    //set localStorage Where Stay user 
    localStorage.setItem('WhereStayUser',selLocal);
    params.material_fb.classList.add('icon-material_Pulsev');
    
    resal = true;
    document.querySelector(selVoisIcPuls).classList.add('iconActive');

    recognizer.start();
    recognizer.onresult = function (event) {
      let result = event.results[event.resultIndex];
      saveResultTranscript(result.isFinal?true:false, result,selLocal );
      // if (result.isFinal) {
      //     // console.log('Вы сказали в тоге: ' + result[0].transcript);
      //     saveResultTranscript(true, result,selLocal );
      // } else {
      //     // console.log('Промежуточный результат: ', result[0].transcript);
      //     // …то отображаем его содержимое в нашем редакторе
      //     saveResultTranscript(false, result,selLocal );
      // }
      result = null;
    };
    multiPlepresButtons(true,selStart); // был включен
  }


  function stop(event) {
    event&&event.preventDefault();

    params.material_fb.classList.remove('icon-material_Pulsev');

    params.btnStartVoise.children[0].classList.remove('iconActive');
    // if(params.btnStartVoise.children[0].attributes[0].classList.contains('iconActive')){
    //   console.log(params.btnStartVoise.children[0].attributes[0].ownerElement);
    //   console.log(params.btnStartVoise.children[0]);
    // }

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
    let db= window.dbasce;
    let ap = selLocal.replace(/(\d)+/,'')
    let transaction = db.transaction([ap],"readwrite");
    let store = transaction.objectStore(ap);
    
    let request = store.delete(key);
    //
    request.onsuccess = function(e) {
        // console.log('удивленно нахуй');
        db,ap,transaction,store,request = null;
    }	
  }
 
  function getAnswer() {
    let db= window.dbasce;

    if (getAnswer.isRun) {
      return 
    }

    let ap = selLocal.replace(/(\d)+/,'')

    let transaction = db.transaction([ap],"readonly");
    let store = transaction.objectStore(ap);

    let request = store.get(selLocal);
  
  //
    request.onsuccess = function(e) {
      let result = e.target.result;
      // console.log(result);
        result? saveResultTranscript(true, false, selLocal,result['value']):'';
        db,ap,transaction,store,request = null;
        
      }	
      getAnswer.isRun = true
  }
  
  getAnswer()



  

  function addAnswer(value) {
    let db= window.dbasce;

    let ap = selLocal.replace(/(\d)+/,'')
    //Get a transaction
    //default for OS list is all, default for type is read
    let transaction = db.transaction([ap],"readwrite");
    //Ask for the objectStore
    let store = transaction.objectStore(ap);
  
    //Define a person
    let person = {
      name:selLocal,
      value:value,
    }
  
    //Perform the add
    // let request = store.add(person);
    let request = store.put(person);
  
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
    cor = (local?local:'') +' '+ (result? result[0].transcript:'').trim();
    // cor = `${local?local:''} ${result? result[0].transcript:''}`;
    // cor = `${local?local:''} ${result? result[0].transcript:''}`.trim();
    // params.textare.value = chech(cor);  //был включен
    params.textare.value = cor;  //был включен

    if (save) {
       params.textare.value = chech(cor);  //был включен
        localSet(cor);
        // addAnswer(localStorage.getItem(selLocal))
        // addAnswer(cor.trim());
        addAnswer(cor);
      }
      local = null;
      cor = null;
  }

  function localSet(params) {
    localStorage.setItem(selLocal,chech(params)); 
    // addAnswer(selLocal,chech(params));
  }


  window.res = [respBtn,removebt,startVoise,stop,textf,params];


  if(!openAll){
    let timeModeNonStop = setTimeout(() => {
      modeNonStop(params.btnStartVoise,params.letstop,selPahtVoid,openAll)

      // очистка
      clearTimeout(timeModeNonStop);
      timeModeNonStop = null
    }, 10);
  }

  if (!openAll) {
    let time = setTimeout(() => {
      elemScroll(selLocal);

      // очистка
      clearTimeout(time);
      time = null
    }, 10);
  }

}

export default app