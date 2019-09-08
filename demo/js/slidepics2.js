var wrap = $(".wrap"),
	picUl = wrap.children(".pics"),
	lis = picUl.children("li"),
	len = lis.length,
	w = wrap.width(),
	nav,
	navs = "",
	i,
	timer = null;
//初始化
function init() {
	picUl.css("width", w * len + "px");
	nav = $('<ul class="nav"></ul>').appendTo(wrap);
	for (i = 0; i < len; i++) {
		navs += "<li>" + (i + 1) + "</li>";
	}
	nav.append(navs);
	navs = nav.children("li");
	i = 0;
	action();
}
//执行动画
function action() {
	if (i == len) {
		i = 0;
	}
	if (i < 0) {
		i = len - 1;
	}
	wrap.animate({ scrollLeft: i * w }, 600);
	$(navs[i]).addClass("active")
		.siblings(".active")
		.removeClass("active");
}
//自动播放
function next() {
	timer = setInterval(function() {
		i++;
		action();
	}, 2000);
}
//绑定事件
function bindEvents() {
	$(".left").on("click", function() {
		i--;
		action();
	});
	$(".right").on("click", function() {
		i++;
		action();
	});

	wrap.on("mouseover", function() {
		clearInterval(timer);
	}).on("mouseout", next);

	nav.on("click", "li", function() {
		i = $(this).index();
		action();
	});
}

init();
next();
bindEvents();
