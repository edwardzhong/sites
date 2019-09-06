var Msgs = [
	"aaa获得了大疆无人机 !",
	"bbb获得了苹果MacBook Pro !",
	"ccc获得了XBOX 360 !",
	"ddd获得了苹果IPhone7 Plus !",
	"eee获得了小米电视 !"
];
/**
 * 跑马灯，默认左移
 * @param    {Boolean}                isRight 是否右移
 */
function marquee(texts, isRight) {
	var ul = $(".news"),
		ulWidth = 0,
		speed = 1,
		left = 0,
		lis,
		html = "";

	texts.forEach(function(item, i) {
		html += "<li>" + item + "&nbsp;&nbsp;&nbsp;</li>";
	});
	ul.html(html);
	lis = ul.find("li");
	lis.each(function(i, item) {
		ulWidth += $(item).width();
	});
	if ($(".container").width() >= ulWidth) return;
	ul.css("width", ulWidth + "px");
	if (isRight) {
		lis.first().css({ marginLeft: "-" + lis.first().width() + "px" });
	}
	~(function() {
		var first = ul.find("li").first(),
			last = ul.find("li").last();
		if (left >= first.width()) {
			if (isRight) {
				ul.prepend(last.css({ marginLeft: "-" + last.width() + "px" }));
			} else {
				ul.append(first.css({ marginLeft: "0" }));
			}
			left = 0;
		} else {
			left += speed;
		}

		ul.find("li")
			.first()
			.css({
				marginLeft: "-" + (isRight ? first.width() - left : left) + "px"
			});
		requestAnimationFrame(arguments.callee);
	})();
}

marquee(Msgs, false);
