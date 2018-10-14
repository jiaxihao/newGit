$(function(){
	var $mainframe=$(".mainFrame");
	var $content = $(".content");
	var $row = $(".row");
	var $special_span = $(".special_span");
	var $spans = $(".spans");
	var $sc_spans = $(".sc_spans");
	var $s_content = $(".s_content");
	var $main_cover = $("#main_cover");
	var $spans_detil = $("#spans_detil");
	var $spans_detil_image = $("#spans_detil_image");
	var $spans_detil_content_exit = $(".spans_detil_content_exit");
	var $showimage = $("#showimage");
	var isloading = false;
	var h = $("body").height();
	var w = $(window).width();
	var $selected_li = $("#selected_li");
	//$mainframe.css("height",h);
	$s_content.mouseenter(function(){
		$(this).stop().animate({"top":"-150px"},200)
	}).mouseleave(function(){
		$(this).stop().animate({"top":"0"},200)
	})
	$row.children().mouseenter(function(){
		var index =$row.children().index(this);	
		if(index==2||index==6)
		{
			setainmate($row.children().eq(index).position().left,307.5,200);
		}else{
			setainmate($row.children().eq(index).position().left,150,200);
		}
	}).click(function(){
		if(this.title!="Hello"){
			$main_cover.stop().fadeIn();
			if(this.title=="关于我")
			{
				var w = $("body").width();
				$spans_detil.stop().animate({top:"30px"},100).fadeIn();
				setTimeout(function(){
					$spans_detil_content_exit.css({left:$spans_detil.offset().left+630+"px",top:$spans_detil.offset().top+10+"px"}).show();
				},200)
			}else{
				isloading=true;
			}
		}	
	})
	function setainmate(l,w,s){
		$sc_spans.stop().animate({left:l+8+"px",width:w+"px"},s);
	}
	$main_cover.click(function(){
		if(!isloading)
			$(this).stop().fadeOut();
		$('.dialog_quit_button').click();
		$spans_detil_content_exit.click();
	})
	$spans_detil_image.mousemove(function(e){
		var x = e.pageX;
		var y = e.pageY;
		var pleft = $content.offset().left;
		$showimage.stop().css({left:x-pleft+50+"px",top:y-this.height+"px"}).show();
		$showimage.children().attr("src",this.src);
	}).mouseleave(function(){
		$showimage.stop().hide();
	})
	$spans_detil_content_exit.click(function(){
		$main_cover.stop().fadeOut();
		$spans_detil.stop().animate({top:"-700px"},100).fadeOut();
	});

})