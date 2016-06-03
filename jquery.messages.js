if ($.fn == undefined) {
	throw new Error('Adicionar o Jquery antes!!');
}

(function($) {

	$.fn.messages = function(settings) {
		
		if (typeof settings == "string") {
			switch (settings) {
			case "destroy":
				return this.each(function() {
					$(this).empty();
				});
			}
		}
		
		var config = {
			message: '',
			type: null,
			category:null,
			identification: new Date().getTime(),
			template: "<div class='alert alert-block {type}' style = 'margin-bottom: 5px;padding: 10px;'><button type='button' class='close' data-dismiss='alert'><i class='ace-icon fa fa-times'></i></button>{message}</div>",			
			classContainer: "col-xs-12",
			isSingleVector: false,
			autoDiscoverType: false,
			secondsVisible: 0,
			timeVisible: 0,
			group:true,
			extraFunction: function() {}
		};
		settings = $.extend(config, settings);

		var methods = {
			classOnType: function(type) {
				
				type = type==undefined?settings.type:type;
				
				if(["info","informacao"].indexOf(type)>-1) {
					return "alert-info";
				}
				if(["error","erro"].indexOf(type)>-1) {
					return "alert-danger";
				}
				if(["success","sucesso"].indexOf(type)>-1) {	
					return "alert-success";
				}
				if(["alert","alerta","warning"].indexOf(type)>-1) {
					return "alert-warning";
				}
				return "alert-info";
			},
			crateObject: function(message, type){
				return {message: message ,type:type};
			},
			solveJson: function() {
				
				if(typeof settings.message != "object"){
					return [];
				}
				var mensagens = [];
				
				function findForType(type){
					return mensagens.filter(function(m){
						return m.category && m.category == type;
					});
				}
				function addToType(message,type){
					var res = findForType(type);
					res.forEach(function(e){
						e.message = e.message + "<br>"+message
					});
				}
			
				try {
					$.each(settings.message, function(key, value) {
						
						var tipo = settings.autoDiscoverType == true && typeof value != "undefined" ? value.category : settings.type;
						if (typeof tipo == "undefined" || (typeof tipo != "undefined" && tipo.length == 0)) {
							tipo = "info";
						}
						switch (typeof value) {
							case "string":
								value = methods.crateObject(value, tipo);
								break;
							case "undefined":
								value = methods.crateObject("&nbsp;", tipo);
								break;
							case "object":
								if (Object.keys(value).length == 0) {
									value = methods.crateObject("&nbsp;", tipo);
								}
								
								break;
						}
						
						var find = findForType(tipo);
						if (find.length > 0 && settings.group == true) {
							addToType(value.message, tipo);
						}else{
							mensagens.push(value);							
						}
					});
				} catch (err) {
					throw new Error(err);
				}
				return mensagens;
			},
			removeToTime: function() {
				if (settings.secondsVisible != undefined && isNumber(settings.secondsVisible)) {
					settings.timeVisible = Number(settings.secondsVisible) * 1000;
				}
				
				if (settings.timeVisible && settings.timeVisible > 0) {
					setTimeout(function() {
						$("#" + settings.identification).fadeOut(1000);
						$("#" + settings.identification).trigger('rm');
					}, settings.timeVisible);
					
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
			var message_display = [];
			
			if (settings.type == null) {
				settings.autoDiscoverType=true;
			};
			if (typeof settings.message.list != "undefined") {
				settings.message = settings.message.list;// evitar quebra de compatibilidade
			}
			
			//gerencia as maneiras como a mensagem chega, e transforma em uma coisa só
			message_display = (settings.message && $.isArray(settings.message)) ? methods.solveJson() : settings.message;
			
			//injeta na DOM
			if (elem != undefined && message_display.forEach) {
				elem.empty();
				var msg="";
				message_display.forEach(function(m){
					msg = settings.template.replace(new RegExp("{type}","gi"),methods.classOnType(m.category));
					msg = msg.replace(new RegExp("{message}","gi"), m.message);
					var block = "<div id='" + settings.identification + "' class='" + settings.classContainer + "' >" + msg + "</div>";
					elem.append(block);
				});
				elem.removeAttr("style");
				methods.removeToTime();
				settings.extraFunction();
			}
		});
	};
})(jQuery);