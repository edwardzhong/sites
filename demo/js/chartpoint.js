
var con=document.getElementById('container');
var point =new Point(con);
point.init({
    W:900,
    H:600,
    title:'1990 与 2015 年各国家人均寿命与 GDP',
    xAxis:{
        name:'GDP',
        data:[10000,20000,30000,40000,50000,60000,70000],
        formatter:'$ {value}'
    },
    yAxis:{
        name:'AGE'
    },
    desc:{
        xVal:'gdp',
        yVal:'age',
        num:'number'
    },
    series:[{
        name:'1990',
        data:[
            {xVal:28604,yVal:77,num:17096869,name:'Australia'},
            {xVal:31163,yVal:77.4,num:27662440,name:'Canada'},
            {xVal:1516,yVal:68,num:1154605773,name:'China'},
            {xVal:13670,yVal:74.7,num:10582082,name:'Cuba'},
            {xVal:28599,yVal:75,num:4986705,name:'Finland'},
            {xVal:29476,yVal:77.1,num:56943299,name:'France'},
            {xVal:31476,yVal:75.4,num:78958237,name:'Germany'},
            {xVal:28666,yVal:78.1,num:254830,name:'Iceland'},
            {xVal:1777,yVal:57.7,num:870601776,name:'India'},
            {xVal:29550,yVal:79.1,num:122249285,name:'Japan'},
            {xVal:2076,yVal:67.9,num:20194354,name:'North Korea'},
            {xVal:12087,yVal:72,num:42972254,name:'South Korea'},
            {xVal:24021,yVal:75.4,num:3397534,name:'New Zealand'},
            {xVal:43296,yVal:76.8,num:4240375,name:'Norway'},
            {xVal:10088,yVal:70.8,num:38195258,name:'Poland'},
            {xVal:19349,yVal:69.6,num:147568552,name:'Russia'},
            {xVal:10670,yVal:67.3,num:53994605,name:'Turkey'},
            {xVal:26424,yVal:75.7,num:57110117,name:'United Kingdom'},
            {xVal:37062,yVal:75.4,num:252847810,name:'United States'}]
        },
        {
        name:'2015',
        data:[
            {xVal:44056,yVal:81.8,num:23968973,name:'Australia'},
            {xVal:43294,yVal:81.7,num:35939927,name:'Canada'},
            {xVal:13334,yVal:76.9,num:1376048943,name:'China'},
            {xVal:21291,yVal:78.5,num:11389562,name:'Cuba'},
            {xVal:38923,yVal:80.8,num:5503457,name:'Finland'},
            {xVal:37599,yVal:81.9,num:64395345,name:'France'},
            {xVal:44053,yVal:81.1,num:80688545,name:'Germany'},
            {xVal:42182,yVal:82.8,num:329425,name:'Iceland'},
            {xVal:5903,yVal:66.8,num:1311050527,name:'India'},
            {xVal:36162,yVal:83.5,num:126573481,name:'Japan'},
            {xVal:1390,yVal:71.4,num:25155317,name:'North Korea'},
            {xVal:34644,yVal:80.7,num:50293439,name:'South Korea'},
            {xVal:34186,yVal:80.6,num:4528526,name:'New Zealand'},
            {xVal:64304,yVal:81.6,num:5210967,name:'Norway'},
            {xVal:24787,yVal:77.3,num:38611794,name:'Poland'},
            {xVal:23038,yVal:73.13,num:143456918,name:'Russia'},
            {xVal:19360,yVal:76.5,num:78665830,name:'Turkey'},
            {xVal:38225,yVal:81.4,num:64715810,name:'United Kingdom'},
            {xVal:53354,yVal:79.1,num:321773631,name:'United States'}]
    }]
});