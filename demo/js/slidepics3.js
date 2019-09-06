var lbtn = document.getElementById("leftBtn"),
	rbtn = document.getElementById("rightBtn"),
	con = document.querySelector(".con");
//轮播使用到的5张图片
var configs = [
		{ i: 2, css: "z-index:3;transform: translate3d(260px, 0, -30px)" },
		{
			i: 1,
			css:
				"z-index:2;transform-origin: left;transform: translate3d(-20px, 0, -60px) rotateY(5deg)"
		},
		{
			i: 3,
			css:
				"z-index:2;transform-origin: right;transform: translate3d(540px, 0, -60px) rotateY(-5deg)"
		},
		{
			i: 0,
			css:
				"z-index:1;transform-origin: left;transform: translate3d(-220px, 0, -70px) rotateY(5deg)"
		},
		{
			i: 4,
			css:
				"z-index:1;transform-origin: right;transform: translate3d(740px, 0, -70px) rotateY(-5deg)"
		}
	],
	//隐藏的图片
	hiden = { css: "transform: translate3d(200px, 0, -100px)" };

class Stage {
	constructor() {
		this.list = Array.from(document.querySelectorAll(".con .img"));
		this.isRunning = false;
		this.timer;
		let cl = configs.length,
			l = this.list.length,
			i;
		if (l < cl) {
			configs.length = l;
		}
		configs.sort(function(a, b) {
			return a.i - b.i;
		});
		i = Math.floor(cl / 2);
		while (i--) {
			this.slideRight();
		}
		this.update();
		this.bindEvent();
	}
	slideLeft() {
		this.list.push(this.list.shift());
	}
	slideRight() {
		this.list.unshift(this.list.pop());
	}
	update() {
		this.list.forEach((item, i) => {
			item.style.cssText = (configs[i] || hiden).css;
		});
	}
	bindEvent() {
		let that = this;
		lbtn.onclick = rbtn.onclick = function(e) {
			if (that.isRunning) {
				return;
			}
			if (this.id == "leftBtn") {
				that.slideLeft();
			} else {
				that.slideRight();
			}

			that.update();
			that.isRunning = true;
			setTimeout(function() {
				that.isRunning = false;
			}, 400);
		};
		con.onmouseover = lbtn.onmouseover = rbtn.onmouseover = function(e) {
			clearInterval(that.timer);
		};
		con.onmouseout = lbtn.onmouseout = rbtn.onmouseout = function(e) {
			that.autoPlay();
		};
		con.onclick = function(e) {
			let target = e.target || e.srcElement;
			if (target.nodeName != "IMG") return;
			let index = -1,
				len = 0,
				delay = 300;
			that.list.forEach((item, i) => {
				if (target.src == item.children[0].children[0].src) {
					index = i;
				}
			});
			index = index - Math.floor(configs.length / 2); //在图片到正中间隔着几张

			if (index == 0) return; //点到的是正在最前面展示的图片
			len = Math.abs(index); //动画要执行的次数
			delay = Math.floor(delay / len); //动画间隔

			~(function animate() {
				if (len <= 0) return;
				len--;
				if (index < 0) {
					that.slideRight();
				} else {
					that.slideLeft();
				}
				that.update();
				setTimeout(animate, delay);
			})();
		};
	}
	autoPlay() {
		let that = this;
		that.timer = setInterval(function() {
			that.slideLeft();
			that.update();
		}, 2000);
	}
}

new Stage().autoPlay();
