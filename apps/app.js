$(function(){
	$("#search-term").submit(function(event){
		event.preventDefault();
		var searchTerm = $("#query").val();
		getRequest(searchTerm);
	});
});

function getRequest(searchTerm){
	var params = {
		part: 'snippet',
		key: 'AIzaSyBG8Ek4aYAIcwh1wHZDnyyfCsbOuJImges',
		maxResults: 10,
		q: searchTerm,
	};
	url = 'https://www.googleapis.com/youtube/v3/search';

	$.getJSON(url, params, function(response){
		showResults(response);
		// console.log(response);
	});
}

function showResults(response){
	var html = "";
	var items = response.items
	$.each(items, function(index,item){
		console.log(item);
		html += "<li><a href='https://www.youtube.com/watch?v=" + item.id.videoId + "'><p id='item" + index + "'>" + item.snippet.title + "</p><img src='" + item.snippet.thumbnails.medium.url + "' alt='" + item.snippet.title + "'/></a></li>";
	});
	$("#search-results").html(html);
}

function init() {
	gapi.client.setApiKey("AIzaSyBG8Ek4aYAIcwh1wHZDnyyfCsbOuJImges");
	gapi.client.load("youtube", "v3", function() {
	});
}