$(function(){
	var host = window.location.host;
	var $body = $('body');
	var $showArticle = $('.showArticle');
	$showArticle.css({height:window.innerHeight-50,top:5})
	var $articleOptions = $('.articleOptions');
	var $article_container = $("#article_container");
	var $message_main_content = $("#message_main_content");
	var $articleContent = $(".articleContent");
	var $article_options = $('.article_options');
	var $leftdiv = $(".leftdiv");
	var $articleTitle = $(".articleTitle");
    var $downpage = $("#downpage");
    var $Article_mes_sub = $("#Article_mes_sub");
    var $articleAdviceUL = $(".articleAdvice").children("ul");
	$article_options.click(function(){
		$showArticle.fadeOut();
	});
	var $this;
	$downpage.bind('click',"click",getArticles);
	function show(){
		$showArticle.animate({"scrollTop":0},0);
		$this = $(this);
		$showArticle.find(".message_beginid").val(0);
		$showArticle.find(".message_limit").val(3);
		$articleAdviceUL.html("");
		var headline = $this.find(".a_top").text();
		var time = $this.find(".time").val();
		var viewcount = $this.find(".a_views").html();
		var vc = viewcount.replace(/[^0-9]/ig,"");
		var advicecount = $this.find(".a_advices").html();
		var ac = advicecount.replace(/[^0-9]/ig,"");
		if(parseInt(ac)>0)
		{
			$(".Advice_option").children("span").html("展开评论");
		}else{
			$(".Advice_option").children("span").html("还没有评论..");
		}
		vc = parseInt(vc)+1;
		$this.find(".a_views").html("阅读("+vc+")");
		var author = $this.find(".a_author").html();
		var this_id =$this.find(".article_id").val();
		$(".undertitle").eq(0).html(time);
		$(".undertitle").eq(1).html(vc+" 阅读");
		$.get("myArticle/getThisArticle.do",{id:this_id},function(data){
			$articleContent.html(data.stringValue);
		});
		$articleTitle.html(headline);
		$showArticle.fadeIn();
		$(".AuthorName").html(author);
		$(".MessageEditerDiv").html("");
		$Article_mes_sub.unbind();
		$Article_mes_sub.bind('click',this_id,setOneMessage);
		setViewCount(this_id);/*阅读数+1*/
		$(".Advice_option").children("span").unbind().bind('click',function(){
			getLimitedMessage(this_id,"click");
		});
		getLimitedMessage(this_id,"none");
	}
	function getLimitedMessage(Article_id,flag){
		var message_beginid = $showArticle.find(".message_beginid").val();
		var message_limit = $showArticle.find(".message_limit").val();
		$.get("myArticle/getlimitedmessage.do",{Article_id:Article_id,beginid:message_beginid,limit:message_limit},function(data){
			var length = data.length;
			if(length>0){
				message_beginid=parseInt(message_beginid)+ parseInt(length);
				$showArticle.find(".message_beginid").val(message_beginid);
				var a = [length];
				$.each(data, function(key, val) { a[key] = val;  });
				a.sort(sort);
				$.each(a,function(i,data){
					var imgnum = Math.floor(Math.random() * 10 + 1 );
					var hidden_input1 = "<input type='hidden' id='Article_rebeginid"+data.id+"' value='0'>";
					var hidden_input2 = "<input type='hidden' id='Article_relimit"+data.id+"' value='3'>";
					var hidden_input3 = "<input type='hidden' class='User_id' value='"+data.user_id+"'>";
					var hidden_input4 = "<input type='hidden' class='User_name' value='"+data.user_name+"'>";
					var message = "<li class='Advices'>"+hidden_input1+hidden_input2+hidden_input3+hidden_input4
					+"<div class='advicer_icon'>"
					+"<img src='icons/icon_"+imgnum+".jpg' alt=''>"
					+"</div>"
					+"<div class='advicer_info'>"
					+"<span style='cursor:pointer'>"+data.user_name+"</span>"
					+"<span>"+data.address+"</span>"
					+"<span>"+data.time+"</span>"
					+"<span class='reply_buttons' id='article_button_"+data.id+"' style=''>回复TA</span>"
					+"</div><br><br>"
					+"<div class='advice_content'>"+data.message+"</div>"
					+"<div class='Advice_reply_holder'>"
					+"<ul id='Advice_reply"+data.id+"'>"
					+"</ul>"
					+"<div class='Advice_reply_option'><span id='article_button2_"+data.id+"'>展开回复</span></div>"
					+"</div>"
					+"<span class='Advicelevel'>#<span>"+data.id+"</span></span>"
					+"</li>";
					$articleAdviceUL.append(message);
					$("#article_button_"+data.id).bind('click',[data.id,data.user_name,Article_id,true],setOneReMessage);
					$("#article_button2_"+data.id).bind('click',[data.id,data.user_name,Article_id,true],getremessage);
					setTimeout(function(){getremessage({data:[data.id,data.user_name,Article_id,false]})},500);
				});
			}else{
				if(flag=="click")
				{
					Notice("没有更多评论了");
				}
			}
		})
	}
	function getremessage(data){
		var Article_id = data.data[2];
		var Rplyed_id = data.data[0];
		var beginid = $("#Article_rebeginid"+data.data[0]).val();
		var limit = $("#Article_relimit"+data.data[0]).val();
		$.get("myArticle/getremessage.do",{Article_id:Article_id,Rplyed_id:Rplyed_id,beginid:beginid,limit:limit},function(rM){
			var length = rM.length;
			if(length>0){
				beginid=parseInt(beginid)+ parseInt(length);
				$("#Article_rebeginid"+data.data[0]).val(beginid);
				var a = [length];
				$.each(rM, function(key, val) { a[key] = val;  });
				a.sort(sort);
				$.each(a,function(i,a_data){
					var imgnum = Math.floor(Math.random() * 10 + 1 );
					var remessage = "<li class='advice_replys'>"
						+"<div class='replyer_icon'><img src='icons/icon_"+imgnum+".jpg' alt=''></div>"
						+"<div class='replyer_info'>"
						+"<span  style='cursor:pointer'>"+a_data.rply_User_name+"</span>"
						+"<span>"+a_data.time+"</span>"
						+"<span>回复 "+a_data.rplyed_User_name+"</span>"
						+"<span id='article_button3_"+a_data.id+"' class='reply_buttons'>回复TA</span>"
						+"</div><br><br>"
						+"<div class='replyer_content'>"+a_data.message
						+"</div>"
						+"</li>"
					$("#Advice_reply"+data.data[0]).append(remessage);
					$("#article_button3_"+a_data.id).bind('click',[data.data[0],a_data.rply_User_name,Article_id,false],setOneReMessage);
				})
			}else{
				if(data.data[3]){
					Notice("没有更多评论了");
					$("#article_button2_"+data.data[0]).unbind().hide();
				}
				else{
					$("#article_button2_"+data.data[0]).unbind().hide();
				}
			}
		})
	}
	function setOneReMessage(data){
		var Article_id = data.data[2];
		var Rplyed_id = data.data[0];
		var Rplyed_User_name = data.data[1];
		var user_id="游客";
		if($.cookie('MHZ_User_id')!=null)
			user_id= $.cookie('MHZ_User_id');
		var message;
		$("#RemeInpDia").load("http://"+host+"/MHZ/ajax/reMessageEditer.html",function(){
			$(".article_reMessage_deadline").children("span").html(Rplyed_User_name);
			$(".a_rM_b_sub").click(function(){
				var thisButton = $(this);
				var timeout = setTimeout(function(){thisButton.html("提交").attr("disabled",false);Notice("请求超时！请稍后重试")},5000);
				if($(".article_reMessage_inputer").text().trim()!="")
				{
					thisButton.html("提交中...").attr("disabled",true);
					message = $(".article_reMessage_inputer").text().trim();
					$.post("myArticle/setoneremessage.do",{Article_id:Article_id,Rplyed_id:Rplyed_id,Rplyed_User_name:Rplyed_User_name,Rply_User_id:user_id,message:message},function(re_data){
						if(re_data=="setonemessageSuccess")
						{
							Notice("评论成功");
							$(".article_reMessage_buttons").children().eq(1).click();
							setTimeout(function(){$("#article_button2_"+data.data[0]).click();},500);
							
						}else{
							Notice("评论失败！请稍后重试");
						}
						thisButton.html("提交").attr("disabled",false);
						clearTimeout(timeout);
					})
				}else{
					Notice("请输入评论内容！")
				}
			})
			$(".a_rM_b_con").click(function(){
				$(".article_reMessage_buttons").children().click = null;
				$("#RemeInpDia").html("").hide();
			})
		}).show();
	}
	$showArticle.scroll(function(){
		$articleOptions.css("top",this.scrollTop);
	});
	function setViewCount(id){
		$.get("myArticle/setViewCount.do",{id:id},function(data){
			if(data=="setViewCountSuccess"){
				
			}
		});
	}
	function setArticleCount(id){
		$.get("myArticle/setAdviceCount.do",{id:id},function(data){
			if(data=="setAdviceCountSuccess"){
				var advicecount = $this.find(".a_advices").html();
				var ac = advicecount.replace(/[^0-9]/ig,"");
				ac = parseInt(ac)+1;
				$this.find(".a_advices").html("评论("+ac+")");
				setTimeout(function(){$this.click();$(".MessageEditerDiv").animate({"scrollTop":"100%"},0)},300)
			}
		});
	}
	function setOneMessage(id){
		if(id.data!==null)
		{
			var message = $(".MessageEditerDiv").text().trim();
			var user_id="游客";
			if($.cookie('MHZ_User_id')!=null)
				user_id= $.cookie('MHZ_User_id');
			var address = "未知领域"
			if(message.length>0)
			{
				var post;
				var timeout= setTimeout(function(){if(post) { post.abort();Notice("请求超时！请稍后再试");
				$Article_mes_sub.html("提交").attr("disabled",false);}},5000)
				$Article_mes_sub.html("提交中...").attr("disabled",true);
				
					post = $.post("myArticle/setOneMessage.do",{Article_id:id.data,User_id:user_id,address:address,message:message},function(data){
						if(data=="setonemessageSuccess")
						{
							$(".MessageEditerDiv").html("");
							Notice("评论成功");
							setArticleCount(id.data);
						}else{
							Notice("评论失败！请稍后再试");
						}
						clearTimeout(timeout);
						$Article_mes_sub.html("提交").attr("disabled",false);
					})
					
			}else{
				Notice("请填写评论内容！");
			}
		}
	}
	function Notice(message){
		$("#MyArticleNotice").children().html(message);
		$("#MyArticleNotice").fadeIn().delay(500).fadeOut();
	}
	var isdown = 1;
	var x;
	var y;
	var dleft;
	var dtop;
	var position_x;			
	var position_y;
	$articleOptions.mousedown(function(e){
		x = e.pageX;
		y = e.pageY;
		dleft = $showArticle.position().left;
		dtop = $showArticle.position().top;
		position_x = x - dleft;			
		position_y = y - dtop;
		isdown = 2;
	}).mouseup(function(){
		isdown = 1;
		$('body').css('userSelect','');
	});
	$("body").mousemove(function(e){
		if(isdown==2){
			$('body').css('userSelect','none');
			var mx = e.pageX;
			var my = e.pageY;
			$showArticle.stop(true,true).css({left:mx-position_x+"px",top:my-position_y+"px"
			});
		}
	});
	getArticleCount();
	function getArticleCount(){
		$.get("myArticle/getArticleCount.do",function(data){
			$leftdiv.children().text(data);
		});
	}
	function sort(b,a){
		return a.id - b.id;
	}
	var article_beginid = 0;
	var article_limit = 5;
	getArticles("auto");
	function getArticles(flag){
		$.get("myArticle/getArticles.do",{beginid:article_beginid,limit:article_limit},function(data){
			var length = data.length;
			if(length>0){
				var a = [length];
				$.each(data, function(key, val) { a[key] = val;  });
				a.sort(sort);
				article_beginid = article_beginid+length;
				$.each(a,function(i,data){
					var hidden_input1 = '<input class="time" value="'+data.time+'" type="hidden"/>'; 
					var hidden_input2 = '<input class="article_id" value="'+data.id+'" type="hidden"/>';  
					var picture = data.picture;
					if(picture==""||picture=="nopicture")
						picture  = "icon_7.jpg";
					var article = "<li class='articles'>"+hidden_input1+hidden_input2
					+"<div class='a_left'><span style='background: rgba(0,0,0,0.1) url(article/"+picture+") center no-repeat;background-size:100% 100%;'></span></div>"
					+"<div class='a_right'>"
					+"<div class='a_top'><span><p>"+data.headline+"</p></span></div>"
					+"<div class='a_bottom'>"
					+"<span>"+data.smallArticle+"</span>"
					+"</div>"
					+"</div>"
					+"<div class='a_details'>"
					+"<div title='作者' class='a_author'>"+data.user_name+"</div>"
					+"<div title='阅读数' class='a_views'>阅读("+data.viewCount+")</div>"
					+"<div title='评论数' class='a_advices'>评论("+data.adviceCount+")</div>"
					+"</div>"
					+"</li>";
					$message_main_content.append(article);
					$(".articles").unbind().bind('click',show);
				});
			}else{
				if(flag.data=="click")
				{
					Notice("没有更多文章啦");
				}
			}
		});
	}
});