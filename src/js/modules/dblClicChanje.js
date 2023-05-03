import quetionAdd from "../services/quetionAdd";
const dblClicChanje = () => {

const button = document.querySelector('.stateBtn');
const span = document.querySelector('#dotPuls')


button.addEventListener('click', (event)=>{ 
  console.log('ктопка тут!');
  event.preventDefault()
  
  quetionAdd(false,false,false,false);
  if(span.classList.contains('dot')){
    span.classList.remove('dot')
  }
  let time;
  time = setTimeout(() => {
    
    span.classList.add('dot');
    //уборка
    clearTimeout(time);
    time = null;
  }, 300);

})
}
export default dblClicChanje