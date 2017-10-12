/*------------------------------------------------------
 *封装的dialog插件，基于bootstrap模态窗口的简单扩展
 *作者：muzilei
 *email:530624206@qq.com
----------------------------------------------------------*/
(function ($) {
	$.fn.mzDialog = function () {
		var defaults = {
			id: "modal",//弹窗id
			title: "dialog",//弹窗标题
			width: "600",//弹窗宽度，暂时不支持%
			height: "500",//弹窗高度,不支持%
			backdrop: true,//是否显示遮障，和原生bootstrap 模态框一样
			keyboard: true,//是否开启esc键退出，和原生bootstrap 模态框一样
			remote: "",//加载远程url，和原生bootstrap 模态框一样
			openEvent: null,//弹窗打开后回调函数
			closeEvent: null,//弹窗关闭后回调函数
			okEvent: null//单击确定按钮回调函数
		};

		//动态创建窗口
		var creatDialog = {
			init: function (opts) {
				var _self = this;

				//动态插入窗口
				var d = _self.dHtml(opts);
				$("body").append(d);

				var modal = $("#" + opts.id);

				//初始化窗口
				modal.modal(opts);

				//窗口大小位置
				var h = modal.height() - modal.find(".modal-header").outerHeight() - modal.find(".modal-footer").outerHeight() - 5;
				modal.css({ 'margin-left': opts.width / 2 * -1, 'margin-top': opts.height / 2 * -1, 'top': '50%' }).find(".modal-body").innerHeight(h);

				modal.modal('show').on('hidden', function () {
						modal.remove();
						$(".modal-backdrop").remove();
						if (opts.closeEvent) {
							eval(opts.closeEvent);
						}
					}).on('shown', function () {

						if (opts.openEvent) {
							eval(opts.openEvent);
						}

						//绑定按钮事件
						$(this).find(".ok").click(function () {
							if (opts.okEvent) {
								var ret = eval(opts.okEvent);
								if (ret) {
									modal.modal('hide');
								}
							}
						});

					});
			},
			dHtml: function (o) {
				return '<div id="' + o.id + '" class="modal hide fade" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" style="width:' + o.width + 'px;height:' + o.height + 'px;"><div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button><h3 id="myModalLabel">' + o.title + '</h3></div><div class="modal-body"><p>正在加载...</p></div><div class="modal-footer"><button class="btn" data-dismiss="modal" aria-hidden="true">取消</button><button class="btn btn-primary ok">确定</button></div></div>';
			}
		};

		return this.each(function () {
			$(this).click(function () {
				var opts = $.extend({}, defaults, {
					id: $(this).attr("data-id"),
					title: $(this).attr("data-mtitle"),
					width: $(this).attr("data-width"),
					height: $(this).attr("data-height"),
					backdrop: $(this).attr("data-backdrop"),
					keyboard: $(this).attr("data-keyboard"),
					remote: $(this).attr("data-remote"),
					openEvent: $(this).attr("data-openEvent"),
					closeEvent: $(this).attr("data-closeEvent"),
					okEvent: $(this).attr("data-okEvent")
				});

				creatDialog.init(opts);
			});
		});

	};

})(jQuery);