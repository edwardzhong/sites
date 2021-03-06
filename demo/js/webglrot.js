const vs = 'attribute vec4 a_Position; uniform mat4 u_xformMatrix; void main() { gl_Position=u_xformMatrix*a_Position; }';
const fs = 'precision mediump float; uniform vec4 u_FragColor; void main() { gl_FragColor = u_FragColor; }';

const canvas = document.getElementById('canvas');
const gl = get3DContext(canvas,true);

function get3DContext(canvas, opt) {
    const names = ["webgl", "experimental-webgl"];
    let context = null;
    for (let i = 0, len = names.length; i < len; i++) {
        context = canvas.getContext(names[i], opt);
        if (context) {
            break;
        }
    }
    return context;
}

function createProgramBySource(gl, ...shaders) {
    if(Array.isArray(shaders[0])) { shaders = shaders[0]; }//传的是数组
    // 创建着色器对象
    const vertexShader = loadShader(gl, gl.VERTEX_SHADER, shaders[0]);
    const fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, shaders[1]);
    if (!vertexShader || !fragmentShader) {
        return null;
    }

    // 创建程序对象
    const program = gl.createProgram();
    if (!program) {
        return null;
    }

    // 为程序对象分配着色器
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);

    // 连接程序对象
    gl.linkProgram(program);

    // 检查连接结果
    const linked = gl.getProgramParameter(program, gl.LINK_STATUS);
    if (!linked) {
        const error = gl.getProgramInfoLog(program);
        console.log('Failed to link program: ' + error);
        gl.deleteProgram(program);
        gl.deleteShader(fragmentShader);
        gl.deleteShader(vertexShader);
        return null;
    }
    return program;
}
function loadShader(gl, type, source) {
    // 创建着色器对象
    const shader = gl.createShader(type);
    if (!shader) {
        console.log('unable to create shader');
        return null;
    }

    // 向着色器程序填充代码
    gl.shaderSource(shader, source);

    // 编译着色器
    gl.compileShader(shader);

    // 检查编译结果
    const compiled = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
    if (!compiled) {
        const error = gl.getShaderInfoLog(shader);
        console.log('Failed to compile shader: ' + error);
        gl.deleteShader(shader);
        return null;
    }

    return shader;
}
function createBuffer(data){  
    // 生成缓存对象  
    var buffer = gl.createBuffer();  
    if (!buffer) {
        console.log('Failed to create the buffer object');
        return null;
    }
    // 绑定缓存  
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);  
    
    // 向缓存中写入数据  
    gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);  
    
    // 将绑定的缓存设为无效  
    // gl.bindBuffer(gl.ARRAY_BUFFER, null);  
    
    // 返回生成的buffer  
    return buffer;
} 

function main() {
    if (!gl) {
        console.log('Failed to get the rendering context for WebGL');
        return;
    }
    const program = createProgramBySource(gl, vs, fs);
    if (!program) {
        console.log('Failed to intialize shaders.');
        return;
    }
    gl.useProgram(program);
    
    // 创建缓冲区并传人顶点
    var vertices=new Float32Array([-0.5, 0.5,   -0.5, -0.5,   0.5, 0.5,　0.5, -0.5 ])
    if(!createBuffer(vertices)){
        console.log('Failed to create the buffer object');
        return;
    }

    // 获取顶点位置
    var a_Position = gl.getAttribLocation(program, 'a_Position');
    if (a_Position < 0) {
        console.log('Failed to get the storage location of a_Position');
        return;
    }

    // 分配缓冲区对象给a_Position变量
    // (地址,每个顶点分量的个数<1-4>,数据类型<整形，符点等>,是否归一化,指定相邻两个顶点间字节数<默认0>,指定缓冲区对象偏移量<默认0>)
    gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0);

    // Enable the assignment to a_Position variable
    gl.enableVertexAttribArray(a_Position);


    // 获取 u_FragColor变量的存储地址并赋值
    var u_FragColor = gl.getUniformLocation(program, 'u_FragColor');
    if (!u_FragColor) {
        console.log('Failed to get the storage location of u_FragColor');
        return;
    }
    gl.uniform4f(u_FragColor, 1.0, 0.0, 0.0, 1.0);


    //矩阵变换(旋转+位移)
    var u_xformMatrix = gl.getUniformLocation(program, 'u_xformMatrix');
    if (!u_xformMatrix) {
        console.log('Failed to get the storage location of u_xformMatrix');
        return;
    }

    // 获取矩阵对象
    var xformMatrix=new Matrix4(),
        angle=0;

    gl.clearColor(0.0, 0.0, 0.0, 1.0);

    // 执行动画
    (function animate(){
        //绕z轴旋转
        xformMatrix.setRotate((angle++)%360,0,0,1);
        // xformMatrix.rotate(1,0,0,1);
        xformMatrix.translate(0.6,0,1);

        // v表示可以向着色器传输多个数值(地址变量,webgl中必须false,矩阵)
        gl.uniformMatrix4fv(u_xformMatrix,false,xformMatrix.elements);

        gl.clear(gl.COLOR_BUFFER_BIT);

        // (基本图形，第几个顶点，执行几次)，修改基本图形项可以生成点，线，三角形，矩形，扇形等
        gl.drawArrays(gl.TRIANGLES, 0, 3);

        requestAnimationFrame(animate);
    }());
}

main();