function callResponse() {
	$.get('https://www.baidu.com', function(html) {
		var notificationId = util.openNewNotification({
			type : 'image',
			iconUrl : 'img/icon.png',
			title : 'test',
			message : 'Merry christmas!',
			imageUrl : 'http://icon.nipic.com/BannerPic/20170815/original/20170815181219_1.jpg',
			buttons : [ {
				title : 'call',
				iconUrl : 'img/icon.png',
				click : function() {
					alert('call telphone');
				}
			}, {
				title : 'email',
				iconUrl : 'img/icon.png',
				click : function() {
					alert('send email');
				}
			} ]
		});
	});
}
util.openNewTab('http://127.0.0.1:9898/assistant-web');
setInterval(callResponse, 5000);