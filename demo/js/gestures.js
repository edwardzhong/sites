var ww = window.innerWidth || document.body.clientWidth,
	wh = window.innerHeight || document.body.clientHeight,
	first = true;

function gestures(elem) {
	var fingers = [],
		args = [1, 0, 0, 1, 0, 0];

	elem.addEventListener("touchstart", function(e) {
		var touches = e.touches || e.targetTouches;
		Array.from(touches).forEach(t => {
			fingers.push({
				id: t.identifier,
				x: t.pageX,
				y: t.pageY,
				dx: t.pageX,
				dy: t.pageY
			});
		});
		elem.addEventListener("touchmove", touchMove);
		elem.addEventListener("touchend", touchLeave);
		elem.addEventListener("touchcancel", touchLeave);
	});

	function touchMove(e) {
		var touches = e.touches || e.targetTouches;
		Array.from(touches).forEach((t, i) => {
			fingers[i].dx = t.pageX;
			fingers[i].dy = t.pageY;
		});

		if (fingers.length > 1) {
			// 多点触控 => 旋转、缩放
			document.getElementsByClassName(
				"fin"
			)[0].innerHTML = `${fingers[0].x}:${fingers[0].y}|${fingers[0].dx}:${fingers[0].dy} - ${fingers[1].x}:${fingers[1].y}|${fingers[1].dx}:${fingers[1].dy}`;
			var c = Math.sqrt( Math.pow(fingers[1].x - fingers[0].x, 2) + Math.pow(fingers[1].y - fingers[0].y, 2) );
			var dc = Math.sqrt( Math.pow(fingers[1].dx - fingers[0].dx, 2) + Math.pow(fingers[1].dy - fingers[0].dy, 2) );
			//旋转的弧度
			var rad = Math.atan2( fingers[1].dy - fingers[0].dy - (fingers[1].y - fingers[0].y), fingers[1].dx - fingers[0].dx - (fingers[1].x - fingers[0].x) );
			if (fingers[1].x < fingers[0].x && first) {
				first = false;
				red = Math.PI - rad;
			}
			//缩放比例
			var scale = Math.round((dc / c) * 100) / 100;
			scale = Math.min(Math.max(scale, 0.5), 4);
			args[0] = args[3] = scale * Math.cos(rad);
			args[1] = Math.sin(rad);
			args[2] = -Math.sin(rad);
			document.getElementsByClassName( "txt" )[0].innerHTML = `${scale}:${(rad * 180) / Math.PI}`;
		} else {
			// 单点触控 => 位移
			args[4] += fingers[0].dx - fingers[0].x;
			args[5] += fingers[0].dy - fingers[0].y;
			args[4] = Math.min(Math.max(args[4], 0), ww - 50);
			args[5] = Math.min(Math.max(args[5], 0), wh - 50);
			fingers[0].x = fingers[0].dx;
			fingers[0].y = fingers[0].dy;
		}

		elem.style.transform = `matrix(${args.join(",")})`;
	}
	function touchLeave(e) {
		fingers = []; //重置指纹列表
		elem.removeEventListener("touchmove", touchMove);
		elem.removeEventListener("touchend", touchLeave);
		elem.removeEventListener("touchcancel", touchLeave);
	}
}
gestures(document.getElementsByClassName("img")[0]);
