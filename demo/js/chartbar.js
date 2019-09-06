var con=document.getElementById('container');
var chart=new Bar(con);
chart.init({
    title:'全年降雨量柱状图',
    xAxis:{
        data:['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月']
    },
    yAxis:{
        name:'水量',
        formatter:'{value} ml'
    },
    series:[
        {
            name:'东部降水量',
            data:[62,20,17,45,100,56,19,38,50,120,56,130]
        },
        {
            name:'西部降水量',
            data:[52,10,17,25,60,39,19,48,70,30,56,8]
        },
        {
            name:'南部降水量',
            data:[12,10,17,25,27,39,50,38,100,30,56,90]
        },
        {
            color:'hsla(270,80%,60%,1)',
            name:'北部降水量',
            data:[12,30,17,25,7,39,49,38,60,30,56,10]
        }
    ]
});