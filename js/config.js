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
            name: "BODY-STATE-80%",
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
        }]
    },
    lifeMoto: {
        enable: true,
        list: ["对于困难和麻烦，除了迎难而上，其他诸如忧虑、逃避的方式都只不过是在浪费自己宝贵的时间。",
            "高手速成的秘诀就是练习，练习套路，细化拆解套路能力点，花费10000小时去刻意练习。",
            "勇敢者也会害怕，一个人虽然害怕但仍勇于前进，这才叫勇敢"
        ]
    },
    collectedSites: {
        enable: true,
        list: [{
            headText: "日常办公",
            list: [{
                "title": "待办日程",
                "icon": "schedule.png",
                "url": "https://dida365.com/#p/59e4506be4b0e5eb1cd9fec7/tasks"
            }]
        }, {
            headText: "开发工具",
            list: [{
                "title": "Maven",
                "icon": "maven.png",
                "url": "http://mvnrepository.com/tags/maven"
            }, {
                "title": "runjs",
                "icon": "runjs.png",
                "url": "http://runjs.cn/code"
            }, {
                "title": "JSON编辑器",
                "icon": "",
                "icon-text": "JSON",
                "url": "http://www.json.cn/"
            }, {
                "title": "Photoshop",
                "icon": "photoshop.png",
                "url": "http://www.uupoop.com"
            }, {
                "title": "网络访问测试",
                "icon": "17ce.png",
                "url": "https://www.17ce.com/"
            }, {
                "title": "在线开发工具",
                "icon": "",
                "icon-text": "TOOL",
                "url": "http://web.chacuo.net/"
            }, {
                "title": "墨刀",
                "icon": "modao.png",
                "url": "https://modao.cc/"
            }, {
                "title": "UML作图",
                "icon": "uml.png",
                "url": "https://www.processon.com/"
            }, {
                "title": "百度翻译",
                "icon": "translate.png",
                "url": "http://fanyi.baidu.com/translate?lang=auto2zh#auto/zh/"
            }, {
                "title": "百度云盘",
                "icon": "baiduyun.png",
                "url": "https://pan.baidu.com"
            },
                {
                    "title": "图灵机器人",
                    "icon": "default.png",
                    "url": "http://www.tuling123.com/"
                }]
        }, {
            headText: "知识网站",
            list: [{
                "title": "InfoQ",
                "icon": "infoq.png",
                "url": "http://www.infoq.com/cn/"
            },
                {
                    "title": "CSDN",
                    "icon": "csdn.png",
                    "url": "http://www.csdn.net/"
                },
                {
                    "title": "码云",
                    "icon": "default.png",
                    "url": "https://gitee.com/"
                },
                {
                    "title": "Github",
                    "icon": "github.png",
                    "url": "https://github.com/"
                },
                {
                    "title": "WikiHow",
                    "icon": "wikihow.jpg",
                    "url": "https://zh.wikihow.com/%E9%A6%96%E9%A1%B5"
                },
                {
                    "title": "简书",
                    "icon": "jianshu.jpg",
                    "url": "http://www.jianshu.com/"
                },
                {
                    "title": "JAVA知识<br/>分享网",
                    "icon": "default.png",
                    "url": "http://www.java1234.com"
                },
                {
                    "title": "开源中国",
                    "icon": "openchina.jpg",
                    "url": "https://www.oschina.net"
                },
                {
                    "title": "MY TEC BLOG",
                    "icon": "default.png",
                    "url": "https://chengweii.github.io"
                },
                {
                    "title": "JAVA<br/>CodeGeeks",
                    "icon": "javacodegeek.png",
                    "url": "https://www.javacodegeeks.com"
                },
                {
                    "title": "文档库",
                    "icon": "default.png",
                    "url": "http://www.useit.com.cn"
                },
                {
                    "title": "Ali博客",
                    "icon": "aliblog.png",
                    "url": "http://jm.taobao.org"
                }]
        }]
    }
};

function showConfig() {
    var configData = Settings.getObject('configData');
    if (!configData) {
        configData = configDataTemplate;
    }
    $(".json-config").val(JSON.stringify(configData, null, "\t"));
}

showConfig();

$(".load-btn").click(function () {
    var data = $(".json-config").val();
    Settings.setObject('configData', JSON.parse(data));
    new Toast({context: $('body'), message: '保存成功'}).show();
    self.opener.location.reload();
});