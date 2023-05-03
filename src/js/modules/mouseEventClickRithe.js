const mouseEventClickRithe = () => {
    document.querySelector('#standatrQuetion').oncontextmenu = function (event) {
		return menu(1, event);	
	}
	document.querySelector('#juniorQuetion').oncontextmenu = function (event) {
		return menu(2, event);	
	}
	document.querySelector('#midleQuetion').oncontextmenu = function (event) {
		return menu(3, event);	
	}
	document.querySelector('#seniorQuetion').oncontextmenu = function (event) {
		return menu(4, event);	
	}

	// Функция для определения координат указателя мыши
function defPosition(event) {
	let x = 0; 
	let y = 0;
	if (document.attachEvent != null) { // Internet Explorer & Opera
		  x = window.event.clientX + (document.documentElement.scrollLeft ? document.documentElement.scrollLeft : document.body.scrollLeft);
		  y = window.event.clientY + (document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop);
	} else if (!document.attachEvent && document.addEventListener) { // Gecko
		  x = event.clientX + window.scrollX;
		  y = event.clientY + window.scrollY;
	} else {
		  // Do nothing
	}
	return {x:x, y:y};
}

function menu(type, evt) {
  // Блокируем всплывание события contextmenu
  evt = evt || window.event;
  evt.cancelBubble = true;
  // Показываем собственное контекстное меню
  var menu = document.getElementById("contextMenuId");
  var html = "";
  html = "Меню для удаления ответов";
  html += "<br><a id='delOne' href='#'>Удлаить эту секцию</a>";
  html += "<br><a id='All' ' href='#'>Удалить все ответы</a>";


//  
const collection = {
	1: ()=> {delOne('tickquestion')},
	2: ()=> {delOne('crossquestion')},
	3: ()=> {delOne('heartquestion')},
	4: ()=> {delOne('flowerquestion')}
  };

  function d() {
	    collection[type] && collection[type]();
  }
  
  function delAll () {
	for (const key in collection) {
			 collection[key]();
	}
  }


  function delOne(params) {
	let db = window.dbasce;

	const transaction = db.transaction([params],"readwrite");
	const store = transaction.objectStore(params);
	const p = store.clear();

  }

  // Если есть что показать - показываем
  if (html) {
	  menu.innerHTML = html;
	  menu.style.top = defPosition(evt).y + "px";
	  menu.style.left = defPosition(evt).x + "px";
	  menu.style.display = "";
	  document.querySelector('#delOne').addEventListener('click', d);
	  document.querySelector('#All').addEventListener('click', delAll);
	
  }
  // Блокируем всплывание стандартного браузерного меню
  return false;
}

// Закрываем контекстное при клике левой или правой кнопкой по документу
// Функция для добавления обработчиков событий
function addHandler(object, event, handler, useCapture) {
  if (object.addEventListener) {
	  object.addEventListener(event, handler, useCapture ? useCapture : false);
  } else if (object.attachEvent) {
	  object.attachEvent('on' + event, handler);
  } else alert("Add handler is not supported");
}
addHandler(document, "contextmenu", function() {
  document.getElementById("contextMenuId").style.display = "none";
});
addHandler(document, "click", function() {
  document.getElementById("contextMenuId").style.display = "none";
});
}

export default mouseEventClickRithe;