/**
 * 返回浏览器特有css前缀
 */
var webkit = (function() {
	var css3_div = document.createElement("div");
	css3_div.style.cssText =
		"-webkit-transition:all .1s; -moz-transition:all .1s; -o-transition:all .1s; -ms-transition:all .1s; transition:all .1s;";
	if (css3_div.style.webkitTransition) {
		return "-webkit-";
	} else if (css3_div.style.MozTransition) {
		return "-moz-";
	} else if (css3_div.style.oTransition) {
		return "-o-";
	} else if (css3_div.style.msTransition) {
		return "-ms-";
	} else {
		return "";
	}
})();

/**
 * 左右循环滑动
 * @Author   jeffzhong(p_jdjfzhong)
 * @DateTime 2016-07-12T13:59:53+0800
 */
function touchSlide() {
	var container = $(".container"),
		lis = container.find(".pages li"),
		navs = container.find(".ctrl li"),
		len = lis.length,
		curr = 0,
		prev = -1,
		next = 1,
		act = 0,
		isLock = false,
		startX = 0,
		offset = 0,
		timer;
	lis = [].slice.call(lis);
	var _touchStart = function(e) {
			clearInterval(timer);
			if (isLock) {
				return;
			}
			var touchers = e.changedTouches || e.targetTouches;
			startX = touchers[0].pageX;
			container.on("touchmove", _touchMove);
		},
		_touchMove = function(e) {
			if (isLock) {
				return;
			}
			var touchers = e.changedTouches || e.targetTouches,
				endX = touchers[0].pageX;
			offset = endX - startX;
			container.on("touchend", _touchRelease);
			container.on("touchcancel", _touchRelease);
			e.stopPropagation();
			if (offset > 0) {
				act = prev < 0 ? len - 1 : prev;
			} else if (offset < 0) {
				act = next >= len ? 0 : next;
			}
			lis[act].style.cssText =
				"display:block;left:" + (offset < 0 ? "" : "-") + "100%;";
			lis[curr].style[webkit + "transform"] = lis[act].style[
				webkit + "transform"
			] = "translate3d(" + offset + "px,0,0)";
		},
		_touchRelease = function(e) {
			if (isLock) {
				return;
			}
			isLock = true;
			if (Math.abs(offset) < 100) {
				//小于100重置
				$(lis[curr]).addClass("restore");
				$(lis[act]).addClass("restore");
				lis[curr].style[webkit + "transform"] = lis[act].style[
					webkit + "transform"
				] = "translate3d(0,0,0)";
				setTimeout(function() {
					$(lis[curr]).removeClass("restore");
					$(lis[act]).removeClass("restore");
					lis[act].style.display = "none";
					offset = 0;
					isLock = false;
					_autoPlay();
				}, 310);
			} else {
				//进行切换
				$(lis[curr]).addClass("moving");
				$(lis[act]).addClass("moving");
				lis[curr].style[webkit + "transform"] = lis[act].style[
					webkit + "transform"
				] = "translate3d(" + (offset < 0 ? "-" : "") + "100%,0,0)";
				setTimeout(function() {
					$(lis[curr]).removeClass("moving");
					$(lis[act]).removeClass("moving");
					lis[curr].style.cssText = "display:none;left:0;";
					lis[curr].style[webkit + "transform"] = lis[act].style[
						webkit + "transform"
					] = "translate3d(0,0,0)";
					lis[act].style.left = 0;
					curr = act;
					prev = curr - 1;
					next = curr + 1;
					offset = 0;
					isLock = false;
					navs.eq(curr)
						.addClass("active")
						.siblings()
						.removeClass("active"); //底部导航点位置
					_autoPlay();
				}, 210);
			}
			container.off("touchmove", _touchMove);
			container.off("touchend", _touchRelease);
			container.off("touchcancel", _touchRelease);
		},
		_next = function() {
			act = next >= len ? 0 : next;
			lis[act].style.cssText = "display:block;left:100%;";
			lis[curr].style[webkit + "transform"] = lis[act].style[
				webkit + "transform"
			] = "translate3d(0,0,0)";
			setTimeout(function() {
				$(lis[curr]).addClass("moving");
				$(lis[act]).addClass("moving");
				lis[curr].style[webkit + "transform"] = lis[act].style[
					webkit + "transform"
				] = "translate3d(-100%,0,0)";
				setTimeout(function() {
					$(lis[curr]).removeClass("moving");
					$(lis[act]).removeClass("moving");
					lis[curr].style.cssText = "display:none;left:0;";
					lis[curr].style[webkit + "transform"] = lis[act].style[
						webkit + "transform"
					] = "translate3d(0,0,0)";
					lis[act].style.left = 0;
					curr = act;
					prev = curr - 1;
					next = curr + 1;
					offset = 0;
					isLock = false;
					navs.eq(curr)
						.addClass("active")
						.siblings()
						.removeClass("active"); //底部导航点位置
				}, 210);
			}, 200);
		},
		_autoPlay = function() {
			timer = setInterval(_next, 3000);
		};
	lis[0].style.display = "block";
	if (len > 1) {
		container.on("touchstart", _touchStart);
		_autoPlay();
	}
}

touchSlide();
