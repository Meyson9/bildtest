const togallVois = () => {
  // localButtonToggale('muteVoise','.icon-material_li','icon-material_li_mute')
  // localButtonToggale('nonstope','.icon-material_tw','icon-material_tw_NonStop')
    const icon = {
      non_stop:document.querySelector('#non_stop_mode_icon'),
      voise:document.querySelector('#voise_mudte_icon')
    }
    let fu = function () {
      if (localStorage.getItem('nonstope') ) {
        icon.non_stop.classList.add('icon-material_tw_NonStop');

      }
      if (localStorage.getItem('muteVoise')) {
        icon.voise.classList.add('icon-material_li_mute');
      }
      fu = null;
    }
      fu()
 
      // setTimeout(() => {
      //   console.log(fu);
        
      // }, 1000);
  /*
    non-stop: mute / on
    voise: mute / on
    voise  === on ? non-stop = job 
    voise  === mute ? non-stop =  manual
    click manual activate mode non-stop === true ? voise  = on 
  */
    // режим нон стоп

    document.querySelector('#non_stop_mode').addEventListener('click', (e)=> {
      e.preventDefault();
      console.log(e);
      // toggaleButton('.icon-material_tw','icon-material_tw_NonStop','nonstope')
      if (icon.non_stop.classList.contains('icon-material_tw_NonStop')) {
        icon.non_stop.classList.remove('icon-material_tw_NonStop');

        localStorage.removeItem('nonstope');
      }else {
        localStorage.setItem('nonstope','nonstope');

        icon.non_stop.classList.add('icon-material_tw_NonStop');

        icon.voise.classList.remove('icon-material_li_mute');

        localStorage.removeItem('muteVoise');
      }
    })


    // режим без звука 
    document.querySelector('#voise_mudte').addEventListener('click', (e)=> {
      e.preventDefault();
      console.log(e);
      
      if (icon.voise.classList.contains('icon-material_li_mute')) {
        icon.voise.classList.remove('icon-material_li_mute');
        localStorage.removeItem('muteVoise');
      }else {
        localStorage.setItem('muteVoise','muteVoise');
        icon.non_stop.classList.contains('icon-material_tw_NonStop')? icon.non_stop.classList.remove('icon-material_tw_NonStop'):''
        icon.voise.classList.add('icon-material_li_mute');
      }
    })





}
export default togallVois