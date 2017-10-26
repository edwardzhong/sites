

    /**
     * 绑定事件
     */
    function bindEvent(){
        //tab栏
    	$('#tabCon').on('click','.tab',function(){
            var tag=$(this).attr('data-tag'),
                selMenu=$('#menu').find('[data-tag='+tag+']');
    		selectTab(tag);
            if(!selMenu.hasClass('active')){
                selMenu.addClass('active').siblings().removeClass('active');
            }
    	}).on('click','i',function(e){
    		e.stopPropagation();
    		removePage($(this).parent().attr('data-tag'));
    	});

        //左边导航栏
    	$('#menu').on('click','a',function(e){
    		e.preventDefault();
    		var self=$(this),
    			url=this.href,
    			title=self.text(),
    			tag=self.attr('data-tag');
    		self.addClass('active').siblings().removeClass('active');
    		addPage(url,title,tag);
    	}) .find('a').first().click();

        //左右滚动tab栏
        $('.scroll-left,.scroll-right').on('click',function(){
            var self=$(this),
                isLeft=self.hasClass('scroll-left'),
                tabCon=$('#tabCon'),
                scrollLeft=Math.abs(tabCon.position().left),
                tabWrapWidth=tabCon.parent().width();

            if(getTabsWidth()<=tabWrapWidth){return; }
            if(isLeft){
                scrollLeft=scrollLeft-120<=0?0:scrollLeft-120;
            } else {
                scrollLeft+=120;
            }
            tabCon.parent().animate({ scrollLeft: scrollLeft }, "fast");
        });

        //重新设置tab栏宽度
        $(window).on('resize',setTabConWidth);
    }

    /**
     * 添加页面
     * @param    {String}                 url   
     * @param    {String}                 title 标题
     * @param    {String}                 tag   
     */
    function addPage(url,title,tag){
    	var tabCon=$('#tabCon'),
    		panelCon=$('#panelCon'),
            selTab=tabCon.find('[data-tag='+tag+']'),
            tabWrapWidth=tabCon.parent().width();

    	if(!selTab.length){
            selTab=$('<div class="tab" data-tag="'+tag+'">'+title+'<i class="fa fa-remove"></i></div>');
            tabCon.append(selTab);
            panelCon.append('<div data-tag="'+tag+'"><iframe src="'+url+'" frameborder="0" style="height:'+($(window).height()-100)+'px;"></iframe></div>');
            setTabConWidth();
    	}
    	selectTab(tag);
    }

    /**
     * 关闭页面
     * @param    {String}                 tag 
     */
    function removePage(tag){
    	var selTab=$('#tabCon').find('[data-tag='+tag+']'),
    		selPanel=$('#panelCon').find('[data-tag='+tag+']'),
    		nextTab=null;

    	if(!selTab.length){return}
        //当前要关闭的tab已经处于选中状态则需要在关闭后选中下一个
    	if(selTab.hasClass('active')){
    		nextTab=selTab.prev().length?selTab.prev():selTab.next();
    		if(nextTab.length){
    			selectTab(nextTab.attr('data-tag'));
    		}
    	}
    	selTab.remove();
    	selPanel.remove();
    }

    /**
     * 选择页面
     * @param    {String}                 tag 
     */
    function selectTab(tag){
    	var tabCon=$('#tabCon'),
            selTab=tabCon.find('[data-tag='+tag+']'),
    		selPanel=$('#panelCon').find('[data-tag='+tag+']'),
            selTabLeft=selTab.position().left,
            tabWrapWidth=tabCon.parent().width();
        //不在tab栏显示范围则滚动到可视范围内
        if(selTabLeft<0||selTabLeft>tabWrapWidth){
            $('#tabCon').parent().animate({ scrollLeft: selTabLeft }, "slow");
        }
    	if(selTab.hasClass('active')){return;}
    	selTab.addClass('active').siblings().removeClass('active');
    	selPanel.show().siblings().hide();
    }

    /**
     * 设置tab栏宽度
     */
    function setTabConWidth(){
        var tabCon=$('#tabCon'),
            tabWrapWidth=tabCon.parent().width();
        tabCon.css('width',Math.max(getTabsWidth(),tabWrapWidth)+'px'); 
    }

    /**
     * 获取tab宽度
     */
    function getTabsWidth(){
        var width=0;
        $('#tabCon').find('.tab').each(function(i,item){
            width+=$(item).outerWidth(true);
        });
        return Math.ceil(width+10);
    }

