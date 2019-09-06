var canvas = document.getElementById("canvas"),
	txt = document.getElementById("txt"),
	ctx = canvas.getContext("2d"),
	index = -1,
	start = { x: 50, y: 300 },
	end = { x: 350, y: 100 },
	controls = [{ x: 300, y: 250 }, { x: 100, y: 150 }];

canvas.style.cursor = "crosshair";
clear();
drawBezier();
showCode();

function drawGrid(color, stepx, stepy) {
	ctx.save();
	ctx.lineWidth = 0.5;
	ctx.strokeStyle = color;

	for (var i = stepx + 0.5; i < ctx.canvas.width; i += stepx) {
		ctx.beginPath();
		ctx.moveTo(i, 0);
		ctx.lineTo(i, ctx.canvas.height);
		ctx.stroke();
	}

	for (var i = stepy + 0.5; i < ctx.canvas.height; i += stepy) {
		ctx.beginPath();
		ctx.moveTo(0, i);
		ctx.lineTo(ctx.canvas.width, i);
		ctx.stroke();
	}
	ctx.restore();
}

function drawCoord() {
	ctx.save();
	ctx.beginPath();
	ctx.strokeStyle = "hsl(200,50%,50%)";
	ctx.moveTo(50, 100);
	ctx.lineTo(start.x, start.y);
	ctx.lineTo(350, 300);
	ctx.lineTo(end.x, end.y);
	ctx.closePath();
	ctx.stroke();
	ctx.restore();
}

function drawBezier() {
	ctx.save();
	ctx.lineWidth = 1;
	ctx.strokeStyle = "#ff0000";
	ctx.beginPath();
	ctx.moveTo(start.x, start.y);
	ctx.bezierCurveTo(
		controls[0].x,
		controls[0].y,
		controls[1].x,
		controls[1].y,
		end.x,
		end.y
	);
	ctx.stroke();
	ctx.restore();

	ctx.save();
	ctx.strokeStyle = "hsla(30,50%,50%,1.0)";
	ctx.beginPath();
	ctx.moveTo(start.x, start.y);
	ctx.lineTo(controls[0].x, controls[0].y);
	ctx.stroke();

	ctx.beginPath();
	ctx.arc(controls[0].x, controls[0].y, 6, 0, Math.PI * 2, false);
	ctx.stroke();

	ctx.beginPath();
	ctx.moveTo(end.x, end.y);
	ctx.lineTo(controls[1].x, controls[1].y);
	ctx.stroke();

	ctx.beginPath();
	ctx.arc(controls[1].x, controls[1].y, 6, 0, Math.PI * 2, false);
	ctx.stroke();
	ctx.restore();
}

function clear() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	drawGrid("hsla(0,0%,80%,1.0)", 10, 10);
	drawCoord();
}

function showCode() {
	var code =
		`function bezierFun(t,b,c,d){\n` +
		`\tt = t/d;\n` +
		`\tvar y = ${start.y}*Math.pow(1-t,3)+3*${controls[0].y}*t*Math.pow(1-t,2)+3*${controls[1].y}*Math.pow(t,2)*(1-t)+${end.y}*Math.pow(t,3);\n` +
		`\treturn b+(300-y)/200*c;\n}`;
	txt.value = code;
}

function windowToCanvas(x, y) {
	var box = canvas.getBoundingClientRect();
	return {
		x: x - box.left * (canvas.width / box.width),
		y: y - box.top * (canvas.height / box.height)
	};
}

canvas.onmousedown = function(e) {
	var pos = windowToCanvas(e.clientX, e.clientY);
	controls.forEach((point, i) => {
		ctx.beginPath();
		ctx.arc(point.x, point.y, 6, 0, Math.PI * 2, false);
		if (ctx.isPointInPath(pos.x, pos.y)) {
			index = i;
			return false;
		}
	});
	canvas.onmousemove = function(e) {
		controls[index] = windowToCanvas(e.clientX, e.clientY);
		controls[index].x = Math.max(10, controls[index].x);
		controls[index].x = Math.min(390, controls[index].x);
		controls[index].y = Math.max(10, controls[index].y);
		controls[index].y = Math.min(390, controls[index].y);
		clear();
		drawBezier();
		showCode();
	};

	canvas.onmouseup = function(e) {
		canvas.onmousemove = null;
		canvas.onmouseup = null;
	};
};
