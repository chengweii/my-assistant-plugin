window.name = "develop-assist";
var cacheKey = "datalist";
function syncConfig() {
	$
			.ajax({
				type : "get",
				url : "https://raw.githubusercontent.com/chengweii/my-assistant-plugin/master/data/menu.json",
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
	if (!historyData) {
		return;
	}
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

function searchInput() {
	var word = $(".search-input").val();
	var url = "https://www.baidu.com/s?ie=utf8&oe=utf8&tn=98010089_dg&ch=4&wd="
			+ word;
	util.openNewTab(url);
}
$(".search-btn").click(searchInput);
$("body").keydown(function(e) {
	if (e.keyCode == 13) {
		searchInput();
	}
});

function renderProcessList() {
	var goals = [ {
		name : "LOSE-WEIGHT-65KG",
		start : "2017-12-22",
		end : "2018-02-10"
	}, {
		name : "20+",
		start : "2017-12-22",
		end : "2018-03-15"
	}, {
		name : "BODY-STATE-80%",
		start : "2017-12-22",
		end : "2018-03-15"
	}, {
		name : "GOOD-EXPRESSION-FAST-REFLECT",
		start : "2017-12-22",
		end : "2018-02-15"
	} ];
	var origin = $(".progress");
	for ( var index in goals) {
		var template = origin.clone();
		var goal = goals[index];
		template.find(".barTitle").html(goal.name);
		var end = util.date.stringToDate(goal.end);
		var start = util.date.stringToDate(goal.start);
		var leftDays = util.date.getDateDiff(end, new Date());
		if (leftDays < 0) {
			leftDays = 0;
		}
		var allDays = util.date.getDateDiff(end, start);
		template.find(".barContent").html(
				"Start " + goal.start + ",Finish " + goal.end
						+ ",Left <font class='left-days'>" + leftDays
						+ "</font> day.");
		template.find(".vader").css("width",
				parseInt(leftDays / allDays * 100) + "%");
		$(".progress-container").append(template);
		template.show();
	}
}
renderProcessList();

$(".countdown").countdown();

function initFavoriteList() {
	var list = [ {
		name : "时间的格局",
		url : "http://www.jianshu.com/p/dc1f1e38eda6"
	}, {
		name : "自由职业方向",
		url : "http://www.jianshu.com/p/0b095637b4cb"
	} ];
	for ( var index in list) {
		var a = "<a href=\"" + list[index].url + "\" target=\"_blank\">"
				+ list[index].name + "</a>";
		$(".favorite-list").append(a);
	}
}
initFavoriteList();

function initMainMoto() {
	var motoList = [ "对于困难和麻烦，除了迎难而上，其他诸如忧虑、逃避的方式都只不过是在浪费自己宝贵的时间。",
			"学习是一种有目的性的活动，知识本身并无属主，敬畏知识，敬畏前人，一切為我所用，才能走得更稳，走得更远。" ];
	$(".main-moto").html(motoList[Math.floor(Math.random() * motoList.length)]);
}
initMainMoto();
