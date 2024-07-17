"use strict";

var gl;
var modelViewMatrix;
var modelViewMatrixLoc;
var pointSizeLoc;
var theta = [0, 0, 0];
var xAxis = 0;
var yAxis = 1;
var zAxis = 2;
var stop = false;
var x_axis = false
var y_axis = false
var z_axis = false
var x = 0;
var y = 0;
var z = 0;
var scale = [1, 1, 1];
var initialModelViewMatrix;


window.onload = function init() {
    var canvas = document.getElementById( "gl-canvas" );

    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }

    var vertices = [
        // For J front
        // 3
        vec3(-0.85, 0.25, 0),
        vec3(-0.85, 0.2, 0),
        vec3(-0.35, 0.25, 0),

        // 6
        vec3(-0.35, 0.25, 0),
        vec3(-0.35, 0.2, 0),
        vec3(-0.85, 0.2, 0),

        // 9
        vec3(-0.625, 0.2, 0),
        vec3(-0.575, 0.2, 0),
        vec3(-0.575, -0.1, 0),

        // 12
        vec3(-0.625, 0.2, 0),
        vec3(-0.625, -0.1, 0),
        vec3(-0.575, -0.1, 0),

        // 15
        vec3(-0.625, -0.1, 0),
        vec3(-0.575, -0.1, 0),
        vec3(-0.575, -0.15, 0),

        // 18
        vec3(-0.625, -0.1, 0),
        vec3(-0.625, -0.2, 0),
        vec3(-0.575, -0.15, 0),

        // 21
        vec3(-0.675, -0.15, 0),
        vec3(-0.625, -0.1, 0),
        vec3(-0.625, -0.2, 0),

        // 24
        vec3(-0.675, -0.15, 0),
        vec3(-0.675, -0.2, 0),
        vec3(-0.625, -0.2, 0),

        // 27
        vec3(-0.675, -0.15, 0),
        vec3(-0.675, -0.2, 0),
        vec3(-0.725, -0.2, 0),

        // 30
        vec3(-0.675, -0.15, 0),
        vec3(-0.725, -0.15, 0),
        vec3(-0.725, -0.2, 0),

        // 33
        vec3(-0.725, -0.2, 0),
        vec3(-0.725, -0.15, 0),
        vec3(-0.775, -0.2, 0),

        // 36
        vec3(-0.725, -0.15, 0),
        vec3(-0.775, -0.2, 0),
        vec3(-0.775, -0.1, 0),

        // 39
        vec3(-0.775, -0.1, 0),
        vec3(-0.775, -0.2, 0),
        vec3(-0.825, -0.15, 0),

        // 42
        vec3(-0.825, -0.15, 0),
        vec3(-0.825, -0.1, 0),
        vec3(-0.775, -0.1, 0),

        // 45
        vec3(-0.775, -0.2, 0),
        vec3(-0.625, -0.2, 0),
        vec3(-0.7, -0.25, 0),

        // For J back
        // 3
        vec3(-0.85, 0.25, 0.05),
        vec3(-0.85, 0.2, 0.05),
        vec3(-0.35, 0.25, 0.05),

        // 6
        vec3(-0.35, 0.25, 0.05),
        vec3(-0.35, 0.2, 0.05),
        vec3(-0.85, 0.2, 0.05),

        // 9
        vec3(-0.625, 0.2, 0.05),
        vec3(-0.575, 0.2, 0.05),
        vec3(-0.575, -0.1, 0.05),

        // 12
        vec3(-0.625, 0.2, 0.05),
        vec3(-0.625, -0.1, 0.05),
        vec3(-0.575, -0.1, 0.05),

        // 15
        vec3(-0.625, -0.1, 0.05),
        vec3(-0.575, -0.1, 0.05),
        vec3(-0.575, -0.15, 0.05),

        // 18
        vec3(-0.625, -0.1, 0.05),
        vec3(-0.625, -0.2, 0.05),
        vec3(-0.575, -0.15, 0.05),

        // 21
        vec3(-0.675, -0.15, 0.05),
        vec3(-0.625, -0.1, 0.05),
        vec3(-0.625, -0.2, 0.05),

        // 24
        vec3(-0.675, -0.15, 0.05),
        vec3(-0.675, -0.2, 0.05),
        vec3(-0.625, -0.2, 0.05),

        // 27
        vec3(-0.675, -0.15, 0.05),
        vec3(-0.675, -0.2, 0.05),
        vec3(-0.725, -0.2, 0.05),

        // 30
        vec3(-0.675, -0.15, 0.05),
        vec3(-0.725, -0.15, 0.05),
        vec3(-0.725, -0.2, 0.05),

        // 33
        vec3(-0.725, -0.2, 0.05),
        vec3(-0.725, -0.15, 0.05),
        vec3(-0.775, -0.2, 0.05),

        // 36
        vec3(-0.725, -0.15, 0.05),
        vec3(-0.775, -0.2, 0.05),
        vec3(-0.775, -0.1, 0.05),

        // 39
        vec3(-0.775, -0.1, 0.05),
        vec3(-0.775, -0.2, 0.05),
        vec3(-0.825, -0.15, 0.05),

        // 42
        vec3(-0.825, -0.15, 0.05),
        vec3(-0.825, -0.1, 0.05),
        vec3(-0.775, -0.1, 0.05),

        // 45
        vec3(-0.775, -0.2, 0.05),
        vec3(-0.625, -0.2, 0.05),
        vec3(-0.7, -0.25, 0.05),

        // For J sides
        // 3
        vec3(-0.85, 0.25, 0),
        vec3(-0.85, 0.25, 0.05),
        vec3(-0.85, 0.2, 0),

        // 6
        vec3(-0.85, 0.2, 0),
        vec3(-0.85, 0.2, 0.05),
        vec3(-0.85, 0.25, 0.05),

        // 9
        vec3(-0.35, 0.25, 0),
        vec3(-0.35, 0.25, 0.05),
        vec3(-0.35, 0.2, 0),

        // 12
        vec3(-0.35, 0.2, 0),
        vec3(-0.35, 0.2, 0.05),
        vec3(-0.35, 0.25, 0.05),

        // 15
        vec3(-0.85, 0.25, 0),
        vec3(-0.85, 0.25, 0.05),
        vec3(-0.35, 0.25, 0),

        // 18
        vec3(-0.35, 0.25, 0),
        vec3(-0.35, 0.25, 0.05),
        vec3(-0.85, 0.25, 0.05),

        // 21
        vec3(-0.85, 0.2, 0),
        vec3(-0.85, 0.2, 0.05),
        vec3(-0.35, 0.2, 0),

        // 24
        vec3(-0.35, 0.2, 0),
        vec3(-0.35, 0.2, 0.05),
        vec3(-0.85, 0.2, 0.05),

        // 27
        vec3(-0.625, 0.2, 0),
        vec3(-0.625, 0.2, 0.05),
        vec3(-0.625, -0.1, 0),

        // 30
        vec3(-0.625, -0.1, 0),
        vec3(-0.625, -0.1, 0.05),
        vec3(-0.625, 0.2, 0.05),

        // 33
        vec3(-0.625, -0.1, 0),
        vec3(-0.625, -0.1, 0.05),
        vec3(-0.675, -0.15, 0),

        // 36
        vec3(-0.675, -0.15, 0),
        vec3(-0.675, -0.15, 0.05),
        vec3(-0.625, -0.1, 0.05),

        // 39
        vec3(-0.675, -0.15, 0),
        vec3(-0.675, -0.15, 0.05),
        vec3(-0.725, -0.15, 0),

        // 42
        vec3(-0.725, -0.15, 0),
        vec3(-0.725, -0.15, 0.05),
        vec3(-0.675, -0.15, 0.05),

        // 45
        vec3(-0.725, -0.15, 0),
        vec3(-0.725, -0.15, 0.05),
        vec3(-0.775, -0.1, 0),

        // 48
        vec3(-0.775, -0.1, 0),
        vec3(-0.775, -0.1, 0.05),
        vec3(-0.725, -0.15, 0.05),

        // 51
        vec3(-0.775, -0.1, 0),
        vec3(-0.775, -0.1, 0.05),
        vec3(-0.825, -0.1, 0),

        // 54
        vec3(-0.825, -0.1, 0),
        vec3(-0.825, -0.1, 0.05),
        vec3(-0.775, -0.1, 0.05),

        // 57
        vec3(-0.825, -0.1, 0),
        vec3(-0.825, -0.1, 0.05),
        vec3(-0.825, -0.15, 0),

        // 60
        vec3(-0.825, -0.15, 0),
        vec3(-0.825, -0.15, 0.05),
        vec3(-0.825, -0.1, 0),

        // 63
        vec3(-0.825, -0.15, 0),
        vec3(-0.825, -0.15, 0.05),
        vec3(-0.775, -0.2, 0),

        // 66
        vec3(-0.775, -0.2, 0),
        vec3(-0.775, -0.2, 0.05),
        vec3(-0.825, -0.15, 0.05),

        // 69
        vec3(-0.775, -0.2, 0),
        vec3(-0.775, -0.2, 0.05),
        vec3(-0.7, -0.25, 0),

        // 72
        vec3(-0.7, -0.25, 0),
        vec3(-0.7, -0.25, 0.05),
        vec3(-0.775, -0.2, 0.05),

        // 75
        vec3(-0.7, -0.25, 0),
        vec3(-0.7, -0.25, 0.05),
        vec3(-0.575, -0.15, 0),

        // 78
        vec3(-0.575, -0.15, 0),
        vec3(-0.575, -0.15, 0.05),
        vec3(-0.7, -0.25, 0.05),

        // 81
        vec3(-0.575, -0.15, 0),
        vec3(-0.575, -0.15, 0.05),
        vec3(-0.575, 0.2, 0),

        // 84
        vec3(-0.575, 0.2, 0),
        vec3(-0.575, 0.2, 0.05),
        vec3(-0.575, -0.15, 0.05),

        // For K Front
        // 2
        vec3(0.35, 0.25, 0),
        vec3(0.35, -0.25, 0),

        // 4
        vec3(0.4, -0.25, 0),
        vec3(0.4, -0.05, 0),

        // 6
        vec3(0.6, -0.25, 0),
        vec3(0.65, -0.25, 0),

        // 8
        vec3(0.4, 0, 0),
        vec3(0.65, 0.25, 0),

        // 10
        vec3(0.6, 0.25, 0),
        vec3(0.4, 0.05, 0),

        // 11
        vec3(0.4, 0.25, 0),

        // For K Back
        // 2
        vec3(0.35, 0.25, 0.05),
        vec3(0.35, -0.25, 0.05),

        // 4
        vec3(0.4, -0.25, 0.05),
        vec3(0.4, -0.05, 0.05),

        // 6
        vec3(0.6, -0.25, 0.05),
        vec3(0.65, -0.25, 0.05),

        // 8
        vec3(0.4, 0, 0.05),
        vec3(0.65, 0.25, 0.05),

        // 10
        vec3(0.6, 0.25, 0.05),
        vec3(0.4, 0.05, 0.05),

        // 11
        vec3(0.4, 0.25, 0.05),

        // For K Sides
        // 2
        vec3(0.35, 0.25, 0),
        vec3(0.35, 0.25, 0.05),

        // 4
        vec3(0.35, -0.25, 0),
        vec3(0.35, -0.25, 0.05),

        // 6
        vec3(0.4, -0.25, 0),
        vec3(0.4, -0.25, 0.05),

        // 8
        vec3(0.4, 0.25, 0),
        vec3(0.4, 0.25, 0.05),

        // 10
        vec3(0.6, -0.25, 0),
        vec3(0.6, -0.25, 0.05),

        // 12
        vec3(0.65, -0.25, 0),
        vec3(0.65, -0.25, 0.05),

        // 14
        vec3(0.6, 0.25, 0),
        vec3(0.6, 0.25, 0.05),

        // 16
        vec3(0.65, 0.25, 0),
        vec3(0.65, 0.25, 0.05),

        // For S Front
        // 2
        vec3(0.1, 0.1, 0),
        vec3(0.15, 0.1, 0),

        // 4
        vec3(0.15, 0.15, 0),
        vec3(0.05, 0.25, 0),

        // 6
        vec3(-0.05, 0.25, 0),
        vec3(-0.15, 0.15, 0),

        // 8
        vec3(-0.15, 0.05, 0),
        vec3(-0.05, -0.05, 0),

        // 10
        vec3(0.05, -0.05, 0),
        vec3(0.1, -0.1, 0),

        // 12
        vec3(0.1, -0.2, 0),
        vec3(0.05, -0.25, 0),

        // 14
        vec3(-0.05, -0.25, 0),
        vec3(-0.1, -0.2, 0),

        // 16
        vec3(-0.1, -0.15, 0),
        vec3(-0.15, -0.15, 0),

        // 18
        vec3(-0.15, -0.2, 0),
        vec3(-0.05, -0.3, 0),

        // 20
        vec3(0.05, -0.3, 0),
        vec3(0.15, -0.2, 0),

        // 22
        vec3(0.15, -0.1, 0),
        vec3(0.05, 0, 0),

        // 24
        vec3(-0.05, 0, 0),
        vec3(-0.1, 0.05, 0),

        // 26
        vec3(-0.1, 0.15, 0),
        vec3(-0.05, 0.2, 0),

        // 28
        vec3(0.05, 0.2, 0),
        vec3(0.1, 0.15, 0),

        // 29
        vec3(0.1, 0.1, 0),

        // For S back
        // 2
        vec3(0.1, 0.1, 0.05),
        vec3(0.15, 0.1, 0.05),

        // 4
        vec3(0.15, 0.15, 0.05),
        vec3(0.05, 0.25, 0.05),

        // 6
        vec3(-0.05, 0.25, 0.05),
        vec3(-0.15, 0.15, 0.05),

        // 8
        vec3(-0.15, 0.05, 0.05),
        vec3(-0.05, -0.05, 0.05),

        // 10
        vec3(0.05, -0.05, 0.05),
        vec3(0.1, -0.1, 0.05),

        // 12
        vec3(0.1, -0.2, 0.05),
        vec3(0.05, -0.25, 0.05),

        // 14
        vec3(-0.05, -0.25, 0.05),
        vec3(-0.1, -0.2, 0.05),

        // 16
        vec3(-0.1, -0.15, 0.05),
        vec3(-0.15, -0.15, 0.05),

        // 18
        vec3(-0.15, -0.2, 0.05),
        vec3(-0.05, -0.3, 0.05),

        // 20
        vec3(0.05, -0.3, 0.05),
        vec3(0.15, -0.2, 0.05),

        // 22
        vec3(0.15, -0.1, 0.05),
        vec3(0.05, 0, 0.05),

        // 24
        vec3(-0.05, 0, 0.05),
        vec3(-0.1, 0.05, 0.05),

        // 26
        vec3(-0.1, 0.15, 0.05),
        vec3(-0.05, 0.2, 0.05),

        // 28
        vec3(0.05, 0.2, 0.05),
        vec3(0.1, 0.15, 0.05),

        // 29
        vec3(0.1, 0.1, 0.05),


        // For S sides
        // 2
        vec3(0.1, 0.1, 0),
        vec3(0.1, 0.1, 0.05),

        // 4
        vec3(0.15, 0.1, 0),
        vec3(0.15, 0.1, 0.05),

        // 6
        vec3(0.15, 0.15, 0),
        vec3(0.15, 0.15, 0.05),

        // 8
        vec3(0.05, 0.25, 0),
        vec3(0.05, 0.25, 0.05),

        // 10
        vec3(-0.05, 0.25, 0),
        vec3(-0.05, 0.25, 0.05),

        // 12
        vec3(-0.15, 0.15, 0),
        vec3(-0.15, 0.15, 0.05),

        // 14
        vec3(-0.15, 0.05, 0),
        vec3(-0.15, 0.05, 0.05),

        // 16
        vec3(-0.05, -0.05, 0),
        vec3(-0.05, -0.05, 0.05),

        // 18
        vec3(0.05, -0.05, 0),
        vec3(0.05, -0.05, 0.05),

        // 20
        vec3(0.1, -0.1, 0),
        vec3(0.1, -0.1, 0.05),

        // 22
        vec3(0.1, -0.2, 0),
        vec3(0.1, -0.2, 0.05),

        // 24
        vec3(0.05, -0.25, 0),
        vec3(0.05, -0.25, 0.05),

        // 26
        vec3(-0.05, -0.25, 0),
        vec3(-0.05, -0.25, 0.05),

        // 28
        vec3(-0.1, -0.2, 0),
        vec3(-0.1, -0.2, 0.05),

        // 30
        vec3(-0.1, -0.15, 0),
        vec3(-0.1, -0.15, 0.05),

        // 32
        vec3(-0.15, -0.15, 0),
        vec3(-0.15, -0.15, 0.05),

        // 34
        vec3(-0.15, -0.2, 0),
        vec3(-0.15, -0.2, 0.05),

        // 36
        vec3(-0.05, -0.3, 0),
        vec3(-0.05, -0.3, 0.05),

        // 38
        vec3(0.05, -0.3, 0),
        vec3(0.05, -0.3, 0.05),

        // 40
        vec3(0.15, -0.2, 0),
        vec3(0.15, -0.2, 0.05),

        // 42
        vec3(0.15, -0.1, 0),
        vec3(0.15, -0.1, 0.05),

        // 44
        vec3(0.05, 0, 0),
        vec3(0.05, 0, 0.05),

        // 46
        vec3(-0.05, 0, 0),
        vec3(-0.05, 0, 0.05),

        // 48
        vec3(-0.1, 0.05, 0),
        vec3(-0.1, 0.05, 0.05),

        // 50
        vec3(-0.1, 0.15, 0),
        vec3(-0.1, 0.15, 0.05),

        // 52
        vec3(-0.05, 0.2, 0),
        vec3(-0.05, 0.2, 0.05),

        // 54
        vec3(0.05, 0.2, 0),
        vec3(0.05, 0.2, 0.05),
    ];

    //  Configure WebGL
    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 1., 1., 1.0, 1.0 );
    gl.lineWidth(1.0)

    document.getElementById("STOP").onclick = function() {
        stop = !stop;
        x = 0;
        y = 0;
        z = 0;
    }

    document.getElementById("X-AXIS").onclick = function() {
        scale = [1, 1, 1];
        x_axis = !x_axis;
        y_axis = false;
        z_axis = false;
    }

    document.getElementById("Y-AXIS").onclick = function() {
        scale = [1, 1, 1];
        y_axis = !y_axis;
        x_axis = false;
        z_axis = false;
    }

    document.getElementById("Z-AXIS").onclick = function() {
        scale = [1, 1, 1];
        z_axis = !z_axis;
        x_axis = false;
        y_axis = false;
    }

    document.getElementById("TRANSLATE_X").onclick = function() {
        x_axis = false;
        y_axis = false;
        z_axis = false;
        x += 0.001;
        y = 0;
        z = 0;
    }

    document.getElementById("TRANSLATE_Y").onclick = function() {
        x_axis = false;
        y_axis = false;
        z_axis = false;
        x = 0;
        y += 0.001;
        z = 0;
    }

    document.getElementById("TRANSLATE_Z").onclick = function() {
        x_axis = false;
        y_axis = false;
        z_axis = false;
        x = 0;
        y = 0;
        z += 0.001;
    }

    document.getElementById("TRANSLATE_-X").onclick = function() {
        x_axis = false;
        y_axis = false;
        z_axis = false;
        x -= 0.001;
        y = 0;
        z = 0;
    }

    document.getElementById("TRANSLATE_-Y").onclick = function() {
        x_axis = false;
        y_axis = false;
        z_axis = false;
        x = 0;
        y -= 0.001;
        z = 0;
    }

    document.getElementById("TRANSLATE_-Z").onclick = function() {
        x_axis = false;
        y_axis = false;
        z_axis = false;
        x = 0;
        y = 0;
        z -= 0.001;
    }

    document.getElementById("RESET").onclick = function() {
        modelViewMatrix = initialModelViewMatrix;
        theta = [0, 0, 0];
        x = 0;
        y = 0;
        z = 0;
        scale = [1, 1, 1];
        stop = false;
        x_axis = false;
        y_axis = false;
        z_axis = false;
    }

    document.getElementById("SCALE_x_plus").onclick = function() {
        scale[0] += 0.01;
    }

    document.getElementById("SCALE_x_minus").onclick = function() {
        scale[0] -= 0.01;
    }

    document.getElementById("SCALE_y_plus").onclick = function() {
        scale[1] += 0.01;
    }

    document.getElementById("SCALE_y_minus").onclick = function() {
        scale[1] -= 0.01;
    }

    document.getElementById("SCALE_z_plus").onclick = function() {
        scale[2] += 0.01;
    }

    document.getElementById("SCALE_z_minus").onclick = function() {
        scale[2] -= 0.01;
    }

    document.getElementById("camera_x_change").onclick = function() {
        modelViewMatrix = lookAt(vec3(1, 0, 0), vec3(0, 0, 0), vec3(0, 1, 0));
    }

    document.getElementById("camera_y_change").onclick = function() {
        modelViewMatrix = lookAt(vec3(0, 1, 0), vec3(0, 0, 0), vec3(1, 0, 0));
    }

    document.getElementById("camera_z_change").onclick = function() {
        modelViewMatrix = lookAt(vec3(0, 0, 1), vec3(0, 0, 0), vec3(0, 1, 0));
    }

    document.getElementById("camera_-x_change").onclick = function() {
        modelViewMatrix = lookAt(vec3(-1, 0, 0), vec3(0, 0, 0), vec3(0, -1, 0));
    }

    document.getElementById("camera_-y_change").onclick = function() {
        modelViewMatrix = lookAt(vec3(0, -1, 0), vec3(0, 0, 0), vec3(-1, 0, 0));
    }

    document.getElementById("camera_-z_change").onclick = function() {
        modelViewMatrix = lookAt(vec3(0, 0, -1), vec3(0, 0, 0), vec3(0, -1, 0));
    }

    //  Load shaders and initialize webGL shader program
    var program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );

    pointSizeLoc = gl.getUniformLocation(program, "pointSize");

    modelViewMatrix = lookAt(vec3(0, 0, 1), vec3(0, 0, 0), vec3(0, 1, 0));
    modelViewMatrixLoc = gl.getUniformLocation(program, "modelViewMatrix");
    initialModelViewMatrix = modelViewMatrix;

    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(modelViewMatrix));

    // Load the data into the GPU
    var bufferId = gl.createBuffer(); // Generate buffer
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferId ); // Connect generated buffer with webGL
    gl.bufferData( gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW ); // Load data into webGL

    // Update the location of attribute variables from program
    var vPosition = gl.getAttribLocation( program, "vPosition" );

    // Set vertex attribute matrix for noticing how to read vertex data to program
    gl.vertexAttribPointer( vPosition, 3, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );

    render();
};

function render() {
    gl.clear(gl.COLOR_BUFFER_BIT);

    if (x_axis) {
        theta[xAxis] += (stop ? 0 : 0.5);
        modelViewMatrix = rotateX(theta[xAxis]);

    } else if (y_axis) {
        theta[yAxis] += (stop ? 0 : 0.5);

        modelViewMatrix = rotateY(theta[yAxis]);

    } else if (z_axis) {
        theta[zAxis] += (stop ? 0 : 0.5);
        modelViewMatrix = rotateZ(theta[zAxis]);
    }

    // Translate
    var translationVec = translate(x, y, z);
    modelViewMatrix = mult(modelViewMatrix, translationVec); // Apply the translation


    // Scale
    var scalevec = scalem(scale); // Scale
    modelViewMatrix = mult(modelViewMatrix, scalevec); // Apply the scaling

    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(modelViewMatrix));

    gl.drawArrays( gl.TRIANGLES, 0, 45 ); // J Front
    gl.drawArrays( gl.TRIANGLES, 45, 45 ); // J Back
    gl.drawArrays( gl.TRIANGLES, 90, 84 ); // J Sides

    gl.drawArrays( gl.LINE_LOOP, 174, 11) // K Front
    gl.drawArrays( gl.LINE_LOOP, 185, 11) // K Back
    gl.drawArrays( gl.LINES, 196, 16) // K Sides

    gl.drawArrays( gl.LINE_STRIP, 212, 29 ); // S Front
    gl.drawArrays( gl.LINE_STRIP, 241, 29 ); // S Back
    gl.drawArrays( gl.LINES, 270,  54); // S Sides

    requestAnimFrame(render);
}