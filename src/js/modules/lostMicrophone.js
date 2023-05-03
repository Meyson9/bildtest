// import elemScroll from "../services/elemScroll";
const lostMicrophone = (sel=false) => {

const btnLostMicrophone =  document.querySelector(sel?'.fab-buttons__link_segment':'.fab-buttons__link');

btnLostMicrophone.addEventListener('click', (e)=> {
  e.preventDefault();
  let activeMicrapone = localStorage.getItem('WhereStayUser'), 
      p = document.querySelector("."+activeMicrapone);
  if(!p) return console.log('тут пусто! Ты аухел ? в квадрате');
  if(!p.children[0].classList.contains('iconActive')) return console.log('тут пусто! Ты аухел ? в кубе!');

  p.scrollIntoView({block: "center", behavior: "smooth"})
  // list = null;
  activeMicrapone = null;
  p = null;
})
}
export default lostMicrophone