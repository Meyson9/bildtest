import quetionAdd from '../services/quetionAdd';
const whereStay = (selector = false) => {

  
    if (selector) {
     return selector.addEventListener('click', (e)=> whereSt(e));
    }

  document.querySelector('#wheryIsty').addEventListener('click',  whereSt);
  
  function whereSt (e) {
    e.preventDefault()
 
    const sel =  localStorage.getItem('WhereStayUser');
    
    if (!sel) {
      //сделать уведомления с надписью "я не знаю где ты остановился" 
      return console.log('WhereStayUser = undefained');
    }
    
    // если вопрос уже существует просто долистаем до нее 
    const selen = document.querySelector('.'+sel);

    if(selen){
      return selen.scrollIntoView({block: "start", behavior: "smooth"})
    }
    

    // if (sel) {

    const selectorQuestionLevel =  sel.replace(/(question)(\d)+/,''); // узнаю к какой группе вопрос принадлежит
    const numberQuestion =  sel.replace(/(tick|cross|heart|flower)(question)/,'')-1 ; // номер вопроса 
      
    // существуют ли вопросы 
    const selectorQues = document.querySelector(`.wrapper`);

    let selectorQuestionopen;  

    // есть? да значит смотрим что вопросы с какой группы сущесвтуют : вопроов нету
    selectorQues? selectorQuestionopen = selectorQues.classList[1].replace(/(question)(\d)+/,'')
    :selectorQuestionopen = null;
    // с какого овпроса начать 
    let index = document.querySelectorAll('.tinRightIn').length||0

    if(selectorQuestionopen === selectorQuestionLevel){
      console.log('нажимать на изменения урвоня нет смысла!');
    }
    console.log(`${selectorQuestionopen} !== ${selectorQuestionLevel} || !${selectorQuestionopen}`);

    if(selectorQuestionopen !== selectorQuestionLevel || !selectorQuestionopen){
      window.quetiAddn = true; 
      document.querySelector(`.${selectorQuestionLevel}`).click();
      index = 0
      setTimeout(() => {
        name()
      }, 3000);
    }
    function name() {
      for (index ; index < numberQuestion; index++) {
        quetionAdd();
      }
    }
    

}




}

export default whereStay