//轮播使用到的5张图片
var configs = [
		{ i: 2, zIndex: 5, opacity: 1, animate: { top: "0", left: "220px", width: "320px", height: "240px" } },
		{ i: 1, zIndex: 4, opacity: 0.7, animate: { top: "22px", left: "100px", width: "260px", height: "195px" } },
		{ i: 3, zIndex: 3, opacity: 0.7, animate: { top: "22px", left: "400px", width: "260px", height: "195px" } },
		{ i: 0, zIndex: 2, opacity: 0.5, animate: { top: "60px", left: "30px", width: "160px", height: "120px" } },
		{ i: 4, zIndex: 1, opacity: 0.5, animate: { top: "60px", left: "570px", width: "160px", height: "120px" } }
	],
	//隐藏的图片
	hid = { zIndex: 0, top: "60px", left: "380px", width: "160px", height: "120px", opacity: 1, display: "none" },
	lis = [].slice.call($(".pics li")),
	pLen = lis.length,
	cLen = configs.length,
	i,
	timer = null,
	isAnimating = false;
//初始化
function init() {
	if (pLen < configs.length) {
		cLen = configs.length = pLen;
	}
	configs.sort(function(a, b) {
		return a.i - b.i;
	});
	i = Math.floor(cLen / 2);
	while (i--) {
		slideRight();
	}
	animate(400);
}
//执行动画
function animate(interval) {
	$(lis).each(function(i, item) {
		if (configs[i]) {
			$(item)
				.attr("i", i)
				.css({ zIndex: configs[i].zIndex })
				.animate(configs[i].animate, interval)
				.show()
				.children("img")
				.animate({ opacity: configs[i].opacity }, interval);
		} else {
			$(item).css(hid);
		}
	});
}

//将元素第1项移到队列尾部从而实现向右移动的效果
function slideLeft() {
	lis.push(lis.shift());
}
//将元素最后1项移到队列头部从而实现向左移动的效果
function slideRight() {
	lis.unshift(lis.pop());
}
//自动轮播
function next() {
	timer = setInterval(function() {
		slideLeft();
		animate(400);
	}, 2000);
}

//绑定向左向右事件
//鼠标移入，清除自动播放，移开时添加自动播放，点击执行向/左向右滚动
//同时控制点击间隔为300ms
$("#leftBtn,#rightBtn").click(function(event) {
	if (isAnimating) {
		return;
	}
	if (this.id == "leftBtn") {
		slideLeft();
	} else {
		slideRight();
	}

	animate(400);
	isAnimating = true;
	setTimeout(function() {
		isAnimating = false;
	}, 300);
})
.mouseover(function() {
	clearInterval(timer);
})
.mouseout(next);

//鼠标移入ul时，清除自动播放，移开时添加自动播放
$(".pics").mouseover(function() {
	clearInterval(timer);
})
.mouseout(next);

//点击两侧的图片将立即移动到中间显示
$(".pics").on("click", "li", function(event) {
	var index = $(this).attr("i"),
		interval = 300,
		len = 0;

	index = index - Math.floor(cLen / 2); //在图片到正中间隔着几张

	if (index == 0) return; //点到的是正在最前面展示的图片
	len = Math.abs(index); //动画要执行的次数
	interval = Math.floor(interval / len); //动画间隔

	while (len--) {
		if (index < 0) {
			slideRight();
		} else {
			slideLeft();
		}
		animate(interval);
	}
});

init();
next();
