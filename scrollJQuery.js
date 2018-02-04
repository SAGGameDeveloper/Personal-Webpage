var hashTagActive = "";
$("document").ready( function(){
	$(".scroll").click(function(event){     
		event.preventDefault();
		
		var html = document.getElementsByTagName('html')[0];
		var rem = parseInt(window.getComputedStyle(html)['fontSize']);
		
		var targetId = $(this).attr('href');
		$('html,body').animate({scrollTop:$(targetId).offset().top - 4.3*rem}, 500);
	});
});