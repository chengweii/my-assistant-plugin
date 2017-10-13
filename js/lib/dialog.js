(function ($) {
	$.fn.mzDialog = function () {
		var defaults = {
			id: "modal",//弹窗id
			title: "dialog",//弹窗标题
			width: "600",//弹窗宽度，暂时不支持%
			height: "500",//弹窗高度,不支持%
			backdrop: true,//是否显示遮障
			keyboard: true,//是否开启esc键退出
			remote: "",//加载远程url
			openEvent: null,//弹窗打开后回调函数
			showBtn: true,
			closeEvent: null,//弹窗关闭后回调函数
			okEvent: null//单击确定按钮回调函数
		};

		var creatDialog = {
			init: function (opts) {
				var _self = this;

				var d = _self.dHtml(opts);
				var dialog = $(d);
				$.get(opts.remote, function (data) {
					dialog.find(".modal-body").html(data);
				});

				$("body").append(dialog);

				var modal = $("#" + opts.id);

				var hiddenDialog = function () {
					modal.next("." + opts.id).remove();
					modal.remove();
					if (opts.closeEvent) {
						eval(opts.closeEvent);
					}
				}

				modal.find("button.close").on("click", hiddenDialog);
				modal.find("button.btn-cancel").on("click", hiddenDialog);
				modal.next("." + opts.id).on("click", hiddenDialog);

				modal.show();
				modal.next("." + opts.id).show();

				if (opts.openEvent) {
					eval(opts.openEvent);
				}

				modal.find("button.ok").click(function () {
					if (opts.okEvent) {
						eval(opts.okEvent);
					}
				});

				if (opts.showBtn == "false") {
					modal.find(".modal-footer").hide();
				}
			},
			dHtml: function (o) {
				return '<div id="' + o.id + '" class="modal hide" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" style="width:' + o.width + 'px;height:' + o.height + 'px;"><div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button><h3 id="myModalLabel">' + o.title + '</h3></div><div class="modal-body"><p>正在加载...</p></div><div class="modal-footer"><button class="btn btn-default btn-cancel" data-dismiss="modal" aria-hidden="true">取消</button><button class="btn btn-primary ok">确定</button></div></div><div class="' + o.id + ' modal-backdrop fade in"></div>';
			}
		};

		return this.each(function () {
			var _self = $(this);
			var showDialog = function () {
				var opts = $.extend({}, defaults, {
					id: _self.attr("data-id"),
					title: _self.attr("data-title"),
					width: _self.attr("data-width"),
					height: _self.attr("data-height"),
					backdrop: _self.attr("data-backdrop"),
					keyboard: _self.attr("data-keyboard"),
					remote: _self.attr("data-remote"),
					openEvent: _self.attr("data-openEvent"),
					showBtn: _self.attr("data-showBtn"),
					closeEvent: _self.attr("data-closeEvent"),
					okEvent: _self.attr("data-okEvent")
				});

				creatDialog.init(opts);
			}

			var trigger_action = _self.attr("trigger-action");
			if (trigger_action) {
				if (trigger_action == "click") {
					_self.click(showDialog);
				}
			} else {
				showDialog();
			}
		});

	};

})(jQuery);