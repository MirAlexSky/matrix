let canvasEl = document.querySelector('#canvas1');

let gl = null;

try {
    gl = canvasEl.getContext("webgl") ||
        canvas.getContext("experimental-webgl");
} catch (e) {}

if (gl) {
    let shaderV = createShader(gl, gl.VERTEX_SHADER, '#shader-vs');
    let shaderFrame = createShader(gl, gl.FRAGMENT_SHADER, '#shader-fs');

    let program = createProgram(gl, shaderV, shaderFrame);
    gl.useProgram(program);

    program.positionAttributeLocation = gl.getAttribLocation(program, 'aVertexPosition');
    program.positionAttributeColor = gl.getAttribLocation(program, 'aVertexColor');
    gl.enableVertexAttribArray(program.positionAttributeLocation);
    gl.enableVertexAttribArray(program.positionAttributeColor);

    drawIt(gl, program);
}
else
    alert('Да пошёл ты нахуй');

function drawIt(gl, program)
{
    let vertexBuffer,
        indexBuffer;

    let colorBuffer;

    let vertices = [
        -0.5, -0.5, 0.0,
        -0.5, 0.5, 0.0,
        0.0, 0.0, 0.0,
        0.5, 0.5, 0.0,
        0.5, -0.5, 0.0
    ];

    let colors = [
        1.0, 0.0, 0.0,
        1.0, 1.0, 0.0,
        1.0, 1.0, 1.0,
        0.0, 1.0, 0.0,
        0.0, 0.0, 1.0
    ];

    let indexes = [0,1,2,0,3,2];

    vertexBuffer = gl.createBuffer();

    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

    vertexBuffer.itemSize = 3;
    vertexBuffer.numberOfItems = vertices.length / vertexBuffer.itemSize;

    indexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indexes), gl.STATIC_DRAW);
    indexBuffer.numberOFItems = vertices.length / vertexBuffer.itemSize;

    colorBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);
    colorBuffer.itemSize = 3;

    gl.viewport(0,0, canvasEl.width, canvasEl.height);

    gl.clearColor(0.0, 0.0, 0.0, 1.0); // настройка цвета
    gl.clear(gl.COLOR_BUFFER_BIT); // тут можно добавить другой буфер


    // порядок важен
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.vertexAttribPointer(program.positionAttributeLocation,
        vertexBuffer.itemSize, gl.FLOAT, false, 0, 0);

    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);

    gl.vertexAttribPointer(program.positionAttributeColor,
        colorBuffer.itemSize, gl.FLOAT, false, 0, 0);

    gl.drawArrays(gl.TRIANGLE_STRIP, 0, indexBuffer.numberOFItems);
}

function createShader(gl, type, id) {

    let source = document.querySelector(id).innerHTML;
    let shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        alert('Ошибка компиляции');
    }

    return shader;
}

function createProgram(gl, shaderV, shaderFragment) {
    let program = gl.createProgram();

    gl.attachShader(program, shaderV)
    gl.attachShader(program, shaderFragment)

    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        alert('Не удалось установить программу');
    }

    return program;
}
