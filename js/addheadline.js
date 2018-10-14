$(function(){
	var host = window.location.host;
	var $headline = $(".headline");
	$headline.load("http://"+host+"/MHZ/ajax/headline.html",function(){
		$.getScript("js/headline.js");
		$headline.show();
	});
})