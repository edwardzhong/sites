var con=document.getElementById('container');
var line = new Line(con);
line.init({
    title:'未来一周气温变化',
    xAxis:{
        data:['周一','周二','周三','周四','周五','周六','周日']
    },
    yAxis:{
        name:'温度',
        formatter:'{value} °C'
    },
    series:[
        {
            name:'最高气温',
            data:[11, 11, 15, 13, 12, 13, 10]
        },
        {
            name:'最低气温',
            data:[1, -2, 2, 5, 3, 2, 0]
        }   
    ]
})