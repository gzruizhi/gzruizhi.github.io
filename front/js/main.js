/* mobile-nav */
!function(y,e){"use strict";var a,l,x=e.document,T=(/iPad|iPhone|iPod/.test(navigator.userAgent)||!!navigator.platform&&/iPad|iPhone|iPod/.test(navigator.platform))&&!e.MSStream,w="ontouchstart"in e||navigator.maxTouchPoints||e.DocumentTouch&&x instanceof DocumentTouch,O=function(e){return!isNaN(parseFloat(e))&&isFinite(e)},B=function(e){return e.stopPropagation()},M=function(n,a,l){return function(e){n&&e.preventDefault(),a&&e.stopPropagation(),"function"==typeof l&&l()}},P=(a=y("head"),l="hc-mobile-nav-style",function(e){var n=a.find("style#"+l);n.length?n.html(e):y('<style id="'+l+'">'+e+"</style>").appendTo(a)}),N=function(e,n,a){var l=a.children("li"),o=l.length,i=-1<n?Math.max(0,Math.min(n-1,o)):Math.max(0,Math.min(o+n+1,o));0===i?a.prepend(e):l.eq(i-1).after(e)},S=0;y.fn.extend({hcMobileNav:function(e){if(!this.length)return this;var l,m=y.extend({},{maxWidth:1024,appendTo:"body",clone:!0,offCanvas:!0,side:"left",levelOpen:"overlap",levelSpacing:40,levelTitles:!1,navTitle:null,navClass:"",disableBody:!0,closeOnClick:!0,customToggle:null,responsive:null,insertClose:!0,insertBack:!0,labelClose:"Close",labelBack:"Back"},e),k=y(x.getElementsByTagName("html")[0]),b=(y(x),y(x.body)),C=(l=function(e){var n=["Webkit","Moz","Ms","O"],a=(x.body||x.documentElement).style,l=e.charAt(0).toUpperCase()+e.slice(1);if(void 0!==a[e])return e;for(var o=0;o<n.length;o++)if(void 0!==a[n[o]+l])return n[o]+l;return!1}("transform"),function(e,n){if(l){var a="left"===m.side?n:-n;e.css(l,"translate3d("+a+"px,0,0)")}else e.css(m.side,n)});return this.each(function(){var e=y(this),n=void 0,a=!1,l=0;if(e.is("ul"))n=e.clone().wrap("<nav>").parent();else if(e.is("nav"))n=e.clone();else if(!(n=e.find("nav, ul").first().clone()).length)return void console.log("%c! HC MobileNav:%c There is no <nav> or <ul> elements in your menu.","color: red","color: black");var o=n.find("ul");if(o.length){var p={},i=void 0,v="hc-nav-"+ ++S;e.addClass("hc-nav "+v),m.customToggle?i=y(m.customToggle).addClass(v).on("click",u):(i=y('<a class="hc-nav-trigger '+v+'"><span></span></a>').on("click",u),e.after(i));var r=n.children("ul").wrapAll('<div class="nav-wrapper nav-wrapper-1">').parent().on("click",B).wrap('<div class="nav-container">').parent();m.navTitle&&r.children().prepend("<h6>"+m.navTitle+"</h6>");var t="\n          .hc-mobile-nav."+v+" {\n            display: block;\n          }\n          .hc-nav-trigger."+v+",\n          "+m.customToggle+"."+v+" {\n            display: "+(i.css("display")||"block")+"\n          }\n          .hc-nav."+v+" {\n            display: none;\n          }";if(m.maxWidth&&(t="@media screen and (max-width: "+(m.maxWidth-1)+"px) {\n            "+t+"\n          }"),P(t),n.on("click",B).removeAttr("id").removeClass().addClass("\n            hc-mobile-nav\n            "+v+"\n            "+(m.navClass||"")+"\n            nav-levels-"+(m.levelOpen||"none")+"\n            side-"+m.side+"\n            "+(m.offCanvas?"off-canvas":"")+"\n            "+(m.disableBody?"disable-body":"")+"\n            "+(T?"is-ios":"")+"\n            "+(w?"touch-device":"")+"\n          ").find("[id]").removeAttr("id"),m.disableBody&&n.on("click",h),m.closeOnClick&&o.find("li").children("a").on("click",h),!1!==m.insertClose){var s=y('<li class="nav-close"><a href="#">'+(m.labelClose||"")+"<span></span></a></li>");s.children("a").on("click",M(!0,!0,h)),!0===m.insertClose?o.first().prepend(s):O(m.insertClose)&&N(s,m.insertClose,o.first().add(o.siblings("ul")))}o.each(function(){var e=y(this),n=e.parents("li").length;if(0!==n){var a=e.parent().addClass("nav-parent"),l=a.children("a");p[n]||(p[n]=[]),p[n].push({nav:e});var o=p[n].length-1;p[n][o].wrapper=e.closest(".nav-wrapper");var i=e.wrap('<div class="nav-wrapper nav-wrapper-'+(n+1)+'">').parent().on("click",B);if(!m.levelSpacing||"expand"!==m.levelOpen&&!1!==m.levelOpen&&"none"!==m.levelOpen||e.css("text-indent",m.levelSpacing*n+"px"),!1===m.levelOpen||"none"===m.levelOpen)return;!0===m.levelTitles&&i.prepend();var t=y('<span class="nav-next">').appendTo(l),r=y('<label for="'+v+"-"+n+"-"+o+'">').on("click",B),s=y('<input type="checkbox" id="'+v+"-"+n+"-"+o+'">').attr("data-level",n).attr("data-index",o).on("click",B).on("change",d);if(p[n][o].checkbox=s,a.prepend(s),l.attr("href")&&"#"!==l.attr("href")?t.append(r):l.on("click",M(!0,!0)).prepend(r),!1!==m.insertBack&&"overlap"===m.levelOpen){var c=y('<li class="nav-back"><a href="#">'+l.text()+"<span></span></a></li>");c.children("a").on("click",M(!0,!0,function(){return g(n,o)})),!0===m.insertBack?e.prepend(c):O(m.insertBack)&&N(c,m.insertBack,e)}}}),m.clone?y(m.appendTo).append(n):e.replaceWith(n);var c=function(e,n){if(p[e]&&p[e][n]){var a=p[e][n].checkbox,l=a.parent("li"),o=p[e][n].wrapper;a.prop("checked",!1),o.removeClass("sub-level-open"),l.removeClass("level-open")}}}else console.log("%c! HC MobileNav:%c Menu must contain <ul> element.","color: red","color: black");function d(){var e,n,a,l,o=y(this),i=Number(o.attr("data-level")),t=Number(o.attr("data-index"));o.prop("checked")?(n=t,a=p[e=i][n].checkbox.parent("li"),(l=p[e][n].wrapper).addClass("sub-level-open"),a.addClass("level-open"),"overlap"===m.levelOpen&&(l.on("click",function(){return g(e,n)}),C(r,e*m.levelSpacing))):g(i,t)}function f(){a=!0,n.addClass("nav-open"),i.addClass("toggle-open"),m.disableBody&&(l=k.scrollTop()||b.scrollTop(),b.addClass("hc-nav-open"),l&&b.css("top",-l),x.body.scrollHeight>x.body.offsetHeight&&k.addClass("hc-yscroll"))}function h(){a=!1,n.removeClass("nav-open"),r.removeAttr("style"),i.removeClass("toggle-open"),!1!==m.levelOpen&&"none"!==m.levelOpen&&g(0),m.disableBody&&(b.removeClass("hc-nav-open"),k.removeClass("hc-yscroll"),l&&(b.css("top","").scrollTop(l),k.scrollTop(l),l=0))}function u(e){e.preventDefault(),e.stopPropagation(),a?h():f()}function g(e,n){for(var a=e;a<=Object.keys(p).length;a++){if(0!==a)if(a==e&&void 0!==n){if(c(a,n),"overlap"===m.levelOpen)p[a][n].wrapper.off("click").on("click",B),C(r,(a-1)*m.levelSpacing)}else for(var l in p[a]){if(c(a,l),"overlap"===m.levelOpen)p[a][l].wrapper.off("click").on("click",B),a==e&&C(r,(a-1)*m.levelSpacing)}}}})}})}(jQuery,"undefined"!=typeof window?window:this);


(function($) {
  var $nav = $('#main-nav');
  var $toggle = $('.toggle');
  var defaultData = {
	maxWidth: false,
	customToggle: $toggle,
	levelTitles: true
  };

  // we'll store our temp stuff here
  var $clone = null;
  var data = {};

  // calling like this only for demo purposes

  const initNav = function(conf) {
	if ($clone) {
	  // clear previous instance
	  $clone.remove();
	}

	// remove old toggle click event
	$toggle.off('click');

	// make new copy
	$clone = $nav.clone();

	// remember data
	$.extend(data, conf)

	// call the plugin
	$clone.hcMobileNav($.extend({}, defaultData, data));
  }

  // run first demo
  initNav({});

  $('.actions').find('a').on('click', function(e) {
	e.preventDefault();

	var $this = $(this).addClass('active');
	var $siblings = $this.parent().siblings().children('a').removeClass('active');

	initNav(eval('(' + $this.data('demo') + ')'));
  });
})(jQuery);





/*smoothproducts.min.js*/
!function(a){a.fn.extend({smoothproducts:function(){function b(){a(".sp-selected").removeClass("sp-selected"),a(".sp-lightbox").fadeOut(function(){a(this).remove()})}function c(a){return a.match(/url\([\"\']{0,1}(.+)[\"\']{0,1}\)+/i)[1]}a(".sp-loading").hide(),a(".sp-wrap").each(function(){a(this).addClass("sp-touch");var b=a("a",this).length;if(b>1){var c,d,e=a("a.sp-default",this)[0]?!0:!1;a(this).append('<div class="sp-large"></div><div class="sp-thumbs sp-tb-active"></div>'),a("a",this).each(function(b){var f=a("img",this).attr("src"),g=a(this).attr("href"),h="";(0===b&&!e||a(this).hasClass("sp-default"))&&(h=' /*class="sp-current*/"',c=g,d=a("img",this)[0].src),a(this).parents(".sp-wrap").find(".sp-thumbs").append('<a href="'+g+'" style="background-image:url('+f+')"'+h+"></a>"),a(this).remove()}),a(".sp-large",this).append('<a href="'+c+'" class="sp-current-big"><img src="'+d+'" alt="" /></a>'),a(".sp-wrap").css("display","inline-block")}else a(this).append('<div class="sp-large"></div>'),a("a",this).appendTo(a(".sp-large",this)).addClass(".sp-current-big"),a(".sp-wrap").css("display","inline-block")}),a(document.body).on("click",".sp-thumbs",function(a){a.preventDefault()}),a(document.body).on("mouseover",function(b){a(".sp-wrap").removeClass("sp-touch").addClass("sp-non-touch"),b.preventDefault()}),a(document.body).on("touchstart",function(){a(".sp-wrap").removeClass("sp-non-touch").addClass("sp-touch")}),a(document.body).on("click",".sp-tb-active a",function(b){b.preventDefault(),a(this).parent().find(".sp-current").removeClass(),a(this).addClass("sp-current"),a(this).parents(".sp-wrap").find(".sp-thumbs").removeClass("sp-tb-active"),a(this).parents(".sp-wrap").find(".sp-zoom").remove();var d=a(this).parents(".sp-wrap").find(".sp-large").height(),e=a(this).parents(".sp-wrap").find(".sp-large").width();a(this).parents(".sp-wrap").find(".sp-large").css({overflow:"hidden",height:d+"px",width:e+"px"}),a(this).addClass("sp-current").parents(".sp-wrap").find(".sp-large a").remove();var f=a(this).parent().find(".sp-current").attr("href"),g=c(a(this).parent().find(".sp-current").css("backgroundImage"));a(this).parents(".sp-wrap").find(".sp-large").html('<a href="'+f+'" class="sp-current-big"><img src="'+g+'"/></a>'),a(this).parents(".sp-wrap").find(".sp-large").hide().fadeIn(250,function(){var b=a(this).parents(".sp-wrap").find(".sp-large img").height();a(this).parents(".sp-wrap").find(".sp-large").animate({height:b},"fast",function(){a(".sp-large").css({height:"auto",width:"auto"})}),a(this).parents(".sp-wrap").find(".sp-thumbs").addClass("sp-tb-active")})}),a(document.body).on("mouseenter",".sp-non-touch .sp-large",function(b){var c=a("a",this).attr("href");a(this).append('<div class="sp-zoom"><img src="'+c+'"/></div>'),a(this).find(".sp-zoom").fadeIn(250),b.preventDefault()}),a(document.body).on("mouseleave",".sp-non-touch .sp-large",function(b){a(this).find(".sp-zoom").fadeOut(250,function(){a(this).remove()}),b.preventDefault()}),a(document.body).on("click",".sp-non-touch .sp-zoom",function(b){var c=a(this).html(),d=a(this).parents(".sp-wrap").find(".sp-thumbs a").length,e=a(this).parents(".sp-wrap").find(".sp-thumbs .sp-current").index()+1;a(this).parents(".sp-wrap").addClass("sp-selected"),a("body").append("<div class='sp-lightbox' data-currenteq='"+e+"'>"+c+"</div>"),d>1&&(a(".sp-lightbox").append("<a href='#' id='sp-prev'></a><a href='#' id='sp-next'></a>"),1==e?a("#sp-prev").css("opacity",".1"):e==d&&a("#sp-next").css("opacity",".1")),a(".sp-lightbox").fadeIn(),b.preventDefault()}),a(document.body).on("click",".sp-large a",function(b){var c=a(this).attr("href"),d=a(this).parents(".sp-wrap").find(".sp-thumbs a").length,e=a(this).parents(".sp-wrap").find(".sp-thumbs .sp-current").index()+1;a(this).parents(".sp-wrap").addClass("sp-selected"),a("body").append('<div class="sp-lightbox" data-currenteq="'+e+'"><img src="'+c+'"/></div>'),d>1&&(a(".sp-lightbox").append("<a href='#' id='sp-prev'></a><a href='#' id='sp-next'></a>"),1==e?a("#sp-prev").css("opacity",".1"):e==d&&a("#sp-next").css("opacity",".1")),a(".sp-lightbox").fadeIn(),b.preventDefault()}),a(document.body).on("click","#sp-next",function(b){b.stopPropagation();var d=a(".sp-lightbox").data("currenteq"),e=a(".sp-selected .sp-thumbs a").length;if(d>=e);else{var f=d+1,g=a(".sp-selected .sp-thumbs").find("a:eq("+d+")").attr("href"),h=c(a(".sp-selected .sp-thumbs").find("a:eq("+d+")").css("backgroundImage"));d==e-1&&a("#sp-next").css("opacity",".1"),a("#sp-prev").css("opacity","1"),a(".sp-selected .sp-current").removeClass(),a(".sp-selected .sp-thumbs a:eq("+d+")").addClass("sp-current"),a(".sp-selected .sp-large").empty().append("<a href="+g+'><img src="'+h+'"/></a>'),a(".sp-lightbox img").fadeOut(250,function(){a(this).remove(),a(".sp-lightbox").data("currenteq",f).append('<img src="'+g+'"/>'),a(".sp-lightbox img").hide().fadeIn(250)})}b.preventDefault()}),a(document.body).on("click","#sp-prev",function(b){b.stopPropagation();var d=a(".sp-lightbox").data("currenteq"),d=d-1;if(0>=d);else{1==d&&a("#sp-prev").css("opacity",".1");var e=d-1,f=a(".sp-selected .sp-thumbs").find("a:eq("+e+")").attr("href"),g=c(a(".sp-selected .sp-thumbs").find("a:eq("+e+")").css("backgroundImage"));a("#sp-next").css("opacity","1"),a(".sp-selected .sp-current").removeClass(),a(".sp-selected .sp-thumbs a:eq("+e+")").addClass("sp-current"),a(".sp-selected .sp-large").empty().append("<a href="+f+'><img src="'+g+'"/></a>'),a(".sp-lightbox img").fadeOut(250,function(){a(this).remove(),a(".sp-lightbox").data("currenteq",d).append('<img src="'+f+'"/>'),a(".sp-lightbox img").hide().fadeIn(250)})}b.preventDefault()}),a(document.body).on("click",".sp-lightbox",function(){b()}),a(document).keydown(function(a){return 27==a.keyCode?(b(),!1):void 0}),a(".sp-large").mousemove(function(b){var c=a(this).width(),d=a(this).height(),e=a(this).find(".sp-zoom").width(),f=a(this).find(".sp-zoom").height(),g=a(this).parent().offset(),h=b.pageX-g.left,i=b.pageY-g.top,j=Math.floor(h*(c-e)/c),k=Math.floor(i*(d-f)/d);a(this).find(".sp-zoom").css({left:j,top:k})})}})}(jQuery);


/*shou suo*/
		var footer_icon_plus = 'icon-plus-sign';
		var footer_icon_minus = 'icon-minus-sign';
var responsiveflagFooter = false;
function accordionFooter(status){
		if(status == 'enable'){
			$('.modules .block .unfold').on('click', function(){

				$(this).toggleClass('active').parent().find('.toggle_content').stop().slideToggle('medium', function(){
					if($(this).prev().hasClass('active')) {
						$(this).prev().children('i').removeClass(footer_icon_plus).addClass(footer_icon_minus);
					}
					else {
						$(this).prev().children('i').removeClass(footer_icon_minus).addClass(footer_icon_plus);	
					}
				});
			})
			$('.modules').addClass('accordion').find('.toggle_content').slideUp('fast');
		}else{
			$('.modules .unfold').removeClass('active').off().parent().find('.toggle_content').removeAttr('style').slideDown('fast');
			$('.modules .unfold i').removeClass(footer_icon_minus).addClass(footer_icon_plus);
			$('.modules').removeClass('accordion');
		}
	}		
function toDoFooter(){
	   if ($(document).width() <= 992 && responsiveflagFooter == false){
		    accordionFooter('enable');
			responsiveflagFooter = true;		
		}
		else if ($(document).width() >= 992){
			accordionFooter('disable');
	        responsiveflagFooter = false;
		}
}
$(document).ready(toDoFooter);
$(window).resize(toDoFooter);


/*shouji xinxi*/
var form = document.getElementById("formId");
	  
	  function showPopup(message) {
  // Create a new element for the popup box
  var popup = document.createElement('div');

  // Create a new element for the popup message
  var popupMessage = document.createElement('p');
  popupMessage.textContent = message;

  // Create a new element for the confirmation button
  var confirmButton = document.createElement('button');
  confirmButton.textContent = 'OK';

  // Style the popup box
  popup.style.position = 'fixed';
  popup.style.left = '50%';
  popup.style.top = '50%';
  popup.style.transform = 'translate(-50%, -50%)';
  popup.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
  popup.style.color = '#fff';
  popup.style.padding = '20px';
  popup.style.borderRadius = '5px';
  popup.style.zIndex = '9999';

  confirmButton.style.display = 'block';
  confirmButton.style.margin = '0 auto';
  confirmButton.style.width='130px'
  confirmButton.style.backgroundColor = 'rgba(255, 110, 0)';


  // Append the message and button to the popup box
  popup.appendChild(popupMessage);
  popup.appendChild(confirmButton);

  // Append the popup box to the body
  document.body.appendChild(popup);

  // Add event listener to the confirmation button
  confirmButton.addEventListener('click', function() {
    // Remove the popup box when the button is clicked
    document.body.removeChild(popup);
  });
}
	  async function handleSubmit(event) {
		event.preventDefault();
		var status = document.getElementById("my-form-status");
		var data = new FormData(event.target);
		fetch(event.target.action, {
		  method: form.method,
		  body: data,
		  headers: {
			  'Accept': 'application/json'
		  }
		}).then(response => {
		  if (response.ok) {
			
			document.getElementById('modal-lan').className="select-modal";
			document.getElementById('onlineService').style.display="none";
			document.getElementById('floatShow').style.display="block";
			document.getElementById('floatShow').style.opacity='1';
			showPopup('Thank you! We have received your message and will contact you soon');
			
		  } else {
			response.json().then(data => {
			  if (Object.hasOwn(data, 'errors')) {
				status.innerHTML = data["errors"].map(error => error["message"]).join(", ")
			  } else {		
				showPopup('Oops! There was a problem submitting your form');
			  }
			})
		  }
		}).catch(error => {
			showPopup('Oops! There was a problem submitting your form');
		});
	  }
	  form.addEventListener("submit", handleSubmit)

	  var form2 = document.getElementById("formId_a2");
	  if(form2!=null){
		form2.addEventListener("submit", handleSubmit);
	  }
	  

	  var form3 = document.getElementById("formId_a3");
	  if(form3!=null){
	  form3.addEventListener("submit", handleSubmit);
	  }


	  var emailForm = document.getElementById("email_form");
	  if(emailForm!=null){
	  emailForm.addEventListener("submit", handleSubmit);
	  }

	  const thumbnail1 = document.getElementById('video-111');
	  const thumbnail2 = document.getElementById('video-222');
	  const thumbnail3 = document.getElementById('video-333');

	  if(thumbnail1 != null){
	  // 添加点击事件监听器
	  thumbnail1.addEventListener('click', function() {
	  // 使用 alert 弹出错误信息
	  alert('Network busy. Please try again later.');
	  });
	  }
	  if(thumbnail2 != null){
		// 添加点击事件监听器
		thumbnail2.addEventListener('click', function() {
		// 使用 alert 弹出错误信息
		alert('Network busy. Please try again later.');
		});
		}

	if(thumbnail3 != null){
		// 添加点击事件监听器
		thumbnail3.addEventListener('click', function() {
		// 使用 alert 弹出错误信息
		alert('Network busy. Please try again later.');
		});
		}
		

	// 获取分享按钮元素
	var twitterShareButton = document.getElementById("twitterShareButton");
	
	if(twitterShareButton != null){	
		// 添加点击事件监听器
	//  twitterShareButton.addEventListener("click", shareOnTwitter);

		twitterShareButton.addEventListener('click', function() {
		// 读取参数值
		//var tweetText = twitterShareButton.dataset.param1;
		// var tweetUrl = twitterShareButton.dataset.param2;
	
		var h1Element = document.querySelector('h1');

		// 获取 <h1> 的文本内容
		var tweetText = h1Element.textContent;

		// 获取当前页面的 URL
		var url = window.location.href;

		// 提取文件名
		var fileName = url.substring(url.lastIndexOf('/') + 1);
		var tweetUrl = 'https://www.ruizhipack.com/'+ fileName;		

		// 创建用于分享的URL
		var TwitterShareUrl = "https://twitter.com/intent/tweet?text=" 
		+ encodeURIComponent(tweetText) 
		+ "&url=" + encodeURIComponent(tweetUrl)
			+ "&cardname=summary";

		// 在新窗口中打开Twitter分享页面
		window.open(TwitterShareUrl);
		});
		
	}

	var facebookShareButton = document.getElementById("facebookShareButton");


	if (facebookShareButton != null) {
		facebookShareButton.addEventListener('click', function() {
			var h1Element = document.querySelector('h1');
			var shareText = h1Element.textContent;
			var url = window.location.href;
	
			// 提取文件名
			var fileName = url.substring(url.lastIndexOf('/') + 1);
			var shareUrl = 'https://www.ruizhipack.com/'+ fileName;	

			var facebookShareUrl = 'https://www.facebook.com/sharer/sharer.php?';
			facebookShareUrl = facebookShareUrl+'u=' + encodeURIComponent(shareUrl);
	
			// 在新窗口中打开 Facebook 分享页面
			window.open(facebookShareUrl);
		});
	}