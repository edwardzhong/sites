var con=document.getElementById('container');
var pie=new Pie(con);
pie.init({
    W:800,
    H:600,
    title:'网站用户访问来源',
    toolTip:'访问来源',
    data:[
        {value:435, name:'直接访问'},
        {value:310, name:'邮件营销'},
        {value:234, name:'联盟广告'},
        {value:135, name:'视频广告'},
        {value:1548, name:'搜索引擎'}
    ]
});