$(function(){

	var $selected_li = $("#selected_li");
	var $cleartext = $("#cleartext");
	var $message_textarea = $("#message_textarea");
	var $length = $("#length");
	var $re_length = $("#re_length");
	var $downpage = $("#downpage");
	var $message_inputer = $("#message_inputer");
	var $gotomessage = $("#gotomessage");
	var messagecount;
	var $Reply;/*---------------------------------回复按钮*/
	var $message_main_content = $("#message_main_content");
	var $User_id;
	var $Replyed_User_id;
	var $Reply_user_id;
	var $showUser = $("#showUser");
	var $main_cover = $("#main_cover");
	var $showUser_footer = $("#showUser_footer");
	var $pageholder_from = $("#pageholder_from");
	var $message_inputer_form = $("#message_inputer_form");
	var $message_submit = $("#message_submit");
	var $messagecount = $("#messagecount");
	var $showUser_userid = $("#showUser_userid");
	var $showUser_createTime = $("#showUser_createTime");
	var $showUser_sign = $("#showUser_sign");
	var $re_message_inputer = $(".re_message_inputer");
	var $re_message_exit=$("#re_message_exit");
	var $re_message_textarea = $("#re_message_textarea");
	var $re_message_headline = $(".re_message_headline");
	var $re_message_form = $("#re_message_form");
	var $re_hidden_id = $("#re_hidden_id");
	var ic = false;
	function isclick(){
		ic = true;
	}
	function noclick(){
		ic = false;
	}
	getmessagecount();
	function getmessagecount(){
		$.get("message/getmessagecount.do",
			function(data){
				messagecount = data;
				$messagecount.children().html(data);
		});
	}
	function sort2(b,a){
		return b.id - a.id;
	}
	function getremessage(id){/*获取回复*/
		var limit = 3;
		var re_content=$(this).parents().find('.mls').children().find(".re_content").eq(messagecount-id.data.id);
		var beginid = re_content.children().eq(0).val();
		$.get("message/getremessage.do",{Rplyed_id:id.data.id,beginid:beginid,limit:limit},
			function(data){
			var length = data.length;
			if(length>0)
			{
				/*展示回复三条*/
				if(beginid==0)
				re_content.append("<hr>");
				re_content.children().eq(0).val(parseInt(beginid)+parseInt(data.length)+"");
				var a = [data.length];
				$.each(data, function(key, val) { a[key] = val;  });
				a.sort(sort2);
				$.each(a,function(i,data){
					var imgnum = Math.floor(Math.random() * 10 + 1 );
					var message = "<img src='icons/icon_"+imgnum+".jpg' alt='' class='re_icon'>"
						+"<div class='re_info'><span><input type='hidden' value='"+data.rply_User_id+
						"'><a class='Reply_user_id'>"+data.rply_User_name+"</a>"
						+"<a>"+data.time+"</a><span>回复</span><a>"+data.rplyed_User_name
						+"</a><a class='Reply'>回复TA</a>"
						+"</span><div class='re_message_commontxt'>"
						+data.message+"</div></div>";
					re_content.append(message);
					re_content.children().find('.Reply').bind("click",{id:id.data.id},torply);
					
				});
				$Reply_user_id = $(".Reply_user_id");
				$Reply_user_id.bind("click",showuser);
			}else{
				if(ic)
				{
					$("#success").children().html("没有更多回复啦");
					nomorerply();
					
				}
			}	
		});
	}
	function nomorerply(){
		$("#success").fadeIn().delay(500).fadeOut();
		$re_message_exit.click();
	}
	$re_message_form.submit(function(){
		if($re_message_textarea.val()!="")
		{
			var rply_User_id;
			if($.cookie("MHZ_User_id")!=null)
			{
				rply_User_id = $.cookie("MHZ_User_id");
			}else{
				rply_User_id  = "游客";
			}
			var include_id= $re_hidden_id.val();
			var rplyed_username=$re_message_headline.children().html();
			$.post("message/setoneremessage.do",
			{Rplyed_id:include_id,Rplyed_User_name:rplyed_username,Rply_User_id:rply_User_id,message:$re_message_textarea.val()},
			function(data){
				if(data=="setremessagesuccess")	
				{
					$("#success").children().html("回复成功");
					setremessagesuccess();
				}else{
					$("#success").children().html("回复失败！请稍后再试");
					setremessagesuccess();
				}
			});
		}
		return false;
	});
	function setremessagesuccess(){
		$("#success").fadeIn().delay(500).fadeOut();
		$re_message_exit.click();
	}
	function torply(id){
		var rplyed_username;
		var rplyed_id = id.data.id;
		rplyed_username=$(this).parent().children().eq(1).html();
		$re_message_headline.children().html(rplyed_username);
		$re_hidden_id.val(rplyed_id);
		$re_message_inputer.show();
		$main_cover.fadeIn();
		$re_length.text("0/150");
	};
	$re_message_exit.click(function(){
		$main_cover.fadeOut();
		$re_message_textarea.val("");
		$length.text("0/150");
		$re_message_inputer.hide();
	});
	$length.text("0/150");
	$cleartext.click(function(){
		$message_textarea.val("");
		$length.text("0/150");
	});
	$message_textarea.change(function(){
		var length = $message_textarea.val().length;
		$length.text(length+"/150");
	}).keyup(function(){
		$(this).change();
	});
	$gotomessage.click(function(){
		$message_textarea.focus();
	});
	function showuser(){
		var user_id= $(this).parent().children().eq(0).val();
		if(user_id!="游客"){
				$.get("getUser_info.do",{User_id:user_id},function(data){
				$.each(data,function(i,data){
					$showUser_userid.html(data.user_name);
					$showUser_createTime.html(data.user_createTime+"创建");
					$showUser_sign.html('"'+data.user_sign+'"');
				})
			});
		}else{
			$showUser_userid.html("游客");
			$showUser_createTime.html("--创建");
			$showUser_sign.html("TA是游客哦");
		}
		$showUser.show(100);
		$main_cover.fadeIn();
		/*获取用户信息*/
	}
	$showUser_footer.click(function(){
		$showUser.hide(100);
		$main_cover.fadeOut();
	});
	function sort1(a,b){
		return b.id - a.id;
	}
	var id = 0;
	var limit = 8;
	$downpage.bind("click",getlimitedmessage);
	getlimitedmessage();
	function getlimitedmessage(){
		$downpage.val("正在加载...");
		$main_cover.fadeIn();
		$.get("message/getlimitedmessage.do",{
			beginid:id,
			limit:limit
		},function(data,textStatus){
			if(data.length!=0)
			{
				var a = [data.length];
				$.each(data, function(key, val) { a[key] = val;  });
				a.sort(sort1);
				id = id+data.length;
				$.each(a,function(i,data){
					var imgnum = Math.floor(Math.random() * 10 + 1 );
					var hidden = "<input type='hidden' value='0'>";
					var message = "<li class='mls'><img src='icons/icon_"+imgnum+".jpg' alt='' class='user_icon'>"
					+"<span class='level' ><span># </span><span>"+data.id
					+"</span></span><span class='getremessage' id='"+data.id+"re'>更多</span>"
					+"<span class='close_remessage'>收起</span>"
					+"<div class='message_li_right'><ul><input type='hidden' value='"+data.user_id
					+"' /><a class='User_id'>"+data.user_name+"</a><a>"+data.time+"</a><a>"+data.address
					+"</a><a class='Reply' id='T"+data.id+"'>回复TA</a></ul><div class='message_commontxt'>"
					+data.message+"</div><ul class='re_content'>"+hidden+"</ul></div></li>"
					$message_main_content.append(message);
					$("#"+data.id+"re").bind('click',{id:data.id},getremessage)
					.bind("mouseenter",isclick).bind("mouseout",noclick);
					setTimeout(function(){$("#"+data.id+"re").click()},500);
					$("#T"+data.id).bind("click",{id:data.id},torply);
				})
				$User_id = $(".User_id");
				$User_id.bind("click",showuser);
				$downpage.val(data.length+"条留言");
				setTimeout(function(){$downpage.val("加载更多")},1000);
			}else{
				$downpage.val("没有更多了").css("color","red");
				setTimeout(function(){$downpage.val("加载更多").css("color","#ff6802")},1000);
			}
			$main_cover.fadeOut();
		},"json");
	}
	$message_inputer_form.submit(function(){
		if($message_textarea.val()!="")
		{
			$message_submit.attr("disabled",true).css("color","rgba(0,0,0,0.3)");
			if($.cookie('MHZ_User_setMessage')==null){
				$message_submit.val("提交中...");
				var user_id="游客";
				if($.cookie('MHZ_User_id')!=null)
					user_id= $.cookie('MHZ_User_id');
				var address = "未知领域";
				$.post("message/setonemessage.do",{User_id:user_id,address:address,message:$message_textarea.val()},
						function(data){
							if(data=="setmessagesuccess")
							{
								/*留言成功逻辑*/
								$("#success").children().html("留言成功");
								setOneMessageSuccess();
							}else if(data=="setmessagefail"){
								/*留言失败逻辑*/
								$("#success").children().html("留言失败");
								setOneMessageFail();
							}else{
								/*服务器繁忙*/
								$("#success").children().html("服务器繁忙");
								setOneMessageFail()
							}
					$message_submit.val("提交留言");
					getmessagecount();
					$message_submit.attr("disabled",false).css("color","#ff6700");
				});
			}else{
				$("#success").children().html("你已经留言了，请等一会再留言吧");
				setOneMessageFail();
			}
		}
		return false;
	});
	function setOneMessageSuccess(){
		$.cookie('MHZ_User_setMessage',"1", { expires: 1/2880, path: '/MHZ' });
		$("#success").fadeIn().delay(500).fadeOut();
		$message_textarea.val("");
		setTimeout(function(){window.location.reload();},800);
	}
	function setOneMessageFail(){
		$("#success").fadeIn().delay(500).fadeOut();
		$message_submit.delay(500).attr("disabled",false).css("color","#ff6700");
	}
})