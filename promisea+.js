$(function(){
	var url = "book.json"
	function get(url) {
		var promise = new Promise(function(resolve, reject) {
			var request = new XMLHttpRequest();
			request.open('GET', url);

			request.onload = function() {
				if (request.status == 200) {
					setTimeout(function(){
						resolve(request.response)	
					}, 500)
				}
				else {
					reject(request.status)
				}
			};

			request.onerror = function() {
			 	reject("Network Error");
			};

			request.send()
		})
		return promise
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
			return Promise.all(requests)
		})
		.then(stopSpinner)



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