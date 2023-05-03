import  replaceAt  from "./replaceAt";

const matchSearch = (text) => {
 
    let p = text
    for (let i = 0; i < p.length; i++) {
      const element = p[i];
 
      if (element === '_') {
        p = replaceAt(p,i, '<br>');
      }

      // if (element === '~') {
      //   p = replaceAt(p,i, '<br>')
      // }
    }
    let time = setTimeout(() => {
      p = null;
      // уборка
      clearTimeout(time);
      time = null;
    }, 500);
    return p;
  
}
export default matchSearch