function uploadImage(){var e=null;$("#editImgs").on("click","img",function(t){e=this,$("#replaceUpload").trigger("click")}),$("#uploadFile").on("change",uploadFile),$("#replaceUpload").on("change",function(t){uploadFile(t,e)})}function uploadFile(e,t){var o,a=e.target.files[0],i=a.size,s=a.type;return["image/jpg","image/jpeg","image/png"].indexOf(s)<0?void alert("只能上传jpg和png格式的图片"):i>2097152?void alert("您上传的图片太大了，不能超过2M哦！"):void(window.FileReader?(o=new FileReader,o.onloadend=function(e){var o,a;if(t)a=t,a.src=e.target.result,o=$(t).parent();else{var a=new Image;a.src=e.target.result,o=$('<div class="img"><i class="icon-minus-circled"></i></div>').append(a),$("#editImgs").append(o)}setImgPosition(o,a)},o.readAsDataURL(a)):alert("浏览器不支持上传"))}function setImgPosition(e,t){var o=0,a=0,i=0,s=0,n=e.width(),r=e.height();t.onload=function(){o=t.width,a=t.height,o/a>n/r?(t.style.height="100%",i=(r/a*o-n)/2,e.scrollLeft(i),e.find("i").css("right",2-i)):(t.style.width="100%",s=(n/o*a-r)/2,e.scrollTop(s),e.find("i").css("top",2+s)),pic=null}}function setTextHeight(e){function t(){var e=$(this),t=e.scrollTop(),o=e.height();setTimeout(function(){t=e.scrollTop(),o=e.height(),e.height(o+t+"px")},100)}var o=$("#"+e),a=o.val();o.on(changeEvent,t),o.val(""),o.val(a),o.focus(),t.call(o)}function setCopyUrl(){$("[data-tag=copy]").each(function(e,t){var o=new ClipboardJS(t);o.on("success",function(e){$(t).parent().parent().hide(),alert("链接已经复制到剪贴板")}),o.on("error",function(e){console.log(e)})})}function bindEvents(){$("#editImgs").on("click","i",function(e){var t=$(this);showDialog("确定删除?",function(){t.parent().remove()})}),$("#addTag").on("click",function(){$(".add-tag").toggle()}),$(".article-list li").on("click","p",function(){$(this).toggleClass("show")}),$("#comment").on("click",".close",function(e){e.stopPropagation(),$(this).parent().hide(),$("#overlay").hide()}),$("#replyComment").on("click",function(e){e.stopPropagation()}),$("#submit").on("click",function(){}),$(".article-list,.view-article").on("click","[data-tag]",function(e){e.stopPropagation();var t=$(this).data("tag"),o=$(this).position().left;switch(t){case"up":$(this).toggleClass("active");break;case"more":hideDialogs(),$(this).siblings("[data-menu=more]").css("left",o-30).show();break;case"share":hideDialogs(),$(this).siblings("[data-menu=share]").css("left",o-30).show();break;case"delete":var a=$(this);showDialog("确定删除?",function(){a.parents("ul").length?a.parentsUntil("ul").remove():location.href="index.html"});break;case"private":"设为私密"==$(this).html()?$(this).html("设为公开"):$(this).html("设为私密"),$(this).parentsUntil(".actions").siblings(".private").toggle();break;case"collect":case"copy":break;case"comment":showComment($(this).parents(".dream-wrap").find(".title span").first().html());break;case"facebook":if(showShare())break;generate("https://www.facebook.com/sharer/sharer.php?u={%sUrl%}",getShareOpts.call(this));break;case"weibo":if(showShare())break;generate("http://service.weibo.com/share/share.php?url={%sUrl%}&title={%sTitle%}&pic={%sPic%}",getShareOpts.call(this));break;case"douban":if(showShare())break;generate("https://www.douban.com/share/service?image={%sPic%}&href={%sUrl%}&name={%sTitle%}&text={%sDesc%}",getShareOpts.call(this));break;case"qq":if(showShare())break;generate("http://connect.qq.com/widget/shareqq/index.html?url={%sUrl%}&title={%sTitle%}&source={%sDesc%}",getShareOpts.call(this));break;case"wechat":if(showShare())break;showWX(getShareOpts.call(this));break;case"whatsapp":if(showShare())break;generate("whatsapp://send?text={%sDesc%}"+encodeURIComponent("\n\n")+"{%sUrl%}&via=lopscoop",getShareOpts.call(this))}})}function showComment(e){var t=$("#comment");t.find("p").empty(),$("#overlay").show(),e&&t.find("p").html("回复 | "+e),t.show().find("textarea").val("").focus()}function showWX(e){function t(e){e.stopPropagation(),$("#overlay").hide(),$(document.body).css("overflow",""),o.hide()}var o=$(".wxshare-popup");generateCode(e.sUrl),$(document.body).css("overflow","hidden"),$("#overlay").show(),o.show(),o.find(".close").on("click",t)}function generateCode(e){$("#qrcode").empty();new QRCode("qrcode",{text:e,width:200,height:200,colorDark:"#000000",colorLight:"#ffffff",correctLevel:QRCode.CorrectLevel.M})}function showShare(){return("weixin"==env||"qq"==env)&&(showShareOverlay(),!0)}function showShareOverlay(){var e=$('<div class="share-overlay"><i class="share-arrow"></i><p class="share-tip">分享给好友&nbsp;</p></div>');$(document.body).css("overflow","hidden").append(e),e.on("click",function(t){t.stopPropagation(),$(document.body).css("overflow",""),e.remove()})}function getShareOpts(){var e=$(this),t=e.parent().attr("data-url")||"",o=e.parents(".view-article,.dream-wrap"),a=o.find("img").length?o.find("img")[0].src:"";return{url:location.protocol+"//"+location.host,sUrl:location.protocol+"//"+location.host+t,sPic:a,sTitle:o.find("h3").html(),sDesc:o.find("p").html().substr(0,150)}}function generate(e,t){var e=e.replace(/{%sUrl%}/g,encodeURI(t.sUrl)).replace(/{%sTitle%}/g,t.sTitle).replace(/{%sDesc%}/g,t.sDesc).replace(/{%sPic%}/g,encodeURIComponent(t.sPic)).replace(/{%url%}/g,encodeURIComponent(t.url));window.open(e)}function getEnv(){var e=navigator.userAgent.toLowerCase();return/micromessenger(\/[\d\.]+)*/.test(e)?"weixin":/qq\/(\/[\d\.]+)*/.test(e)||/qzone\//.test(e)?"qq":"h5"}var env=getEnv();uploadImage(),setTextHeight("commentText"),setTextHeight("text"),setCopyUrl(),bindEvents();