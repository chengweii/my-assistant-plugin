window.util = {
	openNewTab : function(url) {
		chrome.tabs.create({
			url : url
		});
	},
	getNotificationId : function() {
		var id = Math.floor(Math.random() * 9007199254740992) + 1;
		return id.toString();
	},
	openNewNotification : function(options) {
		var notificationId = util.getNotificationId();

		var notificationOptions = {
			type : options.type,
			iconUrl : options.iconUrl,
			title : options.title,
			message : options.message
		};
		if (options.imageUrl) {
			notificationOptions.imageUrl = options.imageUrl;
		}
		if (options.buttons && options.buttons.length > 0) {
			notificationOptions.buttons = [];
			for ( var index in options.buttons) {
				var button = options.buttons[index];
				notificationOptions.buttons.push({
					title : button.title,
					iconUrl : button.iconUrl
				});
			}
		}

		chrome.notifications.create(notificationId, notificationOptions);

		if (options.buttons && options.buttons.length > 0) {
			chrome.notifications.onButtonClicked.addListener(function(notiId,
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
			setTimeout(function() {
				chrome.notifications.clear(notificationId, function() {
					// callback
				});
			}, options.closeTimeout, notificationId);
		}

		return notificationId;
	}
};