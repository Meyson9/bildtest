const chech = (text) =>{
  if(text.at(0) ===','){
    return text.slice(1);
  } else if (text.at(0) ==='n' && text.at(1) ==='u' && text.at(2) ==='l'&& text.at(3) ==='l'){
    return text.slice(5)
  } else {
    return text
  }
}
export default chech