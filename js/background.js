function getValue(key, defaultValue) {
	return Settings.getValue(key, defaultValue);
}
function setValue(key, value) {
	Settings.setValue(key, value);
}

var remindTimes = [ 9, 10, 11, 15, 16, 17, 18, 19 ];
function remind() {
	var date = new Date();
	var remindTime = date.format('yyyy-MM-dd hh');
	var lastRemindTime = Settings.getValue('remindTime');
	if (remindTimes.indexOf(date.getHours()) != -1
			&& (!lastRemindTime || lastRemindTime != remindTime)) {
		Settings.setValue('remindTime', remindTime);
		util.openNewNotification({
			type : 'image',
			iconUrl : 'img/icon.png',
			title : '喝杯水，休息一下。',
			message : 'Take a cup of water and have a rest.',
			imageUrl : 'img/rest.png'
		});
	}
	potato();
}

function potato() {
	var potatoTime = Settings.getValue('countdown');
	if (!isNaN(potatoTime)) {
		if (potatoTime == '0') {
			Settings.setValue('countdown', "");
			util.openNewNotification({
				type : 'image',
				iconUrl : 'img/icon.png',
				title : '番茄时间结束,干的不错。',
				message : 'Good job!',
				imageUrl : 'img/rest.png'
			});
		} else {
			var leftTime = parseInt(potatoTime) - 5;
			Settings.setValue('countdown', leftTime < 0 ? 0 : leftTime);
		}
	}
}

setInterval(remind, 5000);

chrome.browserAction.onClicked.addListener(function(tab) {
	window.open(chrome.extension.getURL('index.html'), "develop-assist");
});