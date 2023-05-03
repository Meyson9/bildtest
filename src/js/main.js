import startaStage from "./modules/startaStage";
import upWindowuser from "./modules/upWindowuser";
import dblClicChanje from "./modules/dblClicChanje";
import togallVois from "./modules/togallVois";

// import openAllQuestion from "./modules/openAllQuestion";

import lostMicrophone from "./modules/lostMicrophone";
import whereStay from "./modules/whereStay";
import dbArr from './db/dbArr.json'
// import SineWaves from 'sine-waves'
 
// import exportQuestion from "./modules/exportQuestion";
// import widjetCircolLev from "./services/widjetCircolLev";
// import openFile from './modules/openFile';
import { createElementMobaile } from "./services/LitlModules";
import burgerMenu from "./modules/burgerMenu";
import recognation from "./services/recognation";
import indexedDBLocal from "./services/indexedDB";
import mouseEventClickRithe from "./modules/mouseEventClickRithe";
// let db;

/*
глобальная переменная window.objectAllCor в нем нижний объект obj
openciCycle  +
widjetCircolLev +
startaStage +
whereStay
*/
const obj = {
	'tick':0,
	'cross':0,
	'heart':0,
	'flower':0
  }

// import icon from 'remixicon'
window.addEventListener('DOMContentLoaded', () => {


	document.querySelector('.wraperAllToll').addEventListener('click', (e)=>{
		const btn = document.querySelector('#burgerBtn'),
		btnnextElem = btn.nextElementSibling;
		if (e.target != btn) {
			if(!btnnextElem.classList.contains('hide')){
				btnnextElem.classList.add('hide')
			}
		}
	})
	// console.log(Module._pathCache);
	indexedDBLocal();
let port = () => {
	for (const key in obj) {
	  switch (key) {
		case 'tick':
			// console.log(dbArr['styles'][0].length);
			// obj[key] = dbArr['styles'][0].length;
			obj[key] = dbArr['styles'][0].length;
			break;
		case 'cross':
			obj[key]  = dbArr['styles'][1].length;
			break;
		case 'heart':
			obj[key] =  dbArr['styles'][2].length;
			break;
		case 'flower':
			obj[key] =  dbArr['styles'][3].length;
			break;              
		}
	}
	window.objectAllCor = obj; 
	port = null;
}
	port();

	global.recog = new recognation();
	let btn = document.querySelector('.staet')
	if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
		createElementMobaile();
		if(!btn.classList.contains('hide')){
			btn.classList.add('hide');
		}

		// btn.classList.add('hide');

		whereStay(document.querySelector('.wher'));
		lostMicrophone(true);
	} else {
		if(btn.classList.contains('hide')){
			btn.classList.remove('hide');
		}
	}


	burgerMenu(); 

	startaStage();

	togallVois(); 

	dblClicChanje(); 

	lostMicrophone();

	whereStay(); 
	upWindowuser() 
	
	mouseEventClickRithe()

	

},{once : true});

	