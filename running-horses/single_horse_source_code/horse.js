"use strict";

var canvas;
var gl;
var program;

var projectionMatrix;
var modelViewMatrix;

var instanceMatrix;

var modelViewMatrixLoc;

var basic_vertices = [
    vec4( -0.5, -0.5,  0.5, 1.0 ),
    vec4( -0.5,  0.5,  0.5, 1.0 ),
    vec4( 0.5,  0.5,  0.5, 1.0 ),
    vec4( 0.5, -0.5,  0.5, 1.0 ),
    vec4( -0.5, -0.5, -0.5, 1.0 ),
    vec4( -0.5,  0.5, -0.5, 1.0 ),
    vec4( 0.5,  0.5, -0.5, 1.0 ),
    vec4( 0.5, -0.5, -0.5, 1.0 )
];

// for horse
var torsoId = 0;
var neckId  = 1;
var headId  = 2;
var leftFrontUpperLegId = 3;
var leftFrontLowerLegId = 4;
var rightFrontUpperLegId = 5;
var rightFrontLowerLegId = 6;
var leftBackUpperLegId = 7;
var leftBackLowerLegId = 8;
var rightBackUpperLegId = 9;
var rightBackLowerLegId = 10;
var tailId = 11;
var rightEarId = 12;
var leftEarId = 13;

var torsoHeight = 2.5;
var torsoWidth = 2.8;
var upperLegHeight = 2.5 * 0.9;
var lowerLegHeight = 1.5 * 1.2;
var upperLegWidth  = 0.5;
var lowerLegWidth  = 0.5;
var neckHeight = 2.0;
var neckWidth = 1.0;
var headHeight = 1.5;
var headWidth = 1.8;
var tailHeight = 2.0;
var tailWidth = 0.5;
var earHeight = 0.75;
var earWidth = 0.25;

// for gate
var rightPillarId = 14;
var rightUpperJointId = 15;
var rightLowerJointId = 16;
var rightDoorComponent1Id = 17;
var rightDoorComponent2Id = 18;
var rightDoorComponent3Id = 19;

var leftPillarId = 20;
var leftUpperJointId = 21;
var leftLowerJointId = 22;
var leftDoorComponent1Id = 23;
var leftDoorComponent2Id = 24;
var leftDoorComponent3Id = 25;

var PillarHeight = 5.0;
var PillarWidth = 0.5;
var jointHeight = 0.5;
var jointWidth = 0.5;
var DoorComponentHeight = 0.25;
var DoorComponentWidth = 1.5;

var numHorseNodes = 14;
var numRightGateNodes = 6;
var numLeftGateNodes = 6;
var angle = 0;

var theta = [0, -25, -5, 140, 0, 180, 0, 140, 0, 200, 0, -90, 0, 0,
    0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0];
    

var stack = [];

var figure = [];

for( var i=0; i<numHorseNodes+numRightGateNodes+numLeftGateNodes; i++) figure[i] = createNode(null, null, null, null);

var pointsArray = [];
var normalsArray = [];

var angleLeftFrontLower = 0; 
var speedLeftFrontLower = 0.1; 

var angleLeftFrontUpper = 20;
var speedLeftFrontUpper = 1.5;

var angleNeck = 1; 
var speedNeck = 0.2;

var angleRightFrontUpper = 20; 
var speedRightFrontUpper = 1.5;

var angleRightFrontLower = 0; 
var speedRightFrontLower = 1;

var angleRightBackUpper = 0;
var speedRightBackUpper = 1.5;

var angleRightBackLower = 0;
var speedRightBackLower = 1;

var angleLeftBackUpper = 20;
var speedLeftBackUpper = 1.5;

var angleLeftBackLower = 0;
var speedLeftBackLower = 1;

var angleTail = 0;
var speedTail = 0.2;

var fixed = -0.01;

var lightPosition = vec4(-10, 10, 1500, 0);

var lightAmbient = vec4(1.0, 1.0, 1.0, 1.0);
var lightDiffuse = vec4(1.0, 1.0, 1.0, 1.0);
var lightSpecular = vec4(1.0, 1.0, 1.0, 1.0);

var materialAmbient = vec4(0.29, 0.09, 0.0, 1.0); 
var materialDiffuse = vec4(0.6, 0.6, 0.6, 1.0);
var materialSpecular = vec4(0.7, 0.7, 0.7, 1.0);

var materialShininess = 100.0;

var ambientProduct, diffuseProduct, specularProduct;

function scale4(a, b, c) {
    var result = mat4();
    result[0][0] = a;
    result[1][1] = b;
    result[2][2] = c;
    return result;
}

function createNode(transform, render, sibling, child){
    var node = {
        transform: transform,
        render: render,
        sibling: sibling,
        child: child,
    }
    return node;
}

function initNodes(Id) {

    var m = mat4();

    switch(Id) {

        case torsoId:
            m = rotate(theta[torsoId], 0, 1, 0);
            figure[torsoId] = createNode(m, torso, null, neckId);
            break;

        case neckId:
            m = translate(torsoWidth-1.3, torsoHeight - 0.8, 0.0);
            m = mult(m, rotate(theta[neckId], 0, 0, 1));
            figure[neckId] = createNode(m, neck, leftFrontUpperLegId, headId);
            break;

        case headId:
            m = translate(neckWidth/2+0.13, neckHeight-0.5, 0.0);
            m = mult(m, rotate(theta[headId], 0, 0, 1));
            figure[headId] = createNode(m, head, null, leftEarId);
            break;

        case leftFrontUpperLegId:
            m = translate(torsoWidth-0.88, upperLegHeight-2.3, -1.0);
            m = mult(m, rotate(theta[leftFrontUpperLegId], 0, 0, 1));
            figure[leftFrontUpperLegId] = createNode(m, leftFrontUpperLeg, rightFrontUpperLegId, leftFrontLowerLegId);
            break;

        case leftFrontLowerLegId:
            m = translate(0, upperLegHeight, 0);
            m = mult(m, rotate(theta[leftFrontLowerLegId], 0, 0, 1));
            figure[leftFrontLowerLegId] = createNode(m, leftFrontLowerLeg, null, null);
            break;

        case rightFrontUpperLegId:
            m = translate(torsoWidth-0.88, upperLegHeight-2.3, 1.0);
            m = mult(m, rotate(theta[rightFrontUpperLegId], 0, 0, 1));
            figure[rightFrontUpperLegId] = createNode(m, rightFrontUpperLeg, leftBackUpperLegId, rightFrontLowerLegId);
            break;

        case rightFrontLowerLegId:
            m = translate(0, upperLegHeight, 0);
            m = mult(m, rotate(theta[rightFrontLowerLegId], 0, 0, 1));
            figure[rightFrontLowerLegId] = createNode(m, rightFrontLowerLeg, null, null);
            break;

        case leftBackUpperLegId:
            m = translate(-torsoWidth+0.88, upperLegHeight-2.3, -1.0);
            m = mult(m, rotate(theta[leftBackUpperLegId], 0, 0, 1));
            figure[leftBackUpperLegId] = createNode(m, leftBackUpperLeg, rightBackUpperLegId, leftBackLowerLegId);
            break;

        case leftBackLowerLegId:
            m = translate(0, upperLegHeight, 0);
            m = mult(m, rotate(theta[leftBackLowerLegId], 0, 0, 1));
            figure[leftBackLowerLegId] = createNode(m, leftBackLowerLeg, null, null);
            break;

        case rightBackUpperLegId:
            m = translate(-torsoWidth+0.88, upperLegHeight-2.3, 1.0);
            m = mult(m, rotate(theta[rightBackUpperLegId], 0, 0, 1));
            figure[rightBackUpperLegId] = createNode(m, rightBackUpperLeg, tailId, rightBackLowerLegId);
            break;

        case rightBackLowerLegId:
            m = translate(0, upperLegHeight, 0);
            m = mult(m, rotate(theta[rightBackLowerLegId], 0, 0, 1));
            figure[rightBackLowerLegId] = createNode(m, rightBackLowerLeg, null, null);
            break;

        case tailId:
            m = translate(-torsoWidth, tailHeight-0.5, 0.0);
            m = mult(m, rotate(theta[tailId], 0, 0, 1));
            figure[tailId] = createNode(m, tail, null, null);
            break;

        case rightEarId:
            m = translate( -0.3, -headHeight + 1.9, 0.38);
            m = mult(m, rotate(theta[headId], 0, 0, 1));
            figure[rightEarId] = createNode(m, rightEar, null, null);
            break;

        case leftEarId:
            m = translate(-0.3, -headHeight + 1.9, -0.38);
            m = mult(m, rotate(theta[headId], 0, 0, 1));
            figure[leftEarId] = createNode(m, leftEar, rightEarId, null);
            break;

        case rightPillarId:
            m = rotate(theta[rightPillarId], 0, 1, 0);
            figure[rightPillarId] = createNode(m, rightPillar, null, rightUpperJointId);
            break;

        case rightUpperJointId:
            m = translate( 6.0, 3.3, 2.3);
            m = mult(m, rotateY(theta[rightUpperJointId], 0, 0, 1));
            figure[rightUpperJointId] = createNode(m, rightUpperJoint, rightLowerJointId, rightDoorComponent1Id);
            break;

        case rightLowerJointId:
            m = translate( 6.0, -1.45, 2.3);
            m = mult(m, rotateY(theta[rightLowerJointId], 0, 0, 1));
            figure[rightLowerJointId] = createNode(m, rightLowerJoint, null, rightDoorComponent3Id);
            break;

        case rightDoorComponent1Id:
            m = translate( -0.3, -0.8, -1.2);
            m = mult(m, rotate(theta[rightDoorComponent1Id], 0, 0, 1));
            figure[rightDoorComponent1Id] = createNode(m, rightDoorComponent1, null, rightDoorComponent2Id);
            break;

        case rightDoorComponent2Id:
            m = translate( -1.3, -1.2, -2.0);
            m = mult(m, rotate(theta[rightDoorComponent2Id], 0, 0, 1));
            figure[rightDoorComponent2Id] = createNode(m, rightDoorComponent2, null, null);
            break;

        case rightDoorComponent3Id:
            m = translate( -0.3, -0.8, -1.2);
            m = mult(m, rotate(theta[rightDoorComponent3Id], 0, 0, 1));
            figure[rightDoorComponent3Id] = createNode(m, rightDoorComponent3, null, null);
            break;

        case leftPillarId:
            m = translate( 0.0, 0.0, 0.0);
            m = mult(m, rotate(theta[leftPillarId], 0, 0, 1));
            figure[leftPillarId] = createNode(m, leftPillar, null, leftUpperJointId);
            break;

        case leftUpperJointId:
            m = translate( 6,  jointHeight * 11.8 + 0.85, -2.5);
            m = mult(m, rotateY(theta[leftUpperJointId], 0, 0, 1));
            figure[leftUpperJointId] = createNode(m, leftUpperJoint, leftLowerJointId, leftDoorComponent1Id);
            break;

        case leftLowerJointId:
            m = translate( 6,  jointHeight + 1.5, -2.5);
            m = mult(m, rotateY(theta[leftLowerJointId], 0, 0, 1));
            figure[leftLowerJointId] = createNode(m, leftLowerJoint, null, leftDoorComponent3Id);
            break;

        case leftDoorComponent1Id:
            m = translate(-1.7 + DoorComponentWidth, -4.5 + DoorComponentHeight, DoorComponentWidth - 0.15);
            m = mult(m, rotate(theta[leftDoorComponent1Id], 1, 0, 0));
            figure[leftDoorComponent1Id] = createNode(m, leftDoorComponent1, null, leftDoorComponent2Id);
            break;

        case leftDoorComponent2Id:
            m = translate( -1.25, -1.2, -0.855);
            m = mult(m, rotate(theta[leftDoorComponent2Id], 0, 0, 1));
            figure[leftDoorComponent2Id] = createNode(m, leftDoorComponent2, null, null);
            break;

        case leftDoorComponent3Id:
            m = translate( -0.2, -4.25, 0.95);
            m = mult(m, rotate(theta[leftDoorComponent3Id], 0, 0, 1));
            figure[leftDoorComponent3Id] = createNode(m, leftDoorComponent3, null, null);
            break;
    }
}


function updatePosition() {
    for (var i = 0; i < numHorseNodes; i++) {
        figure[i].transform = mult(translate(modelSpeed, 0, 0), figure[i].transform);
    }
}

var horseModelPosition = vec3(0.0, 0.0, 0.0);

function traverseHorse(Id, translationMatrix) {
    if (Id == null) return;

    stack.push(modelViewMatrix);

    if (Id === torsoId) { 
        modelViewMatrix = mult(modelViewMatrix, translate(horseModelPosition[0], horseModelPosition[1], horseModelPosition[2]));
    }

    modelViewMatrix = mult(modelViewMatrix, figure[Id].transform);

    if (Id === leftFrontUpperLegId ||
        Id === leftFrontLowerLegId ||
        Id === neckId ||
        Id === rightFrontUpperLegId ||
        Id === rightFrontLowerLegId ||
        Id === rightBackUpperLegId ||
        Id === rightBackLowerLegId ||
        Id === leftBackUpperLegId ||
        Id === leftBackLowerLegId ||
        Id === tailId) {
        modelViewMatrix = mult(modelViewMatrix, rotate(theta[Id], 0, 0, 1));
    }

    figure[Id].render();
    if (figure[Id].child != null) traverseHorse(figure[Id].child, translationMatrix);
    modelViewMatrix = stack.pop();
    if (figure[Id].sibling != null) traverseHorse(figure[Id].sibling, translationMatrix);
}

function traverseGate(Id) {
    if (Id == null) return;
    stack.push(modelViewMatrix);
    modelViewMatrix = mult(modelViewMatrix, figure[Id].transform);

    if (Id === rightUpperJointId) {
        modelViewMatrix = mult(modelViewMatrix, rotate(theta[rightUpperJointId], 0, 1, 0));
    }

    if (Id === rightLowerJointId) {
        modelViewMatrix = mult(modelViewMatrix, rotate(theta[rightLowerJointId], 0, 1, 0));
    }

    if (Id === leftUpperJointId) {
        modelViewMatrix = mult(modelViewMatrix, rotate(theta[leftUpperJointId], 0, 1, 0));
    }

    if (Id === leftLowerJointId) {
        modelViewMatrix = mult(modelViewMatrix, rotate(theta[leftLowerJointId], 0, 1, 0));
    }

    figure[Id].render();
    if (figure[Id].child != null) traverseGate(figure[Id].child);
    modelViewMatrix = stack.pop();
    if (figure[Id].sibling != null) traverseGate(figure[Id].sibling);
}

function torso() {
    ambientProduct = mult(lightAmbient, materialAmbient);
    gl.uniform4fv(gl.getUniformLocation(program, "ambientProduct"), flatten(ambientProduct));

    instanceMatrix = mult(modelViewMatrix, translate(0.0, 0.5 * torsoHeight, 0.0) );
    instanceMatrix = mult(instanceMatrix, scale4(torsoWidth*2, torsoHeight*0.8, torsoWidth));
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(instanceMatrix));
    for(var i=0; i<6; i++) gl.drawArrays( gl.TRIANGLE_FAN, i*4, 4);
}

function head() {
    instanceMatrix = mult(modelViewMatrix, translate(0.7, 0.5 * headHeight, 0.0) );
    instanceMatrix = mult(instanceMatrix, scale4(headWidth*1.3, headHeight/2, neckWidth) );
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(instanceMatrix));
    for(var i=0; i<6; i++) gl.drawArrays( gl.TRIANGLE_FAN, i*4, 4);
}

function neck() {
    instanceMatrix = mult(modelViewMatrix, translate(0.7, neckHeight * 0.5 + 0.3, 0.0) );
    instanceMatrix = mult(instanceMatrix, scale4(neckWidth, neckHeight, neckWidth) );
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(instanceMatrix));
    for(var i=0; i<6; i++) gl.drawArrays( gl.TRIANGLE_FAN, i*4, 4);
}

function leftFrontUpperLeg() {
    instanceMatrix = mult(modelViewMatrix, translate(0.0, 0.5 * upperLegHeight - 0.3, 0.0) );
    instanceMatrix = mult(instanceMatrix, scale4(upperLegWidth * 1.7, upperLegHeight, upperLegWidth) );
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(instanceMatrix));
    for(var i=0; i<6; i++) gl.drawArrays( gl.TRIANGLE_FAN, i*4, 4);
}

function leftFrontLowerLeg() {
    instanceMatrix = mult(modelViewMatrix, translate(0.0, 0.5 * lowerLegHeight - 0.3, 0.0) );
    instanceMatrix = mult(instanceMatrix, scale4(lowerLegWidth * 1.6, lowerLegHeight, lowerLegWidth) );
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(instanceMatrix));
    for(var i=0; i<6; i++) gl.drawArrays( gl.TRIANGLE_FAN, i*4, 4);
}

function rightFrontUpperLeg() {
    instanceMatrix = mult(modelViewMatrix, translate(0.0, 0.5 * upperLegHeight - 0.3, 0.0) );
    instanceMatrix = mult(instanceMatrix, scale4(upperLegWidth * 1.7, upperLegHeight, upperLegWidth) );
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(instanceMatrix));
    for(var i=0; i<6; i++) gl.drawArrays( gl.TRIANGLE_FAN, i*4, 4);
}

function rightFrontLowerLeg() {
    instanceMatrix = mult(modelViewMatrix, translate(0.0, 0.5 * lowerLegHeight - 0.3, 0.0) );
    instanceMatrix = mult(instanceMatrix, scale4(lowerLegWidth * 1.6, lowerLegHeight, lowerLegWidth) );
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(instanceMatrix));
    for(var i=0; i<6; i++) gl.drawArrays( gl.TRIANGLE_FAN, i*4, 4);
}

function leftBackUpperLeg() {
    instanceMatrix = mult(modelViewMatrix, translate(0.45, 0.5 * upperLegHeight - 0.3, 0.0) );
    instanceMatrix = mult(instanceMatrix, scale4(upperLegWidth * 1.7, upperLegHeight, upperLegWidth) );
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(instanceMatrix));
    for(var i=0; i<6; i++) gl.drawArrays( gl.TRIANGLE_FAN, i*4, 4);
}

function leftBackLowerLeg() {
    instanceMatrix = mult(modelViewMatrix, translate(0.45, 0.5 * lowerLegHeight - 0.3, 0.0) );
    instanceMatrix = mult(instanceMatrix, scale4(lowerLegWidth * 1.6, lowerLegHeight, lowerLegWidth) );
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(instanceMatrix));
    for(var i=0; i<6; i++) gl.drawArrays( gl.TRIANGLE_FAN, i*4, 4);
}

function rightBackUpperLeg() {
    instanceMatrix = mult(modelViewMatrix, translate(0.45, 0.5 * upperLegHeight - 0.3, 0.0) );
    instanceMatrix = mult(instanceMatrix, scale4(upperLegWidth * 1.7, upperLegHeight, upperLegWidth) );
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(instanceMatrix));
    for(var i=0; i<6; i++) gl.drawArrays( gl.TRIANGLE_FAN, i*4, 4);
}

function rightBackLowerLeg() {
    instanceMatrix = mult(modelViewMatrix, translate(0.45, 0.5 * lowerLegHeight - 0.3, 0.0) );
    instanceMatrix = mult(instanceMatrix, scale4(lowerLegWidth * 1.6, lowerLegHeight, lowerLegWidth) );
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(instanceMatrix));
    for(var i=0; i<6; i++) gl.drawArrays( gl.TRIANGLE_FAN, i*4, 4);
}

function tail() {
    instanceMatrix = mult(modelViewMatrix, translate(0, tailHeight-3.5, 0.0) );
    instanceMatrix = mult(instanceMatrix, scale4(tailWidth, tailHeight*2, tailWidth) );
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(instanceMatrix));
    for(var i=0; i<6; i++) gl.drawArrays( gl.TRIANGLE_FAN, i*4, 4);
}

function rightEar() {
    instanceMatrix = mult(modelViewMatrix, translate(0.0, 0.5 * upperLegHeight - 0.3, 0.0) );
    instanceMatrix = mult(instanceMatrix, scale4(earWidth, earHeight, earWidth) );
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(instanceMatrix));
    for(var i=0; i<6; i++) gl.drawArrays( gl.TRIANGLE_FAN, i*4, 4);
}

function leftEar() {
    instanceMatrix = mult(modelViewMatrix, translate(0.0, 0.5 * upperLegHeight - 0.3, 0.0) );
    instanceMatrix = mult(instanceMatrix, scale4(earWidth, earHeight, earWidth) );
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(instanceMatrix));
    for(var i=0; i<6; i++) gl.drawArrays( gl.TRIANGLE_FAN, i*4, 4);
}

function rightPillar() {
    instanceMatrix = mult(modelViewMatrix, translate(6.0 + fixed, PillarHeight * -0.5 + 3.65, 2.5) );
    instanceMatrix = mult(instanceMatrix, scale4(PillarWidth, PillarHeight * 2, PillarWidth) );
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(instanceMatrix));
    for(var i=0; i<6; i++) gl.drawArrays( gl.TRIANGLE_FAN, i*4, 4);
}

function rightUpperJoint() {
    instanceMatrix = mult(modelViewMatrix, translate(jointWidth - 0.5, jointHeight + 0.2, jointWidth - 0.8) );
    instanceMatrix = mult(instanceMatrix, scale4(jointWidth, jointHeight, jointWidth));
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(instanceMatrix));
    for(var i=0; i<6; i++) gl.drawArrays( gl.TRIANGLE_FAN, i*4, 4);
}

function rightLowerJoint() {
    instanceMatrix = mult(modelViewMatrix, translate(jointWidth - 0.5, jointHeight + 0.2, jointWidth - 0.8) );
    instanceMatrix = mult(instanceMatrix, scale4(jointWidth, jointHeight, jointWidth) );
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(instanceMatrix));
    for(var i=0; i<6; i++) gl.drawArrays( gl.TRIANGLE_FAN, i*4, 4);
}

function rightDoorComponent1() {
    instanceMatrix = mult(modelViewMatrix, translate(DoorComponentHeight, DoorComponentWidth, DoorComponentHeight));
    instanceMatrix = mult(instanceMatrix, scale4(jointWidth/2, jointHeight/2, jointWidth * 3.5) );
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(instanceMatrix));
    for(var i=0; i<6; i++) gl.drawArrays( gl.TRIANGLE_FAN, i*4, 4);
}

function rightDoorComponent2() {
    instanceMatrix = mult(modelViewMatrix, translate(DoorComponentWidth, DoorComponentHeight, DoorComponentWidth));
    instanceMatrix = mult(instanceMatrix, scale4(jointWidth/2, jointHeight*9.5, jointWidth/2) );
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(instanceMatrix));
    for(var i=0; i<6; i++) gl.drawArrays( gl.TRIANGLE_FAN, i*4, 4);
}

function rightDoorComponent3() {
    instanceMatrix = mult(modelViewMatrix, translate(DoorComponentHeight, DoorComponentWidth, DoorComponentHeight));
    instanceMatrix = mult(instanceMatrix, scale4(jointWidth/2, jointHeight/2, jointWidth * 3.5));
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(instanceMatrix));
    for(var i=0; i<6; i++) gl.drawArrays( gl.TRIANGLE_FAN, i*4, 4);
}

function leftPillar() {
    instanceMatrix = mult(modelViewMatrix, translate(6.0, PillarHeight * -0.5 + 3.65, -2.5) );
    instanceMatrix = mult(instanceMatrix, scale4(PillarWidth, PillarHeight * 2, PillarWidth) );
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(instanceMatrix));
    for(var i=0; i<6; i++) gl.drawArrays( gl.TRIANGLE_FAN, i*4, 4);
}

    function leftUpperJoint() {
    instanceMatrix = mult(modelViewMatrix, translate(-0.5 + jointWidth, -5.5 * jointHeight, jointWidth ) );
    instanceMatrix = mult(instanceMatrix, scale4(jointWidth, jointHeight, jointWidth));
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(instanceMatrix));
    for(var i=0; i<6; i++) gl.drawArrays( gl.TRIANGLE_FAN, i*4, 4);
}

function leftLowerJoint() {
    instanceMatrix = mult(modelViewMatrix, translate(-0.5 + jointWidth, -5.5 * jointHeight, jointWidth) );
    instanceMatrix = mult(instanceMatrix, scale4(jointWidth, jointHeight, jointWidth) );
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(instanceMatrix));
    for(var i=0; i<6; i++) gl.drawArrays( gl.TRIANGLE_FAN, i*4, 4);
}

function leftDoorComponent1() {
    instanceMatrix = mult(modelViewMatrix, translate(DoorComponentHeight, DoorComponentWidth, DoorComponentHeight - 0.37) );
    instanceMatrix = mult(instanceMatrix, scale4(jointWidth/2, jointHeight/2, jointWidth * 3.5) );
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(instanceMatrix));
    for(var i=0; i<6; i++) gl.drawArrays( gl.TRIANGLE_FAN, i*4, 4);
}

function leftDoorComponent2() {
    instanceMatrix = mult(modelViewMatrix, translate(DoorComponentWidth, DoorComponentHeight, DoorComponentWidth) );
    instanceMatrix = mult(instanceMatrix, scale4(jointWidth/2, jointHeight*9.5, jointWidth/2) );
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(instanceMatrix));
    for(var i=0; i<6; i++) gl.drawArrays( gl.TRIANGLE_FAN, i*4, 4);
}

function leftDoorComponent3() {
    instanceMatrix = mult(modelViewMatrix, translate(DoorComponentHeight, DoorComponentWidth, DoorComponentHeight));
    instanceMatrix = mult(instanceMatrix, scale4(jointWidth/2, jointHeight/2, jointWidth * 3.5 ));
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(instanceMatrix));
    for(var i=0; i<6; i++) gl.drawArrays( gl.TRIANGLE_FAN, i*4, 4);
}


function quad(a, b, c, d) {
    var normal = vec3(cross(subtract(basic_vertices[b], basic_vertices[a]), subtract(basic_vertices[c], basic_vertices[b])));
    normal = normalize(normal);

    pointsArray.push(basic_vertices[a]);
    normalsArray.push(normal);

    pointsArray.push(basic_vertices[b]);
    normalsArray.push(normal);
    normalsArray.push(normal);

    pointsArray.push(basic_vertices[c]);
    normalsArray.push(normal);

    pointsArray.push(basic_vertices[d]);
    normalsArray.push(normal);
    normalsArray.push(normal);
}


function cube()
{
    quad( 1, 0, 3, 2 );
    quad( 2, 3, 7, 6 );
    quad( 3, 0, 4, 7 );
    quad( 6, 5, 1, 2 );
    quad( 4, 5, 6, 7 );
    quad( 5, 4, 0, 1 );
}


window.onload = function init() {

    canvas = document.getElementById( "gl-canvas" );

    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }

    gl.enable(gl.DEPTH_TEST);
    gl.depthFunc(gl.LEQUAL);

    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 1.0, 1.0, 1.0, 1.0 );

    program = initShaders( gl, "vertex-shader", "fragment-shader");

    gl.useProgram( program);

    instanceMatrix = mat4();

    modelViewMatrix = lookAt(vec3(0.0, 0.0, 500.0), vec3(0.0, 0.0, 0.0), vec3(0.0, 1.0, 0.0));
    projectionMatrix = perspective(60, 1, 0.1, 100);


    modelViewMatrix = mult(rotate(0.0, 1, 0, 0), modelViewMatrix);
    modelViewMatrix = mult(rotate(angle, 0, 1, 0), modelViewMatrix);


    gl.uniformMatrix4fv(gl.getUniformLocation( program, "modelViewMatrix"), false, flatten(modelViewMatrix) );
    gl.uniformMatrix4fv( gl.getUniformLocation( program, "projectionMatrix"), false, flatten(projectionMatrix) );

    modelViewMatrixLoc = gl.getUniformLocation(program, "modelViewMatrix")

    cube();

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

    lightAmbient = vec4(1.0, 1.0, 1.0, 1.0);
    lightDiffuse = vec4(1.0, 1.0, 1.0, 1.0);
    lightSpecular = vec4(1.0, 1.0, 1.0, 1.0);

    diffuseProduct = mult(lightDiffuse, materialDiffuse);
    specularProduct = mult(lightSpecular, materialSpecular);

    gl.uniform4fv(gl.getUniformLocation(program, "diffuseProduct"), flatten(diffuseProduct) );
    gl.uniform4fv(gl.getUniformLocation(program, "specularProduct"), flatten(specularProduct) );
    gl.uniform4fv(gl.getUniformLocation(program, "lightPosition"), flatten(lightPosition) );

    gl.uniform1f(gl.getUniformLocation(program, "materialShininess"), materialShininess);

    for(i=0; i<numHorseNodes; i++) initNodes(i);
    for(i=0; i<numRightGateNodes; i++) initNodes(i+14);
    for(i=0; i<numLeftGateNodes; i++) initNodes(i+20);

    document.getElementById("leftFrontUpper").oninput = updateAngle;
    document.getElementById("leftFrontLower").oninput = updateAngle;
    document.getElementById("neck").oninput = updateAngle;
    document.getElementById("rightFrontUpper").oninput = updateAngle;
    document.getElementById("rightFrontLower").oninput = updateAngle;
    document.getElementById("leftBackUpper").oninput = updateAngle;
    document.getElementById("leftBackLower").oninput = updateAngle;
    document.getElementById("rightBackUpper").oninput = updateAngle;
    document.getElementById("rightBackLower").oninput = updateAngle;
    document.getElementById("tail").oninput = updateAngle;

    document.getElementById("runButton").onclick = function () {
        if (isRun) {
            clearInterval(runInterval);
            reset();
        } else {
            reset();
            runInterval = setInterval(run, 5);
        }
        isRun = !isRun;
    };

    document.getElementById("walkButton").onclick = function () {
        if (isWalk) {
            clearInterval(walkInterval);
            reset();
        } else {
            reset();
            walkInterval = setInterval(walk, 15);
        }
        isWalk = !isWalk;
    };

    render();
}

var isRun = false;
var isWalk = false;
var runInterval;
var walkInterval;

function run() {
    angleLeftFrontLower += speedLeftFrontLower;
    if (angleLeftFrontLower >= 1 || angleLeftFrontLower <= -60) {
        speedLeftFrontLower *= -1;
    }

    angleLeftFrontUpper += speedLeftFrontUpper;
    if (angleLeftFrontUpper >= 80 || angleLeftFrontUpper <= -60) {
        speedLeftFrontUpper *= -1;
    }

    angleNeck += speedNeck;
    if (angleNeck >= 10 || angleNeck <= -30) {
        speedNeck *= -1;
    }

    angleRightFrontUpper += speedRightFrontUpper;
    if (angleRightFrontUpper >= 100 || angleRightFrontUpper <= -40) {
        speedRightFrontUpper *= -1;
    }

    angleRightFrontLower += speedRightFrontLower;
    if (angleRightFrontLower >= 1 || angleRightFrontLower <= -60) {
        speedRightFrontLower *= -1;
    }

    angleRightBackUpper += speedRightBackUpper;
    if (angleRightBackUpper >= 40 || angleRightBackUpper <= -100) {
        speedRightBackUpper *= -1;
    }

    angleRightBackLower += speedRightBackLower;
    if (angleRightBackLower >= 60 || angleRightBackLower <= -1) {
        speedRightBackLower *= -1;
    }

    angleLeftBackUpper += speedLeftBackUpper;
    if (angleLeftBackUpper >= 60 || angleLeftBackUpper <= -80) {
        speedLeftBackUpper *= -1;
    }

    angleLeftBackLower += speedLeftBackLower;
    if (angleLeftBackLower >= 60 || angleLeftBackLower <= -1) {
        speedLeftBackLower *= -1;
    }

    angleTail += speedTail;
    if (angleTail >= 10 || angleTail <= -1) {
        speedTail *= -1;
    }
}



function walk() {
    
    angleLeftFrontLower += speedLeftFrontLower;
    if (angleLeftFrontLower >= 1 || angleLeftFrontLower <= -20) {
        speedLeftFrontLower *= -1;
    }

    angleLeftFrontUpper += speedLeftFrontUpper;
    if (angleLeftFrontUpper >= 70 || angleLeftFrontUpper <= 10) {
        speedLeftFrontUpper *= -1;
    }

    angleNeck += speedNeck;
    if (angleNeck >= 10 || angleNeck <= -10) {
        speedNeck *= -1;
    }

    angleRightFrontUpper += speedRightFrontUpper;
    if (angleRightFrontUpper >= 30 || angleRightFrontUpper <= -30) {
        speedRightFrontUpper *= -1;
    }

    angleRightFrontLower += speedRightFrontLower;
    if (angleRightFrontLower >= 1 || angleRightFrontLower <= -20) {
        speedRightFrontLower *= -1;
    }

    angleRightBackUpper += speedRightBackUpper;
    if (angleRightBackUpper >= 10 || angleRightBackUpper <= -50) {
        speedRightBackUpper *= -1;
    }

    angleRightBackLower += speedRightBackLower;
    if (angleRightBackLower >= 20 || angleRightBackLower <= -1) {
        speedRightBackLower *= -1;
    }

    angleLeftBackUpper += speedLeftBackUpper;
    if (angleLeftBackUpper >= 70 || angleLeftBackUpper <= 10) {
        speedLeftBackUpper *= -1;
    }

    angleLeftBackLower += speedLeftBackLower;
    if (angleLeftBackLower >= 20 || angleLeftBackLower <= -1) {
        speedLeftBackLower *= -1;
    }

    angleTail += speedTail;
    if (angleTail >= 10 || angleTail <= -1) {
        speedTail *= -1;
    }
}

function updateAngle() {
    angleLeftFrontUpper = parseInt(document.getElementById("leftFrontUpper").value);
    angleLeftFrontLower = parseInt(document.getElementById("leftFrontLower").value);
    angleNeck = parseInt(document.getElementById("neck").value);
    angleRightFrontUpper = parseInt(document.getElementById("rightFrontUpper").value);
    angleRightFrontLower = parseInt(document.getElementById("rightFrontLower").value);
    angleLeftBackUpper = parseInt(document.getElementById("leftBackUpper").value);
    angleLeftBackLower = parseInt(document.getElementById("leftBackLower").value);
    angleRightBackUpper = parseInt(document.getElementById("rightBackUpper").value);
    angleRightBackLower = parseInt(document.getElementById("rightBackLower").value);
    angleTail = parseInt(document.getElementById("tail").value);
}

function reset() {
    angleLeftFrontLower = 0; 
    speedLeftFrontLower = 0.1; 

    angleLeftFrontUpper = 20;
    speedLeftFrontUpper = 1.5;

    angleNeck = 1; 
    speedNeck = 0.2;

    angleRightFrontUpper = 20; 
    speedRightFrontUpper = 1.5;

    angleRightFrontLower = 0; 
    speedRightFrontLower = 1;

    angleRightBackUpper = 0;
    speedRightBackUpper = 1.5;

    angleRightBackLower = 0;
    speedRightBackLower = 1;

    angleLeftBackUpper = 20;
    speedLeftBackUpper = 1.5;

    angleLeftBackLower = 0;
    speedLeftBackLower = 1;

    angleTail = 0;
    speedTail = 0.2;
}

var render = function () {
    modelViewMatrix = mat4();
    angle += 1;

    theta[leftFrontLowerLegId] = angleLeftFrontLower;
    theta[leftFrontUpperLegId] = angleLeftFrontUpper;
    theta[neckId] = angleNeck;
    theta[rightFrontUpperLegId] = angleRightFrontUpper;
    theta[rightFrontLowerLegId] = angleRightFrontLower;
    theta[rightBackUpperLegId] = angleRightBackUpper;
    theta[rightBackLowerLegId] = angleRightBackLower;
    theta[leftBackUpperLegId] = angleLeftBackUpper;
    theta[leftBackLowerLegId] = angleLeftBackLower;
    theta[tailId] = angleTail;

    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.enable(gl.DEPTH_TEST);

    var eye = vec3(10.0, 0, 10.0);
    var at = vec3(horseModelPosition[0], horseModelPosition[1], horseModelPosition[2]);

    modelViewMatrix = lookAt(eye, at, vec3(0.0, 1.0, 0.0));
    var translationMatrix = translate(horseModelPosition);
    traverseHorse(torsoId, translationMatrix);

    requestAnimFrame(render);
}