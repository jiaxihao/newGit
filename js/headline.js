$(function(){
	var host = window.location.host;
	var $headline_headlines = $("#headline_headlines");
	var host2 = "";
	$headline_headlines.children().eq(0).html('<a href="'+host2+'/MHZ/hello.do"><h1>首页</h1></a>');
	$headline_headlines.children().eq(1).html('<a href="'+host2+'/MHZ/myArticle.do"><h1>文章</h1></a>');
	$headline_headlines.children().eq(2).html('<a href="'+host2+'/MHZ/part3.do"><h1>应用</h1></a>');
	$headline_headlines.children().eq(3).html('<a href="'+host2+'/MHZ/part4.do"><h1>娱乐</h1></a>');
	$headline_headlines.children().eq(4).html('<a href="'+host2+'/MHZ/part5.do"><h1>日程</h1></a>');
	$headline_headlines.children().eq(5).html('<a href="'+host2+'/MHZ/chatRoom.do"><h1>聊天室</h1></a>');
	$headline_headlines.children().eq(6).html('<a href="'+host2+'/MHZ/messageArea.do"><h1>留言区</h1></a>');
	var issignout = true;
	var $main_cover = $("#main_cover");
	var $headline = $(".headline");
	var $container = $(".container");
	var $User_id = $("#User_id");
	$("body").append('<div class="addArticle_dialog"></div>');
	var $addArticle_dialog = $(".addArticle_dialog");
	$User_id_show = $("#User_id_show");
	$User_createTime_show  = $("#User_createTime_show");
	$User_life_show = $("#User_life_show");
	$User_sign_show = $("#User_sign_show");
	var $headline_ul = $("#headline_headlines")
	$('body').append('<script type="text/javascript" src="js/common.js"></script>');
	var $headline_ul_li = $headline_ul.children().not('#logo');
	var $Userinfo = $("#Userinfo");
	var $Userinfo_icon = $("#Userinfo_icon");
	var $Userinfo_option = $("#Userinfo_option");
	var $login_button = $("#login_button");
	var $register_button = $("#register_button");
	var $dialog = $("#dialog");
	var $dialogs = $(".dialogs");
	var $login_dialog = $("#login_dialog");
	var $register_dialog = $("#register_dialog");
	var $dialog_button_top = $(".dialog_button_top");
	var $login = $("#login");
	var $register = $("#register");
	var $signout = $("#signout");
	var $updatepw = $("#updatepw");
	var $dialog_quit_button = $(".dialog_quit_button");
	var $infos_dialog = $("#infos_dialog");
	var $upadtepw_dialog  = $("#upadtepw_dialog");
	var $signout_dialog = $("#signout_dialog");
	var $pagetitle = $(document).attr("title");
	var $login_form = $("#login_form");
	var $register_form = $("#register_form");
	var $signout_form = $("#signout_form");
	var $updatepw_form = $("#updatepw_form");
	var $login_userid = $("#login_userid");
	var $login_userpw = $("#login_userpw");
	var $register_userid = $("#register_userid");
	var $register_userpw = $("#register_userpw");
	var $register_reuserpw = $("#register_reuserpw");
	var $register_username = $("#register_username");
	var $register_usersign = $("#register_usersign");
	var $updatepw_userpw = $("#updatepw_userpw");
	var $updatepw_newuserpw = $("#updatepw_newuserpw");
	var $updatepw_renewuserpw = $("#updatepw_renewuserpw");
	var $loginsubmit = $("#loginsubmit");
	var $registersubmit = $("#registersubmit");
	var $updatepwsubmit = $("#updatepwsubmit");
	var $signoutsubmit = $("#signoutsubmit");
	var $loginerror = $login_form.children().eq(1);
	var $registererror = $register_form.children().eq(1);
	var $updatepwerror = $updatepw_form.children().eq(1);
	var $faillogin = $login_form.children().eq(3);
	var $User_id_show;
	var $User_createTime_show;
	var $User_life_show;
	var $User_sign_show;
	var $addArticle;
	$register_form.validate({
		rules:{
			User_id:{
				required:true,
				minlength:5,
				maxlength:12,
			},
			User_pw:{
				required:true,
				minlength:5,
				maxlength:12
			},
			User_name:{
				required:true,
				minlength:5,
				maxlength:12
			},
			re_User_pw:{
				required:true,
				equalTo:$register_userpw,
				minlength:5,
				maxlength:12
			}
		}
	});
	$login_form.validate({
		rules:{
			User_id:{
				required:true,
				minlength:5,
				maxlength:12
			},
			User_pw:{
				required:true,
				minlength:5,
				maxlength:12
			}
		}
	});
	$updatepw_form.validate({
		rules:{
			User_pw:{
				required:true,
				minlength:5,
				maxlength:12
			},
			newUser_pw:{
				required:true,
				minlength:5,
				maxlength:12
			},
			re_newUser_pw:{
				required:true,
				equalTo:$updatepw_newuserpw,
				minlength:5,
				maxlength:12
			}
		}
	});
	$login_userid.blur(function(){
		if($login_userid.val().length>=5&&$login_userid.val().length<=12){
		$.get("getUser_pwById.do",{User_id:$login_userid.val()+""},function(data){
			if(data=="ye")
			{
				$loginsubmit.attr("disabled",false);
				$loginerror.hide(100);
			}else if(data=="ne"){
				$loginsubmit.attr("disabled",true);
				$loginerror.show(100);
			}
		});
		}else{
			$loginerror.hide(100);
		}
	});
	$login_form.submit(function(){
		if($login_userpw.val().length>=5&&$login_userpw.val().length<=12){
		$loginsubmit.val("正在登录...");
		$.get("login.do",{User_id:$login_userid.val(),User_pw:$login_userpw.val()},
			function(data){
				if(data=="loginsuccess")
				{
					success_login($login_userid.val());
				}else if(data=="loginfail"){
					$faillogin.html("密码错误");
					fail_login();
				}else{
					$faillogin.html("登录失败！请稍后重试");
					fail_login();
				}
				$loginsubmit.val("登录");
			});
		}
		return false;
	});
	function success_login(id){/*登陆成功后*/
		$dialog_quit_button.click();
		getUser_info(id);
		$.cookie('MHZ_User_id',id, { expires: 3, path: '/' });
		checklogin(id);
		issignout = true;
	}
	function fail_login(){/*登陆失败后*/
		$faillogin.show(100).delay(500).hide(100);
		$("input[name='User_pw']").val("");
	}
	checklogin($.cookie('MHZ_User_id'));/*检查登录*/
	function checklogin(id){
		if($.cookie('MHZ_User_id')!=null){/*检查cookie*/
			loginstatus(id);
		}else{
//			$.get("getLoginUserId.do",function(data){
				//if(data=="none")
				//{
					signoutstatus();
				//}else{
					//loginstatus(data);
				//}
			//});
		}
	}
	function loginstatus(id){
		getUser_info(id);
		if($.cookie('MHZ_User_Status')==null){
			$("#success").children().html("登陆成功");
			$("#success").fadeIn().delay(500).fadeOut();
			$.cookie('MHZ_User_Status','login',{path:'/'});
		}
		$.get("setStatus.do",{User_id:id,User_Status:"Login"});
		$signout.attr("class","Userinfo_option_show");
		$login.attr("class","Userinfo_option_hide");
		$register.attr("class","Userinfo_option_hide");
		$Userinfo.unbind().bind('mouseover',showinfo).bind('mouseout',hideinfo);
		$.cookie('MHZ_User_id',id, { expires: 3, path: '/' });
		//if(id=='Admin')
		{
			$infos_dialog.append('<div id="addArticle" class="Userinfo_option_show" style="width:auto;color:#ff6700">发表文章</div>');
			$("#addArticle").bind("click",addArticle);
			$addArticle = $("#addArticle");
		}
	}
	function showinfo(){
		$infos_dialog.stop().show();
	}
	function hideinfo(){
		$infos_dialog.stop().hide();
	}
	function addArticle(){
		if($addArticle_dialog.html()==""){
			$('head').append('<link href="css/addArticle.css" rel="stylesheet" type="text/css" />')
			$addArticle_dialog.load("http://"+host+"/MHZ/ajax/addArticle.html",function(){
				$.getScript("js/addArticle.js");
				$main_cover.show();
			}).show();
		}else{
			$("#addArticle_content_inputer_preshow").focus();
		}
	}
	function signoutstatus(){
		$login.attr("class","Userinfo_option_show");
		$register.attr("class","Userinfo_option_show");
		$signout.attr("class","Userinfo_option_hide");
		$.get("setStatus.do",{User_id:"none",User_Status:"SignOut"});
	}
	function getUser_info(id){
			$.get("getUser_info.do",{User_id:id},
				function(data){
				$.each(data,function(i,User_info){
					var username = User_info.user_name;
					$User_id_show.html(username);
					$User_createTime_show.html(User_info.user_createTime+"创建");
					$User_sign_show.html('"'+User_info.user_sign+'"');
				});
			});
	}
	$register_userid.blur(function(){
		if($register_userid.val().length>=5&&$register_userid.val().length<=12){
			$.get("getUser_pwById.do",
					{User_id:$register_userid.val()},
					function(data){
				if(data=="ne")
				{
					$registersubmit.attr("disabled",false);
					$registererror.hide(100);
				}else{
					$registersubmit.attr("disabled",true);
					$registererror.show(100);
				}
			})
		}else{
			$registererror.hide(100);
		}
	});
	$register_form.submit(function(){
			if($register_userpw.val()!=""&&$register_reuserpw.val()!=""){
				if($register_usersign.val()=="")
					$register_usersign.val("这个人很懒，什么都没有留下");
				$registersubmit.val("正在注册...");
				$.post("register.do",{User_id:$register_userid.val(),User_pw:$register_userpw.val(),User_name:$register_username.val(),User_sign:$register_usersign.val()},
				function(data){
					if(data=="registersuccess")
					{
						success_register($register_userid.val());
					}else{
						$("#success").children().html("注册失败！请稍后再试");
						fail_register();
					}
					$registersubmit.val("注册");
				});	
			}
		return false;
	});
	function success_register(id){/*注册成功后*/
		$.cookie('MHZ_User_register', id, { expires: 1/48, path: '/' });
		$("#success").children().html("注册成功");
		$("#success").fadeIn().delay(500).fadeOut();
		$dialog_quit_button.click();
	}
	function fail_register(){
		$("#success").stop(true,true).fadeIn().delay(500).fadeOut();
	}
	/*signout+++++++++++++++++++++++++++++++++++++++++++++++++++*/
	$signout_form.submit(function(){
		$.cookie("MHZ_User_id",null, {expires: -1,path: '/' });
		$.cookie("MHZ_User_Status",null, {expires: -1,path: '/' });
		//$.get("signout.do");/*销毁session*/
		if(issignout){
			$("#success").children().html("注销成功");
			signoutsuccess();
		}
		checklogin($.cookie('MHZ_User_id'));
		$signout_dialog.hide();
		$main_cover.hide();
		return false;
	});
	function signoutsuccess(){
		$("#success").fadeIn().delay(500).fadeOut();
		signoutstatus();
		$infos_dialog.removeChild("#addArticle");
	}
	$updatepw_userpw.blur(function(){
		if($updatepw_userpw.val()!=""){
		$.get("login.do",{User_id:$.cookie("MHZ_User_id"),User_pw:$updatepw_userpw.val()},
			function(data){
				if(data=="loginsuccess")
				{
					$updatepwsubmit.attr("disabled",false);
					$updatepwerror.hide(100);
				}else if(data=="loginfail"){
					$updatepwsubmit.attr("disabled",true);
					$updatepwerror.show(100);
				}
			})
		}
	});
	$updatepw_form.submit(function(){
		if($updatepw_userpw.val()!=""&&$updatepw_newuserpw.val()!=""&&$updatepw_renewuserpw.val()!="")
		{
			$updatepwsubmit.val("提交中...");
			$.post("updatepw.do",{User_id:$.cookie("MHZ_User_id"),User_newpw:$updatepw_newuserpw.val()},
			function(data){
				if(data=="updatepwsuccess")
				{
					alert("修改成功！请重新登录");
					issignout = false;
					updatepwsuccess();
				}else if(data=="updatepwfail"){
					$("#success").children().html("修改失败,请稍后再试");
					updatepwfail();
				}else{
					$("#success").children().html("修改失败,请稍后再试");
					updatepwfail();
				}
				$updatepwsubmit.val("确认修改");
			});
		}
		return false;
	})
	function updatepwsuccess(){
		$dialog_quit_button.click();
		$signout_form.submit();
	}
	function updatepwfail(){
		$("#success").fadeIn().delay(500).fadeOut();
	}
	switch($pagetitle)
	{
		case '留言区':setSpecialLi(6);break;
		case 'MCHZ':setSpecialLi(0);break;
		case '聊天室':setSpecialLi(5);break;
		case '文章':setSpecialLi(1);break;
		case '板块3':setSpecialLi(2);break;
		case '板块4':setSpecialLi(3);break;
		case '板块5':setSpecialLi(4);break;
	}
	function setSpecialLi(i,k){
		 $headline_ul.children().eq(i).children().children().css({color:'#ff6700',fontSize:'23px'});
	}
	$headline_ul_li.mouseenter(function(){
		var index = $headline_ul_li.index(this);
		$(this).children().css({color:"white",fontSize:"21px"});
	}).mouseleave(function(){
		$headline_ul_li.children().css({color:"black",fontSize:"20px"});
	})
	$login.click(function(){
		$dialog.stop().fadeIn();
		$login_button.addClass("dialog_button_select").show();
		$register_button.removeClass('dialog_button_select').addClass("dialog_button_unselect").show();
		$login_dialog.stop().show();
		$main_cover.fadeIn();
		$dialogs.not($login_dialog).hide();
	});
	$register.click(function(){
		if($.cookie('MHZ_User_register')!=null)
		{
			$("#success").children().html("30分钟之内不能注册！");
			fail_register();
		}else{
			$dialog.stop().fadeIn();
			$register_button.addClass("dialog_button_select").show();
			$login_button.removeClass('dialog_button_select').addClass("dialog_button_unselect").show();
			$dialogs.not($register_dialog).hide();
			$register_dialog.stop().show();
			$main_cover.fadeIn();
		}
	});
	$updatepw.click(function(){
		$dialog.stop().fadeIn();
		$register_button.hide();
		$login_button.hide();
		$upadtepw_dialog.show();
		$dialogs.not($upadtepw_dialog).hide();
		$main_cover.stop().fadeIn();
	});
	$signout.click(function(){
		$dialog.stop().fadeIn();
		$register_button.hide();
		$login_button.hide();
		$dialogs.not($signout_dialog).hide();
		$signout_dialog.show();
		$main_cover.stop().fadeIn();
	});
	$dialog_button_top.on('click',function(){
		$(this).addClass("dialog_button_select");
		$dialog_button_top.not($(this)).removeClass('dialog_button_select').addClass("dialog_button_unselect");
		if(this.title=="login")
			$login.click();
		else if(this.title=="register")
			$register.click();
	});
	$dialog_quit_button.click(function(){
		$("input[name='User_id']").val("");
		$("input[name='User_pw']").val("");
		$("input[name='newUser_pw']").val("");
		$("input[name='re_User_pw']").val("");
		$("input[name='re_newUser_pw']").val("");
		$register_usersign.val("");
		$register_username.val("");
		$main_cover.fadeOut();
		$dialog.stop().fadeOut();
		$faillogin.hide();
	})
})