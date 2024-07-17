"use strict";

var gl;
var theta = 0.0;
var thetaLoc;
var point = 5.0;
var pointSizeLoc;
var delay = 100;
var direction = true;
var stop = false;

window.onload = function init() {
    var canvas = document.getElementById( "gl-canvas" );

    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }

    var vertices = [
        // For J
        // 3
        vec2(-0.85, 0.25),
        vec2(-0.85, 0.2),
        vec2(-0.35, 0.25),

        // 6
        vec2(-0.35, 0.25),
        vec2(-0.35, 0.2),
        vec2(-0.85, 0.2),

        // 9
        vec2(-0.625, 0.2),
        vec2(-0.575, 0.2),
        vec2(-0.575, -0.1),

        // 12
        vec2(-0.625, 0.2),
        vec2(-0.625, -0.1),
        vec2(-0.575, -0.1),

        // 15
        vec2(-0.625, -0.1),
        vec2(-0.575, -0.1),
        vec2(-0.575, -0.15),

        // 18
        vec2(-0.625, -0.1),
        vec2(-0.625, -0.2),
        vec2(-0.575, -0.15),

        // 21
        vec2(-0.675, -0.15),
        vec2(-0.625, -0.1),
        vec2(-0.625, -0.2),

        // 24
        vec2(-0.675, -0.15),
        vec2(-0.675, -0.2),
        vec2(-0.625, -0.2),

        // 27
        vec2(-0.675, -0.15),
        vec2(-0.675, -0.2),
        vec2(-0.725, -0.2),

        // 30
        vec2(-0.675, -0.15),
        vec2(-0.725, -0.15),
        vec2(-0.725, -0.2),

        // 33
        vec2(-0.725, -0.2),
        vec2(-0.725, -0.15),
        vec2(-0.775, -0.2),

        // 36
        vec2(-0.725, -0.15),
        vec2(-0.775, -0.2),
        vec2(-0.775, -0.1),

        // 39
        vec2(-0.775, -0.1),
        vec2(-0.775, -0.2),
        vec2(-0.825, -0.15),

        // 42
        vec2(-0.825, -0.15),
        vec2(-0.825, -0.1),
        vec2(-0.775, -0.1),

        // 45
        vec2(-0.775, -0.2),
        vec2(-0.625, -0.2),
        vec2(-0.7, -0.25),


        // For S
        // 5
        vec2(0.11, 0.16),
        vec2(0.11, 0.18),
        vec2(0.1, 0.2),
        vec2(0.09, 0.22),
        vec2(0.07, 0.23),

        // 10
        vec2(0.05, 0.24),
        vec2(0.03, 0.2455),
        vec2(0, 0.25),
        vec2(-0.03, 0.2455),
        vec2(-0.05, 0.24),

        // 15
        vec2(-0.07, 0.23),
        vec2(-0.09, 0.22),
        vec2(-0.11, 0.21),
        vec2(-0.12, 0.19),
        vec2(-0.125, 0.17),

        // 20
        vec2(-0.125, 0.14),
        vec2(-0.125, 0.12),
        vec2(-0.12, 0.1),
        vec2(-0.11, 0.08),
        vec2(-0.1, 0.06),

        // 25
        vec2(-0.09, 0.04),
        vec2(-0.07, 0.02),
        vec2(-0.05, 0.01),
        vec2(-0.03, 0.0005),
        vec2(0, 0),

        // 30
        vec2(0.03, -0.0005),
        vec2(0.05, -0.01),
        vec2(0.07, -0.02),
        vec2(0.09, -0.04),
        vec2(0.1, -0.06),

        // 35
        vec2(0.11, -0.08),
        vec2(0.12, -0.1),
        vec2(0.125, -0.12),
        vec2(0.125, -0.14),
        vec2(0.125, -0.17),

        // 40
        vec2(0.12, -0.19),
        vec2(0.11, -0.21),
        vec2(0.09, -0.22),
        vec2(0.07, -0.23),
        vec2(0.05, -0.24),

        // 45
        vec2(0.03, -0.2455),
        vec2(0, -0.25),
        vec2(-0.03, -0.2455),
        vec2(-0.05, -0.24),
        vec2(-0.07, -0.23),

        // 49
        vec2(-0.09, -0.22),
        vec2(-0.1, -0.2),
        vec2(-0.11, -0.18),
        vec2(-0.11, -0.16),


        // For K
        // 2
        vec2(0.35, 0.25),
        vec2(0.35, -0.25),

        // 4
        vec2(0.4, -0.25),
        vec2(0.4, -0.05),

        // 6
        vec2(0.6, -0.25),
        vec2(0.65, -0.25),

        // 8
        vec2(0.4, 0),
        vec2(0.65, 0.25),

        // 10
        vec2(0.6, 0.25),
        vec2(0.4, 0.05),

        // 11
        vec2(0.4, 0.25)

    ];

    //  Configure WebGL
    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 1., 1., 1.0, 1.0 );

    gl.lineWidth(1.0)

    document.getElementById("stop").onclick = function() {
        stop = !stop;
    }

    document.getElementById("control").onclick = function (event) {
        switch (event.target.index){
            case 0:
                direction = !direction;
                break;

            case 1:
                delay /= 5.0;
                break;

            case 2:
                delay *= 5.0;
                break;
        }
    }

    window.onkeydown = function(event) {
        var key = String.fromCharCode(event.keyCode);
        switch (key){
            case '0':
                delay = 100;
                theta = 0.0;
                point = 5.0;
                break;

            case '1':
                point += 0.5;
                break;

            case '2':
                point -= 0.5;
                break;
        }

    }

    //  Load shaders and initialize webGL shader program
    var program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );

    // Load the location of uniform variables from program
    thetaLoc = gl.getUniformLocation( program, "theta" );
    pointSizeLoc = gl.getUniformLocation( program, "pointSize" );

    // Load the data into the GPU
    var bufferId = gl.createBuffer(); // Generate buffer
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferId ); // Connect generated buffer with webGL
    gl.bufferData( gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW ); // Load data into webGL

    // Update the location of attribute variables from program
    var vPosition = gl.getAttribLocation( program, "vPosition" );

    // Set vertex attribute matrix for noticing how to read vertex data to program
    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );

    render();
};

function render() {
    gl.clear( gl.COLOR_BUFFER_BIT );

    theta += (stop ? 0 : (direction ? 0.1 : -0.1));

    gl.uniform1f(thetaLoc, theta);
    gl.uniform1f(pointSizeLoc, point);

    gl.drawArrays( gl.TRIANGLES, 0, 45 );
    gl.drawArrays( gl.POINTS, 45, 49 );
    gl.drawArrays( gl.LINE_LOOP, 94, 11)

    setTimeout(function(){
        requestAnimFrame(render);
    }, delay);
}