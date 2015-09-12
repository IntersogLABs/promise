$(function(){
	var url = "book.json"
	function get(url) {
		var def = new $.Deferred()

		var request = new XMLHttpRequest();
		request.open('GET', url);

		request.onload = function() {
			if (request.status == 200) {
				setTimeout(function(){
					def.resolve(request.response)	
				}, 500)
			}
			else {
				def.reject(request.status)
			}
		};

		request.onerror = function() {
		 	reject("Network Error");
		};

		request.send()
		return def
	}
	function parseIt(json){
		return JSON.parse(json)
	}

	get(url)
		.then(parseIt)
		.then(renderHeading)
		.then(function(book){
			var requests = book.chapterUrls
				.map(function(url){
					return get(url)
						.then(parseIt)
						.then(renderChapter)
				})
			console.log(requests)
			return $.when.apply(null, requests).done(stopSpinner)
		})



	function renderChapter(data){
		console.log("renderChapter")
		$("body").append("<p>" + data.text + "</p>")
		return data
	}
	function renderHeading(data){
		$("body").append("<h3>" + data.title + "</h3>")
		return data
	}
	function stopSpinner (){
		console.log("stopSpinner")
		console.log(arguments)
		$(".spinner").remove()
	}
})


$(function(){
	window.jqueryP = function(){
		var def = $.Deferred()
		var promise = def.promise()

		promise.then(function(){
			console.log("Yeah! Promise become fulfilled!")
		})

		def.resolve()
		asdasda()
	}



	window.nativeP = function(){
		var promise = new Promise(function(resolve){
			resolve()
			console.log("I've just resolved deferred")	
		})

		promise.then(function(){
			console.log("Yeah! Promise become fulfilled!")
		})
	}
})