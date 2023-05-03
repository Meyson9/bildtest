const replaceAt = (text,index, replacement) => {
  return text.substring(0, index) + replacement + text.substring(index+1,  + text.length);
}
export default replaceAt
