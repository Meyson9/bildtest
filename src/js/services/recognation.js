
function recognation() {
    const recognizer = new (window.SpeechRecognition || window.webkitSpeechRecognition || window.mozSpeechRecognition || window.msSpeechRecognition)();


	// const recognizer =  new SpeechRecognition(); 
	// Ставим опцию, чтобы распознавание началось ещё до того, как пользователь закончит говорить
	recognizer.interimResults = true;

	// Какой язык будем распознавать?
	recognizer.lang = 'ru-Ru';
	recognizer.continuous = true;
	// global.recog = recognizer;

    return recognizer;
}

export default recognation;