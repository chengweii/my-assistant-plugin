function callResponse(){
	$.get('https://www.baidu.com', function(html){
		chrome.notifications.create(null, {
			type: 'image',
			iconUrl: 'img/icon.png',
			title: '祝福',
			message: '骚年，祝你圣诞快乐！Merry christmas!',
			imageUrl: 'img/sds.png'
		});
	});
}
MyAssistant.openUrlNewTab('http://127.0.0.1:9898/assistant-web');
setInterval(callResponse,3000);