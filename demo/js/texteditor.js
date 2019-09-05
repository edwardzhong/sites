const content = document.getElementById('content');
const menu = document.getElementById('menu');
const pos = content.getBoundingClientRect();

content.ondblclick = function(e) {
    const txt = document.createElement('textarea');
    txt.setAttribute('autofocus','true');
    content.appendChild(txt);
    txt.style.cssText = `left:${e.clientX - pos.left -10}px;top:${e.clientY - pos.top -10}px;`;
    setTimeout(() => {
        txt.focus();
    }, 500);
};
content.onmousedown=function(e){
    const target = e.target;
    if(target.nodeName == 'TEXTAREA'){
        const x = e.clientX- pos.left - target.offsetLeft;
        const y = e.clientY- pos.top - target.offsetTop;
        if(target.offsetWidth - x < 10 && target.offsetHeight - y < 10) return;
        content.onmousemove=function(e){
            target.style.left = e.clientX- pos.left - x + 'px';
            target.style.top = e.clientY- pos.top - y + 'px';
        }
        content.onmouseup = function(){
            content.onmouseup = null;
            content.onmousemove = null;
        }
    }
}
content.oncontextmenu=function(e){
    const target = e.target;
    if(target.nodeName == 'TEXTAREA'){
        menu.style.display ="block";
        menu.style.left = e.clientX- pos.left - 10 + 'px';
        menu.style.top = e.clientY- pos.top - 10 + 'px';
    }
    return false;
}

menu.onmouseleave=function(e){
    this.style.display='';
}