var remindTimes = [ 9, 10, 11, 15, 16, 17, 18 ];
function remind() {
	var date = new Date();
	var remindTime = date.format('yyyy-MM-dd hh');
	var lastRemindTime = Settings.getValue('remindTime');
	if (remindTimes.indexOf(date.getHours()) != -1
			&& (!lastRemindTime || lastRemindTime != remindTime)) {
		util.openNewNotification({
			type : 'image',
			iconUrl : 'img/icon.png',
			title : '喝杯水，休息一下。',
			message : 'Take a cup of water and have a rest.',
			imageUrl : 'img/rest.png'
		});
		Settings.setValue('remindTime', remindTime);
	}
}
setInterval(remind, 5000);

chrome.browserAction.onClicked.addListener(function(tab) {
	window.open(chrome.extension.getURL('background.html'), "develop-assist");
});

var cacheKey = "datalist";
function syncConfig() {
	$
			.ajax({
				type : "get",
				url : "https://raw.githubusercontent.com/chengweii/work-data-space/master/work/%E5%8A%A9%E6%89%8B/assist.json",
				cache : false,
				success : function(data) {
					var dataList = $.parseJSON(data);
					Settings.setValue(cacheKey, data);
					bindList(data);
				}
			});
}

function initConfig() {
	var data = Settings.getValue(cacheKey);
	if (!data) {
		syncConfig();
	} else {
		bindList(data);
	}
}

var toolList = [];

function bindList(data) {
	$(".panel").html("");
	var dataList = $.parseJSON(data);
	for ( var type in dataList) {
		for ( var index in dataList[type]) {
			bindItem(type, dataList[type][index]);
			toolList.push(dataList[type][index]);
		}
	}
	bindOftenList();
}

function bindItem(type, item) {
	var a = $(".template").clone();
	a.attr("url", item.url);
	a.attr("href", "javascript:void(0);");
	a.click(recordHistory);
	a.attr("title", item.title);

	if (item.icon) {
		a.find("span").css("background-image", "url(img/" + item.icon + ")");
	} else if (item["icon-text"]) {
		a.find("span").html(item["icon-text"]);
	} else {
		a.find("span").css("background-image", "url(img/icon.png)");
	}

	a.find("i").html(item.title);
	a.removeClass("template");
	$("." + type + "-list").append(a);
	a.show();
}

var cacheHistoryKey = "useHistory";
function recordHistory() {
	var historyData = Settings.getValue(cacheHistoryKey);
	var useHistory = {};
	if (historyData) {
		useHistory = $.parseJSON(historyData);
	}
	var name = $(this).attr("title");
	if (useHistory[name]) {
		useHistory[name] = parseInt(useHistory[name]) + 1;
	} else {
		useHistory[name] = 1;
	}

	var result = JSON.stringify(useHistory);
	Settings.setValue(cacheHistoryKey, result);

	bindOftenList();

	var url = $(this).attr("url");
	window.open(url, name);
}

function bubbleSort(arr) {
	var len = arr.length, j;
	var temp;
	while (len > 1) {
		for (j = 0; j < len - 1; j++) {
			if (arr[j].value < arr[j + 1].value) {
				temp = arr[j];
				arr[j] = arr[j + 1];
				arr[j + 1] = temp;
			}
		}
		len--;
	}
	return arr;
}

function bindOftenList() {
	$(".often-list").html("");
	var historyData = Settings.getValue(cacheHistoryKey);
	var useHistory = $.parseJSON(historyData);
	var oftenList = [];
	for ( var p in useHistory) {
		oftenList.push({
			name : p,
			value : useHistory[p]
		});
	}
	var oftenListDesc = bubbleSort(oftenList);
	var i = 0
	for ( var p in oftenListDesc) {
		for ( var t in toolList) {
			if (oftenListDesc[p].name == toolList[t].title) {
				bindItem('often', toolList[t]);
				break;
			}
		}
		if (i == 19) {
			break;
		}
		i++;
	}
}

initConfig();

$(".sync-btn").click(function() {
	syncConfig();
});

$("body").mzDialog();