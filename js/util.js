window.MyAssistant = {
	openUrlNewTab: function (url) {
		chrome.tabs.create({ url: url });
	}
};