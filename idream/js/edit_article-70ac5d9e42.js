function uploadImage(){var i=null;$("#editImgs").on("click","img",function(e){i=this,$("#replaceUpload").trigger("click")}),$("#uploadFile").on("change",uploadFile),$("#replaceUpload").on("change",function(e){uploadFile(e,i)})}function uploadFile(i,e){var n,t=i.target.files[0],o=t.size,a=t.type;return["image/jpg","image/jpeg","image/png"].indexOf(a)<0?void alert("只能上传jpg和png格式的图片"):o>2097152?void alert("您上传的图片太大了，不能超过2M哦！"):void(window.FileReader?(n=new FileReader,n.onloadend=function(i){var n,t;if(e)t=e,t.src=i.target.result,n=$(e).parent();else{var t=new Image;t.src=i.target.result,n=$('<div class="img"><i class="icon-minus-circled"></i></div>').append(t),$("#editImgs").append(n)}setImgPosition(n,t)},n.readAsDataURL(t)):alert("浏览器不支持上传"))}function setImgPosition(i,e){var n=0,t=0,o=0,a=0,l=i.width(),c=i.height();e.onload=function(){n=e.width,t=e.height,n/t>l/c?(e.style.height="100%",o=(c/t*n-l)/2,i.scrollLeft(o),i.find("i").css("right",2-o)):(e.style.width="100%",a=(l/n*t-c)/2,i.scrollTop(a),i.find("i").css("top",2+a)),pic=null}}function setTextHeight(i){function e(){var i=$(this),e=i.scrollTop(),n=i.height();setTimeout(function(){e=i.scrollTop(),n=i.height(),i.height(n+e+"px")},100)}var n="oninput"in window?"input":"onpropertychange"in window?"propertychange":"keyup",t=$("#"+i),o=t.val();t.on(n,e),t.val(""),t.val(o),t.focus(),e.call(t)}function bindEvents(){$("#editImgs").on("click","i",function(i){var e=$(this);showDialog("确定删除?",function(){e.parent().remove()})}),$("#addTag").on("click",function(){$(".add-tag").toggle()}),$("#submit").on("click",function(){})}uploadImage(),setTextHeight("text"),bindEvents();