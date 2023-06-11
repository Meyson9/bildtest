
const  toggalBurgerMenu = () => {
 const downloadedWraper = document.querySelector('.downloadedBtn'),
       btnMenu = document.querySelector('#burgerBtn');
       
       btnMenu.addEventListener('click',()=>{
            downloadedWraper.classList.toggle('hide')
      // if(downloadedWraper.getAttribute('data-togle') === 'clouse'){
      //       downloadedWraper.setAttribute('data-togle', 'open')   
      //       downloadedWraper.classList.remove('hide')
      // } else {
      //       downloadedWraper.setAttribute('data-togle', 'clouse')   
      //       downloadedWraper.classList.add('hide');
      //   }
            
       }) 
  
}

export default toggalBurgerMenu