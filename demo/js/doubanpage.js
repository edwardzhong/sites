/**
 * 分页组件
 */
$.fn.doubanPage=function(options){
    var opts={
        pageSize:10,//每页记录数
        pageNum:0,//总页数，由计算得出
        total:0,//总记录数
        curr:1,//当前第几页
        show:5,//中间展示几页
        side:2,//两侧展示几页
        callback:function(curr,pageSize,pageNum,total){}//当前页，页大小，总页数，总记录数
    },container=$(this);

    $.extend(true,opts,options);
    if(!opts.total){return false;}

    function bindEvent(){
        container.off().on('click', 'li', function() {
            var className=$(this).attr('class')||'';
            if(/disabled|active/i.test(className)){
                return false;
            }
            if(/prev/i.test(className)){
                opts.curr--;
            } else if(/next/i.test(className)){
                opts.curr++;
            } else {
                opts.curr=parseInt($(this).children('a').text());
            }
            render();
        });
    }

    function render(){
        opts.pageNum=Math.ceil(opts.total/opts.pageSize);
        if(opts.pageNum<opts.show){
            opts.show=opts.pageNum;
        }
        if(opts.curr<=0){
            opts.curr=1;
        }
        if(opts.curr>opts.pageNum){
            opts.curr=opts.pageNum;
        }

        var startLen=Math.min(opts.side,Math.ceil(opts.pageNum/2)),//左侧开头展示的页数
            end=Math.min(opts.side,Math.floor(opts.pageNum/2)),//右侧结尾展示的页数
            showLeftNums=Math.ceil((opts.show-1)/2),//中间展示页数的前半部分数
            showRightNums=Math.floor((opts.show-1)/2),//中间展示页数的后半部分数
            showIndex=startLen,//中间显示页数的开始下标
            showLen=opts.pageNum-end,//中间显示页数的结束下标
            leftNum,rightNum,i,html='';

        //在左半区对showIndex和showRightNums进行调整
        leftNum=opts.curr-startLen-showLeftNums-1;//左侧被"..."代替的页数
        if(leftNum>0){
            showIndex+=leftNum;
        } else {
            showRightNums-=leftNum;
        }
        
        //在右半区对showIndex和showLen进行调整
        rightNum=showLen-showRightNums-opts.curr;//右侧被"..."代替的页数
        if(rightNum>0){
            showLen-=rightNum;
        } else {
            showIndex+=rightNum;
        }

        if(showIndex<=0){
            showIndex=startLen;
        }

        if(showIndex-startLen==1){//左侧如果间距是1则不需要"..."
            showIndex--;
        }

        if(rightNum==1){//右侧如果间距是1也不需要"..."
            showLen++;
        }

        html+='<li class="prev"><a href="javascript:;"><span>«</span></a></li>';

        for(i=0;i<startLen;i++){//左侧开头
            html+='<li><a href="javascript:;">'+(i+1)+'</a></li>';
        }
        if(showIndex>startLen){//左边大于1的情况添加"..."
            html+='<li class="disabled"><a href="javascript:;">...</a></li>';
        }
        for(;showIndex<showLen;showIndex++){//中间部分
            html+='<li><a href="javascript:;">'+(showIndex+1)+'</a></li>';
        }
        if(rightNum>1){//右边大于1的情况添加"..."
            html+='<li class="disabled"><a href="javascript:;">...</a></li>';
        }
        for(i=opts.pageNum-end;i<opts.pageNum;i++){//右侧结尾
            html+='<li><a href="javascript:;">'+(i+1)+'</a></li>';
        }

        html+='<li class="next"><a href="javascript:;"><span>»</span></a></li>';
        container.html(html);

        container.children('li').filter(function(showIndex,item) {
            return $(item).children('a').text()==''+opts.curr;
        }).addClass('active');

        if(opts.curr<=1){
            container.find('.prev').addClass('disabled');
        }
        if(opts.curr==opts.pageNum){
            container.find('.next').addClass('disabled');
        }

        if(opts.callback){//绘制完，先运行一次callback
            opts.callback(opts.curr,opts.pageSize,opts.pageNum,opts.total);
        }
    }

    render();
    bindEvent();
}

/* 使用分页组件 */
var Datas=[];
for(var i=0;i<116;i++){
    Datas.push({'content':i+1});
}
$('#page').doubanPage({
    pageSize:10,
    total:Datas.length,
    curr:1,
    show:5,
    side:2,
    callback:function(curr,size,pages,total){
        var list=$('.list'), 
            temp='',
            lis=list.children('li'),
            w=list.outerWidth(),
            h=list.outerHeight(),
            posArr=calcPositions(size,5),
            initState={w:0,h:0, t:h,l:w/2 },
            pageData=Datas.slice((curr-1)*size,curr*size);

        if(lis.length>0){
            hideList();
            setTimeout(showList, 50*pageData.length+400);
        } else {
            showList();
        }

        /**
         * 计算位置
         * @param  {Number} size 总条数
         * @param  {Number} cols 每行列数
         */
        function calcPositions(size,cols){
            var pad=10,//与边框的Padding
                interPad=30,//元素之间的padding
                row=0,//行
                col=0,//列
                w=100,
                h=100,
                ret=[];
            for(var i=0;i<size;i++){
                col=i%cols;
                row=Math.floor(i/cols);
                ret.push({
                    left:col*(w+interPad)+pad,
                    top:row*(h+interPad)+pad
                });
            }
            return ret;
        }

        function hideList(){
            var i=0;
            // lis.each(function(i,item){
            // 	setTimeout(function() {
            // 		$(item).css({
            // 			top: initState.t+'px', 
            // 			left: initState.l+'px',
            // 			width:initState.w+'px',
            // 			height:initState.h+'px',
            // 		});
            // 		setTimeout(function() {
            // 			$(item).remove();
            // 		}, 300);
            // 	}, 50*i);
            // });
            ~function(){
                if(i>=lis.length) return;
                lis.eq(i).css({
                    top: initState.t+'px', 
                    left: initState.l+'px',
                    width:initState.w+'px',
                    height:initState.h+'px',
                });
                i++;
                setTimeout(function() {
                    lis.eq(i).remove();
                }, 300);
                setTimeout(arguments.callee, 50);
            }();
        }

        function showList(){
            var index=0;
            pageData.forEach(function(item,i){
                console.log(item);
                temp+='<li style="width:'+initState.w+';height:'+initState.h+';top:'+initState.t+'px; left:'+initState.l+'px;display:none;">'+item.content+'</li>';
            });
            list.html(temp);

            ~function(){
                if(index>=pageData.length) return;
                list.children('li').eq(index).show().css({
                    top: posArr[index].top+'px', 
                    left: posArr[index].left+'px',
                    width:'100px',
                    height:'100px',
                });
                index++;
                setTimeout(arguments.callee,50);
            }();
        }
    }
});
