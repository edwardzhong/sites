const cvs = 'attribute vec4 a_position; attribute vec4 a_normal; uniform mat4 u_vpMatrix; uniform mat4 u_modelMatrix; varying vec3 v_position; varying vec3 v_normal; void main() { v_position = (u_modelMatrix * a_position).xyz; v_normal = vec3(u_modelMatrix * a_normal); gl_Position = u_vpMatrix * u_modelMatrix * a_position; }';
const cfs = 'precision highp float; varying vec3 v_position; varying vec3 v_normal; uniform samplerCube u_texture; uniform vec3 u_viewPosition; void main() { vec3 normal = normalize(v_normal); vec3 eyeToSurfaceDir = normalize(v_position - u_viewPosition); vec3 direction = reflect(eyeToSurfaceDir,normal); gl_FragColor = textureCube(u_texture, direction); }';
const vs = 'attribute vec4 a_position; uniform mat4 u_vpMatrix; varying vec3 v_normal; void main() { gl_Position =  u_vpMatrix * a_position; v_normal = normalize(a_position.xyz); }';
const fs = 'precision highp float; varying vec3 v_normal; uniform samplerCube u_texture; void main() { gl_FragColor = textureCube(u_texture, normalize(v_normal)); } ';
const canvas = document.getElementById("canvas");
const gl = get3DContext(canvas, true);

let box = {
    position:[
        -1, -1, -1,
        -1,  1, -1,
        1, -1,  -1,
        -1,  1, -1,
        1,  1,  -1,
        1, -1,  -1,

        -1, -1,  1,
        1, -1,   1,
        -1,  1,  1,
        -1,  1,  1,
        1, -1,   1,
        1,  1,   1,

        -1,  1, -1,
        -1,  1,  1,
        1,   1, -1,
        -1,  1,  1,
        1,   1,  1,
        1,   1, -1,

        -1, -1, -1,
        1,  -1, -1,
        -1, -1, 1,
        -1, -1, 1,
        1,  -1, -1,
        1,  -1,  1,

        -1,  -1, -1,
        -1,  -1,  1,
        -1,   1, -1,
        -1,  -1,  1,
        -1,   1,  1,
        -1,   1, -1,

        1,  -1, -1,
        1,   1, -1,
        1,  -1,  1,
        1,  -1,  1,
        1,   1, -1,
        1,   1,  1,
    ]
};
const normal=[
        0, 0, -1,
        0, 0, -1,
        0, 0, -1,
        0, 0, -1,
        0, 0, -1,
        0, 0, -1,

        0, 0, 1,
        0, 0, 1,
        0, 0, 1,
        0, 0, 1,
        0, 0, 1,
        0, 0, 1,

        0, 1, 0,
        0, 1, 0,
        0, 1, 0,
        0, 1, 0,
        0, 1, 0,
        0, 1, 0,

        0, -1, 0,
        0, -1, 0,
        0, -1, 0,
        0, -1, 0,
        0, -1, 0,
        0, -1, 0,

        -1, 0, 0,
        -1, 0, 0,
        -1, 0, 0,
        -1, 0, 0,
        -1, 0, 0,
        -1, 0, 0,

        1, 0, 0,
        1, 0, 0,
        1, 0, 0,
        1, 0, 0,
        1, 0, 0,
        1, 0, 0,
    ];
const program = createProgramInfo(gl, vs, fs);
const buffer = createBufferInfoFromArrays( gl, box );
const vao =  createVertexArrayInfo(gl, program, buffer);

box.normal = normal;
const cProgram = createProgramInfo(gl, cvs, cfs);
const cBuffer =  createBufferInfoFromArrays( gl, box );
const cVao =  createVertexArrayInfo(gl, cProgram, cBuffer);

const viewPosition = new Vector3([0,0,1.5]);
const lookAt = [0, 0, 0];
const vpMatrix = new Matrix4();
const cameraMatrix = new Matrix4();
const modelMatrix = new Matrix4();

modelMatrix.setScale(0.15,0.15,0.15);
let viewPoint = null;

// 设置背景颜色
gl.clearColor(0.0, 0.0, 0.0, 1.0);
// 开启隐藏面消除
gl.enable(gl.DEPTH_TEST);
gl.viewport(0, 0, canvas.width, canvas.height);

createTexture(gl,{ target: gl.TEXTURE_CUBE_MAP, src:[
    '../img/sorbin_rt.jpg',
    '../img/sorbin_lf.jpg',
    '../img/sorbin_up.jpg',
    '../img/sorbin_dn.jpg',
    '../img/sorbin_bk.jpg',
    '../img/sorbin_ft.jpg',
]}, function(){
    document.getElementById('loading').style.display='none';
    draw();
});

function draw(){
    cameraMatrix.rotate(0.2,0,1,0);
    viewPoint = cameraMatrix.multiplyVector3(viewPosition);
    vpMatrix.setPerspective( 30, canvas.width / canvas.height, 0.1, 5 );
    vpMatrix.lookAt(...viewPoint.elements, ...lookAt, 0, 1, 0);

    vpMatrix.elements[12] = 0;
    vpMatrix.elements[13] = 0;
    vpMatrix.elements[14] = 0;

    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    //天空盒
    gl.useProgram(program.program);
    // 禁止写入深度缓存，造成背景在很远的假象
    gl.depthMask(false);
    gl.disable(gl.CULL_FACE);

    setBuffersAndAttributes(gl, program, vao);
    setUniforms(program, {  
        u_texture:0,
        u_vpMatrix: vpMatrix.elements
    });
    gl.drawArrays(gl.TRIANGLES, 0, vao.count);

    //立方体
    gl.useProgram(cProgram.program);
    gl.depthMask(true);
    gl.enable(gl.CULL_FACE);

    modelMatrix.rotate(0.5,1,1,1);
    setBuffersAndAttributes(gl, cProgram, cVao);
    setUniforms(cProgram, {
        u_texture:0,
        u_vpMatrix: vpMatrix.elements,
        u_viewPosition: viewPoint.elements,
        u_modelMatrix: modelMatrix.elements
    });
    gl.drawArrays(gl.TRIANGLES, 0, cVao.count);
    requestAnimationFrame(draw);
}