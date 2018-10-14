$(function(){
	var host = window.location.host;
	var $websit_total_holder;
	var $websit_today_holder;
	var $websit_userCount_holder;
	var $right = $(".right");
	$right.load("http://"+host+"/MHZ/ajax/right.html",function(){
		$websit_total_holder = $('#websit_total_holder');
		$websit_today_holder = $('#websit_today_holder');
		$websit_userCount_holder = $('#websit_userCount_holder');
		getViewers();
	    getUsers();
	    setTime();
	    setViewer();
	});
	var $pagetitle = $(document).attr("title");
	function secondToDate(second) {
        if (!second) {
            return 0;
        }
        var time = new Array(0);
        if (second >= 24 * 3600) {
            time[0] = parseInt(second / (24 * 3600));
            second %= 24 * 3600;
        }
        return time;
    }
    function setTime() {
        // 博客创建时间秒数，时间格式中，月比较特殊，是从0开始的，所以想要显示5月，得写4才行，如下
        var create_time = Math.round(new Date(Date.UTC(2018, 6, 1, 0, 0, 0))
                .getTime() / 1000);
        // 当前时间秒数,增加时区的差异
        var timestamp = Math.round((new Date().getTime() + 8 * 60 * 60 * 1000) / 1000);
        currentTime = secondToDate((timestamp - create_time));
        currentTimeHtml = currentTime[0];
        $websit_total_holder.html(currentTimeHtml);
    }
    setInterval(getViewers,60000);
    setInterval(getUsers,60000);
    function getViewers(){
    	$.get("Common/getViewers.do",function(data){
    		$websit_today_holder.html(data);
    	});
    }
    function getUsers(){
    	$.get("Common/getUsers.do",function(data){
    		$websit_userCount_holder.html(data);
    	});
    }
    function setViewer(){
    	if($.cookie('Viewer')==null){
    		$.cookie('Viewer','setted',{expires: 1/24,path:'/'});
    		$.get('Common/setViewer.do');
    		getViewers();
    	}
    }
    var imagecount;
    switch($pagetitle)
    {
    	case '留言区':imagecount = 8;break;
    	case 'MCHZ':imagecount = 10;break;
    	case '聊天室':imagecount = 5;break;
    	case '文章':imagecount = 7;break;
    	case '板块3':imagecount = 4;break;
    	case '板块4':imagecount = 6;break;
    	case '板块5':imagecount = 9;break;
    }
    var img = new Image();
	img.src ='imgs/bg_'+imagecount+'.jpg'	 
	img.onload = function(){
		var bg = $("#backgroundImg");
		bg.attr('src','imgs/bg_'+imagecount+'.jpg');	
	}
	$("#beian").load("http://"+host+"/MHZ/ajax/beian.html",function(){
		
	});
	if(window.innerWidth<=1139){
		$(".right").fadeOut()
		$(".container").css("width",'780px');
	}else{
		$(".right").fadeIn()
		$(".container").css("width",'1120px');
	}
	window.onresize = function(){
		if(window.innerWidth<=1139){
			$(".right").hide()
			$(".container").css("width",'780px');
		}else{
			$(".right").fadeIn()
			$(".container").css("width",'1120px');
		}
	}
	var scrolls = window.onscroll = function(){
		if(!!(document.body.scrollTop)){
		if(document.body.scrollTop>120){
			$(".right").stop().animate({'margin-top':document.body.scrollTop},100);
			
		}else{
			$(".right").stop().animate({'margin-top':0},100);
		}
		}else{
			if(document.documentElement.scrollTop>120){
				$(".right").stop().animate({'margin-top':document.documentElement.scrollTop},100);
			}else{
				$(".right").stop().animate({'margin-top':0},100);
			}
		}
	}
});