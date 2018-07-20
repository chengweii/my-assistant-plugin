window.name = "develop-assist";
var cacheKey = "datalist";

function renderDocument() {
    function showContainer() {
        $(".title").show();
        $(".sync-btn").show();
        $(".search-div").show();
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
        //syncConfig();
        var configDataTemplate = {
            remindingOfRest: {
                enable: true,
                remindTimes: [9, 10, 11, 15, 16, 17, 18, 19]
            },
            goalsProcess: {
                enable: true,
                list: [{
                    name: "LOSE-WEIGHT-65KG",
                    start: "2018-04-17",
                    end: "2018-06-17"
                }, {
                    name: "20+",
                    start: "2018-04-17",
                    end: "2018-06-17"
                }, {
                    name: "BODY-STATE-80%",
                    start: "2018-04-17",
                    end: "2018-06-17"
                }, {
                    name: "GOOD-EXPRESSION-FAST-REFLECT",
                    start: "2018-04-17",
                    end: "2018-06-17"
                }]
            },
            favoriteArticles: {
                enable: true,
                list: [{
                    name: "时间的格局",
                    url: "http://www.jianshu.com/p/dc1f1e38eda6"
                }, {
                    name: "自由职业方向",
                    url: "http://www.jianshu.com/p/0b095637b4cb"
                }, {
                    name: "处理好与自己的关系",
                    url: "https://www.jianshu.com/p/4e8e9105c9c0"
                }]
            },
            lifeMoto: {
                enable: true,
                list: ["对于困难和麻烦，除了迎难而上，其他诸如忧虑、逃避的方式都只不过是在浪费自己宝贵的时间。",
                    "学习是一种有目的性的活动，知识本身并无属主，敬畏知识，敬畏前人，一切為我所用，才能走得更稳，走得更远。",
                    "高手速成的秘诀就是练习，练习套路，细化拆解套路能力点，花费10000小时去刻意练习。",
                    "重剑无锋，大巧不工。明白了坚持为何物，迷茫与困惑也就无足轻重了。",
                    "不管你所在的行业可以给你提供多高的薪水，我相信早晚都有那么一刻，你会发现钱的边际效应不如每天下班陪你老婆/老公吃一顿幸福的晚餐、不如一年可以有五个月去周游世界、不如去写一个程序、不如写一篇小说。",
                    "生命里真正要紧的，并不是这个世界从你的身上夺走了什么，而是你打算如何去利用你还剩下的东西。",
                    "遵守规矩有时看起来有些麻烦，但相对于这点小麻烦而言，不遵守规矩而带来的大麻烦才是最要命的。",
                    "勇敢者也会害怕，一个人虽然害怕但仍勇于前进，这才叫勇敢",
                    "对于未来的执着，你可以思考一下关于今天的一颗糖与十年后的一千颗糖的问题。"
                ]
            },
            collectedSites: {
                enable: true,
                list: [{
                    headText: "日常办公",
                    list: [{
                        title: "邮箱",
                        icon: "mail.png",
                        url: "https://mail.jiuxian.com"
                    }, {
                        title: "OA",
                        icon: "oa.png",
                        url: "http://oa.jxwmanage.com/login/Login.jsp"
                    }, {
                        title: "待办日程",
                        icon: "schedule.png",
                        url: "https://dida365.com/#p/59e4506be4b0e5eb1cd9fec7/tasks"
                    }, {
                        title: "助手",
                        icon: "assistant.png",
                        url: "http://127.0.0.1:9898/assistant-web/"
                    }, {
                        title: "产品原型",
                        icon: "default.png",
                        url: "file:///D:/Mydata/%E4%BA%A7%E5%93%81%E5%8E%9F%E5%9E%8B/"
                    }, {
                        title: "接口对接",
                        icon: "default.png",
                        url: "file:///D:/Mydata/%E6%8E%A5%E5%8F%A3%E5%AF%B9%E6%8E%A5/"
                    }]
                }, {
                    headText: "后台开发",
                    list: [{
                        title: "禅道",
                        icon: "zdao.png",
                        url: "http://pm.jxwmanage.com:82/zentao"
                    }, {
                        title: "Nexus",
                        icon: "nexus.png",
                        url: "http://192.168.10.220:28080/nexus/index.html#welcome"
                    }, {
                        title: "Gitlab-ZN",
                        icon: "gitlab.png",
                        url: "http://zn.gitlab.9ijx.com/"
                    }, {
                        title: "Gitlab-JKD",
                        icon: "gitlab.png",
                        url: "http://gitlab.9ijx.com/"
                    }, {
                        title: "Maven",
                        icon: "maven.png",
                        url: "http://mvnrepository.com/tags/maven"
                    }, {
                        title: "[JKD]配置",
                        icon: "default.png",
                        url: "file:///D:/Mydata/%E6%8E%A5%E5%8F%A3%E5%AF%B9%E6%8E%A5/JKD-Config.md"
                    }, {
                        title: "[ZNTG]配置",
                        icon: "default.png",
                        url: "file:///D:/Mydata/%E6%8E%A5%E5%8F%A3%E5%AF%B9%E6%8E%A5/ZNTG-Config.md"
                    }]
                }]
            }
        };
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
        };
        showList();
        setInterval(showList, 20000);

        $(".main-moto").show();
    }

    initMainMoto();
}

setTimeout(renderDocument, 200);