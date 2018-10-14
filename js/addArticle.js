$(function(){
	var $addArticle_dialog_headline_show = $('.addArticle_dialog_headline_show');
	var isIE = /msie/i.test(navigator.userAgent) && !window.opera;
	var $addArticle_picture_inputer = $('.addArticle_picture_inputer');
	var $addArticle_picture_show = $('.addArticle_picture_show').children("img");
	var $addArticle_content_inputer_preshow = $(".addArticle_content_inputer_preshow");
	var $cancelUploadPicture = $('.cancelUploadPicture');
	var $addArticle_content_inputer_options=$('.addArticle_content_inputer_options');
	var $options_detail = $("#options_detail");
	var $addArticle_dialog = $(".addArticle_dialog");
	$addArticle_dialog.css("top",window.scrollY+10+"px");
	var $options_options;
	var $addBc_rgb;
	var $addC_rgb;
	var $rgb_detail;
	var $addFs_options;
	var $addArticle_dialog_headline = $(".addArticle_dialog_headline");
	var $saveArticle = $(".saveArticle");
	var $addArticle_dialog_exit = $('.addArticle_dialog_exit');
	var $addArticle_dialog_concel = $("#addArticle_dialog_concel");
	var $addArticle_form=$("#addArticle_form");
	init_options_options();/*下拉列表初始化*/
	options_init();/*选项初始化*/




	document.onkeyup = lastword;
	document.onkeydown=lastword;
	var addFs_options; 
	var addBc_options;
	var addC_options;
	var isEditting = false;
	var isselect = false;
	var isshow = true;
	var l_x=20;
	var l_y = 30;
	var options_options_width = 150;
	var font_size=15;
	var keys={
		bold:false,
		italic:false,
		underline:false,
		addFs:false,
		addBc:false,
		addC:false
	};
	var isdown =1;
	var x;
	var y;
	var dleft;
	var dtop;
	var position_x;			
	var position_y;
	$addArticle_dialog_headline.mousedown(function(e){
		x = e.pageX;
		y = e.pageY;
		dleft = $addArticle_dialog.position().left;
		dtop = $addArticle_dialog.position().top;
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
			$addArticle_dialog.stop(true,true).css({left:mx-position_x+"px",top:my-position_y+"px"
			});
		}
	});
	$addArticle_dialog_headline.mouseover(function(){
		$(this).mousemove(function(e){
			$options_detail.html("按住拖动").show();
			var x = e.pageX;
			var y = e.pageY;
			var p_x = $addArticle_dialog.offset().left;
			var p_y = $addArticle_dialog.offset().top;
			$options_detail.css({left:x-p_x+l_x,top:y-p_y+l_y}).stop().show();
		});
	}).mouseout(function(){
		$options_detail.hide();
	});
	function lastword(e){
		if(!isEditting&&$addArticle_content_inputer_preshow.is(":focus"))
		{
			$addArticle_content_inputer_preshow.text('');
			isEditting=true;
		}
		var content = $addArticle_content_inputer_preshow.text();
		if(content=="")
		{
			$addArticle_content_inputer_preshow.html('<p><br></p>');
		}	
	}
	$addArticle_content_inputer_options.children().bind('mouseover',titles).mouseout(function(){
		$options_detail.stop().hide();
		$options_options.hide();
	});
	function titles(){//按钮事件
	//$content_textarea.mouseenter();
		var this_id = this.id;
   		switch(this_id)
		{
			case 'addB':$options_detail.html("加粗");break;
			case 'addI':$options_detail.html("倾斜");break;
			case 'addU':$options_detail.html("下划线");break;
			case 'addHs':$options_detail.html("标题2");break;
			case 'addHt':$options_detail.html("标题3");break;
			case 'addHf':$options_detail.html("标题4");break;
			case 'addFs':$options_detail.html("字体大小");setOptions(this_id,$(this));break;
			case 'addBc':$options_detail.html("背景颜色");setOptions(this_id,$(this));break;
			case 'addC':$options_detail.html("字体颜色");setOptions(this_id,$(this));break;
			case 'addBr':$options_detail.html("边框");break;
			case 'options_hide':if(isshow)$options_detail.html("收起");else{
				$options_detail.html("展开");
			};break;
		}
		$(this).mousemove(function(e){
			var x = e.pageX;
			var y = e.pageY;
			var p_x = $addArticle_dialog.offset().left;
			var p_y = $addArticle_dialog.offset().top;
			$options_detail.css({left:x-p_x+l_x,top:y-p_y+l_y}).stop().show();
		});
	}
	//文本编辑器按钮初始化
	function options_init(){
		var $addB = $("#addB");
		var $addI = $("#addI");
		var $addU = $("#addU");
		var $addHs = $("#addHs");
		var $addHt = $("#addHt");
		var $addHf = $("#addHf");
		var $addFs = $("#addFs");
		var $addBc = $("#addBc");
		var $addC = $("#addC");
		var $addBr= $("#addBr");
		var $rgb_val;
		var $options_hide = $('#options_hide');
		$addB.append('<img src="icons/bold.png">').bind('click','bold',setFontStyle);
		$addI.append('<img src="icons/italic.png">').bind('click','italic',setFontStyle);
		$addU.append('<img src="icons/underline.png">').bind('click','underline',setFontStyle);
		$addHs.append('<img src="icons/headline2.png">').bind('click','H2',setHeadline);
		$addHt.append('<img src="icons/headline3.png">').bind('click','H3',setHeadline);
		$addHf.append('<img src="icons/headline4.png">').bind('click','H4',setHeadline);
		$addFs.append('<img src="icons/font-size.png"><div class="options_options">'+addFs_options+'</div>');
		$addBc.append('<img src="icons/background-color.png"><div class="options_options">'+addBc_options+'</div>').bind('click','bc',setColor);
		$addC.append('<img src="icons/color.png"><div class="options_options">'+addC_options+'</div>').bind('click','c',setColor);
		$addBr.append('<img src="icons/border.png">').bind('click',setBorder);
		$options_hide.append('<img src="icons/options_hide.png">').bind('click',options_hide);
		$options_options = $(".options_options");
		$addBc_rgb = $('.addBc_rgb');
		$addC_rgb = $('.addC_rgb');
		$rgb_detail = $('.rgb_detail');
		$rgb_detail.eq(0).css("color","red");
		$rgb_detail.eq(1).css("color","green");
		$rgb_detail.eq(2).css("color","blue");
		$rgb_detail.eq(3).css("color","red");
		$rgb_detail.eq(4).css("color","green");
		$rgb_detail.eq(5).css("color","blue");
		$rgb_val = $(".rgb_val");
		$rgb_val.eq(0).css("color","red");
		$rgb_val.eq(1).css("color","green");
		$rgb_val.eq(2).css("color","blue");
		$rgb_val.eq(3).css("color","red");
		$rgb_val.eq(4).css("color","green");
		$rgb_val.eq(5).css("color","blue");
		$addFs_options = $('.addFs_options');
	}
	//上传图片验证
	$addArticle_picture_inputer.change(function(){
		var fileSize = 0;
		var filetypes = [".jpg", ".png",'.gif'];
		var filepath = $(this).val();
		var filemaxsize = 1024 * 0.05; //2M 
		if(filepath) {
			var isnext = false;
			var fileend = filepath.substring(filepath.indexOf("."));
			if(filetypes && filetypes.length > 0) {
				for(var i = 0; i < filetypes.length; i++) {
					if(filetypes[i] == fileend) {
						isnext = true;
						break;
					}
				}
			}
			if(!isnext) {
				alert("只能上传jpg、png、gif文件！");
				$(this).val('');
				return false;
			}
		} else {
			return false;
		}
		fileSize = $(this).get(0).files[0].size;
		var size = fileSize / 1024;
		if(size <= 0) {
			alert("附件大小不能为0KB！");
			$(this).val('');
			return false;
		}
		if(size > filemaxsize) {
			alert("附件大小不能大于" + filemaxsize + "KB！");
			$(this).val('');
			return false;
		}else{
			$cancelUploadPicture.show().unbind().bind('click',cancelUploadPicture);
			showImage($(this));
			isEditting = true;
		}
	});
	//取消图片的上传
	function cancelUploadPicture(){
		$addArticle_picture_show.attr('src','').hide();
		this.style.display='none';
		$addArticle_picture_inputer.val('');
	}
	//上传图片预览
	function showImage(url){
		var pic = url[0].files[0];
		var reader = new FileReader();
		reader.onload = function(){
			$addArticle_picture_show.attr('src',this.result).show();
		}
		reader.readAsDataURL(pic);
	}
	function setFontStyle(e)  
    {  
    	var style = e.data;
    	var select = window.getSelection();
    	if(isEditting){
	    	if(select=="")
	    	{
	    		keys[style] = !keys[style];
	    		if(keys[style]){
	    			//addOrRemoveClass($(this),'a',"addArticle_content_inputer_options_spans_actived");
	    		}
	    		else{
	    			//addOrRemoveClass($(this),'r',"addArticle_content_inputer_options_spans_actived");
	    		}
	    		document.execCommand(style,false,null);
	    	}
	    	else if(select!="")
	    	{
	   //  		keys[style] = !keys[style];
	   //  		if(keys[style])
	   //  			addOrRemoveClass($(this),'a',"addArticle_content_inputer_options_spans_actived");
				// else
				// 	addOrRemoveClass($(this),'r',"addArticle_content_inputer_options_spans_actived");
				document.execCommand(style,false,null);
				//select.empty();
				//document.execCommand(style,false,null);
	    	}
	    }
    	//console.log("keys["+style+"]="+keys[style]);
    } 
    function createElement(name){
    	return document.createElement(name);
    }
    function init_options_options(){
    	addFs_options = '<label class="addFs_options">';
    	for(var i=15;i<20;i++)
    	{
    		addFs_options+='<span>'+i+'</span>';
    	}
    	addFs_options+='</label>';
    	addBc_options='<label><div class="show_color" id="addBc_show_color">颜色展示</div>'+
			'<div><span class="rgb_detail">红色</span><input type="range" class="addBc_rgb" max="255" min="0" value="255"><span class="rgb_val">255</span></div>'+
			'<div><span class="rgb_detail">绿色</span><input type="range" class="addBc_rgb" max="255" min="0" value="255"><span class="rgb_val">255</span></div>'+
			'<div><span class="rgb_detail">蓝色</span><input type="range" class="addBc_rgb" max="255" min="0" value="255"><span class="rgb_val">255</span></div>'+
			'</label>';
		addC_options='<label><div class="show_color" id="addC_show_color">颜色展示</div>'+
			'<div><span class="rgb_detail">红色</span><input type="range" class="addC_rgb" max="255" min="0" value="0"><span class="rgb_val">0</span></div>'+
			'<div><span class="rgb_detail">绿色</span><input type="range" class="addC_rgb" max="255" min="0" value="0"><span class="rgb_val">0</span></div>'+
			'<div><span class="rgb_detail">蓝色</span><input type="range" class="addC_rgb" max="255" min="0" value="0"><span class="rgb_val">0</span></div>'+
			'</label>';
    }
    function setOptions(e,obj)  
    {  
    	var x = obj.position().left;
    	var y = obj.position().top;
    	var p_x = 0;
    	if(e=="addFs")
    	{
    		obj.children('div.options_options').css({left:x-p_x,top:y+40}).stop().show();
    	}else if(e=="addBc"){
    		p_x = (options_options_width-33)/2
    		obj.children('div.options_options').css({left:x-p_x,top:y+40,width:options_options_width}).stop().show();
    	}else if(e=="addC"){
    		p_x = (options_options_width-33)/2
    		obj.children('div.options_options').css({left:x-p_x,top:y+40,width:options_options_width}).stop().show();
    	}
    	//console.log(this_id)
    	//console.log(x+"   "+y)
    	
        //document.execCommand("fontname",false,obj.value);  
    }
    function setColor(e){
    	var select = document.getSelection();
    	if(e.data=="bc")
    	{
    		var bc =$("#addBc_show_color").css("backgroundColor");
	    	if(bc=='rgba(255,255,255)')
	    		bc = 'rgba(255,255,255,0)';
	    	//console.log(bc)
	    	
	    	document.execCommand("backColor",false,bc);
    	}else if(e.data=="c")
    	{
    		var c =$("#addBc_show_color").css("color");
	    	//console.log(bc)
	    	document.execCommand("ForeColor",false,c);
    	}
    	select.empty();
    }
    $addFs_options.click(function(){
    	if(!keys['addFs']){
    		document.execCommand('FontSize',false,font_size-14+"px");
    	}
    })
    $addFs_options.children().click(function(){
    	//console.log(this.innerHTML)
    	font_size = this.innerHTML;
    	document.execCommand('FontSize',false,font_size-14+"px");
    });
    $addFs_options.children().mouseover(function(){
    	keys['addFs'] = true;
    }).mouseout(function(){
    	keys['addFs'] = false;
    });
    $addBc_rgb.mousemove(function(){
    	var rgb_val = this.value;
    	//console.log(rgb_val)
    	$(this).parent().children("span.rgb_val").html(rgb_val);
    	var r = $(".rgb_val").eq(0).html();
    	var g = $(".rgb_val").eq(1).html();
    	var b = $(".rgb_val").eq(2).html();
    	$(".show_color").css('background-color','rgb('+r+','+g+','+b+')');
    	$rgb_detail.eq(0).css("opacity",r/255);
		$rgb_detail.eq(1).css("opacity",g/255);
		$rgb_detail.eq(2).css("opacity",b/255);
    });
    $addC_rgb.mousemove(function(){
    	var rgb_val = this.value;
    	//console.log(rgb_val)
    	$(this).parent().children("span.rgb_val").html(rgb_val);
    	var r = $(".rgb_val").eq(3).html();
    	var g = $(".rgb_val").eq(4).html();
    	var b = $(".rgb_val").eq(5).html();
    	$(".show_color").css('color','rgb('+r+','+g+','+b+')');
    	$rgb_detail.eq(3).css("opacity",r/255);
		$rgb_detail.eq(4).css("opacity",g/255);
		$rgb_detail.eq(5).css("opacity",b/255);
    });
    function setHeadline(e){
    	document.execCommand('formatBlock', false, '<'+e.data+'>');
    }
    function setBorder(e){
    	var select = window.getSelection();
    	try{
    		if(select==""&&isEditting&&$addArticle_content_inputer_preshow.children().length>1)
	    	{
	    		if(select.focusNode.style.borderLeft!=''){
	    			$(select.focusNode).css({"border-left":"","margin-left":""});
	    			addOrRemoveClass($(this),'r',"addArticle_content_inputer_options_spans_actived");
	    		}
	    		else{
	    			$(select.focusNode).css({"border-left":"3px solid #ff6700","margin-left":"7px"});
	    			addOrRemoveClass($(this),'a',"addArticle_content_inputer_options_spans_actived");
	    		} 
	    	}
    	}
    	catch{
    		alert("请在新的一行开启或关闭Br(边框功能)");
    	}
    	
    }
    function addOrRemoveClass(obj,flag,className){
    	if(flag=='a')
    	{
    		obj.addClass(className);
    	}else if(flag=='r'){
    		obj.removeClass(className);
    	}
    }
	//收起按钮
	function options_hide(){
		isshow = !isshow;
		$(this).children().toggleClass('options_hide_rotate')
		$(this).parent().toggleClass('addArticle_content_inputer_options_hidden');    
	}
	$addArticle_dialog_concel.click(function(){
		if(isEditting){
			$addArticle_dialog_exit.show();
		}else{
			$addArticle_dialog.html("").hide();
			$("#main_cover").hide();
		}
		
	});
	$saveArticle.click(function(){
		$addArticle_dialog_exit.hide();
		$addArticle_dialog.html("").hide();
		isEditting = false;
		$("#main_cover").hide();
	});
	$('#addArticle_dialog_exit_cancel').click(function(){
		$addArticle_dialog_exit.hide();
	});
	$("#addArticle_dialog_exit_submit").click(function(){
		$addArticle_dialog_exit.hide();
		$addArticle_dialog.html("").hide();
		isEditting = false;
		$("#main_cover").hide();
	});
	/*点击发表成功之后，也要将isEditting = false;*/
	$addArticle_form.submit(function(){
		var headline = $addArticle_dialog_headline_show.text();
		if(headline=="输入标题"||headline=="")
		{
			alert("请输入标题！");
		}else{
			var article = $addArticle_content_inputer_preshow.text();
			var bytesCount = article.replace(/[^\u0000-\u00ff]/g,"aa");
			if(bytesCount.length<600){
				alert("文章太短啦!至少300个汉字或者600个字母符号");
			}else{
				if($.cookie("MHZ_User_id")!=null){
					var User_id = $.cookie("MHZ_User_id");
					/*headline*/
					/*article*/
					var html = $addArticle_content_inputer_preshow.html();
					var Picture = "nopicture";
					var Type = "common";
					var SmallArticle = subString1(article,150);
					console.log(SmallArticle);
					$.post("myArticle/setOneArticle.do",{User_id:User_id,Headline:headline,Article:html,Picture:Picture,Type:Type,SmallArticle:SmallArticle},
					function(data){
						if(data=="setOneArticleSuccess")
						{
							setOneArticleSuccess();
						}
					});
				}
				else{
					
				}
			}
		}
		return false;
	});
	function setOneArticleSuccess(){
		$("#success").html("<span id='success_headline'>发表成功！</span>").fadeIn().delay(500).fadeOut();
		$("#addArticle_dialog_exit_submit").click();
		setTimeout(function(){window.location.reload();},800);
		$("#main_cover").hide();
	}
	function subString1(str, len){
	    var regexp = /[^\x00-\xff]/g;// 正在表达式匹配中文
	    // 当字符串字节长度小于指定的字节长度时
	    if (str.replace(regexp, "aa").length <= len) {
	        return str;
	    }
	    // 假设指定长度内都是中文
	    var m = Math.floor(len/2);
	    for (var i = m, j = str.length; i < j; i++) {
	        // 当截取字符串字节长度满足指定的字节长度
	        if (str.substring(0, i).replace(regexp, "aa").length >= len) {
	            return str.substring(0, i);
	        }
	    }
	    return str;
	}

	window.onbeforeunload=function(e){   
		if(isEditing){
			var e=window.event||e;
			e.returnValue=("确定离开当前页面吗？"); 
		}
	}
});