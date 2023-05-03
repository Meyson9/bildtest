const automationSizeInput =(textare) => {

  var krVar = {
    // id атрибут тега textarea
    textareaId: 'comment',
    // время пересчета (1000=1сек).
    repeat: 1000,
    // коэффициент. Увеличите, если появляется прокрутка.
    cof: 40, 
  
  }
 
  var KR = {
    timeout:0,
    textarea: textare,
  
    init: function(){
      if( ! KR.textarea )
        return;
  
      KR.textarea.onfocus = KR.doit;
      KR.textarea.onblur = KR.stop;
    },
    doit: function(){
      // устанавливаем нужное количество строк
      KR.textarea.rows = KR.countLines( KR.textarea.value );
  
      clearTimeout( KR.timeout );
      KR.timeout = setTimeout( function(){ KR.doit(); }, krVar.repeat );
    },
    stop: function(){
      clearTimeout( KR.timeout );
    },
    //функция подсчета строк
    countLines: function( strtocount ){
      var hard_lines = 0;
      var str = strtocount.split("\n");
      hard_lines = str.length;
  
      var tx = KR.textarea;
      var letter_width = tx.clientHeight / tx.rows * krVar.cof / 100; // приблизительная ширина одной буквы в пикселях
      var chars_in_line = tx.clientWidth / letter_width; //сколько букв в строке
  
      var lines = 0;
      var temp = 0;
  
      // hard_lines-1 = количество элементов в массиве
      for( i=0; i <= (hard_lines-1); i++ ){
        temp = str[i].length / chars_in_line;
        if( temp > 0 ) lines += temp;
      }   
  
      return lines + hard_lines;
    }
  }
  
  if( window.addEventListener )
    window.addEventListener( "load", KR.init, false );
  else if( window.attachEvent )
    window.attachEvent( "onload", KR.init );
}
export default automationSizeInput