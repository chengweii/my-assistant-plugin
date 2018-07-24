window.name = "develop-assist";
var cacheKey = "datalist";

var indexChecker = setInterval(renderDocument, 800);

function renderDocument() {
    if(!chrome.extension.getBackgroundPage()){
        return;
    }else{
        clearInterval(indexChecker);
    }

    function showContainer() {
        $(".title-common").show();
        $(".sync-btn").show();
        $(".texteditor-btn").show();
        $(".search-div").show();
        $(".loading-row").hide();
    }

    showContainer();

    function syncConfig() {
        $
            .ajax({
                type: "get",
                url: "https://raw.githubusercontent.com/chengweii/my-assistant-plugin/master/data/menu.json",
                cache: false,
                success: function (data) {
                    var dataList = $.parseJSON(data);
                    Settings.setValue(cacheKey, data);
                    bindList(data);
                }
            });
    }

    function initConfig() {
        var configData = Settings.getObject('configData');
        if (!configData || !configData.collectedSites || !configData.collectedSites.enable) {
            return;
        }

        var data = configData.collectedSites.list;
        if (data) {
            bindList(data);
        }
    }

    var toolList = [];

    function bindList(dataList) {
        $(".panel").html("");
        for (var type in dataList) {
            $(".collectedSites").append("<div class=\"title sub-title\"><h1>" + dataList[type].headText + "</h1></div><div class=\"site-list-" + type + " panel sub-panel\"></div>");
            for (var index in dataList[type].list) {
                bindItem(type, dataList[type].list[index]);
                toolList.push(dataList[type].list[index]);
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
            a.find("span").css("background-image", "url(img/default.png)");
        }

        a.find("i").html(item.title);
        a.removeClass("template");
        $(".site-list-" + type).append(a);
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
        var siteType = 999999;
        $(".site-list-" + siteType).html("");
        var historyData = Settings.getValue(cacheHistoryKey);
        if (!historyData) {
            return;
        }
        var useHistory = $.parseJSON(historyData);
        var oftenList = [];
        for (var p in useHistory) {
            oftenList.push({
                name: p,
                value: useHistory[p]
            });
        }
        var oftenListDesc = bubbleSort(oftenList);
        var i = 0
        for (var p in oftenListDesc) {
            for (var t in toolList) {
                if (oftenListDesc[p].name == toolList[t].title) {
                    bindItem(siteType, toolList[t]);
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

    $(".sync-btn").click(function () {
        window.open(chrome.extension.getURL('config.html'), "config");
        return;
        //syncConfig();

        Settings.setObject('configData', configDataTemplate);
    });

    //$("body").mzDialog();

    function searchInput() {
        var word = $(".search-input").val();
        var url = "https://www.baidu.com/s?ie=utf8&oe=utf8&tn=98010089_dg&ch=4&wd="
            + word;
        util.openNewTab(url);
    }

    $(".search-btn").click(searchInput);
    $("body").keydown(function (e) {
        if (e.keyCode == 13) {
            searchInput();
        }
    });

    $(".texteditor-btn").click(function () {
        window.open(chrome.extension.getURL('text-editor.html'), "text-editor");
    });

    function renderProcessList() {
        var configData = Settings.getObject('configData');
        if (!configData || !configData.goalsProcess || !configData.goalsProcess.enable) {
            return;
        }

        var goals = configData.goalsProcess.list;
        var origin = $(".progress");
        for (var index in goals) {
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

        $(".progress-container").show();
    }

    renderProcessList();

    $(".countdown").countdown();

    function initFavoriteList() {
        var configData = Settings.getObject('configData');
        if (!configData || !configData.favoriteArticles || !configData.favoriteArticles.enable) {
            return;
        }

        var favoriteList = configData.favoriteArticles.list;
        for (var index in favoriteList) {
            var a = "<a href=\"" + favoriteList[index].url + "\" target=\"_blank\">"
                + favoriteList[index].name + "</a>";
            $(".favorite-list").append(a);
        }

        $(".favorite-list").show();
    }

    initFavoriteList();

    function initMainMoto() {
        var configData = Settings.getObject('configData');
        if (!configData || !configData.lifeMoto || !configData.lifeMoto.enable || configData.lifeMoto.list.length == 0) {
            return;
        }

        var motoList = configData.lifeMoto.list;
        var index = 0;
        var showList = function () {
            if (index++ >= motoList.length) {
                index = 0;
            }
            $(".main-moto").html(motoList[index]);
            $(".main-moto").hide().fadeIn(1000);
        };
        showList();
        setInterval(showList, 30000);

        $(".main-moto").show();
    }

    initMainMoto();
}