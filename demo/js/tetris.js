var canvas = document.getElementById("canvas"),
	ctx = canvas.getContext("2d"),
	W = canvas.width,
	H = canvas.height,
	Arr = [
		[4, 0, 4, 1, 5, 1, 6, 1],
		[4, 1, 5, 1, 6, 1, 6, 0],
		[4, 0, 5, 0, 5, 1, 6, 1],
		[4, 1, 5, 0, 5, 1, 6, 0],
		[5, 0, 4, 1, 5, 1, 6, 1],
		[4, 0, 5, 0, 6, 0, 7, 0],
		[5, 0, 6, 0, 5, 1, 6, 1]
	];
canvas.width = 2 * W;
canvas.height = 2 * H;
canvas.style.width = W + "px";
canvas.style.height = H + "px";
ctx.translate(40, 40);

ctx.lineWidth = 2;
ctx.lineCap = "square";
ctx.fillStyle = "hsla(0,100%,0%,0.1)";
ctx.strokeStyle = "hsla(0,100%,0%,.05)";

ctx.font = "bold 40px arial";
ctx.textAlign = "center";
ctx.textBaseline = "middle";

class Stage {
	constructor() {
		this.maps = [];
		this.timer = null;
	}
	init() {
		this.score = 0;
		this.pause = false;
		this.speed = 500;
		this.d = 1;
		for (var i = 0; i < 20; i++) {
			this.maps[i] = [];
			for (var j = 0; j < 12; j++) {
				this.maps[i][j] = 0;
			}
		}
		this.drawUI();
		return this;
	}
	drawUI() {
		ctx.save();
		//格子
		for (var i = 0; i < 12; i++) {
			for (var j = 0; j < 20; j++) {
				ctx.fillRect(i * 40, j * 40, 40, 40);
				ctx.strokeRect(i * 40, j * 40, 40, 40);
			}
		}

		//边框
		ctx.lineWidth = 4;
		ctx.strokeStyle = "hsla(0,100%,0%,.3)";
		ctx.moveTo(0, 0);
		ctx.lineTo(0, 20 * 40);
		ctx.lineTo(12 * 40, 20 * 40);
		ctx.lineTo(12 * 40, 0);
		ctx.stroke();
		ctx.restore();

		//分数
		ctx.save();
		ctx.fillStyle = "hsla(0,100%,0%,.7)";
		ctx.fillText("score", 560, 20);
		ctx.fillText("next", 560, 100);
		ctx.font = "bold 30px arial";
		ctx.fillStyle = "hsla(30,100%,50%,1)";
		ctx.fillText(this.score, 560, 60);
		ctx.restore();
		return this;
	}
	drawMaps() {
		ctx.save();
		ctx.lineWidth = 4;
		ctx.fillStyle = "hsla(200,100%,50%,.5)";
		ctx.strokeStyle = "hsla(200,100%,50%,.9)";

		for (var i = 0; i < 12; i++) {
			for (var j = 0; j < 20; j++) {
				if (this.maps[j][i] == 1) {
					ctx.fillRect(i * 40, j * 40, 40, 40);
					ctx.strokeRect(i * 40 + 2, j * 40 + 2, 38, 38);
				}
			}
		}
		ctx.restore();
		return this;
	}
	bindEvent() {
		var that = this;
		document.addEventListener( "keydown", function(e) {
            switch (e.keyCode) {
                case 13: //enter
                    cancelAnimationFrame(that.timer);
                    that.init().update();
                    break;
                case 80: //p
                    that.pause = !that.pause;
                    break;
                case 40: //down
                    that.d = 0.5;
                    break;
                case 37: //left
                    var over = false,
                        maps = that.maps,
                        shape = that.shape,
                        m = shape.m;
                    for (var i = 0, l = m.length; i < l; i = i + 2) {
                        if (m[i] <= 0 || maps[m[i + 1]][m[i] - 1] == 1) {
                            over = true;
                            break;
                        }
                    }
                    if (!over) shape.move(-1, 0);
                    break;
                case 39: //right
                    var over = false,
                        shape = that.shape,
                        maps = that.maps,
                        m = shape.m;
                    for (var i = 0, l = m.length; i < l; i = i + 2) {
                        if (m[i] >= 11 || maps[m[i + 1]][m[i] + 1] == 1) {
                            over = true;
                            break;
                        }
                    }
                    if (!over) shape.move(1, 0);
                    break;
                case 32: //space
                    that.shape.transform();
                    break;
            }
        }, false );

		document.addEventListener(
			"keyup",
			function(e) {
				if (e.keyCode == 40) {
					that.d = 1;
					that.speed = 500;
				}
			},
			false
		);
		return this;
	}
	update() {
		var that = this,
			l = Arr.length,
			startTime = new Date(),
			next = [...Arr[Math.floor(Math.random() * l)]],
			t;

		that.shape = new Shape(Arr[Math.floor(Math.random() * l)]);

		(function animate() {
			if (!that.pause) {
				that.speed *= that.d;
				t = new Date();
				if (t - startTime > Math.max(that.speed, 50)) {
					startTime = t;
					var isEnd = false,
						isOver = false,
						x,
						y;
					for (
						var i = 0, sl = that.shape.m.length;
						i < sl;
						i = i + 2
					) {
						x = that.shape.m[i];
						y = that.shape.m[i + 1];
						if (y >= 19) {
							isEnd = true;
							break;
						}
						if (that.maps[y + 1][x] == 1) {
							isEnd = true;
							if (y <= 1) {
								isOver = true;
							}
							break;
						}
					}
					if (isOver) {
						//游戏结束
						ctx.save();
						ctx.fillStyle = "hsla(0,100%,0%,.7)";
						ctx.fillText("score", 12 * 40 + 80, 20);
						ctx.font = "bold 60px arial";
						ctx.fillStyle = "hsla(30,100%,50%,1)";
						ctx.fillText("Game Over", 6 * 40, 10 * 40);
						ctx.restore();
						cancelAnimationFrame(that.timer);
						return;
					}
					if (isEnd) {
						//方块到底
						for (
							var i = 0, sl = that.shape.m.length;
							i < sl;
							i = i + 2
						) {
							x = that.shape.m[i];
							y = that.shape.m[i + 1];
							that.maps[y][x] = 1;
						}
						that.checkPoint();
						that.speed = 500;
						that.shape = new Shape(next);
						next = [...Arr[Math.floor(Math.random() * l)]];
					} else {
						that.shape.move(0, 1);
					}
				}
				ctx.clearRect(-40, -40, W * 2, H * 2);
				that.drawUI().drawMaps();
				that.shape.drawCurr().drawNext(next);
			}
			that.timer = requestAnimationFrame(animate);
		})();
	}
	checkPoint() {
		var that = this,
			maps = that.maps;

		for (var i = 0, l = maps.length; i < l; i++) {
			if (Math.min.apply(null, maps[i]) == 1) {
				that.maps.splice(i, 1);
				that.score += 10;
				that.maps.unshift(new Array(10).fill(0));
			}
		}
		return this;
	}
}

class Shape {
	constructor(m) {
		this.m = Object.assign([], m);
	}
	transform() {
		var m = this.m,
			l = m.length,
			c = 4,
			x = m[c],
			y = m[c + 1],
			min = 0,
			max = 0;
		if (Math.abs(m[2] - m[4]) == 1 && Math.abs(m[3] - m[5]) == 1) return;
		for (var i = 0; i < l; i = i + 2) {
			if (i == c) continue;
			var mx = m[i] - x,
				my = m[i + 1] - y,
				nx = -my,
				ny = mx;
			m[i] = x + nx;
			m[i + 1] = y + ny;
			max = Math.max(m[i] - 11, max);
			min = Math.min(m[i], min);
		}

		for (var i = 0; i < l; i = i + 2) {
			m[i] -= min;
			m[i] -= max;
		}
		return this;
	}
	move(x, y) {
		var m = this.m,
			l = m.length;
		y = y || 0;

		for (var i = 0; i < l; i = i + 2) {
			m[i] += x;
			m[i + 1] += y;
		}
		return this;
	}
	draw(m) {
		ctx.lineWidth = 4;
		ctx.fillStyle = "hsla(200,100%,50%,.5)";
		ctx.strokeStyle = "hsla(200,100%,50%,.9)";
		for (var i = 0, l = m.length; i < l; i = i + 2) {
			ctx.fillRect(m[i] * 40, m[i + 1] * 40, 40, 40);
			ctx.strokeRect(m[i] * 40 + 2, m[i + 1] * 40 + 2, 38, 38);
		}
	}
	drawCurr() {
		ctx.save();
		this.draw(this.m);
		ctx.restore();
		return this;
	}
	drawNext(m) {
		ctx.save();
		ctx.transform(0.7, 0, 0, 0.7, 400, 130);
		this.draw(m);
		ctx.restore();
		return this;
	}
}
new Stage().init().bindEvent();
