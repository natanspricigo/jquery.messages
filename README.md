# jquery.messages
Pluguin jquery para adicionar mensagens embutidas no html, o visual fica por conta do bootstrap.

Básico:

````js
   $(".sucesso").messages({
			type:"success",
			message:"Mensagem de sucesso!"
		});
````


Mensagem simples
-----------

Como usar ?

````js
			$(".sucesso").messages({
				type:"success",
				message:"Mensagem de sucesso!"
			});
````
O parametro `type`pode aceitar 4 parametros, `info, success, error e warning`, por padão ele é info.



Mensagem temporizada
-----------

Como usar ?

````js
			$(".sucesso_hide").messages({
				type:"success",
				message:"Mensagem de sucesso que será escondida em 5 segundos!",
				secondsVisible: 5000 //milisegundos
			});
````
O parametro `secondsVisible` por padão é `0 (zero)`, que não ativa a funcionalidade. Para ativar, passe um valor numerico do tempo em milisegundos.



Executar uma função extra
-----------

Como usar ?

````js
		$(".erro").messages({
			type:"error",
			message:"Mensagem de erro!",
			extraFunction: function(){
				console.log("Fazer alguma coisa...");
			}
		});
````

O parametro `extraFunction` recebe uma função que é executada após gerado o conteúdo.



Gerando mensagens a partir de um vetor simples
-----------

Como usar ?

````js
		$(".inform").messages({
			type:"info",
			isSingleVector:true,
			message:["Mensagem de informação!",
			 "Estou te informando...", "Estou te informando mais uma vez...."]
		});
````

Defina a variavel `isSingleVector` como `true`, e então passe por parametro o vetor com a mensagem.
	


Mensagens via json(padrão Vraptor)
-----------

como usar ?

````js
		$(".alerta").messages({
			type:"warning",
			message:{"list":[{"message": "Mensagem de alerta!", "category": "warning"},
			{"message": "Mensagem de alerta 2!", "category": "warning"}, 
			{"message": "Mensagem de alerta 3!", "category": "warning"}]},
		});
````

Observe no exemplo acima o formato de dados, deve ser neste estilo, vale observar que o parametro `type` é opcional, pois o tipo já esta sendo passado pelo json.



Tipo da mensagem automático
-----------

Como usar?

````js
		$(".auto").messages({
			autoDiscoverType:true,
			message:{"list":[{"message": "Mensagem de alerta!", "category": "warning"},
			{"message": "Mensagem de alerta 2!", "category": "warning"}, 
			{"message": "Mensagem de alerta 3!", "category": "warning"}]},
		});
````

Apenas com a mensagem via json, passando a categoria, o `type` é alterado.



Maneira alternativa
-----------

Como usar ?

````js
			var mensagem_clean = {"list":[{"message": "Mensagem de erro!", "category": "error"},
				{"message": "Mensagem de erro 2!", "category": "error"},
				{"message": "Mensagem de erro 3!", "category": "error"}]};

			$("#clean").messages({}, mensagem_clean);
````

Passe primeiro um conjunto de parametros vazio`{}`, depois passe a mensagem json no segundo parametro.
