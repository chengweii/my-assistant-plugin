$.fn.countdown = function(options) {
	var i = 0;
	var j = 0;
	var count = 0;
	var MM = 0;
	var SS = 60;
	var MS = 0;
	var totle = (MM + 1) * 600;
	var d = 180 * (MM + 1);
	var MM = "0" + MM;
	var totalTime = parseInt($(this).attr("total-time"));
	$.fn.countdown.timer1 = {};
	$.fn.countdown.timer2 = {};
	
	$(this).html("<div class=\"countdown-hold\"><div class=\"countdown-pie countdown-pie1\"></div></div><div class=\"countdown-hold\"><div class=\"countdown-pie countdown-pie2\"></div></div><div class=\"countdown-bg\"></div><div class=\"countdown-time\"></div>");

	var pie1Class = "countdown-pie1";
	var pie2Class = "countdown-pie2";
	var textClass = "countdown-time";

	var color = "#2ecc71";
	var inner_color = "#ffffff";

	$(".countdown-bg").css("background-color", color);
	$("." + textClass).css("background-color", inner_color);

	var showTime = function() {
		totle = totle - 1;
		if (totle == 0) {
			clearInterval($.fn.countdown.timer1);
			clearInterval($.fn.countdown.timer2);
			$("." + pie2Class).css("-o-transform", "rotate(0deg)");
			$("." + pie2Class).css("-moz-transform", "rotate(0deg)");
			$("." + pie2Class).css("-webkit-transform", "rotate(0deg)");
			$("." + pie2Class).css("background-color", "#ffffff");
			$(".countdown-bg").css("background-color", "#ffffff");
			$("." + textClass).attr("mode", "edit");
			$("." + textClass).html("0");
			if(options.callback){
				options.callback();
			}
		} else {
			if (totle > 0 && MS > 0) {
				MS = MS - 1;
				if (MS < 10) {
					MS = "0" + MS
				}
			}
			if (MS == 0 && SS > 0) {
				MS = 10;
				SS = SS - 1;
				if (SS < 10) {
					SS = "0" + SS
				}
			}
			if (SS == 0 && MM > 0) {
				SS = 60;
				MM = MM - 1;
				if (MM < 10) {
					MM = "0" + MM
				}
			}
			var leftTime = parseInt(SS / 60) + 1;
			if ($("." + textClass).html() != leftTime) {
				$("." + textClass).html(leftTime);
			}
		}
	};

	var start1 = function() {
		i = i + 360 / ((totalTime) * 10);
		count = count + 1;
		if (count <= (totalTime / 2 * 10)) {
			$("." + pie1Class).css("-o-transform", "rotate(" + i + "deg)");
			$("." + pie1Class).css("-moz-transform", "rotate(" + i + "deg)");
			$("." + pie1Class).css("-webkit-transform", "rotate(" + i + "deg)");
		} else {
			$("." + pie2Class).css("background-color", color);
			$("." + pie2Class).css("-o-transform", "rotate(" + i + "deg)");
			$("." + pie2Class).css("-moz-transform", "rotate(" + i + "deg)");
			$("." + pie2Class).css("-webkit-transform", "rotate(" + i + "deg)");
		}
	};

	var countDown = function() {
		i = 0;
		j = 0;
		count = 0;
		MM = 0;
		SS = totalTime;
		MS = 0;
		totle = (MM + 1) * totalTime * 10;
		d = 180 * (MM + 1);
		MM = "0" + MM;

		showTime();

		$.fn.countdown.timer1 = setInterval(function() {
			showTime();
		}, 100);
		start1();
		$.fn.countdown.timer2 = setInterval(function() {
			start1();
		}, 100);
	}

	$("." + textClass).click(
			function() {
				var textDiv = $(this);
				var mode = textDiv.attr("mode");
				if (mode == 'edit') {
					textDiv.attr("mode", "editing");
					var inputClass = "countdown-input";
					textDiv.html("<input type='text' class='" + inputClass
							+ "' placeholder='Minute'>");
					$("." + inputClass).change(function() {
						var value = $(this).val();
						var reg = /^[0-9]+$/;
						if (!reg.test(value)) {
							$(this).val("");
							$(this).focus();
							return false;
						}
						totalTime = parseInt($("." + inputClass).val()) * 60;
						textDiv.attr("mode", "view");
						$(".countdown-bg").css("background-color", color);
						countDown();
					});
					$("." + inputClass).focus();
				}
			});
	
	$("." + textClass).attr("mode", "edit");
	$("." + textClass).html("0");
}