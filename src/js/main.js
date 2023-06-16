import startaStage from "./modules/startaStage";
import upWindowuser from "./modules/upWindowuser";
import dblClicChanje from "./modules/dblClicChanje";
import togallVois from "./modules/togallVois";
import lostMicrophone from "./modules/lostMicrophone";
import whereStay from "./modules/whereStay";
import { createElementMobaile } from "./services/LitlModules";
import toggalBurgerMenu from "./modules/toggalBurgerMenu";
import recognation from "./services/recognation";
import indexedDBLocal from "./services/indexedDB";
import mouseEventClickRithe from "./modules/mouseEventClickRithe";
import calcuQuestParams from "./modules/calcuQuestParams"; 

const obj = {
	'tick':0,
	'cross':0,
	'heart':0,
	'flower':0
  }
function listener(e) {
	const btn = document.querySelector('#burgerBtn'),
		btnnextElem = btn.nextElementSibling;
		if (e.target != btn) {
			if(!btnnextElem.classList.contains('hide')){
				btnnextElem.classList.add('hide')
			}
		}
}

window.addEventListener('DOMContentLoaded', () => {
	// const i = document.querySelector('less');
	// console.error("Error2");
	// console.log(i);
	// обработчик на закрытие элемента настроек 
	document.querySelector('.wraperAllToll').addEventListener('click', (e)=>{listener(e)})
	indexedDBLocal();
	calcuQuestParams(obj);
 
	global.recog = new recognation();
	
	const body = document.body,
	html = document.documentElement;

	let btn = document.querySelector('.staet'),
		width = Math.max( body.scrollWidth, body.offsetWidth, 
		html.clientWidth, html.scrollWidth, html.offsetWidth );
	
	if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) && width <= 775 ) {
		createElementMobaile();
		// if(!btn.classList.contains('hide')){
		// 	btn.classList.add('hide');
		// }
		// window.mobaleMOde = true;
		global.mobaleMOde = true;
		btn.classList.add('hide');

		// whereStay(document.querySelector('.wher'));
		lostMicrophone(true);
	} else {
		// window.mobaleMOde = false;
		global.mobaleMOde = false;
		if(btn.classList.contains('hide')){
			btn.classList.remove('hide');
		}
	}
	/Macintosh|iPhone|iPad|iPod/i.test(navigator.userAgent)?global.appleMode = true:global.appleMode = false;


	toggalBurgerMenu(); 

	startaStage();

	togallVois(); 

	dblClicChanje(); 

	lostMicrophone();

	whereStay(); 
	upWindowuser() 
	
	mouseEventClickRithe()

	

},{once : true});

	