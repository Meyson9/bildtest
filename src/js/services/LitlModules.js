
function stopVoiseLisenerAll() {
  document.querySelectorAll('.pause').forEach(item => item.click());
}
function removeAttributNadClass() {
  document.querySelectorAll('.start-stop').forEach((item)=>{
    item.classList.remove('btnDeactiv') 

    item.removeAttribute('disabled' ) 
  }) 
}

function stopVoiseSpeecAll() {
  let al = document.querySelectorAll('audio');
  for(let i = 0; i < al.length;i++){
    al[i].currentTime = 0;
    if (!al[i].paused) {     
      al[i].pause();
    }
    if(i === al.length){
      al = null;
    }
  }
}

function createElementMobaile() {
  let div = document.createElement('div');
          div.classList.add('fabSegment','alerot')
          div.style.cssText = "align-items: center;"
          div.innerHTML = `
          <ul class="fab-buttons_Segment alerot">
            <li class="fab-buttons__item_Segment">
              <div href="#" class="fab-buttons__link_segment alerot btnFile fb" style="
                width: 100px;
                height: 30px;
                border-radius: 30px;
            " data-tooltip="Найти актив...">
                  <i class="icon-material icon-material_fb" style="
                  top: -14px;
                  position: relative;
              "></i>
              </div>
            </li>
            <li class="fab-buttons__item_Segment">
              <div href="#" id="non_stop_mode"  class="fab-buttons__link_segment alerot btnFile tw" style="
                  width: 100px;
                  height: 30px;
                  border-radius: 30px;
              " data-tooltip="Нон-стопом">
                    <i id="non_stop_mode_icon" class="icon-material icon-material_tw" style="
                    top: -14px;
                    position: relative;
                "></i>
              </div>
            </li>
            <li class="fab-buttons__item_Segment">
              <div href="#" id="voise_mudte" class="fab-buttons__link_segment alerot btnFile li" style="
                  width: 100px;
                  height: 30px;
                  border-radius: 30px;
              "  data-tooltip="Звук">
                    <i id="voise_mudte_icon" class="icon-material icon-material_li" style="
                    top: -14px;
                    position: relative;
                "></i>
              </div>
            </li>
            <li class="fab-buttons__item_Segment">
              <div href="#"  class="fab-buttons__link_segment alerot btnFile gp_segment" style="
                width: 100px;
                height: 30px;
                border-radius: 30px;
            " data-tooltip="показать все">
                  <i  class="icon-material icon-material_gp" style="
                  top: -14px;
                  position: relative;
              "></i>
                </div>
            </li>
            <li class="fab-buttons__item_Segment">
              <div href="#" id="wheryIsty" class="fab-buttons__link_segment alerot btnFile wher" style="
                  width: 100px;
                  height: 30px;
                  border-radius: 30px;
              " data-tooltip="где я был?">
                    <i class="icon-material icon-material_Wher" style="
                    top: -14px;
                    position: relative;
                "></i>
              </div>
            </li>
          </ul>
          </span>
          `

            const sp2 = document.querySelector(".btnFile");
            const parentDiv = sp2.parentNode;
            parentDiv.insertBefore(div, sp2);
            div = null;
}

function openTextUserError(idPopap,text = 'Упс, что-то пошло не так!', url= null, timeout = 10000) {
 const array =  document.querySelector('#modalAll').children
   for (let index = 0; index < array.length; index++) {
    const item = array[index]; 
    if(item.getAttribute('data-PopapId')== idPopap) return;
  }
  document.querySelector('#modalAll').replaceChildren();

  const objLocal = {element: document.createElement('div')};
  objLocal.element.id = 'oneModallPopap';
  objLocal.element.setAttribute('data-PopapId',idPopap);
  objLocal.element.innerHTML = `
  <div id="myModal" class="modalPopap">
  <span class="clousePopap">×</span>
  <div class="modal_slid_contnt">
  <p style="font-size: 1.4em;"
  >${text}</p>
    <div style="
      display: flex;
      justify-content: center;
    ">
     ${url?'<a href="'+url+'" target="_blank">Полезная ссылка для исправления данной ошибки </a>':''}
    </div>
  </div>
</div>
  `
  document.querySelector('#modalAll').append(objLocal.element);

  let clouse = document.querySelector('.clousePopap');

  const noo = () => {
    document.querySelector('#modalAll').replaceChildren();
    clouse.removeEventListener('click', noo);
  };
  clouse.addEventListener('click', noo);
  let time = setTimeout(() => {
    noo();
    clearTimeout(time);
    time = null;
    objLocal.element = null;
    clouse = null;
  }, timeout);
 }
// item.pause()
function removeLocalStoregeQuestion() {
  for(let [key] of Object.entries(localStorage)) {
    let selectorQuestionLevel =  key.search(/(tick|cross|heart|flower)(question)/);
    
    if (selectorQuestionLevel === 0) {
      localStorage.removeItem(key);
    }
    selectorQuestionLevel = null;
  }
}
function scrollDown() {
  document.querySelector('.wrapperPagestart').lastElementChild.scrollIntoView({block: "start", behavior: "smooth"});
}
export {stopVoiseLisenerAll,stopVoiseSpeecAll,createElementMobaile,openTextUserError,removeAttributNadClass,removeLocalStoregeQuestion, scrollDown}


