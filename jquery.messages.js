if ($.fn == undefined) {
	throw new Error('Adicionar o Jquery !!');
}

(function($) {

	$.fn.messages = function(settings, mensagens) {
		var config = {
			message: '',
			type: null,
			category:null,
			identification: new Date().getTime(),
			template: "<div class='alert alert-block {type}'><button type='button' class='close' data-dismiss='alert'><i class='ace-icon fa fa-times'></i></button>{message}</div>",			
			classContainer: "col-xs-12",
			isSingleVector: false,
			autoDiscoverType: false,
			secondsVisible: 0,
			extraFunction: function() {}
		};
		settings = $.extend(config, settings);

		if (mensagens) {
			settings.message = mensagens;
		};

		var methods = {
			classOnType: function() {
				
				if(["info","informacao"].indexOf(settings.type)>-1) {
					return "alert-info";
				}
				if(["error","erro"].indexOf(settings.type)>-1) {
					return "alert-danger";
				}
				if(["success","sucesso"].indexOf(settings.type)>-1) {	
					return "alert-success";
				}
				if(["alert","alerta","warning"].indexOf(settings.type)>-1) {
					return "alert-warning";
				}
				return "alert-info";
			},
			solveJson: function() {
				var mensagens = "";

				try {
					$.each(settings.message.list, function(key, value) {
						mensagens += value.message + "<br/>";
						if (settings.autoDiscoverType == true) {
							settings.type = value.category;
						}
					});
				} catch (err) {
					throw new Error(err);
				}
				return mensagens;
			},
			solveVector: function() {
				var mensagens = "";
				$.each(settings.message, function(key, value) {
					mensagens += value + "<br/>";
				});
				return mensagens;
			},
			removeToTime: function() {
				if (settings.secondsVisible && settings.secondsVisible > 0) {
					setTimeout(function() {
						$("#" + settings.identification).fadeOut(1000);
						$("#" + settings.identification).trigger('rm');
						
					}, settings.secondsVisible);
					$("#" + settings.identification).on("rm", function(e){
						e.stopPropagation();e.preventDefault();
						setTimeout(function() {
							$("#" + settings.identification).detach();
						}, 1000);
					});
				};
			}
		};

		return this.each(function() {
			var elem = $(this);
			var message_display;
			
			if (settings.type == null) {
				settings.autoDiscoverType=true;
			};

			if (settings.isSingleVector) {
				message_display = methods.solveVector();
			} else {
				message_display = (settings.message.list && $.isArray(settings.message.list)) ? methods.solveJson() : settings.message;
			}
			if (elem != undefined) {
				settings.template = settings.template.replace("{type}", methods.classOnType());
				settings.template = settings.template.replace("{message}", message_display);
				var block = "<div id='" + settings.identification + "' class='" + settings.classContainer + "' >" + settings.template + "</div>";
				elem.html(block);
			}
			methods.removeToTime();
			settings.extraFunction();
		});

	};
})(jQuery);