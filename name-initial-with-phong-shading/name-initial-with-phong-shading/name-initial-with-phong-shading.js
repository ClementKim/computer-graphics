"use strict";

var gl;
var modelViewMatrix;
var modelViewMatrixLoc;

var vertices;
var program;

var theta = [0, 0, 0];
var xAxis = 0;
var yAxis = 1;
var zAxis = 2;

var stop = false;

var rotation = false;
var x_axis = 0;
var y_axis = 0;
var z_axis = 0;

var pointsArray = [];
var normalsArray = [];

var projectionMatrix;

var lightPosition = vec4(0, 0, -5, 0);

var lightAmbient;
var lightDiffuse;
var lightSpecular;

var materialAmbient = vec4(1.0, 0.0, 1.0, 1.0);
var materialDiffuse = vec4(1.0, 0.8, 0.0, 1.0);
var materialSpecular = vec4(1.0, 0.8, 0.0, 1.0);

var materialShininess = 100.0;

var ambientProduct, diffuseProduct, specularProduct;

function cube(){
    vertices = [
        vec4(-0.85, 0.2, 0, 1),
        vec4(-0.85, 0.25, 0, 1),
        vec4(-0.35, 0.25, 0, 1),
        vec4(-0.35, 0.2, 0, 1),
        vec4(-0.85, 0.2, -0.05, 1),
        vec4(-0.85, 0.25, -0.05, 1),
        vec4(-0.35, 0.25, -0.05, 1),
        vec4(-0.35, 0.2, -0.05, 1),

        vec4(-0.625, -0.1, 0, 1),
        vec4(-0.625, 0.2, 0, 1),
        vec4(-0.575, 0.2, 0, 1),
        vec4(-0.575, -0.1, 0, 1),
        vec4(-0.625, -0.1, -0.05, 1),
        vec4(-0.625, 0.2, -0.05, 1),
        vec4(-0.575, 0.2, -0.05, 1),
        vec4(-0.575, -0.1, -0.05, 1),

        vec4(-0.775, -0.2, 0, 1),
        vec4(-0.625, -0.1, 0, 1),
        vec4(-0.575, -0.1, 0, 1),
        vec4(-0.625, -0.2, 0, 1),
        vec4(-0.775, -0.2, -0.05, 1),
        vec4(-0.625, -0.1, -0.05, 1),
        vec4(-0.575, -0.1, -0.05, 1),
        vec4(-0.625, -0.2, -0.05, 1),

        vec4(-0.775, -0.2, 0, 1),
        vec4(-0.825, -0.1, 0, 1),
        vec4(-0.775, -0.1, 0, 1),
        vec4(-0.675, -0.15, 0, 1),
        vec4(-0.775, -0.2, -0.05, 1),
        vec4(-0.825, -0.1, -0.05, 1),
        vec4(-0.775, -0.1, -0.05, 1),
        vec4(-0.675, -0.15, -0.05, 1),

        vec4(-0.825, -0.1, 0, 1),
        vec4(-0.825, -0.05, 0, 1),
        vec4(-0.775, -0.05, 0, 1),
        vec4(-0.775, -0.1, 0, 1),
        vec4(-0.825, -0.1, -0.05, 1),
        vec4(-0.825, -0.05, -0.05, 1),
        vec4(-0.775, -0.05, -0.05, 1),
        vec4(-0.775, -0.1, -0.05, 1),

        // For K
        vec4(0.35, -0.25, 0, 1),
        vec4(0.35, 0.25, 0, 1),
        vec4(0.4, 0.25, 0, 1),
        vec4(0.4, -0.25, 0, 1),
        vec4(0.35, -0.25, -0.05, 1),
        vec4(0.35, 0.25, -0.05, 1),
        vec4(0.4, 0.25, -0.05, 1),
        vec4(0.4, -0.25, -0.05, 1),

        vec4(0.6, -0.25, 0, 1),
        vec4(0.4, -0.05, 0, 1),
        vec4(0.49, 0, 0, 1),
        vec4(0.65, -0.25, 0, 1),
        vec4(0.6, -0.25, -0.05, 1),
        vec4(0.4, -0.05, -0.05, 1),
        vec4(0.49, 0, -0.05, 1),
        vec4(0.65, -0.25, -0.05, 1),

        vec4(0.4, 0.05, 0, 1),
        vec4(0.6, 0.25, 0, 1),
        vec4(0.65, 0.25, 0, 1),
        vec4(0.49, 0, 0, 1),
        vec4(0.4, 0.05, -0.05, 1),
        vec4(0.6, 0.25, -0.05, 1),
        vec4(0.65, 0.25, -0.05, 1),
        vec4(0.49, 0, -0.05, 1),

        vec4(0.4, 0, 0, 1),
        vec4(0.4, 0.05, 0, 1),
        vec4(0.49, 0, 0, 1),
        vec4(0.4, -0.05, 0, 1),
        vec4(0.4, 0, -0.05, 1),
        vec4(0.4, 0.05, -0.05, 1),
        vec4(0.49, 0, -0.05, 1),
        vec4(0.4, -0.05, -0.05, 1),

        // For S
        vec4(0.1, 0.1, 0, 1),
        vec4(0.1, 0.15, 0, 1),
        vec4(0.15, 0.15, 0, 1),
        vec4(0.15, 0.1, 0, 1),
        vec4(0.1, 0.1, -0.05, 1),
        vec4(0.1, 0.15, -0.05, 1),
        vec4(0.15, 0.15, -0.05, 1),
        vec4(0.15, 0.1, -0.05, 1),

        vec4(0.1, 0.15, 0, 1),
        vec4(0.05, 0.2, 0, 1),
        vec4(0.05, 0.25, 0, 1),
        vec4(0.15, 0.15, 0, 1),
        vec4(0.1, 0.15, -0.05, 1),
        vec4(0.05, 0.2, -0.05, 1),
        vec4(0.05, 0.25, -0.05, 1),
        vec4(0.15, 0.15, -0.05, 1),

        vec4(-0.05, 0.2, 0, 1),
        vec4(-0.05, 0.25, 0, 1),
        vec4(0.05, 0.25, 0, 1),
        vec4(0.05, 0.2, 0, 1),
        vec4(-0.05, 0.2, -0.05, 1),
        vec4(-0.05, 0.25, -0.05, 1),
        vec4(0.05, 0.25, -0.05, 1),
        vec4(0.05, 0.2, -0.05, 1),

        vec4(-0.15, 0.15, 0, 1),
        vec4(-0.05, 0.25, 0, 1),
        vec4(-0.05, 0.2, 0, 1),
        vec4(-0.1, 0.15, 0, 1),
        vec4(-0.15, 0.15, -0.05, 1),
        vec4(-0.05, 0.25, -0.05, 1),
        vec4(-0.05, 0.2, -0.05, 1),
        vec4(-0.1, 0.15, -0.05, 1),

        vec4(-0.15, 0.05, 0, 1),
        vec4(-0.15, 0.15, 0, 1),
        vec4(-0.1, 0.15, 0, 1),
        vec4(-0.1, 0.05, 0, 1),
        vec4(-0.15, 0.05, -0.05, 1),
        vec4(-0.15, 0.15, -0.05, 1),
        vec4(-0.1, 0.15, -0.05, 1),
        vec4(-0.1, 0.05, -0.05, 1),

        vec4(-0.05, -0.05, 0, 1),
        vec4(-0.15, 0.05, 0, 1),
        vec4(-0.1, 0.05, 0, 1),
        vec4(-0.05, 0, 0, 1),
        vec4(-0.05, -0.05, -0.05, 1),
        vec4(-0.15, 0.05, -0.05, 1),
        vec4(-0.1, 0.05, -0.05, 1),
        vec4(-0.05, 0, -0.05, 1),

        vec4(-0.05, -0.05, 0, 1),
        vec4(-0.05, 0, 0, 1),
        vec4(0.05, 0, 0, 1),
        vec4(0.05, -0.05, 0, 1),
        vec4(-0.05, -0.05, -0.05, 1),
        vec4(-0.05, 0, -0.05, 1),
        vec4(0.05, 0, -0.05, 1),
        vec4(0.05, -0.05, -0.05, 1),

        vec4(0.05, -0.05, 0, 1),
        vec4(0.05, 0, 0, 1),
        vec4(0.15, -0.1, 0, 1),
        vec4(0.1, -0.1, 0, 1),
        vec4(0.05, -0.05, -0.05, 1),
        vec4(0.05, 0, -0.05, 1),
        vec4(0.15, -0.1, -0.05, 1),
        vec4(0.1, -0.1, -0.05, 1),

        vec4(0.1, -0.2, 0, 1),
        vec4(0.1, -0.1, 0, 1),
        vec4(0.15, -0.1, 0, 1),
        vec4(0.15, -0.2, 0, 1),
        vec4(0.1, -0.2, -0.05, 1),
        vec4(0.1, -0.1, -0.05, 1),
        vec4(0.15, -0.1, -0.05, 1),
        vec4(0.15, -0.2, -0.05, 1),

        vec4(0.05, -0.3, 0, 1),
        vec4(0.05, -0.25, 0, 1),
        vec4(0.1, -0.2, 0, 1),
        vec4(0.15, -0.2, 0, 1),
        vec4(0.05, -0.3, -0.05, 1),
        vec4(0.05, -0.25, -0.05, 1),
        vec4(0.1, -0.2, -0.05, 1),
        vec4(0.15, -0.2, -0.05, 1),

        vec4(-0.05, -0.3, 0, 1),
        vec4(-0.05, -0.25, 0, 1),
        vec4(0.05, -0.25, 0, 1),
        vec4(0.05, -0.3, 0, 1),
        vec4(-0.05, -0.3, -0.05, 1),
        vec4(-0.05, -0.25, -0.05, 1),
        vec4(0.05, -0.25, -0.05, 1),
        vec4(0.05, -0.3, -0.05, 1),

        vec4(-0.15, -0.2, 0, 1),
        vec4(-0.1, -0.2, 0, 1),
        vec4(-0.05, -0.25, 0, 1),
        vec4(-0.05, -0.3, 0, 1),
        vec4(-0.15, -0.2, -0.05, 1),
        vec4(-0.1, -0.2, -0.05, 1),
        vec4(-0.05, -0.25, -0.05, 1),
        vec4(-0.05, -0.3, -0.05, 1),

        vec4(-0.15, -0.2, 0, 1),
        vec4(-0.15, -0.15, 0, 1),
        vec4(-0.1, -0.15, 0, 1),
        vec4(-0.1, -0.2, 0, 1),
        vec4(-0.15, -0.2, -0.05, 1),
        vec4(-0.15, -0.15, -0.05, 1),
        vec4(-0.1, -0.15, -0.05, 1),
        vec4(-0.1, -0.2, -0.05, 1),
    ];

    for (var i = 0; i < vertices.length; i+=8) {
        quad(i+1, i, i+3, i+2);
        quad(i+2, i+3, i+7, i+6);
        quad(i+3, i, i+4, i+7);
        quad(i+6, i+5, i+1, i+2);
        quad(i+4, i+5, i+6, i+7);
        quad(i+5, i+4, i, i+1);
    }
}

function quad(a, b, c, d){
    var normal = vec3(cross(subtract(vertices[b], vertices[a]), subtract(vertices[c], vertices[b])));

    pointsArray.push(vertices[a]);
    normalsArray.push(normal);
    pointsArray.push(vertices[b]);
    normalsArray.push(normal);
    pointsArray.push(vertices[c]);
    normalsArray.push(normal);

    pointsArray.push(vertices[a]);
    normalsArray.push(normal);
    pointsArray.push(vertices[c]);
    normalsArray.push(normal);
    pointsArray.push(vertices[d]);
    normalsArray.push(normal);
}


window.onload = function init() {
    var canvas = document.getElementById( "gl-canvas" );

    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }

    cube();

    //  Configure WebGL
    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 0., 0., 0.0, 1.0 );
    gl.lineWidth(1.0)

    document.getElementById("STOP").onclick = function() {
        stop = !stop;
    }

    document.getElementById("RESET").onclick = function() {
        x_axis = 0;
        y_axis = 0;
        z_axis = 0;
        modelViewMatrix = lookAt(vec3(0, 0, 2), vec3(0, 0, 0), vec3(0, 1, 0));

        stop = false;

        lightAmbient = vec4(0.2, 0.2, 0.2, 1.0);
        lightDiffuse = vec4(1.0, 1.0, 1.0, 1.0);
        lightSpecular = vec4(1.0, 1.0, 1.0, 1.0);

        ambientProduct = mult(lightAmbient, materialAmbient);
        diffuseProduct = mult(lightDiffuse, materialDiffuse);
        specularProduct = mult(lightSpecular, materialSpecular);

        gl.uniform4fv(gl.getUniformLocation(program, "ambientProduct"), flatten(ambientProduct));
        gl.uniform4fv(gl.getUniformLocation(program, "diffuseProduct"), flatten(diffuseProduct) );
        gl.uniform4fv(gl.getUniformLocation(program, "specularProduct"), flatten(specularProduct) );
        gl.uniform4fv(gl.getUniformLocation(program, "lightPosition"), flatten(lightPosition) );

        gl.uniform1f(gl.getUniformLocation(program, "materialShininess"), materialShininess);
    }

    document.getElementById("front_right_view").onclick = function() {
        modelViewMatrix = lookAt(vec3(2, 0, 2), vec3(0, 0, 0), vec3(0, 1, 0));
    }

    document.getElementById("front_left_view").onclick = function() {
        modelViewMatrix = lookAt(vec3(-2, 0, 2), vec3(0, 0, 0), vec3(0, 1, 0));
    }

    document.getElementById("front_up_view").onclick = function() {
        modelViewMatrix = lookAt(vec3(0, 2, 2), vec3(0, 0, 0), vec3(0, 1, 0));
    }

    document.getElementById("front_down_view").onclick = function() {
        modelViewMatrix = lookAt(vec3(0, -2, 2), vec3(0, 0, 0), vec3(0, 1, 0));
    }

    document.getElementById("rear_up_view").onclick = function() {
        modelViewMatrix = lookAt(vec3(0, 2, -2), vec3(0, 0, 0), vec3(0, 1, 0));
    }

    document.getElementById("rear_down_view").onclick = function() {
        modelViewMatrix = lookAt(vec3(0, -2, -2), vec3(0, 0, 0), vec3(0, 1, 0));
    }

    document.getElementById("rear_right_view").onclick = function() {

        modelViewMatrix = lookAt(vec3(2, 0, -2), vec3(0, 0, 0), vec3(0, 1, 0));
    }

    document.getElementById("rear_left_view").onclick = function() {
        modelViewMatrix = lookAt(vec3(-2, 0, -2), vec3(0, 0, 0), vec3(0, 1, 0));
    }

    document.getElementById("front_right_up_view").onclick = function() {
        modelViewMatrix = lookAt(vec3(2, 2, 2), vec3(0, 0, 0), vec3(1, 1, 0));
    }

    document.getElementById("front_left_up_view").onclick = function() {
        modelViewMatrix = lookAt(vec3(-2, 2, 2), vec3(0, 0, 0), vec3(1, 1, 0));
    }

    document.getElementById("rear_right_up_view").onclick = function() {
        modelViewMatrix = lookAt(vec3(2, 2, -2), vec3(0, 0, 0), vec3(1, 1, 0));
    }

    document.getElementById("rear_left_up_view").onclick = function() {
        modelViewMatrix = lookAt(vec3(-2, 2, -2), vec3(0, 0, 0), vec3(1, 1, 0));
    }

    document.getElementById("front_right_down_view").onclick = function() {
        modelViewMatrix = lookAt(vec3(2, -2, 2), vec3(0, 0, 0), vec3(1, 1, 0));
    }

    document.getElementById("front_left_down_view").onclick = function() {
        modelViewMatrix = lookAt(vec3(-2, -2, 2), vec3(0, 0, 0), vec3(1, 1, 0));
    }

    document.getElementById("rear_right_down_view").onclick = function() {
        modelViewMatrix = lookAt(vec3(2, -2, -2), vec3(0, 0, 0), vec3(1, 1, 0));
    }

    document.getElementById("rear_left_down_view").onclick = function() {
        modelViewMatrix = lookAt(vec3(-2, -2, -2), vec3(0, 0, 0), vec3(1, 1, 0));
    }

    document.getElementById("front_view").onclick = function() {
        modelViewMatrix = lookAt(vec3(0, 0, 2), vec3(0, 0, 0), vec3(0, 1, 0));
    }

    document.getElementById("rear_view").onclick = function() {
        modelViewMatrix = lookAt(vec3(0, 0, -2), vec3(0, 0, 0), vec3(0, 1, 0));
    }

    document.getElementById("random_light").onclick = function() {
        lightAmbient = vec4(Math.random(), Math.random(), Math.random(), 1.0);
        lightDiffuse = vec4(Math.random(), Math.random(), Math.random(), 1.0);
        lightSpecular = vec4(Math.random(), Math.random(), Math.random(), 1.0);

        ambientProduct = mult(lightAmbient, materialAmbient);
        diffuseProduct = mult(lightDiffuse, materialDiffuse);
        specularProduct = mult(lightSpecular, materialSpecular);

        gl.uniform4fv(gl.getUniformLocation(program, "ambientProduct"), flatten(ambientProduct));
        gl.uniform4fv(gl.getUniformLocation(program, "diffuseProduct"), flatten(diffuseProduct) );
        gl.uniform4fv(gl.getUniformLocation(program, "specularProduct"), flatten(specularProduct) );
        gl.uniform4fv(gl.getUniformLocation(program, "lightPosition"), flatten(lightPosition) );

        gl.uniform1f(gl.getUniformLocation(program, "materialShininess"), materialShininess);
    }

    document.getElementById("rotation").onclick = function() {
        rotation = !rotation;
        if (!rotation) {
            x_axis = 0;
            y_axis = 0;
            z_axis = 0;
            modelViewMatrix = lookAt(vec3(0, 0, 2), vec3(0, 0, 0), vec3(0, 1, 0));
        }

        else {
            x_axis = 2.5;
            y_axis = 2.5;
            z_axis = 2.5;
        }
    }

    //  Load shaders and initialize webGL shader program
    program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );

    // Load the data into the GPU
    modelViewMatrix = lookAt(vec3(0, 0, 2), vec3(0, 0, 0), vec3(0, 1, 0));
    projectionMatrix = perspective(60, 1, 0.1, 100);

    var nBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, nBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(normalsArray), gl.STATIC_DRAW );

    var vNormal = gl.getAttribLocation( program, "vNormal" );
    gl.vertexAttribPointer( vNormal, 3, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vNormal );

    var vBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, vBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(pointsArray), gl.STATIC_DRAW );

    var vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 4, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );

    lightAmbient = vec4(0.2, 0.2, 0.2, 1.0);
    lightDiffuse = vec4(1.0, 1.0, 1.0, 1.0);
    lightSpecular = vec4(1.0, 1.0, 1.0, 1.0);

    ambientProduct = mult(lightAmbient, materialAmbient);
    diffuseProduct = mult(lightDiffuse, materialDiffuse);
    specularProduct = mult(lightSpecular, materialSpecular);

    gl.uniform4fv(gl.getUniformLocation(program, "ambientProduct"), flatten(ambientProduct));
    gl.uniform4fv(gl.getUniformLocation(program, "diffuseProduct"), flatten(diffuseProduct) );
    gl.uniform4fv(gl.getUniformLocation(program, "specularProduct"), flatten(specularProduct) );
    gl.uniform4fv(gl.getUniformLocation(program, "lightPosition"), flatten(lightPosition) );

    gl.uniform1f(gl.getUniformLocation(program, "materialShininess"), materialShininess);

    modelViewMatrixLoc = gl.getUniformLocation(program, "modelViewMatrix");
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(modelViewMatrix));
    gl.uniformMatrix4fv(gl.getUniformLocation(program, "projectionMatrix"), false, flatten(projectionMatrix));

    // Load the data into the GPU
    var bufferId = gl.createBuffer(); // Generate buffer
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferId ); // Connect generated buffer with webGL
    gl.bufferData( gl.ARRAY_BUFFER, flatten(pointsArray), gl.STATIC_DRAW ); // Load data into webGL

    render();
};

function render() {
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.uniform4fv(gl.getUniformLocation(program, "lightPosition"), flatten(lightPosition) );

    theta[xAxis] = (stop ? 0 : x_axis);
    theta[yAxis] = (stop ? 0 : y_axis);
    theta[zAxis] = (stop ? 0 : z_axis);

    modelViewMatrix = mult(modelViewMatrix, rotateX(theta[xAxis]));
    modelViewMatrix = mult(modelViewMatrix, rotateY(theta[yAxis]));
    modelViewMatrix = mult(modelViewMatrix, rotateZ(theta[zAxis]));

    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(modelViewMatrix));

    gl.drawArrays( gl.TRIANGLES, 0, pointsArray.length);

    requestAnimFrame(render);
}