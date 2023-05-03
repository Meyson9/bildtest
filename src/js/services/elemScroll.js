const elemScroll = (selector) => {
  console.log(selector);
  let element = document.querySelector(`.${selector}`);
      
      // body.style.height = body.offsetHeight +350+"px";
      element.scrollIntoView({block: "start", behavior: "smooth"});

    // console.log('alalalaalalalalla');
      // body = null;
      element = null;
}
export default elemScroll