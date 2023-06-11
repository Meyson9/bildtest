const upWindowuser = () => {
  const div  = document.createElement('div')
  div.classList.add('upButton')
  div.innerHTML =`<a style="display: block;"  href="#"><img src="assets/img/Up.png" alt="up window"></a>`
  div.classList.add('hide')
  document.addEventListener('scroll', (e)=>{

    const userwiz = window.pageYOffset
    if (userwiz > 1200) {
      div.classList.remove('hide')
    } else {
      div.classList.add('hide')
    }
    
  })
  document.querySelector('.sidbar_rigte_section').append(div)
  div.addEventListener('click', (e)=>{
    e.preventDefault()
    document.querySelector('.wrapperTutle').scrollIntoView({block: "center", behavior: "smooth"})

  })
}
export default upWindowuser