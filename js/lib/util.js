Date.prototype.format = function (format) {
	var o = {
		"M+": this.getMonth() + 1,
		"d+": this.getDate(),
		"h+": this.getHours(),
		"m+": this.getMinutes(),
		"s+": this.getSeconds(),
		"q+": Math.floor((this.getMonth() + 3) / 3),
		"S": this.getMilliseconds()
	}
	if (/(y+)/.test(format))
		format = format.replace(RegExp.$1, (this.getFullYear() + "")
			.substr(4 - RegExp.$1.length));
	for (var k in o)
		if (new RegExp("(" + k + ")").test(format))
			format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k]
				: ("00" + o[k]).substr(("" + o[k]).length));
	return format;
}

$.fn.serializeObject = function () {
	var o = {};
	var a = this.serializeArray();
	$.each(a, function () {
		if (o[this.name] !== undefined) {
			if (!o[this.name].push) {
				o[this.name] = [o[this.name]];
			}
			o[this.name].push(this.value || '');
		} else {
			o[this.name] = this.value || '';
		}
	});
	return o;
};

window.util = {
	openNewTab: function (url) {
		chrome.tabs.create({
			url: url
		});
	},
	getNotificationId: function () {
		var id = Math.floor(Math.random() * 9007199254740992) + 1;
		return id.toString();
	},
	openNewNotification: function (options) {
		var notificationId = util.getNotificationId();

		var notificationOptions = {
			type: options.type,
			iconUrl: options.iconUrl,
			title: options.title,
			message: options.message
		};
		if (options.imageUrl) {
			notificationOptions.imageUrl = options.imageUrl;
		}
		if (options.buttons && options.buttons.length > 0) {
			notificationOptions.buttons = [];
			for (var index in options.buttons) {
				var button = options.buttons[index];
				notificationOptions.buttons.push({
					title: button.title,
					iconUrl: button.iconUrl
				});
			}
		}

		chrome.notifications.create(notificationId, notificationOptions);

		if (options.buttons && options.buttons.length > 0) {
			chrome.notifications.onButtonClicked.addListener(function (notiId,
				btnId) {
				if (notiId === notificationId) {
					var fn = options.buttons[btnId].click;
					if (fn) {
						fn();
					}
				}
			});
		}

		if (options.closeTimeout) {
			setTimeout(function () {
				chrome.notifications.clear(notificationId, function () {
					// callback
				});
			}, options.closeTimeout, notificationId);
		}

		return notificationId;
	},
	getQueryString: function (name) {
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
		var r = window.location.search.substr(1).match(reg);
		if (r != null)
			return unescape(r[2]);
		return null;
	},
	unique: function (array) {
		var res = [];
		var json = {};
		for (var i = 0; i < array.length; i++) {
			if (!json[array[i]]) {
				res.push(array[i]);
				json[array[i]] = 1;
			}
		}
		return res;
	},
	form: {
		requireCheck: function (styleClass) {
			var info = {
				hasError: false,
				errMsg: ""
			};
			var className = styleClass ? styleClass : "require";
			$("." + className).each(function (index, item) {
				var value = $(item).val();
				if (!value || !value.trim()) {
					info.hasError = true;
					info.errMsg = $(item).attr("require-msg");
					return false;
				}
			});
			return info;
		}
	}
};
