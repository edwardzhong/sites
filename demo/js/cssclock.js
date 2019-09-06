var clock = $(".container"),
    hour = $(".hour"),
    min = $(".min"),
    sec = $(".sec"),
    i,
    mark,
    num,
    timer = null,
    date,
    hours = 0,
    mins = 0,
    secs = 0;
//初始化，画表盘
function init() {
    for (i = 0; i < 60; i++) {
        mark = $("<div>", { class: "mark" }).css(
            "transform",
            "rotate(" + i * 6 + "deg)"
        );
        if (i % 5 === 0) {
            mark.css({ height: "18px", backgroundColor: "#666" });
            num = i / 5 === 0 ? 12 : i / 5;
            mark.append("<i>" + num + "</i>");
        }
        clock.append(mark);
    }
    setTime();
}
//设置时间
function setTime() {
    date = new Date();
    hours = date.getHours() % 12;
    mins = date.getMinutes();
    secs = date.getSeconds();
    halfHours = Math.floor(mins / 12);
    hour.css(
        "transform",
        "rotate(" + (hours * 30 + halfHours * 6) + "deg)"
    );
    min.css("transform", "rotate(" + mins * 6 + "deg)");
    sec.css("transform", "rotate(" + secs * 6 + "deg)");
}
//定时器启动
function start() {
    timer = setInterval(setTime, 1000);
}
init();
start();