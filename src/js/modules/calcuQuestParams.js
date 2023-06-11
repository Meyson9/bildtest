
import dbArr from '../db/dbArr.json'
let calcuQuestParams = (obj) => {
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
	calcuQuestParams = null;
	};
    export default calcuQuestParams;