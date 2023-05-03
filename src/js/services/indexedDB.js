import widjetCircolLev from "./widjetCircolLev";
import exportQuestion from "../modules/exportQuestion";
import openFile from "../modules/openFile";
let db;

const indexedDBLocal = () => {
	function indexedDBOk() {
		return "indexedDB" in window;
	}
	//No support? Go in the corner and pout.
	if (!indexedDBOk) return;

    let openRequest = indexedDB.open("idarticle_people3", 1);

	openRequest.onupgradeneeded = function (e) {
		let thisDB = e.target.result;

		if (!thisDB.objectStoreNames.contains("tickquestion")) {
			thisDB.createObjectStore("tickquestion", { keyPath: 'name' });
		}
		if (!thisDB.objectStoreNames.contains("crossquestion")) {
			thisDB.createObjectStore("crossquestion", { keyPath: 'name' });
		}
		if (!thisDB.objectStoreNames.contains("heartquestion")) {
			thisDB.createObjectStore("heartquestion", { keyPath: 'name' });
		}
		if (!thisDB.objectStoreNames.contains("flowerquestion")) {
			thisDB.createObjectStore("flowerquestion", { keyPath: 'name' });
		}
	}
    openRequest.onerror = function (e) {
		//Do something for the error
		console.log(e);
		console.log('курица общипанная едром из гомункула из торпедной стружки говна');
	}
    
	openRequest.onsuccess = function (e) {
		db = e.target.result;
		window.dbasce = db;
		widjetCircolLev(true);
		exportQuestion(db);
		openFile(db, openRequest); // расскаментирование добваило 1 мб

	}

	

    return ;
};


export default indexedDBLocal;