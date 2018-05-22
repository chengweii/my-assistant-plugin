$(function () {
    var testEditor;
    var textContentKey = "textEditorContent";
    var content = Settings.getValue(textContentKey);
    $("#test-editormd textarea").val(content);
    testEditor = editormd("test-editormd", {
        width: "100%",
        height: "100%",
        syncScrolling: "single",
        path: "./js/" ,
        onchange : function() {
            content = this.getValue();
            console.log("onchange =>", content);
            Settings.setValue(textContentKey, content);
        }
    });
});