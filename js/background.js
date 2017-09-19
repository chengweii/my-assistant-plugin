function callResponse() {
	$.get('http://127.0.0.1:9999/assistant-web?requestContent=getMsgFromLocalQueue', function(data) {
		var msgList = $.parseJSON(data);
		for(var index in msgList){
			var notificationId = util.openNewNotification({
				type : 'image',
				iconUrl : 'img/icon.png',
				title : msgList[index].title,
				message : msgList[index].content,
				imageUrl : msgList[index].image,
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
		}
	});
}
util.openNewTab('http://127.0.0.1:9898/assistant-web');
setInterval(callResponse, 5000);