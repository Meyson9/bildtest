function burgerMenu(selector) {
    let menu = document.querySelector(selector);

    let button = document.querySelector('.burger-menu_button');
    let butto1 = document.querySelector('.burger-menu_lines');
    let links = document.querySelector('.burger-menu_link');
    let overlay = document.querySelector('.burger-menu_overlay');
    
    button.addEventListener('click', (e) => {
      e.preventDefault();
      toggleMenu();
    });
    butto1.addEventListener('click', (e) => {
      e.preventDefault();
      toggleMenu();
    menu.classList.contains('losharablt');
      if (menu.classList.contains('burger-menu_active')) {
        menu.classList.remove('burger-menu_active')
        
      } else {
        menu.classList.add('burger-menu_active');
        
      }
    });
    
    overlay.addEventListener('click', () => toggleMenu());
    
    function toggleMenu(){
      const spaner = document.querySelector('[data-span2]') ;
      if(menu.classList.contains('burger-menu_active')){
        menu.classList.remove('burger-menu_active');
        spaner.classList.remove('opal');
        // document.querySelector('.burger-menu_lines').style = 'opacity: 1;'
      } else {
        // document.querySelector('.burger-menu_lines').style = 'opacity: 0;'
        menu.classList.add('burger-menu_active');
        spaner.classList.add('opal');

      }
      
      // if (menu.classList.contains('burger-menu_active')) {
      //   document.querySelector('body').style='overlow= hidden';
      // } else {
      //   document.querySelector('body').style='overlow= visible';
      // }
    }
  }
  export default burgerMenu;