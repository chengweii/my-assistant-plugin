var currentDate = (new Date()).format('yyyy-MM-dd');
var fileNameKeyPrefix = "textEditorContent_";
var historyFilesKey = "textEditorHistory";
var textEditor;

function init() {
    var historyFiles = Settings.getObject(historyFilesKey);
    console.log("historyFiles =>", historyFiles);
    if (!historyFiles) {
        historyFiles = [];
        Settings.setObject(historyFilesKey, historyFiles);
    }
    if (historyFiles.indexOf(currentDate) == -1) {
        historyFiles.push(currentDate);
        Settings.setObject(historyFilesKey, historyFiles);
    }
    historyFiles.sort();
    var template = $("<li class=\"h1_nav\"><a rel=\"nofollow\"></a></li>");
    for (var index in historyFiles) {
        var fileName = historyFiles[index];
        var li = template.clone();
        if (fileName == currentDate) {
            li.addClass("selected");
        }
        li.attr("value", fileName);
        var a = li.find("a");
        a.attr("href", "#" + fileName);
        a.html("Record[" + fileName + "]");
        li.click(function () {
            showTextByFileName(this);
        });
        $(".editor-container .editor-list ul").append(li);
    }
    resizeHeight();
}

function getFileNameKey() {
    return fileNameKeyPrefix + $(".editor-container .editor-list ul li.selected").attr("value");
}

function showTextByFileName(that) {
    $(".editor-container .editor-list ul li").removeClass("selected");
    $(that).addClass("selected");
    var content = Settings.getValue(getFileNameKey());
    textEditor.setValue(content);
}

function resizeHeight() {
    var realHeight = document.body.clientHeight - 65;
    $(".editor-container .catalog-body").height(realHeight);
}

$(function () {
    init();
    $(window).resize(function () {
        resizeHeight();
    });
    var content = Settings.getValue(getFileNameKey());
    $("#test-editormd textarea").val(content);
    textEditor = editormd("test-editormd", {
        width: "100%",
        height: "100%",
        syncScrolling: "single",
        path: "./js/",
        onchange: function () {
            content = this.getValue();
            console.log("onchange =>", content);
            Settings.setValue(getFileNameKey(), content);
        }
    });
});