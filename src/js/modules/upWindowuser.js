const upWindowuser = () => {
  const div  = document.createElement('div')
  div.classList.add('upButton')
  div.innerHTML =`<a style="display: block;" src="" href=""><img src="assets/img/Up.png" alt=""></a>`
  div.classList.add('hide')
  document.addEventListener('scroll', (e)=>{

    const userwiz = window.pageYOffset
    if (userwiz > 1200) {
      div.classList.remove('hide')
    } else {
      div.classList.add('hide')
    }
    
  })
  document.querySelector('.staet').append(div)
  div.addEventListener('click', (e)=>{
    e.preventDefault()
    document.querySelector('.wrapperTutle').scrollIntoView({block: "center", behavior: "smooth"})

  })
}
export default upWindowuser