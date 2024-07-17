var canvas;
var gl;
var program;

var projectionMatrix;
var modelViewMatrix = mat4();

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

// for horse1
var horse1torsoId = 0;
var horse1neckId  = 1;
var horse1headId  = 2;
var horse1leftFrontUpperLegId = 3;
var horse1leftFrontLowerLegId = 4;
var horse1rightFrontUpperLegId = 5;
var horse1rightFrontLowerLegId = 6;
var horse1leftBackUpperLegId = 7;
var horse1leftBackLowerLegId = 8;
var horse1rightBackUpperLegId = 9;
var horse1rightBackLowerLegId = 10;
var horse1tailId = 11;
var horse1rightEarId = 12;
var horse1leftEarId = 13;

// for horse2
var horse2torsoId = 26;
var horse2neckId  = 27;
var horse2headId  = 28;
var horse2leftFrontUpperLegId = 29;
var horse2leftFrontLowerLegId = 30;
var horse2rightFrontUpperLegId = 31;
var horse2rightFrontLowerLegId = 32;
var horse2leftBackUpperLegId = 33;
var horse2leftBackLowerLegId = 34;
var horse2rightBackUpperLegId = 35;
var horse2rightBackLowerLegId = 36;
var horse2tailId = 37;
var horse2rightEarId = 38;
var horse2leftEarId = 39;

// for horse3
var horse3torsoId = 40;
var horse3neckId  = 41;
var horse3headId  = 42;
var horse3leftFrontUpperLegId = 43;
var horse3leftFrontLowerLegId = 44;
var horse3rightFrontUpperLegId = 45;
var horse3rightFrontLowerLegId = 46;
var horse3leftBackUpperLegId = 47;
var horse3leftBackLowerLegId = 48;
var horse3rightBackUpperLegId = 49;
var horse3rightBackLowerLegId = 50;
var horse3tailId = 51;
var horse3rightEarId = 52;
var horse3leftEarId = 53;

// for horse4
var horse4torsoId = 54;
var horse4neckId  = 55;
var horse4headId  = 56;
var horse4leftFrontUpperLegId = 57;
var horse4leftFrontLowerLegId = 58;
var horse4rightFrontUpperLegId = 59;
var horse4rightFrontLowerLegId = 60;
var horse4leftBackUpperLegId = 61;
var horse4leftBackLowerLegId = 62;
var horse4rightBackUpperLegId = 63;
var horse4rightBackLowerLegId = 64;
var horse4tailId = 65;
var horse4rightEarId = 66;
var horse4leftEarId = 67;

// for gate1
var gate1rightPillarId = 14;
var gate1rightUpperJointId = 15;
var gate1rightLowerJointId = 16;
var gate1rightDoorComponent1Id = 17;
var gate1rightDoorComponent2Id = 18;
var gate1rightDoorComponent3Id = 19;

var gate1leftPillarId = 20;
var gate1leftUpperJointId = 21;
var gate1leftLowerJointId = 22;
var gate1leftDoorComponent1Id = 23;
var gate1leftDoorComponent2Id = 24;
var gate1leftDoorComponent3Id = 25;

// for gate2
var gate2rightPillarId = 68;
var gate2rightUpperJointId = 69;
var gate2rightLowerJointId = 70;
var gate2rightDoorComponent1Id = 71;
var gate2rightDoorComponent2Id = 72;
var gate2rightDoorComponent3Id = 73;

var gate2leftPillarId = 74;
var gate2leftUpperJointId = 75;
var gate2leftLowerJointId = 76;
var gate2leftDoorComponent1Id = 77;
var gate2leftDoorComponent2Id = 78;
var gate2leftDoorComponent3Id = 79;

// for gate3
var gate3rightPillarId = 80;
var gate3rightUpperJointId = 81;
var gate3rightLowerJointId = 82;
var gate3rightDoorComponent1Id = 83;
var gate3rightDoorComponent2Id = 84;
var gate3rightDoorComponent3Id = 85;

var gate3leftPillarId = 86;
var gate3leftUpperJointId = 87;
var gate3leftLowerJointId = 88;
var gate3leftDoorComponent1Id = 89;
var gate3leftDoorComponent2Id = 90;
var gate3leftDoorComponent3Id = 91;

// for gate4
var gate4rightPillarId = 92;
var gate4rightUpperJointId = 93;
var gate4rightLowerJointId = 94;
var gate4rightDoorComponent1Id = 95;
var gate4rightDoorComponent2Id = 96;
var gate4rightDoorComponent3Id = 97;

var gate4leftPillarId = 98;
var gate4leftUpperJointId = 99;
var gate4leftLowerJointId = 100;
var gate4leftDoorComponent1Id = 101;
var gate4leftDoorComponent2Id = 102;
var gate4leftDoorComponent3Id = 103;

// Height and Width
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

var theta = [
    // For horse 1
    0, -25, -5, 180, 0, 180, 0, 180, 0, 180, 0, -90, 0, 0,

    // For gate 1
    0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0,

    // For horse 2
    0, -25, -5, 180, 0, 180, 0, 180, 0, 180, 0, -90, 0, 0,

    // For horse 3
    0, -25, -5, 180, 0, 180, 0, 180, 0, 180, 0, -90, 0, 0,

    // For horse 4
    0, -25, -5, 180, 0, 180, 0, 180, 0, 180, 0, -90, 0, 0,

    // For gate 2
    0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0,

    // For gate 3
    0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0,

    // For gate 4
    0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0,
];

var stack = [];

var figure = [];

for( var i=0; i<numHorseNodes+numRightGateNodes+numLeftGateNodes+numHorseNodes+numHorseNodes+numHorseNodes; i++) figure[i] = createNode(null, null, null, null);

var pointsArray = [];
var normalsArray = [];

//for horse 1
var angleLeftFrontLower = 0; 
var speedLeftFrontLower = 1; 

var angleLeftFrontUpper = 0;
var speedLeftFrontUpper = 7;

var angleNeck = 1; 
var speedNeck = 1;

var angleRightFrontUpper = 20; 
var speedRightFrontUpper = 7;

var angleRightFrontLower = 0; 
var speedRightFrontLower = 1;

var angleRightBackUpper = 0;
var speedRightBackUpper = 7;

var angleRightBackLower = 0;
var speedRightBackLower = 1;

var angleLeftBackUpper = 20;
var speedLeftBackUpper = 7;

var angleLeftBackLower = 0;
var speedLeftBackLower = 1;

var angleTail = 0;
var speedTail = 1;

var angleRightUpperJoint = 0;
var speedRightUpperJoint = 6;

var angleRightLowerJoint = 0;
var speedRightLowerJoint = 6;

var angleLeftUpperJoint = 0;
var speedLeftUpperJoint = 6;

var angleLeftLowerJoint = 0;
var speedLeftLowerJoint = 6;

//for horse 2
var angleLeftFrontLower2 = 0; 
var speedLeftFrontLower2 = 1.5;

var angleLeftFrontUpper2 = 0; 
var speedLeftFrontUpper2 = 8;

var angleNeck2 = 1.5; 
var speedNeck2 = 1.5;

var angleRightFrontUpper2 = 20; 
var speedRightFrontUpper2 = 8;

var angleRightFrontLower2 = 0; 
var speedRightFrontLower2 = 1.5;

var angleRightBackUpper2 = 0;
var speedRightBackUpper2 = 8;

var angleRightBackLower2 = 0;
var speedRightBackLower2 = 1.5;

var angleLeftBackUpper2 = 20;
var speedLeftBackUpper2 = 8;

var angleLeftBackLower2 = 0;
var speedLeftBackLower2 = 1.5;

var angleTail2 = 0;
var speedTail2 = 1.5;

//for horse 3
var angleLeftFrontLower3 = 0;
var speedLeftFrontLower3 = 2;

var angleLeftFrontUpper3 = 0;
var speedLeftFrontUpper3 = 9;

var angleNeck3 = 1; 
var speedNeck3 = 2;

var angleRightFrontUpper3 = 20; 
var speedRightFrontUpper3 = 9;

var angleRightFrontLower3 = 0; 
var speedRightFrontLower3 = 2;

var angleRightBackUpper3 = 0;
var speedRightBackUpper3 = 9;

var angleRightBackLower3 = 0;
var speedRightBackLower3 = 2;

var angleLeftBackUpper3 = 20;
var speedLeftBackUpper3 = 9;

var angleLeftBackLower3 = 0;
var speedLeftBackLower3 = 2;

var angleTail3 = 0;
var speedTail3 = 2;

// for horse 4
var angleLeftFrontLower4 = 0;
var speedLeftFrontLower4 = 0.5; 

var angleLeftFrontUpper4 = 0;
var speedLeftFrontUpper4 = 5.5;

var angleNeck4 = 1; 
var speedNeck4 = 0.5;

var angleRightFrontUpper4 = 20; 
var speedRightFrontUpper4 = 5.5;

var angleRightFrontLower4 = 0; 
var speedRightFrontLower4 = 0.5;

var angleRightBackUpper4 = 0;
var speedRightBackUpper4 = 5.5;

var angleRightBackLower4 = 0;
var speedRightBackLower4 = 0.5;

var angleLeftBackUpper4 = 20;
var speedLeftBackUpper4 = 5.5;

var angleLeftBackLower4 = 0;
var speedLeftBackLower4 = 0.5;

var angleTail4 = 0;
var speedTail4 = 0.5;

var lightPosition = vec4(-10, 10, 1500, 0);

var lightAmbient = vec4(1.0, 1.0, 1.0, 1.0);
var lightDiffuse = vec4(1.0, 1.0, 1.0, 1.0);
var lightSpecular = vec4(1.0, 1.0, 1.0, 1.0);

// For horses
var materialAmbient1 = vec4(0.9, 1.0, 0.9, 1.0); 
var materialAmbient2 = vec4(0.0, 0.0, 0.0, 1.0); 
var materialAmbient3 = vec4(0.29, 0.09, 0.0, 1.0); 
var materialAmbient4 = vec4(0.71, 0.33, 0.64, 1.0); 

// For gates
var materialAmbient5 = vec4(0.5, 0.5, 0.5, 1.0); 
var materialDiffuse = vec4(0.6, 0.6, 0.6, 1.0);
var materialSpecular = vec4(0.7, 0.7, 0.7, 1.0);

var materialShininess = 100.0;

var ambientProduct, diffuseProduct, specularProduct;

var fixed = -0.01;

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
        // For horse 1
        case horse1torsoId:
            m = rotate(theta[horse1torsoId], 0, 1, 0);
            figure[horse1torsoId] = createNode(m, horse1Torso, null, horse1neckId);
            break;

        case horse1neckId:
            m = translate(torsoWidth-1.3, torsoHeight - 0.8, 0.0);
            m = mult(m, rotate(theta[horse1neckId], 0, 0, 1));
            figure[horse1neckId] = createNode(m, horse1neck, horse1leftFrontUpperLegId, horse1headId);
            break;

        case horse1headId:
            m = translate(neckWidth/2+0.13, neckHeight-0.5, 0.0);
            m = mult(m, rotate(theta[horse1headId], 0, 0, 1));
            figure[horse1headId] = createNode(m, horse1head, null, horse1leftEarId);
            break;

        case horse1leftFrontUpperLegId:
            m = translate(torsoWidth-0.88, upperLegHeight-2.3, -1.0);
            m = mult(m, rotate(theta[horse1leftFrontUpperLegId], 0, 0, 1));
            figure[horse1leftFrontUpperLegId] = createNode(m, horse1leftFrontUpperLeg, horse1rightFrontUpperLegId, horse1leftFrontLowerLegId);
            break;

        case horse1leftFrontLowerLegId:
            m = translate(0, upperLegHeight, 0);
            m = mult(m, rotate(theta[horse1leftFrontLowerLegId], 0, 0, 1));
            figure[horse1leftFrontLowerLegId] = createNode(m, horse1leftFrontLowerLeg, null, null);
            break;

        case horse1rightFrontUpperLegId:
            m = translate(torsoWidth-0.88, upperLegHeight-2.3, 1.0);
            m = mult(m, rotate(theta[horse1rightFrontUpperLegId], 0, 0, 1));
            figure[horse1rightFrontUpperLegId] = createNode(m, horse1rightFrontUpperLeg, horse1leftBackUpperLegId, horse1rightFrontLowerLegId);
            break;

        case horse1rightFrontLowerLegId:
            m = translate(0, upperLegHeight, 0);
            m = mult(m, rotate(theta[horse1rightFrontLowerLegId], 0, 0, 1));
            figure[horse1rightFrontLowerLegId] = createNode(m, horse1rightFrontLowerLeg, null, null);
            break;

        case horse1leftBackUpperLegId:
            m = translate(-torsoWidth+0.88, upperLegHeight-2.3, -1.0);
            m = mult(m, rotate(theta[horse1leftBackUpperLegId], 0, 0, 1));
            figure[horse1leftBackUpperLegId] = createNode(m, horse1leftBackUpperLeg, horse1rightBackUpperLegId, horse1leftBackLowerLegId);
            break;

        case horse1leftBackLowerLegId:
            m = translate(0, upperLegHeight, 0);
            m = mult(m, rotate(theta[horse1leftBackLowerLegId], 0, 0, 1));
            figure[horse1leftBackLowerLegId] = createNode(m, horse1leftBackLowerLeg, null, null);
            break;

        case horse1rightBackUpperLegId:
            m = translate(-torsoWidth+0.88, upperLegHeight-2.3, 1.0);
            m = mult(m, rotate(theta[horse1rightBackUpperLegId], 0, 0, 1));
            figure[horse1rightBackUpperLegId] = createNode(m, horse1rightBackUpperLeg, horse1tailId, horse1rightBackLowerLegId);
            break;

        case horse1rightBackLowerLegId:
            m = translate(0, upperLegHeight, 0);
            m = mult(m, rotate(theta[horse1rightBackLowerLegId], 0, 0, 1));
            figure[horse1rightBackLowerLegId] = createNode(m, horse1rightBackLowerLeg, null, null);
            break;

        case horse1tailId:
            m = translate(-torsoWidth, tailHeight-0.5, 0.0);
            m = mult(m, rotate(theta[horse1tailId], 0, 0, 1));
            figure[horse1tailId] = createNode(m, horse1tail, null, null);
            break;

        case horse1rightEarId:
            m = translate( -0.3, -headHeight + 1.9, 0.38);
            m = mult(m, rotate(theta[horse1headId], 0, 0, 1));
            figure[horse1rightEarId] = createNode(m, horse1rightEar, null, null);
            break;

        case horse1leftEarId:
            m = translate(-0.3, -headHeight + 1.9, -0.38);
            m = mult(m, rotate(theta[horse1headId], 0, 0, 1));
            figure[horse1leftEarId] = createNode(m, horse1leftEar, horse1rightEarId, null);
            break;

        // For horse 2
        case horse2torsoId:
            m = rotate(theta[horse2torsoId], 0, 1, 0);
            figure[horse2torsoId] = createNode(m, horse2Torso, null, horse2neckId);
            break;

        case horse2neckId:
            m = translate(torsoWidth-1.3, torsoHeight - 0.8, 0);
            m = mult(m, rotate(theta[horse2neckId], 0, 0, 1));
            figure[horse2neckId] = createNode(m, horse2neck, horse2leftFrontUpperLegId, horse2headId);
            break;

        case horse2headId:
            m = translate(neckWidth/2+0.13, neckHeight-0.5, 0.0);
            m = mult(m, rotate(theta[horse2headId], 0, 0, 1));
            figure[horse2headId] = createNode(m, horse2head, null, horse2leftEarId);
            break;

        case horse2leftFrontUpperLegId:
            m = translate(torsoWidth-0.88, upperLegHeight-2.3, -1.0);
            m = mult(m, rotate(theta[horse2leftFrontUpperLegId], 0, 0, 1));
            figure[horse2leftFrontUpperLegId] = createNode(m, horse2leftFrontUpperLeg, horse2rightFrontUpperLegId, horse2leftFrontLowerLegId);
            break;

        case horse2leftFrontLowerLegId:
            m = translate(0, upperLegHeight, 0);
            m = mult(m, rotate(theta[horse2leftFrontLowerLegId], 0, 0, 1));
            figure[horse2leftFrontLowerLegId] = createNode(m, horse2leftFrontLowerLeg, null, null);
            break;

        case horse2rightFrontUpperLegId:
            m = translate(torsoWidth-0.88, upperLegHeight-2.3, 1.0);
            m = mult(m, rotate(theta[horse2rightFrontUpperLegId], 0, 0, 1));
            figure[horse2rightFrontUpperLegId] = createNode(m, horse2rightFrontUpperLeg, horse2leftBackUpperLegId, horse2rightFrontLowerLegId);
            break;

        case horse2rightFrontLowerLegId:
            m = translate(0, upperLegHeight, 0);
            m = mult(m, rotate(theta[horse2rightFrontLowerLegId], 0, 0, 1));
            figure[horse2rightFrontLowerLegId] = createNode(m, horse2rightFrontLowerLeg, null, null);
            break;

        case horse2leftBackUpperLegId:
            m = translate(-torsoWidth+0.88, upperLegHeight-2.3, -1.0);
            m = mult(m, rotate(theta[horse2leftBackUpperLegId], 0, 0, 1));
            figure[horse2leftBackUpperLegId] = createNode(m, horse2leftBackUpperLeg, horse2rightBackUpperLegId, horse2leftBackLowerLegId);
            break;

        case horse2leftBackLowerLegId:
            m = translate(0, upperLegHeight, 0);
            m = mult(m, rotate(theta[horse2leftBackLowerLegId], 0, 0, 1));
            figure[horse2leftBackLowerLegId] = createNode(m, horse2leftBackLowerLeg, null, null);
            break;

        case horse2rightBackUpperLegId:
            m = translate(-torsoWidth+0.88, upperLegHeight-2.3, 1.0);
            m = mult(m, rotate(theta[horse2rightBackUpperLegId], 0, 0, 1));
            figure[horse2rightBackUpperLegId] = createNode(m, horse2rightBackUpperLeg, horse2tailId, horse2rightBackLowerLegId);
            break;

        case horse2rightBackLowerLegId:
            m = translate(0, upperLegHeight, 0);
            m = mult(m, rotate(theta[horse2rightBackLowerLegId], 0, 0, 1));
            figure[horse2rightBackLowerLegId] = createNode(m, horse2rightBackLowerLeg, null, null);
            break;

        case horse2tailId:
            m = translate(-torsoWidth, tailHeight-0.5, 0.0);
            m = mult(m, rotate(theta[horse2tailId], 0, 0, 1));
            figure[horse2tailId] = createNode(m, horse2tail, null, null);
            break;

        case horse2rightEarId:
            m = translate( -0.3, -headHeight + 1.9, 0.38);
            m = mult(m, rotate(theta[horse2headId], 0, 0, 1));
            figure[horse2rightEarId] = createNode(m, horse2rightEar, null, null);
            break;

        case horse2leftEarId:
            m = translate(-0.3, -headHeight + 1.9, -0.38);
            m = mult(m, rotate(theta[horse2headId], 0, 0, 1));
            figure[horse2leftEarId] = createNode(m, horse2leftEar, horse2rightEarId, null);
            break;

        // For horse 3
        case horse3torsoId:
            m = rotate(theta[horse3torsoId], 0, 1, 8);
            figure[horse3torsoId] = createNode(m, horse3Torso, null, horse3neckId);
            break;

        case horse3neckId:
            m = translate(torsoWidth-1.3, torsoHeight - 0.8, 0);
            m = mult(m, rotate(theta[horse3neckId], 0, 0, 1));
            figure[horse3neckId] = createNode(m, horse3neck, horse3leftFrontUpperLegId, horse3headId);
            break;

        case horse3headId:
            m = translate(neckWidth/2+0.13, neckHeight-0.5, 0.0);
            m = mult(m, rotate(theta[horse3headId], 0, 0, 1));
            figure[horse3headId] = createNode(m, horse3head, null, horse3leftEarId);
            break;

        case horse3leftFrontUpperLegId:
            m = translate(torsoWidth-0.88, upperLegHeight-2.3, -1.0);
            m = mult(m, rotate(theta[horse3leftFrontUpperLegId], 0, 0, 1));
            figure[horse3leftFrontUpperLegId] = createNode(m, horse3leftFrontUpperLeg, horse3rightFrontUpperLegId, horse3leftFrontLowerLegId);
            break;

        case horse3leftFrontLowerLegId:
            m = translate(0, upperLegHeight, 0);
            m = mult(m, rotate(theta[horse3leftFrontLowerLegId], 0, 0, 1));
            figure[horse3leftFrontLowerLegId] = createNode(m, horse3leftFrontLowerLeg, null, null);
            break;

        case horse3rightFrontUpperLegId:
            m = translate(torsoWidth-0.88, upperLegHeight-2.3, 1.0);
            m = mult(m, rotate(theta[horse3rightFrontUpperLegId], 0, 0, 1));
            figure[horse3rightFrontUpperLegId] = createNode(m, horse3rightFrontUpperLeg, horse3leftBackUpperLegId, horse3rightFrontLowerLegId);
            break;

        case horse3rightFrontLowerLegId:
            m = translate(0, upperLegHeight, 0);
            m = mult(m, rotate(theta[horse3rightFrontLowerLegId], 0, 0, 1));
            figure[horse3rightFrontLowerLegId] = createNode(m, horse3rightFrontLowerLeg, null, null);
            break;

        case horse3leftBackUpperLegId:
            m = translate(-torsoWidth+0.88, upperLegHeight-2.3, -1.0);
            m = mult(m, rotate(theta[horse3leftBackUpperLegId], 0, 0, 1));
            figure[horse3leftBackUpperLegId] = createNode(m, horse3leftBackUpperLeg, horse3rightBackUpperLegId, horse3leftBackLowerLegId);
            break;

        case horse3leftBackLowerLegId:
            m = translate(0, upperLegHeight, 0);
            m = mult(m, rotate(theta[horse3leftBackLowerLegId], 0, 0, 1));
            figure[horse3leftBackLowerLegId] = createNode(m, horse3leftBackLowerLeg, null, null);
            break;

        case horse3rightBackUpperLegId:
            m = translate(-torsoWidth+0.88, upperLegHeight-2.3, 1.0);
            m = mult(m, rotate(theta[horse3rightBackUpperLegId], 0, 0, 1));
            figure[horse3rightBackUpperLegId] = createNode(m, horse3rightBackUpperLeg, horse3tailId, horse3rightBackLowerLegId);
            break;

        case horse3rightBackLowerLegId:
            m = translate(0, upperLegHeight, 0);
            m = mult(m, rotate(theta[horse3rightBackLowerLegId], 0, 0, 1));
            figure[horse3rightBackLowerLegId] = createNode(m, horse3rightBackLowerLeg, null, null);
            break;

        case horse3tailId:
            m = translate(-torsoWidth, tailHeight-0.5, 0.0);
            m = mult(m, rotate(theta[horse3tailId], 0, 0, 1));
            figure[horse3tailId] = createNode(m, horse3tail, null, null);
            break;

        case horse3rightEarId:
            m = translate( -0.3, -headHeight + 1.9, 0.38);
            m = mult(m, rotate(theta[horse3headId], 0, 0, 1));
            figure[horse3rightEarId] = createNode(m, horse3rightEar, null, null);
            break;

        case horse3leftEarId:
            m = translate(-0.3, -headHeight + 1.9, -0.38);
            m = mult(m, rotate(theta[horse3headId], 0, 0, 1));
            figure[horse3leftEarId] = createNode(m, horse3leftEar, horse3rightEarId, null);
            break;

        // For horse 4
        case horse4torsoId:
            m = rotate(theta[horse4torsoId], 0, 1, 12);
            figure[horse4torsoId] = createNode(m, horse4Torso, null, horse4neckId);
            break;

        case horse4neckId:
            m = translate(torsoWidth-1.3, torsoHeight - 0.8, 0);
            m = mult(m, rotate(theta[horse4neckId], 0, 0, 1));
            figure[horse4neckId] = createNode(m, horse4neck, horse4leftFrontUpperLegId, horse4headId);
            break;

        case horse4headId:
            m = translate(neckWidth/2+0.13, neckHeight-0.5, 0.0);
            m = mult(m, rotate(theta[horse4headId], 0, 0, 1));
            figure[horse4headId] = createNode(m, horse4head, null, horse4leftEarId);
            break;

        case horse4leftFrontUpperLegId:
            m = translate(torsoWidth-0.88, upperLegHeight-2.3, -1.0);
            m = mult(m, rotate(theta[horse4leftFrontUpperLegId], 0, 0, 1));
            figure[horse4leftFrontUpperLegId] = createNode(m, horse4leftFrontUpperLeg, horse4rightFrontUpperLegId, horse4leftFrontLowerLegId);
            break;

        case horse4leftFrontLowerLegId:
            m = translate(0, upperLegHeight, 0);
            m = mult(m, rotate(theta[horse4leftFrontLowerLegId], 0, 0, 1));
            figure[horse4leftFrontLowerLegId] = createNode(m, horse4leftFrontLowerLeg, null, null);
            break;

        case horse4rightFrontUpperLegId:
            m = translate(torsoWidth-0.88, upperLegHeight-2.3, 1.0);
            m = mult(m, rotate(theta[horse4rightFrontUpperLegId], 0, 0, 1));
            figure[horse4rightFrontUpperLegId] = createNode(m, horse4rightFrontUpperLeg, horse4leftBackUpperLegId, horse4rightFrontLowerLegId);
            break;

        case horse4rightFrontLowerLegId:
            m = translate(0, upperLegHeight, 0);
            m = mult(m, rotate(theta[horse4rightFrontLowerLegId], 0, 0, 1));
            figure[horse4rightFrontLowerLegId] = createNode(m, horse4rightFrontLowerLeg, null, null);
            break;

        case horse4leftBackUpperLegId:
            m = translate(-torsoWidth+0.88, upperLegHeight-2.3, -1.0);
            m = mult(m, rotate(theta[horse4leftBackUpperLegId], 0, 0, 1));
            figure[horse4leftBackUpperLegId] = createNode(m, horse4leftBackUpperLeg, horse4rightBackUpperLegId, horse4leftBackLowerLegId);
            break;

        case horse4leftBackLowerLegId:
            m = translate(0, upperLegHeight, 0);
            m = mult(m, rotate(theta[horse4leftBackLowerLegId], 0, 0, 1));
            figure[horse4leftBackLowerLegId] = createNode(m, horse4leftBackLowerLeg, null, null);
            break;

        case horse4rightBackUpperLegId:
            m = translate(-torsoWidth+0.88, upperLegHeight-2.3, 1.0);
            m = mult(m, rotate(theta[horse4rightBackUpperLegId], 0, 0, 1));
            figure[horse4rightBackUpperLegId] = createNode(m, horse4rightBackUpperLeg, horse4tailId, horse4rightBackLowerLegId);
            break;

        case horse4rightBackLowerLegId:
            m = translate(0, upperLegHeight, 0);
            m = mult(m, rotate(theta[horse4rightBackLowerLegId], 0, 0, 1));
            figure[horse4rightBackLowerLegId] = createNode(m, horse4rightBackLowerLeg, null, null);
            break;

        case horse4tailId:
            m = translate(-torsoWidth, tailHeight-0.5, 0.0);
            m = mult(m, rotate(theta[horse4tailId], 0, 0, 1));
            figure[horse4tailId] = createNode(m, horse4tail, null, null);
            break;

        case horse4rightEarId:
            m = translate( -0.3, -headHeight + 1.9, 0.38);
            m = mult(m, rotate(theta[horse4headId], 0, 0, 1));
            figure[horse4rightEarId] = createNode(m, horse4rightEar, null, null);
            break;

        case horse4leftEarId:
            m = translate(-0.3, -headHeight + 1.9, -0.38);
            m = mult(m, rotate(theta[horse4headId], 0, 0, 1));
            figure[horse4leftEarId] = createNode(m, horse4leftEar, horse4rightEarId, null);
            break;

        // For gate 1
        case gate1rightPillarId:
            m = rotate(theta[gate1rightPillarId], 0, 1, 0);
            figure[gate1rightPillarId] = createNode(m, gate1rightPillar, null, gate1rightUpperJointId);
            break;

        case gate1rightUpperJointId:
            m = translate( 6.0, 3.3, 2.3);
            m = mult(m, rotateY(theta[gate1rightUpperJointId], 0, 0, 1));
            figure[gate1rightUpperJointId] = createNode(m, gate1rightUpperJoint, gate1rightLowerJointId, gate1rightDoorComponent1Id);
            break;

        case gate1rightLowerJointId:
            m = translate( 6.0, -1.45, 2.3);
            m = mult(m, rotateY(theta[gate1rightLowerJointId], 0, 0, 1));
            figure[gate1rightLowerJointId] = createNode(m, gate1rightLowerJoint, null, gate1rightDoorComponent3Id);
            break;

        case gate1rightDoorComponent1Id:
            m = translate( -0.3, -0.8, -1.2);
            m = mult(m, rotate(theta[gate1rightDoorComponent1Id], 0, 0, 1));
            figure[gate1rightDoorComponent1Id] = createNode(m, gate1rightDoorComponent1, null, gate1rightDoorComponent2Id);
            break;

        case gate1rightDoorComponent2Id:
            m = translate( -1.3, -1.2, -2.0);
            m = mult(m, rotate(theta[gate1rightDoorComponent2Id], 0, 0, 1));
            figure[gate1rightDoorComponent2Id] = createNode(m, gate1rightDoorComponent2, null, null);
            break;

        case gate1rightDoorComponent3Id:
            m = translate( -0.3, -0.8, -1.2);
            m = mult(m, rotate(theta[gate1rightDoorComponent3Id], 0, 0, 1));
            figure[gate1rightDoorComponent3Id] = createNode(m, gate1rightDoorComponent3, null, null);
            break;

        case gate1leftPillarId:
            m = translate( 0.0, 0.0, 0.0);
            m = mult(m, rotate(theta[gate1leftPillarId], 0, 0, 1));
            figure[gate1leftPillarId] = createNode(m, gate1leftPillar, null, gate1leftUpperJointId);
            break;

        case gate1leftUpperJointId:
            m = translate( 6,  jointHeight * 11.8 + 0.85, -2.5);
            m = mult(m, rotateY(theta[gate1leftUpperJointId], 0, 0, 1));
            figure[gate1leftUpperJointId] = createNode(m, gate1leftUpperJoint, gate1leftLowerJointId, gate1leftDoorComponent1Id);
            break;

        case gate1leftLowerJointId:
            m = translate( 6,  jointHeight + 1.5, -2.5);
            m = mult(m, rotateY(theta[gate1leftLowerJointId], 0, 0, 1));
            figure[gate1leftLowerJointId] = createNode(m, gate1leftLowerJoint, null, gate1leftDoorComponent3Id);
            break;

        case gate1leftDoorComponent1Id:
            m = translate(-1.7 + DoorComponentWidth, -4.5 + DoorComponentHeight, DoorComponentWidth - 0.15);
            m = mult(m, rotate(theta[gate1leftDoorComponent1Id], 1, 0, 0));
            figure[gate1leftDoorComponent1Id] = createNode(m, gate1leftDoorComponent1, null, gate1leftDoorComponent2Id);
            break;

        case gate1leftDoorComponent2Id:
            m = translate( -1.25, -1.2, -0.855);
            m = mult(m, rotate(theta[gate1leftDoorComponent2Id], 0, 0, 1));
            figure[gate1leftDoorComponent2Id] = createNode(m, gate1leftDoorComponent2, null, null);
            break;

        case gate1leftDoorComponent3Id:
            m = translate( -0.2, -4.25, 0.95);
            m = mult(m, rotate(theta[gate1leftDoorComponent3Id], 0, 0, 1));
            figure[gate1leftDoorComponent3Id] = createNode(m, gate1leftDoorComponent3, null, null);
            break;

        // For gate 2
        case gate2rightPillarId:
            m = rotate(theta[gate2rightPillarId], 0, 1, 0);
            figure[gate2rightPillarId] = createNode(m, gate2rightPillar, null, gate2rightUpperJointId);
            break;

        case gate2rightUpperJointId:
            m = translate( 6.0, 3.3, 12.3);
            m = mult(m, rotateY(theta[gate2rightUpperJointId], 0, 0, 1));
            figure[gate2rightUpperJointId] = createNode(m, gate2rightUpperJoint, gate2rightLowerJointId, gate2rightDoorComponent1Id);
            break;

        case gate2rightLowerJointId:
            m = translate( 6.0, -1.45, 12.3);
            m = mult(m, rotateY(theta[gate2rightLowerJointId], 0, 0, 1));
            figure[gate2rightLowerJointId] = createNode(m, gate2rightLowerJoint, null, gate2rightDoorComponent3Id);
            break;

        case gate2rightDoorComponent1Id:
            m = translate( -0.3, -0.8, -1.2);
            m = mult(m, rotate(theta[gate2rightDoorComponent1Id], 0, 0, 1));
            figure[gate2rightDoorComponent1Id] = createNode(m, gate2rightDoorComponent1, null, gate2rightDoorComponent2Id);
            break;

        case gate2rightDoorComponent2Id:
            m = translate( -1.3, -1.2, -2.0);
            m = mult(m, rotate(theta[gate2rightDoorComponent2Id], 0, 0, 1));
            figure[gate2rightDoorComponent2Id] = createNode(m, gate2rightDoorComponent2, null, null);
            break;

        case gate2rightDoorComponent3Id:
            m = translate( -0.3, -0.8, -1.2);
            m = mult(m, rotate(theta[gate2rightDoorComponent3Id], 0, 0, 1));
            figure[gate2rightDoorComponent3Id] = createNode(m, gate2rightDoorComponent3, null, null);
            break;

        case gate2leftPillarId:
            m = translate( 0.0, 0.0, 0.0);
            m = mult(m, rotate(theta[gate2leftPillarId], 0, 0, 1));
            figure[gate2leftPillarId] = createNode(m, gate2leftPillar, null, gate2leftUpperJointId);
            break;

        case gate2leftUpperJointId:
            m = translate( 6,  jointHeight * 11.8 + 0.85, -2.5 + 11);
            m = mult(m, rotateY(theta[gate2leftUpperJointId], 0, 0, 1));
            figure[gate2leftUpperJointId] = createNode(m, gate2leftUpperJoint, gate2leftLowerJointId, gate2leftDoorComponent1Id);
            break;

        case gate2leftLowerJointId:
            m = translate( 6,  jointHeight + 1.5, -2.5 + 11);
            m = mult(m, rotateY(theta[gate2leftLowerJointId], 0, 0, 1));
            figure[gate2leftLowerJointId] = createNode(m, gate2leftLowerJoint, null, gate2leftDoorComponent3Id);
            break;

        case gate2leftDoorComponent1Id:
            m = translate(-1.7 + DoorComponentWidth, -4.5 + DoorComponentHeight, DoorComponentWidth - 0.15);
            m = mult(m, rotate(theta[gate2leftDoorComponent1Id], 1, 0, 0));
            figure[gate2leftDoorComponent1Id] = createNode(m, gate2leftDoorComponent1, null, gate2leftDoorComponent2Id);
            break;

        case gate2leftDoorComponent2Id:
            m = translate( -1.25, -1.2, -0.855);
            m = mult(m, rotate(theta[gate2leftDoorComponent2Id], 0, 0, 1));
            figure[gate2leftDoorComponent2Id] = createNode(m, gate2leftDoorComponent2, null, null);
            break;

        case gate2leftDoorComponent3Id:
            m = translate( -0.2, -4.25, 0.95);
            m = mult(m, rotate(theta[gate2leftDoorComponent3Id], 0, 0, 1));
            figure[gate2leftDoorComponent3Id] = createNode(m, gate2leftDoorComponent3, null, null);
            break;

        // For gate 3
        case gate3rightPillarId:
            m = rotate(theta[gate3rightPillarId], 0, 1, 0);
            figure[gate3rightPillarId] = createNode(m, gate3rightPillar, null, gate3rightUpperJointId);
            break;

        case gate3rightUpperJointId:
            m = translate( 6.0, 3.3, 2.3 + 20);
            m = mult(m, rotateY(theta[gate3rightUpperJointId], 0, 0, 1));
            figure[gate3rightUpperJointId] = createNode(m, gate3rightUpperJoint, gate3rightLowerJointId, gate3rightDoorComponent1Id);
            break;

        case gate3rightLowerJointId:
            m = translate( 6.0, -1.45, 2.3 + 20);
            m = mult(m, rotateY(theta[gate3rightLowerJointId], 0, 0, 1));
            figure[gate3rightLowerJointId] = createNode(m, gate3rightLowerJoint, null, gate3rightDoorComponent3Id);
            break;

        case gate3rightDoorComponent1Id:
            m = translate( -0.3, -0.8, -1.2);
            m = mult(m, rotate(theta[gate3rightDoorComponent1Id], 0, 0, 1));
            figure[gate3rightDoorComponent1Id] = createNode(m, gate3rightDoorComponent1, null, gate3rightDoorComponent2Id);
            break;

        case gate3rightDoorComponent2Id:
            m = translate( -1.3, -1.2, -2.0);
            m = mult(m, rotate(theta[gate3rightDoorComponent2Id], 0, 0, 1));
            figure[gate3rightDoorComponent2Id] = createNode(m, gate3rightDoorComponent2, null, null);
            break;

        case gate3rightDoorComponent3Id:
            m = translate( -0.3, -0.8, -1.2);
            m = mult(m, rotate(theta[gate3rightDoorComponent3Id], 0, 0, 1));
            figure[gate3rightDoorComponent3Id] = createNode(m, gate3rightDoorComponent3, null, null);
            break;

        case gate3leftPillarId:
            m = translate( 0.0, 0.0, 0.0);
            m = mult(m, rotate(theta[gate3leftPillarId], 0, 0, 1));
            figure[gate3leftPillarId] = createNode(m, gate3leftPillar, null, gate3leftUpperJointId);
            break;

        case gate3leftUpperJointId:
            m = translate( 6,  jointHeight * 11.8 + 0.85, -2.5 + 21);
            m = mult(m, rotateY(theta[gate3leftUpperJointId], 0, 0, 1));
            figure[gate3leftUpperJointId] = createNode(m, gate3leftUpperJoint, gate3leftLowerJointId, gate3leftDoorComponent1Id);
            break;

        case gate3leftLowerJointId:
            m = translate( 6,  jointHeight + 1.5, -2.5 + 21);
            m = mult(m, rotateY(theta[gate3leftLowerJointId], 0, 0, 1));
            figure[gate3leftLowerJointId] = createNode(m, gate3leftLowerJoint, null, gate3leftDoorComponent3Id);
            break;

        case gate3leftDoorComponent1Id:
            m = translate(-1.7 + DoorComponentWidth, -4.5 + DoorComponentHeight, DoorComponentWidth - 0.15);
            m = mult(m, rotate(theta[gate3leftDoorComponent1Id], 1, 0, 0));
            figure[gate3leftDoorComponent1Id] = createNode(m, gate3leftDoorComponent1, null, gate3leftDoorComponent2Id);
            break;

        case gate3leftDoorComponent2Id:
            m = translate( -1.25, -1.2, -0.855);
            m = mult(m, rotate(theta[gate3leftDoorComponent2Id], 0, 0, 1));
            figure[gate3leftDoorComponent2Id] = createNode(m, gate3leftDoorComponent2, null, null);
            break;

        case gate3leftDoorComponent3Id:
            m = translate( -0.2, -4.25, 0.95);
            m = mult(m, rotate(theta[gate3leftDoorComponent3Id], 0, 0, 1));
            figure[gate3leftDoorComponent3Id] = createNode(m, gate3leftDoorComponent3, null, null);
            break;

        // For gate 4
        case gate4rightPillarId:
            m = rotate(theta[gate4rightPillarId], 0, 1, 0);
            figure[gate4rightPillarId] = createNode(m, gate4rightPillar, null, gate4rightUpperJointId);
            break;

        case gate4rightUpperJointId:
            m = translate( 6.0, 3.3, 2.3 + 30);
            m = mult(m, rotateY(theta[gate4rightUpperJointId], 0, 0, 1));
            figure[gate4rightUpperJointId] = createNode(m, gate4rightUpperJoint, gate4rightLowerJointId, gate4rightDoorComponent1Id);
            break;

        case gate4rightLowerJointId:
            m = translate( 6.0, -1.45, 2.3 + 30);
            m = mult(m, rotateY(theta[gate4rightLowerJointId], 0, 0, 1));
            figure[gate4rightLowerJointId] = createNode(m, gate4rightLowerJoint, null, gate4rightDoorComponent3Id);
            break;

        case gate4rightDoorComponent1Id:
            m = translate( -0.3, -0.8, -1.2);
            m = mult(m, rotate(theta[gate4rightDoorComponent1Id], 0, 0, 1));
            figure[gate4rightDoorComponent1Id] = createNode(m, gate4rightDoorComponent1, null, gate4rightDoorComponent2Id);
            break;

        case gate4rightDoorComponent2Id:
            m = translate( -1.3, -1.2, -2.0);
            m = mult(m, rotate(theta[gate4rightDoorComponent2Id], 0, 0, 1));
            figure[gate4rightDoorComponent2Id] = createNode(m, gate4rightDoorComponent2, null, null);
            break;

        case gate4rightDoorComponent3Id:
            m = translate( -0.3, -0.8, -1.2);
            m = mult(m, rotate(theta[gate4rightDoorComponent3Id], 0, 0, 1));
            figure[gate4rightDoorComponent3Id] = createNode(m, gate4rightDoorComponent3, null, null);
            break;

        case gate4leftPillarId:
            m = translate( 0.0, 0.0, 0.0);
            m = mult(m, rotate(theta[gate4leftPillarId], 0, 0, 1));
            figure[gate4leftPillarId] = createNode(m, gate4leftPillar, null, gate4leftUpperJointId);
            break;

        case gate4leftUpperJointId:
            m = translate( 6,  jointHeight * 11.8 + 0.85, -2.5 + 31);
            m = mult(m, rotateY(theta[gate4leftUpperJointId], 0, 0, 1));
            figure[gate4leftUpperJointId] = createNode(m, gate4leftUpperJoint, gate4leftLowerJointId, gate4leftDoorComponent1Id);
            break;

        case gate4leftLowerJointId:
            m = translate( 6,  jointHeight + 1.5, -2.5 + 31);
            m = mult(m, rotateY(theta[gate4leftLowerJointId], 0, 0, 1));
            figure[gate4leftLowerJointId] = createNode(m, gate4leftLowerJoint, null, gate4leftDoorComponent3Id);
            break;

        case gate4leftDoorComponent1Id:
            m = translate(-1.7 + DoorComponentWidth, -4.5 + DoorComponentHeight, DoorComponentWidth - 0.15);
            m = mult(m, rotate(theta[gate4leftDoorComponent1Id], 1, 0, 0));
            figure[gate4leftDoorComponent1Id] = createNode(m, gate4leftDoorComponent1, null, gate4leftDoorComponent2Id);
            break;

        case gate4leftDoorComponent2Id:
            m = translate( -1.25, -1.2, -0.855);
            m = mult(m, rotate(theta[gate4leftDoorComponent2Id], 0, 0, 1));
            figure[gate4leftDoorComponent2Id] = createNode(m, gate4leftDoorComponent2, null, null);
            break;

        case gate4leftDoorComponent3Id:
            m = translate( -0.2, -4.25, 0.95);
            m = mult(m, rotate(theta[gate4leftDoorComponent3Id], 0, 0, 1));
            figure[gate4leftDoorComponent3Id] = createNode(m, gate4leftDoorComponent3, null, null);
            break;
    }
}



function updatePosition() {
    for (var i = 0; i < numHorseNodes; i++) {
        figure[i].transform = mult(translate(modelSpeed, 0, 0), figure[i].transform);
    }
}

var horsePosition = vec3(0.0, 0.0, 0.0);
var horsePosition2 = vec3(0.0, 0.0, 0.0);
var horsePosition3 = vec3(0.0, 0.0, 0.0);
var horsePosition4 = vec3(0.0, 0.0, 0.0);


// traverse 1
function traverseHorse(Id, translationMatrix) {
    if (Id == null) return;

    stack.push(modelViewMatrix);

    // For horse 1
    if (Id === horse1torsoId) {
        modelViewMatrix = mult(modelViewMatrix, translate(horsePosition[0], horsePosition[1], horsePosition[2]));
    }

    modelViewMatrix = mult(modelViewMatrix, figure[Id].transform);

    if (// For horse 1
        Id === horse1leftFrontUpperLegId ||
        Id === horse1leftFrontLowerLegId ||
        Id === horse1neckId ||
        Id === horse1rightFrontUpperLegId ||
        Id === horse1rightFrontLowerLegId ||
        Id === horse1rightBackUpperLegId ||
        Id === horse1rightBackLowerLegId ||
        Id === horse1leftBackUpperLegId ||
        Id === horse1leftBackLowerLegId ||
        Id === horse1tailId 
    ) {
        modelViewMatrix = mult(modelViewMatrix, rotate(theta[Id], 0, 0, 1));
    }

    figure[Id].render();
    if (figure[Id].child != null) traverseHorse(figure[Id].child, translationMatrix);
    modelViewMatrix = stack.pop();
    if (figure[Id].sibling != null) traverseHorse(figure[Id].sibling, translationMatrix);
}


//traverse 2
function traverseHorse2(Id, translationMatrix) {
    if (Id == null) return;

    stack.push(modelViewMatrix);

    // For horse 2
    if (Id === horse2torsoId) {
        modelViewMatrix = mult(modelViewMatrix, translate(horsePosition2[0], horsePosition2[1], horsePosition2[2]));
    }

    modelViewMatrix = mult(modelViewMatrix, figure[Id].transform);

    if (
        // For horse 2
        Id === horse2leftFrontUpperLegId ||
        Id === horse2leftFrontLowerLegId ||
        Id === horse2neckId ||
        Id === horse2rightFrontUpperLegId ||
        Id === horse2rightFrontLowerLegId ||
        Id === horse2rightBackUpperLegId ||
        Id === horse2rightBackLowerLegId ||
        Id === horse2leftBackUpperLegId ||
        Id === horse2leftBackLowerLegId ||
        Id === horse2tailId 
    ) {
        modelViewMatrix = mult(modelViewMatrix, rotate(theta[Id], 0, 0, 1));
    }

    figure[Id].render();
    if (figure[Id].child != null) traverseHorse2(figure[Id].child, translationMatrix);
    modelViewMatrix = stack.pop();
    if (figure[Id].sibling != null) traverseHorse2(figure[Id].sibling, translationMatrix);
}


//traverse 3
function traverseHorse3(Id, translationMatrix) {
    if (Id == null) return;

    stack.push(modelViewMatrix);

    // For horse 3
    if (Id === horse3torsoId) {
        modelViewMatrix = mult(modelViewMatrix, translate(horsePosition3[0], horsePosition3[1], horsePosition3[2]));
    }

    modelViewMatrix = mult(modelViewMatrix, figure[Id].transform);

    if (
        // For horse 3
        Id === horse3leftFrontUpperLegId ||
        Id === horse3leftFrontLowerLegId ||
        Id === horse3neckId ||
        Id === horse3rightFrontUpperLegId ||
        Id === horse3rightFrontLowerLegId ||
        Id === horse3rightBackUpperLegId ||
        Id === horse3rightBackLowerLegId ||
        Id === horse3leftBackUpperLegId ||
        Id === horse3leftBackLowerLegId ||
        Id === horse3tailId
    ) {
        modelViewMatrix = mult(modelViewMatrix, rotate(theta[Id], 0, 0, 1));
    }

    figure[Id].render();
    if (figure[Id].child != null) traverseHorse3(figure[Id].child, translationMatrix);
    modelViewMatrix = stack.pop();
    if (figure[Id].sibling != null) traverseHorse3(figure[Id].sibling, translationMatrix);
}


//traverse 4
function traverseHorse4(Id, translationMatrix) {
    if (Id == null) return;

    stack.push(modelViewMatrix);

    // For horse 4
    if (Id === horse4torsoId) {
        modelViewMatrix = mult(modelViewMatrix, translate(horsePosition4[0], horsePosition4[1], horsePosition4[2]));
    }

    modelViewMatrix = mult(modelViewMatrix, figure[Id].transform);

    if (
        // For horse 4
        Id === horse4leftFrontUpperLegId ||
        Id === horse4leftFrontLowerLegId ||
        Id === horse4neckId ||
        Id === horse4rightFrontUpperLegId ||
        Id === horse4rightFrontLowerLegId ||
        Id === horse4rightBackUpperLegId ||
        Id === horse4rightBackLowerLegId ||
        Id === horse4leftBackUpperLegId ||
        Id === horse4leftBackLowerLegId ||
        Id === horse4tailId
    ) {
        modelViewMatrix = mult(modelViewMatrix, rotate(theta[Id], 0, 0, 1));
    }

    figure[Id].render();
    if (figure[Id].child != null) traverseHorse4(figure[Id].child, translationMatrix);
    modelViewMatrix = stack.pop();
    if (figure[Id].sibling != null) traverseHorse4(figure[Id].sibling, translationMatrix);
}

// traverse gate
function traverseGate(Id) {
    if (Id == null) return;
    stack.push(modelViewMatrix);
    modelViewMatrix = mult(modelViewMatrix, figure[Id].transform);

    // For gate 1
    if (Id === gate1rightUpperJointId) {
        modelViewMatrix = mult(modelViewMatrix, rotate(theta[gate1rightUpperJointId], 0, 1, 0));
    }

    if (Id === gate1rightLowerJointId) {
        modelViewMatrix = mult(modelViewMatrix, rotate(theta[gate1rightLowerJointId], 0, 1, 0));
    }

    if (Id === gate1leftUpperJointId) {
        modelViewMatrix = mult(modelViewMatrix, rotate(theta[gate1leftUpperJointId], 0, 1, 0));
    }

    if (Id === gate1leftLowerJointId) {
        modelViewMatrix = mult(modelViewMatrix, rotate(theta[gate1leftLowerJointId], 0, 1, 0));
    }

    // For gate 2
    if (Id === gate2rightUpperJointId) {
        modelViewMatrix = mult(modelViewMatrix, rotate(theta[gate2rightUpperJointId], 0, 1, 0));
    }

    if (Id === gate2rightLowerJointId) {
        modelViewMatrix = mult(modelViewMatrix, rotate(theta[gate2rightLowerJointId], 0, 1, 0));
    }

    if (Id === gate2leftUpperJointId) {
        modelViewMatrix = mult(modelViewMatrix, rotate(theta[gate2leftUpperJointId], 0, 1, 0));
    }

    if (Id === gate2leftLowerJointId) {
        modelViewMatrix = mult(modelViewMatrix, rotate(theta[gate2leftLowerJointId], 0, 1, 0));
    }

    // For gate 3
    if (Id === gate3rightUpperJointId) {
        modelViewMatrix = mult(modelViewMatrix, rotate(theta[gate3rightUpperJointId], 0, 1, 0));
    }

    if (Id === gate3rightLowerJointId) {
        modelViewMatrix = mult(modelViewMatrix, rotate(theta[gate3rightLowerJointId], 0, 1, 0));
    }

    if (Id === gate3leftUpperJointId) {
        modelViewMatrix = mult(modelViewMatrix, rotate(theta[gate3leftUpperJointId], 0, 1, 0));
    }

    if (Id === gate3leftLowerJointId) {
        modelViewMatrix = mult(modelViewMatrix, rotate(theta[gate3leftLowerJointId], 0, 1, 0));
    }

    // For gate 4
    if (Id === gate4rightUpperJointId) {
        modelViewMatrix = mult(modelViewMatrix, rotate(theta[gate4rightUpperJointId], 0, 1, 0));
    }

    if (Id === gate4rightLowerJointId) {
        modelViewMatrix = mult(modelViewMatrix, rotate(theta[gate4rightLowerJointId], 0, 1, 0));
    }

    if (Id === gate4leftUpperJointId) {
        modelViewMatrix = mult(modelViewMatrix, rotate(theta[gate4leftUpperJointId], 0, 1, 0));
    }

    if (Id === gate4leftLowerJointId) {
        modelViewMatrix = mult(modelViewMatrix, rotate(theta[gate4leftLowerJointId], 0, 1, 0));
    }

    figure[Id].render();
    if (figure[Id].child != null) traverseGate(figure[Id].child);
    modelViewMatrix = stack.pop();
    if (figure[Id].sibling != null) traverseGate(figure[Id].sibling);
}

function horse1Torso() {
    ambientProduct = mult(lightAmbient, materialAmbient1);
    gl.uniform4fv(gl.getUniformLocation(program, "ambientProduct"), flatten(ambientProduct));

    instanceMatrix = mult(modelViewMatrix, translate(0.0, 0.5 * torsoHeight, 0.0) );
    instanceMatrix = mult(instanceMatrix, scale4(torsoWidth*2, torsoHeight*0.8, torsoWidth));
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(instanceMatrix));
    for(var i=0; i<6; i++) gl.drawArrays( gl.TRIANGLE_FAN, i*4, 4);
}

function horse1head() {
    instanceMatrix = mult(modelViewMatrix, translate(0.7, 0.5 * headHeight, 0.0) );
    instanceMatrix = mult(instanceMatrix, scale4(headWidth*1.3, headHeight/2, neckWidth) );
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(instanceMatrix));
    for(var i=0; i<6; i++) gl.drawArrays( gl.TRIANGLE_FAN, i*4, 4);
}

function horse1neck() {
    instanceMatrix = mult(modelViewMatrix, translate(0.7, neckHeight * 0.5 + 0.3, 0.0) );
    instanceMatrix = mult(instanceMatrix, scale4(neckWidth, neckHeight, neckWidth) );
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(instanceMatrix));
    for(var i=0; i<6; i++) gl.drawArrays( gl.TRIANGLE_FAN, i*4, 4);
}

function horse1leftFrontUpperLeg() {
    instanceMatrix = mult(modelViewMatrix, translate(0.0, 0.5 * upperLegHeight - 0.3, 0.0) );
    instanceMatrix = mult(instanceMatrix, scale4(upperLegWidth * 1.7, upperLegHeight, upperLegWidth) );
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(instanceMatrix));
    for(var i=0; i<6; i++) gl.drawArrays( gl.TRIANGLE_FAN, i*4, 4);
}

function horse1leftFrontLowerLeg() {
    instanceMatrix = mult(modelViewMatrix, translate(0.0, 0.5 * lowerLegHeight - 0.3, 0.0) );
    instanceMatrix = mult(instanceMatrix, scale4(lowerLegWidth * 1.6, lowerLegHeight, lowerLegWidth) );
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(instanceMatrix));
    for(var i=0; i<6; i++) gl.drawArrays( gl.TRIANGLE_FAN, i*4, 4);
}

function horse1rightFrontUpperLeg() {
    instanceMatrix = mult(modelViewMatrix, translate(0.0, 0.5 * upperLegHeight - 0.3, 0.0) );
    instanceMatrix = mult(instanceMatrix, scale4(upperLegWidth * 1.7, upperLegHeight, upperLegWidth) );
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(instanceMatrix));
    for(var i=0; i<6; i++) gl.drawArrays( gl.TRIANGLE_FAN, i*4, 4);
}

function horse1rightFrontLowerLeg() {
    instanceMatrix = mult(modelViewMatrix, translate(0.0, 0.5 * lowerLegHeight - 0.3, 0.0) );
    instanceMatrix = mult(instanceMatrix, scale4(lowerLegWidth * 1.6, lowerLegHeight, lowerLegWidth) );
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(instanceMatrix));
    for(var i=0; i<6; i++) gl.drawArrays( gl.TRIANGLE_FAN, i*4, 4);
}

function horse1leftBackUpperLeg() {
    instanceMatrix = mult(modelViewMatrix, translate(0.45, 0.5 * upperLegHeight - 0.3, 0.0) );
    instanceMatrix = mult(instanceMatrix, scale4(upperLegWidth * 1.7, upperLegHeight, upperLegWidth) );
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(instanceMatrix));
    for(var i=0; i<6; i++) gl.drawArrays( gl.TRIANGLE_FAN, i*4, 4);
}

function horse1leftBackLowerLeg() {
    instanceMatrix = mult(modelViewMatrix, translate(0.45, 0.5 * lowerLegHeight - 0.3, 0.0) );
    instanceMatrix = mult(instanceMatrix, scale4(lowerLegWidth * 1.6, lowerLegHeight, lowerLegWidth) );
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(instanceMatrix));
    for(var i=0; i<6; i++) gl.drawArrays( gl.TRIANGLE_FAN, i*4, 4);
}

function horse1rightBackUpperLeg() {
    instanceMatrix = mult(modelViewMatrix, translate(0.45, 0.5 * upperLegHeight - 0.3, 0.0) );
    instanceMatrix = mult(instanceMatrix, scale4(upperLegWidth * 1.7, upperLegHeight, upperLegWidth) );
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(instanceMatrix));
    for(var i=0; i<6; i++) gl.drawArrays( gl.TRIANGLE_FAN, i*4, 4);
}

function horse1rightBackLowerLeg() {
    instanceMatrix = mult(modelViewMatrix, translate(0.45, 0.5 * lowerLegHeight - 0.3, 0.0) );
    instanceMatrix = mult(instanceMatrix, scale4(lowerLegWidth * 1.6, lowerLegHeight, lowerLegWidth) );
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(instanceMatrix));
    for(var i=0; i<6; i++) gl.drawArrays( gl.TRIANGLE_FAN, i*4, 4);
}

function horse1tail() {
    instanceMatrix = mult(modelViewMatrix, translate(0, tailHeight-3.5, 0.0) );
    instanceMatrix = mult(instanceMatrix, scale4(tailWidth, tailHeight*2, tailWidth) );
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(instanceMatrix));
    for(var i=0; i<6; i++) gl.drawArrays( gl.TRIANGLE_FAN, i*4, 4);
}

function horse1rightEar() {
    instanceMatrix = mult(modelViewMatrix, translate(0.0, 0.5 * upperLegHeight - 0.3, 0.0) );
    instanceMatrix = mult(instanceMatrix, scale4(earWidth, earHeight, earWidth) );
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(instanceMatrix));
    for(var i=0; i<6; i++) gl.drawArrays( gl.TRIANGLE_FAN, i*4, 4);
}

function horse1leftEar() {
    instanceMatrix = mult(modelViewMatrix, translate(0.0, 0.5 * upperLegHeight - 0.3, 0.0) );
    instanceMatrix = mult(instanceMatrix, scale4(earWidth, earHeight, earWidth) );
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(instanceMatrix));
    for(var i=0; i<6; i++) gl.drawArrays( gl.TRIANGLE_FAN, i*4, 4);
}

// For horse 2
function horse2Torso() {
    ambientProduct = mult(lightAmbient, materialAmbient2);
    gl.uniform4fv(gl.getUniformLocation(program, "ambientProduct"), flatten(ambientProduct));

    instanceMatrix = mult(modelViewMatrix, translate(0.0, 0.5 * torsoHeight, 10.0) );
    instanceMatrix = mult(instanceMatrix, scale4(torsoWidth*2, torsoHeight*0.8, torsoWidth));
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(instanceMatrix));
    for(var i=0; i<6; i++) gl.drawArrays( gl.TRIANGLE_FAN, i*4, 4);
}

function horse2head() {
    instanceMatrix = mult(modelViewMatrix, translate(0.7, 0.5 * headHeight, 10.0) );
    instanceMatrix = mult(instanceMatrix, scale4(headWidth*1.3, headHeight/2, neckWidth) );
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(instanceMatrix));
    for(var i=0; i<6; i++) gl.drawArrays( gl.TRIANGLE_FAN, i*4, 4);
}

function horse2neck() {
    instanceMatrix = mult(modelViewMatrix, translate(0.7, neckHeight * 0.5 + 0.3, 10.0) );
    instanceMatrix = mult(instanceMatrix, scale4(neckWidth, neckHeight, neckWidth) );
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(instanceMatrix));
    for(var i=0; i<6; i++) gl.drawArrays( gl.TRIANGLE_FAN, i*4, 4);
}

function horse2leftFrontUpperLeg() {
    instanceMatrix = mult(modelViewMatrix, translate(0.0, 0.5 * upperLegHeight - 0.3, 10.0) );
    instanceMatrix = mult(instanceMatrix, scale4(upperLegWidth * 1.7, upperLegHeight, upperLegWidth) );
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(instanceMatrix));
    for(var i=0; i<6; i++) gl.drawArrays( gl.TRIANGLE_FAN, i*4, 4);
}

function horse2leftFrontLowerLeg() {
    instanceMatrix = mult(modelViewMatrix, translate(0.0, 0.5 * lowerLegHeight - 0.3, 10.0) );
    instanceMatrix = mult(instanceMatrix, scale4(lowerLegWidth * 1.6, lowerLegHeight, lowerLegWidth) );
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(instanceMatrix));
    for(var i=0; i<6; i++) gl.drawArrays( gl.TRIANGLE_FAN, i*4, 4);
}

function horse2rightFrontUpperLeg() {
    instanceMatrix = mult(modelViewMatrix, translate(0.0, 0.5 * upperLegHeight - 0.3, 10.0) );
    instanceMatrix = mult(instanceMatrix, scale4(upperLegWidth * 1.7, upperLegHeight, upperLegWidth) );
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(instanceMatrix));
    for(var i=0; i<6; i++) gl.drawArrays( gl.TRIANGLE_FAN, i*4, 4);
}

function horse2rightFrontLowerLeg() {
    instanceMatrix = mult(modelViewMatrix, translate(0.0, 0.5 * lowerLegHeight - 0.3, 10.0) );
    instanceMatrix = mult(instanceMatrix, scale4(lowerLegWidth * 1.6, lowerLegHeight, lowerLegWidth) );
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(instanceMatrix));
    for(var i=0; i<6; i++) gl.drawArrays( gl.TRIANGLE_FAN, i*4, 4);
}

function horse2leftBackUpperLeg() {
    instanceMatrix = mult(modelViewMatrix, translate(0.45, 0.5 * upperLegHeight - 0.3, 10.0) );
    instanceMatrix = mult(instanceMatrix, scale4(upperLegWidth * 1.7, upperLegHeight, upperLegWidth) );
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(instanceMatrix));
    for(var i=0; i<6; i++) gl.drawArrays( gl.TRIANGLE_FAN, i*4, 4);
}

function horse2leftBackLowerLeg() {
    instanceMatrix = mult(modelViewMatrix, translate(0.45, 0.5 * lowerLegHeight - 0.3, 10.0) );
    instanceMatrix = mult(instanceMatrix, scale4(lowerLegWidth * 1.6, lowerLegHeight, lowerLegWidth) );
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(instanceMatrix));
    for(var i=0; i<6; i++) gl.drawArrays( gl.TRIANGLE_FAN, i*4, 4);
}

function horse2rightBackUpperLeg() {
    instanceMatrix = mult(modelViewMatrix, translate(0.45, 0.5 * upperLegHeight - 0.3, 10.0) );
    instanceMatrix = mult(instanceMatrix, scale4(upperLegWidth * 1.7, upperLegHeight, upperLegWidth) );
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(instanceMatrix));
    for(var i=0; i<6; i++) gl.drawArrays( gl.TRIANGLE_FAN, i*4, 4);
}

function horse2rightBackLowerLeg() {
    instanceMatrix = mult(modelViewMatrix, translate(0.45, 0.5 * lowerLegHeight - 0.3, 10.0) );
    instanceMatrix = mult(instanceMatrix, scale4(lowerLegWidth * 1.6, lowerLegHeight, lowerLegWidth) );
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(instanceMatrix));
    for(var i=0; i<6; i++) gl.drawArrays( gl.TRIANGLE_FAN, i*4, 4);
}

function horse2tail() {
    instanceMatrix = mult(modelViewMatrix, translate(0, tailHeight-3.5, 10.0) );
    instanceMatrix = mult(instanceMatrix, scale4(tailWidth, tailHeight*2, tailWidth) );
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(instanceMatrix));
    for(var i=0; i<6; i++) gl.drawArrays( gl.TRIANGLE_FAN, i*4, 4);
}

function horse2rightEar() {
    instanceMatrix = mult(modelViewMatrix, translate(0.0, 0.5 * upperLegHeight - 0.3, 10.0) );
    instanceMatrix = mult(instanceMatrix, scale4(earWidth, earHeight, earWidth) );
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(instanceMatrix));
    for(var i=0; i<6; i++) gl.drawArrays( gl.TRIANGLE_FAN, i*4, 4);
}

function horse2leftEar() {
    instanceMatrix = mult(modelViewMatrix, translate(0.0, 0.5 * upperLegHeight - 0.3, 10.0) );
    instanceMatrix = mult(instanceMatrix, scale4(earWidth, earHeight, earWidth) );
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(instanceMatrix));
    for(var i=0; i<6; i++) gl.drawArrays( gl.TRIANGLE_FAN, i*4, 4);
}

// For horse 3
function horse3Torso() {
    ambientProduct = mult(lightAmbient, materialAmbient3);
    gl.uniform4fv(gl.getUniformLocation(program, "ambientProduct"), flatten(ambientProduct));

    instanceMatrix = mult(modelViewMatrix, translate(0.0, 0.5 * torsoHeight, 20.0) );
    instanceMatrix = mult(instanceMatrix, scale4(torsoWidth*2, torsoHeight*0.8, torsoWidth));
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(instanceMatrix));
    for(var i=0; i<6; i++) gl.drawArrays( gl.TRIANGLE_FAN, i*4, 4);
}

function horse3head() {
    instanceMatrix = mult(modelViewMatrix, translate(0.7, 0.5 * headHeight, 20.0) );
    instanceMatrix = mult(instanceMatrix, scale4(headWidth*1.3, headHeight/2, neckWidth) );
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(instanceMatrix));
    for(var i=0; i<6; i++) gl.drawArrays( gl.TRIANGLE_FAN, i*4, 4);
}

function horse3neck() {
    instanceMatrix = mult(modelViewMatrix, translate(0.7, neckHeight * 0.5 + 0.3, 20.0) );
    instanceMatrix = mult(instanceMatrix, scale4(neckWidth, neckHeight, neckWidth) );
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(instanceMatrix));
    for(var i=0; i<6; i++) gl.drawArrays( gl.TRIANGLE_FAN, i*4, 4);
}

function horse3leftFrontUpperLeg() {
    instanceMatrix = mult(modelViewMatrix, translate(0.0, 0.5 * upperLegHeight - 0.3, 20.0) );
    instanceMatrix = mult(instanceMatrix, scale4(upperLegWidth * 1.7, upperLegHeight, upperLegWidth) );
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(instanceMatrix));
    for(var i=0; i<6; i++) gl.drawArrays( gl.TRIANGLE_FAN, i*4, 4);
}

function horse3leftFrontLowerLeg() {
    instanceMatrix = mult(modelViewMatrix, translate(0.0, 0.5 * lowerLegHeight - 0.3, 20.0) );
    instanceMatrix = mult(instanceMatrix, scale4(lowerLegWidth * 1.6, lowerLegHeight, lowerLegWidth) );
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(instanceMatrix));
    for(var i=0; i<6; i++) gl.drawArrays( gl.TRIANGLE_FAN, i*4, 4);
}

function horse3rightFrontUpperLeg() {
    instanceMatrix = mult(modelViewMatrix, translate(0.0, 0.5 * upperLegHeight - 0.3, 20.0) );
    instanceMatrix = mult(instanceMatrix, scale4(upperLegWidth * 1.7, upperLegHeight, upperLegWidth) );
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(instanceMatrix));
    for(var i=0; i<6; i++) gl.drawArrays( gl.TRIANGLE_FAN, i*4, 4);
}

function horse3rightFrontLowerLeg() {
    instanceMatrix = mult(modelViewMatrix, translate(0.0, 0.5 * lowerLegHeight - 0.3, 20.0) );
    instanceMatrix = mult(instanceMatrix, scale4(lowerLegWidth * 1.6, lowerLegHeight, lowerLegWidth) );
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(instanceMatrix));
    for(var i=0; i<6; i++) gl.drawArrays( gl.TRIANGLE_FAN, i*4, 4);
}

function horse3leftBackUpperLeg() {
    instanceMatrix = mult(modelViewMatrix, translate(0.45, 0.5 * upperLegHeight - 0.3, 20.0) );
    instanceMatrix = mult(instanceMatrix, scale4(upperLegWidth * 1.7, upperLegHeight, upperLegWidth) );
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(instanceMatrix));
    for(var i=0; i<6; i++) gl.drawArrays( gl.TRIANGLE_FAN, i*4, 4);
}

function horse3leftBackLowerLeg() {
    instanceMatrix = mult(modelViewMatrix, translate(0.45, 0.5 * lowerLegHeight - 0.3, 20.0) );
    instanceMatrix = mult(instanceMatrix, scale4(lowerLegWidth * 1.6, lowerLegHeight, lowerLegWidth) );
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(instanceMatrix));
    for(var i=0; i<6; i++) gl.drawArrays( gl.TRIANGLE_FAN, i*4, 4);
}

function horse3rightBackUpperLeg() {
    instanceMatrix = mult(modelViewMatrix, translate(0.45, 0.5 * upperLegHeight - 0.3, 20.0) );
    instanceMatrix = mult(instanceMatrix, scale4(upperLegWidth * 1.7, upperLegHeight, upperLegWidth) );
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(instanceMatrix));
    for(var i=0; i<6; i++) gl.drawArrays( gl.TRIANGLE_FAN, i*4, 4);
}

function horse3rightBackLowerLeg() {
    instanceMatrix = mult(modelViewMatrix, translate(0.45, 0.5 * lowerLegHeight - 0.3, 20.0) );
    instanceMatrix = mult(instanceMatrix, scale4(lowerLegWidth * 1.6, lowerLegHeight, lowerLegWidth) );
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(instanceMatrix));
    for(var i=0; i<6; i++) gl.drawArrays( gl.TRIANGLE_FAN, i*4, 4);
}

function horse3tail() {
    instanceMatrix = mult(modelViewMatrix, translate(0, tailHeight-3.5, 20.0) );
    instanceMatrix = mult(instanceMatrix, scale4(tailWidth, tailHeight*2, tailWidth) );
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(instanceMatrix));
    for(var i=0; i<6; i++) gl.drawArrays( gl.TRIANGLE_FAN, i*4, 4);
}

function horse3rightEar() {
    instanceMatrix = mult(modelViewMatrix, translate(0.0, 0.5 * upperLegHeight - 0.3, 20.0) );
    instanceMatrix = mult(instanceMatrix, scale4(earWidth, earHeight, earWidth) );
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(instanceMatrix));
    for(var i=0; i<6; i++) gl.drawArrays( gl.TRIANGLE_FAN, i*4, 4);
}

function horse3leftEar() {
    instanceMatrix = mult(modelViewMatrix, translate(0.0, 0.5 * upperLegHeight - 0.3, 20.0) );
    instanceMatrix = mult(instanceMatrix, scale4(earWidth, earHeight, earWidth) );
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(instanceMatrix));
    for(var i=0; i<6; i++) gl.drawArrays( gl.TRIANGLE_FAN, i*4, 4);
}

// For horse 4
function horse4Torso() {
    ambientProduct = mult(lightAmbient, materialAmbient4);
    gl.uniform4fv(gl.getUniformLocation(program, "ambientProduct"), flatten(ambientProduct));

    instanceMatrix = mult(modelViewMatrix, translate(0.0, 0.5 * torsoHeight, 30.0) );
    instanceMatrix = mult(instanceMatrix, scale4(torsoWidth*2, torsoHeight*0.8, torsoWidth));
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(instanceMatrix));
    for(var i=0; i<6; i++) gl.drawArrays( gl.TRIANGLE_FAN, i*4, 4);
}

function horse4head() {
    instanceMatrix = mult(modelViewMatrix, translate(0.7, 0.5 * headHeight, 30.0) );
    instanceMatrix = mult(instanceMatrix, scale4(headWidth*1.3, headHeight/2, neckWidth) );
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(instanceMatrix));
    for(var i=0; i<6; i++) gl.drawArrays( gl.TRIANGLE_FAN, i*4, 4);
}

function horse4neck() {
    instanceMatrix = mult(modelViewMatrix, translate(0.7, neckHeight * 0.5 + 0.3, 30.0) );
    instanceMatrix = mult(instanceMatrix, scale4(neckWidth, neckHeight, neckWidth) );
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(instanceMatrix));
    for(var i=0; i<6; i++) gl.drawArrays( gl.TRIANGLE_FAN, i*4, 4);
}

function horse4leftFrontUpperLeg() {
    instanceMatrix = mult(modelViewMatrix, translate(0.0, 0.5 * upperLegHeight - 0.3, 30.0) );
    instanceMatrix = mult(instanceMatrix, scale4(upperLegWidth * 1.7, upperLegHeight, upperLegWidth) );
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(instanceMatrix));
    for(var i=0; i<6; i++) gl.drawArrays( gl.TRIANGLE_FAN, i*4, 4);
}

function horse4leftFrontLowerLeg() {
    instanceMatrix = mult(modelViewMatrix, translate(0.0, 0.5 * lowerLegHeight - 0.3, 30.0) );
    instanceMatrix = mult(instanceMatrix, scale4(lowerLegWidth * 1.6, lowerLegHeight, lowerLegWidth) );
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(instanceMatrix));
    for(var i=0; i<6; i++) gl.drawArrays( gl.TRIANGLE_FAN, i*4, 4);
}

function horse4rightFrontUpperLeg() {
    instanceMatrix = mult(modelViewMatrix, translate(0.0, 0.5 * upperLegHeight - 0.3, 30.0) );
    instanceMatrix = mult(instanceMatrix, scale4(upperLegWidth * 1.7, upperLegHeight, upperLegWidth) );
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(instanceMatrix));
    for(var i=0; i<6; i++) gl.drawArrays( gl.TRIANGLE_FAN, i*4, 4);
}

function horse4rightFrontLowerLeg() {
    instanceMatrix = mult(modelViewMatrix, translate(0.0, 0.5 * lowerLegHeight - 0.3, 30.0) );
    instanceMatrix = mult(instanceMatrix, scale4(lowerLegWidth * 1.6, lowerLegHeight, lowerLegWidth) );
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(instanceMatrix));
    for(var i=0; i<6; i++) gl.drawArrays( gl.TRIANGLE_FAN, i*4, 4);
}

function horse4leftBackUpperLeg() {
    instanceMatrix = mult(modelViewMatrix, translate(0.45, 0.5 * upperLegHeight - 0.3, 30.0) );
    instanceMatrix = mult(instanceMatrix, scale4(upperLegWidth * 1.7, upperLegHeight, upperLegWidth) );
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(instanceMatrix));
    for(var i=0; i<6; i++) gl.drawArrays( gl.TRIANGLE_FAN, i*4, 4);
}

function horse4leftBackLowerLeg() {
    instanceMatrix = mult(modelViewMatrix, translate(0.45, 0.5 * lowerLegHeight - 0.3, 30.0) );
    instanceMatrix = mult(instanceMatrix, scale4(lowerLegWidth * 1.6, lowerLegHeight, lowerLegWidth) );
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(instanceMatrix));
    for(var i=0; i<6; i++) gl.drawArrays( gl.TRIANGLE_FAN, i*4, 4);
}

function horse4rightBackUpperLeg() {
    instanceMatrix = mult(modelViewMatrix, translate(0.45, 0.5 * upperLegHeight - 0.3, 30.0) );
    instanceMatrix = mult(instanceMatrix, scale4(upperLegWidth * 1.7, upperLegHeight, upperLegWidth) );
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(instanceMatrix));
    for(var i=0; i<6; i++) gl.drawArrays( gl.TRIANGLE_FAN, i*4, 4);
}

function horse4rightBackLowerLeg() {
    instanceMatrix = mult(modelViewMatrix, translate(0.45, 0.5 * lowerLegHeight - 0.3, 30.0) );
    instanceMatrix = mult(instanceMatrix, scale4(lowerLegWidth * 1.6, lowerLegHeight, lowerLegWidth) );
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(instanceMatrix));
    for(var i=0; i<6; i++) gl.drawArrays( gl.TRIANGLE_FAN, i*4, 4);
}

function horse4tail() {
    instanceMatrix = mult(modelViewMatrix, translate(0, tailHeight-3.5, 30.0) );
    instanceMatrix = mult(instanceMatrix, scale4(tailWidth, tailHeight*2, tailWidth) );
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(instanceMatrix));
    for(var i=0; i<6; i++) gl.drawArrays( gl.TRIANGLE_FAN, i*4, 4);
}

function horse4rightEar() {
    instanceMatrix = mult(modelViewMatrix, translate(0.0, 0.5 * upperLegHeight - 0.3, 30.0) );
    instanceMatrix = mult(instanceMatrix, scale4(earWidth, earHeight, earWidth) );
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(instanceMatrix));
    for(var i=0; i<6; i++) gl.drawArrays( gl.TRIANGLE_FAN, i*4, 4);
}

function horse4leftEar() {
    instanceMatrix = mult(modelViewMatrix, translate(0.0, 0.5 * upperLegHeight - 0.3, 30.0) );
    instanceMatrix = mult(instanceMatrix, scale4(earWidth, earHeight, earWidth) );
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(instanceMatrix));
    for(var i=0; i<6; i++) gl.drawArrays( gl.TRIANGLE_FAN, i*4, 4);
}

// For gate 1
function gate1rightPillar() {
    ambientProduct = mult(lightAmbient, materialAmbient5);
    gl.uniform4fv(gl.getUniformLocation(program, "ambientProduct"), flatten(ambientProduct));

    instanceMatrix = mult(modelViewMatrix, translate(6.0 + fixed, PillarHeight * -0.5 + 3.65, 2.5) );
    instanceMatrix = mult(instanceMatrix, scale4(PillarWidth, PillarHeight * 2, PillarWidth) );
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(instanceMatrix));
    for(var i=0; i<6; i++) gl.drawArrays( gl.TRIANGLE_FAN, i*4, 4);
}

function gate1rightUpperJoint() {
    instanceMatrix = mult(modelViewMatrix, translate(jointWidth - 0.5, jointHeight + 0.2, jointWidth - 0.8) );
    instanceMatrix = mult(instanceMatrix, scale4(jointWidth, jointHeight, jointWidth));
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(instanceMatrix));
    for(var i=0; i<6; i++) gl.drawArrays( gl.TRIANGLE_FAN, i*4, 4);
}

function gate1rightLowerJoint() {
    instanceMatrix = mult(modelViewMatrix, translate(jointWidth - 0.5, jointHeight + 0.2, jointWidth - 0.8) );
    instanceMatrix = mult(instanceMatrix, scale4(jointWidth, jointHeight, jointWidth) );
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(instanceMatrix));
    for(var i=0; i<6; i++) gl.drawArrays( gl.TRIANGLE_FAN, i*4, 4);
}

function gate1rightDoorComponent1() {
    instanceMatrix = mult(modelViewMatrix, translate(DoorComponentHeight, DoorComponentWidth, DoorComponentHeight));
    instanceMatrix = mult(instanceMatrix, scale4(jointWidth/2, jointHeight/2, jointWidth * 3.5) );
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(instanceMatrix));
    for(var i=0; i<6; i++) gl.drawArrays( gl.TRIANGLE_FAN, i*4, 4);
}

function gate1rightDoorComponent2() {
    instanceMatrix = mult(modelViewMatrix, translate(DoorComponentWidth, DoorComponentHeight, DoorComponentWidth));
    instanceMatrix = mult(instanceMatrix, scale4(jointWidth/2, jointHeight*9.5, jointWidth/2) );
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(instanceMatrix));
    for(var i=0; i<6; i++) gl.drawArrays( gl.TRIANGLE_FAN, i*4, 4);
}

function gate1rightDoorComponent3() {
    instanceMatrix = mult(modelViewMatrix, translate(DoorComponentHeight, DoorComponentWidth, DoorComponentHeight));
    instanceMatrix = mult(instanceMatrix, scale4(jointWidth/2, jointHeight/2, jointWidth * 3.5));
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(instanceMatrix));
    for(var i=0; i<6; i++) gl.drawArrays( gl.TRIANGLE_FAN, i*4, 4);
}

function gate1leftPillar() {
    ambientProduct = mult(lightAmbient, materialAmbient5);
    gl.uniform4fv(gl.getUniformLocation(program, "ambientProduct"), flatten(ambientProduct));

    instanceMatrix = mult(modelViewMatrix, translate(6.0, PillarHeight * -0.5 + 3.65, -2.5) );
    instanceMatrix = mult(instanceMatrix, scale4(PillarWidth, PillarHeight * 2, PillarWidth) );
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(instanceMatrix));
    for(var i=0; i<6; i++) gl.drawArrays( gl.TRIANGLE_FAN, i*4, 4);
}

function gate1leftUpperJoint() {
    instanceMatrix = mult(modelViewMatrix, translate(-0.5 + jointWidth, -5.5 * jointHeight, jointWidth ) );
    instanceMatrix = mult(instanceMatrix, scale4(jointWidth, jointHeight, jointWidth));
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(instanceMatrix));
    for(var i=0; i<6; i++) gl.drawArrays( gl.TRIANGLE_FAN, i*4, 4);
}

function gate1leftLowerJoint() {
    instanceMatrix = mult(modelViewMatrix, translate(-0.5 + jointWidth, -5.5 * jointHeight, jointWidth) );
    instanceMatrix = mult(instanceMatrix, scale4(jointWidth, jointHeight, jointWidth) );
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(instanceMatrix));
    for(var i=0; i<6; i++) gl.drawArrays( gl.TRIANGLE_FAN, i*4, 4);
}

function gate1leftDoorComponent1() {
    instanceMatrix = mult(modelViewMatrix, translate(DoorComponentHeight, DoorComponentWidth, DoorComponentHeight - 0.37) );
    instanceMatrix = mult(instanceMatrix, scale4(jointWidth/2, jointHeight/2, jointWidth * 3.5) );
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(instanceMatrix));
    for(var i=0; i<6; i++) gl.drawArrays( gl.TRIANGLE_FAN, i*4, 4);
}

function gate1leftDoorComponent2() {
    instanceMatrix = mult(modelViewMatrix, translate(DoorComponentWidth, DoorComponentHeight, DoorComponentWidth) );
    instanceMatrix = mult(instanceMatrix, scale4(jointWidth/2, jointHeight*9.5, jointWidth/2) );
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(instanceMatrix));
    for(var i=0; i<6; i++) gl.drawArrays( gl.TRIANGLE_FAN, i*4, 4);
}

function gate1leftDoorComponent3() {
    instanceMatrix = mult(modelViewMatrix, translate(DoorComponentHeight, DoorComponentWidth, DoorComponentHeight));
    instanceMatrix = mult(instanceMatrix, scale4(jointWidth/2, jointHeight/2, jointWidth * 3.5 ));
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(instanceMatrix));
    for(var i=0; i<6; i++) gl.drawArrays( gl.TRIANGLE_FAN, i*4, 4);
}

// For gate 2
function gate2rightPillar() {
    ambientProduct = mult(lightAmbient, materialAmbient5);
    gl.uniform4fv(gl.getUniformLocation(program, "ambientProduct"), flatten(ambientProduct));

    instanceMatrix = mult(modelViewMatrix, translate(6.0 + fixed, PillarHeight * -0.5 + 3.65, 12.5) );
    instanceMatrix = mult(instanceMatrix, scale4(PillarWidth, PillarHeight * 2, PillarWidth) );
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(instanceMatrix));
    for(var i=0; i<6; i++) gl.drawArrays( gl.TRIANGLE_FAN, i*4, 4);
}

function gate2rightUpperJoint() {
    instanceMatrix = mult(modelViewMatrix, translate(jointWidth - 0.5, jointHeight + 0.2, jointWidth - 0.8) );
    instanceMatrix = mult(instanceMatrix, scale4(jointWidth, jointHeight, jointWidth));
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(instanceMatrix));
    for(var i=0; i<6; i++) gl.drawArrays( gl.TRIANGLE_FAN, i*4, 4);
}

function gate2rightLowerJoint() {
    instanceMatrix = mult(modelViewMatrix, translate(jointWidth - 0.5, jointHeight + 0.2, jointWidth - 0.8) );
    instanceMatrix = mult(instanceMatrix, scale4(jointWidth, jointHeight, jointWidth) );
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(instanceMatrix));
    for(var i=0; i<6; i++) gl.drawArrays( gl.TRIANGLE_FAN, i*4, 4);
}

function gate2rightDoorComponent1() {
    instanceMatrix = mult(modelViewMatrix, translate(DoorComponentHeight, DoorComponentWidth, DoorComponentHeight));
    instanceMatrix = mult(instanceMatrix, scale4(jointWidth/2, jointHeight/2, jointWidth * 3.5) );
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(instanceMatrix));
    for(var i=0; i<6; i++) gl.drawArrays( gl.TRIANGLE_FAN, i*4, 4);
}

function gate2rightDoorComponent2() {
    instanceMatrix = mult(modelViewMatrix, translate(DoorComponentWidth, DoorComponentHeight, DoorComponentWidth));
    instanceMatrix = mult(instanceMatrix, scale4(jointWidth/2, jointHeight*9.5, jointWidth/2) );
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(instanceMatrix));
    for(var i=0; i<6; i++) gl.drawArrays( gl.TRIANGLE_FAN, i*4, 4);
}

function gate2rightDoorComponent3() {
    instanceMatrix = mult(modelViewMatrix, translate(DoorComponentHeight, DoorComponentWidth, DoorComponentHeight));
    instanceMatrix = mult(instanceMatrix, scale4(jointWidth/2, jointHeight/2, jointWidth * 3.5));
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(instanceMatrix));
    for(var i=0; i<6; i++) gl.drawArrays( gl.TRIANGLE_FAN, i*4, 4);
}

function gate2leftPillar() {
    ambientProduct = mult(lightAmbient, materialAmbient5);
    gl.uniform4fv(gl.getUniformLocation(program, "ambientProduct"), flatten(ambientProduct));

    instanceMatrix = mult(modelViewMatrix, translate(6.0, PillarHeight * -0.5 + 3.65, 8.5) );
    instanceMatrix = mult(instanceMatrix, scale4(PillarWidth, PillarHeight * 2, PillarWidth) );
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(instanceMatrix));
    for(var i=0; i<6; i++) gl.drawArrays( gl.TRIANGLE_FAN, i*4, 4);
}

function gate2leftUpperJoint() {
    instanceMatrix = mult(modelViewMatrix, translate(-0.5 + jointWidth, -5.5 * jointHeight, jointWidth ) );
    instanceMatrix = mult(instanceMatrix, scale4(jointWidth, jointHeight, jointWidth));
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(instanceMatrix));
    for(var i=0; i<6; i++) gl.drawArrays( gl.TRIANGLE_FAN, i*4, 4);
}

function gate2leftLowerJoint() {
    instanceMatrix = mult(modelViewMatrix, translate(-0.5 + jointWidth, -5.5 * jointHeight, jointWidth) );
    instanceMatrix = mult(instanceMatrix, scale4(jointWidth, jointHeight, jointWidth) );
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(instanceMatrix));
    for(var i=0; i<6; i++) gl.drawArrays( gl.TRIANGLE_FAN, i*4, 4);
}

function gate2leftDoorComponent1() {
    instanceMatrix = mult(modelViewMatrix, translate(DoorComponentHeight, DoorComponentWidth, DoorComponentHeight - 0.37) );
    instanceMatrix = mult(instanceMatrix, scale4(jointWidth/2, jointHeight/2, jointWidth * 3.5) );
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(instanceMatrix));
    for(var i=0; i<6; i++) gl.drawArrays( gl.TRIANGLE_FAN, i*4, 4);
}

function gate2leftDoorComponent2() {
    instanceMatrix = mult(modelViewMatrix, translate(DoorComponentWidth, DoorComponentHeight, DoorComponentWidth) );
    instanceMatrix = mult(instanceMatrix, scale4(jointWidth/2, jointHeight*9.5, jointWidth/2) );
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(instanceMatrix));
    for(var i=0; i<6; i++) gl.drawArrays( gl.TRIANGLE_FAN, i*4, 4);
}

function gate2leftDoorComponent3() {
    instanceMatrix = mult(modelViewMatrix, translate(DoorComponentHeight, DoorComponentWidth, DoorComponentHeight));
    instanceMatrix = mult(instanceMatrix, scale4(jointWidth/2, jointHeight/2, jointWidth * 3.5 ));
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(instanceMatrix));
    for(var i=0; i<6; i++) gl.drawArrays( gl.TRIANGLE_FAN, i*4, 4);
}

// For gate 3
function gate3rightPillar() {
    ambientProduct = mult(lightAmbient, materialAmbient5);
    gl.uniform4fv(gl.getUniformLocation(program, "ambientProduct"), flatten(ambientProduct));

    instanceMatrix = mult(modelViewMatrix, translate(6.0 + fixed, PillarHeight * -0.5 + 3.65, 22.5) );
    instanceMatrix = mult(instanceMatrix, scale4(PillarWidth, PillarHeight * 2, PillarWidth) );
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(instanceMatrix));
    for(var i=0; i<6; i++) gl.drawArrays( gl.TRIANGLE_FAN, i*4, 4);
}

function gate3rightUpperJoint() {
    instanceMatrix = mult(modelViewMatrix, translate(jointWidth - 0.5, jointHeight + 0.2, jointWidth - 0.8) );
    instanceMatrix = mult(instanceMatrix, scale4(jointWidth, jointHeight, jointWidth));
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(instanceMatrix));
    for(var i=0; i<6; i++) gl.drawArrays( gl.TRIANGLE_FAN, i*4, 4);
}

function gate3rightLowerJoint() {
    instanceMatrix = mult(modelViewMatrix, translate(jointWidth - 0.5, jointHeight + 0.2, jointWidth - 0.8) );
    instanceMatrix = mult(instanceMatrix, scale4(jointWidth, jointHeight, jointWidth) );
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(instanceMatrix));
    for(var i=0; i<6; i++) gl.drawArrays( gl.TRIANGLE_FAN, i*4, 4);
}

function gate3rightDoorComponent1() {
    instanceMatrix = mult(modelViewMatrix, translate(DoorComponentHeight, DoorComponentWidth, DoorComponentHeight));
    instanceMatrix = mult(instanceMatrix, scale4(jointWidth/2, jointHeight/2, jointWidth * 3.5) );
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(instanceMatrix));
    for(var i=0; i<6; i++) gl.drawArrays( gl.TRIANGLE_FAN, i*4, 4);
}

function gate3rightDoorComponent2() {
    instanceMatrix = mult(modelViewMatrix, translate(DoorComponentWidth, DoorComponentHeight, DoorComponentWidth));
    instanceMatrix = mult(instanceMatrix, scale4(jointWidth/2, jointHeight*9.5, jointWidth/2) );
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(instanceMatrix));
    for(var i=0; i<6; i++) gl.drawArrays( gl.TRIANGLE_FAN, i*4, 4);
}

function gate3rightDoorComponent3() {
    instanceMatrix = mult(modelViewMatrix, translate(DoorComponentHeight, DoorComponentWidth, DoorComponentHeight));
    instanceMatrix = mult(instanceMatrix, scale4(jointWidth/2, jointHeight/2, jointWidth * 3.5));
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(instanceMatrix));
    for(var i=0; i<6; i++) gl.drawArrays( gl.TRIANGLE_FAN, i*4, 4);
}

function gate3leftPillar() {
    ambientProduct = mult(lightAmbient, materialAmbient5);
    gl.uniform4fv(gl.getUniformLocation(program, "ambientProduct"), flatten(ambientProduct));

    instanceMatrix = mult(modelViewMatrix, translate(6.0, PillarHeight * -0.5 + 3.65, 18.5) );
    instanceMatrix = mult(instanceMatrix, scale4(PillarWidth, PillarHeight * 2, PillarWidth) );
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(instanceMatrix));
    for(var i=0; i<6; i++) gl.drawArrays( gl.TRIANGLE_FAN, i*4, 4);
}

function gate3leftUpperJoint() {
    instanceMatrix = mult(modelViewMatrix, translate(-0.5 + jointWidth, -5.5 * jointHeight, jointWidth ) );
    instanceMatrix = mult(instanceMatrix, scale4(jointWidth, jointHeight, jointWidth));
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(instanceMatrix));
    for(var i=0; i<6; i++) gl.drawArrays( gl.TRIANGLE_FAN, i*4, 4);
}

function gate3leftLowerJoint() {
    instanceMatrix = mult(modelViewMatrix, translate(-0.5 + jointWidth, -5.5 * jointHeight, jointWidth) );
    instanceMatrix = mult(instanceMatrix, scale4(jointWidth, jointHeight, jointWidth) );
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(instanceMatrix));
    for(var i=0; i<6; i++) gl.drawArrays( gl.TRIANGLE_FAN, i*4, 4);
}

function gate3leftDoorComponent1() {
    instanceMatrix = mult(modelViewMatrix, translate(DoorComponentHeight, DoorComponentWidth, DoorComponentHeight - 0.37) );
    instanceMatrix = mult(instanceMatrix, scale4(jointWidth/2, jointHeight/2, jointWidth * 3.5) );
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(instanceMatrix));
    for(var i=0; i<6; i++) gl.drawArrays( gl.TRIANGLE_FAN, i*4, 4);
}

function gate3leftDoorComponent2() {
    instanceMatrix = mult(modelViewMatrix, translate(DoorComponentWidth, DoorComponentHeight, DoorComponentWidth) );
    instanceMatrix = mult(instanceMatrix, scale4(jointWidth/2, jointHeight*9.5, jointWidth/2) );
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(instanceMatrix));
    for(var i=0; i<6; i++) gl.drawArrays( gl.TRIANGLE_FAN, i*4, 4);
}

function gate3leftDoorComponent3() {
    instanceMatrix = mult(modelViewMatrix, translate(DoorComponentHeight, DoorComponentWidth, DoorComponentHeight));
    instanceMatrix = mult(instanceMatrix, scale4(jointWidth/2, jointHeight/2, jointWidth * 3.5 ));
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(instanceMatrix));
    for(var i=0; i<6; i++) gl.drawArrays( gl.TRIANGLE_FAN, i*4, 4);
}

// For gate 4
function gate4rightPillar() {
    ambientProduct = mult(lightAmbient, materialAmbient5);
    gl.uniform4fv(gl.getUniformLocation(program, "ambientProduct"), flatten(ambientProduct));

    instanceMatrix = mult(modelViewMatrix, translate(6.0 + fixed, PillarHeight * -0.5 + 3.65, 32.5) );
    instanceMatrix = mult(instanceMatrix, scale4(PillarWidth, PillarHeight * 2, PillarWidth) );
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(instanceMatrix));
    for(var i=0; i<6; i++) gl.drawArrays( gl.TRIANGLE_FAN, i*4, 4);
}

function gate4rightUpperJoint() {
    instanceMatrix = mult(modelViewMatrix, translate(jointWidth - 0.5, jointHeight + 0.2, jointWidth - 0.8) );
    instanceMatrix = mult(instanceMatrix, scale4(jointWidth, jointHeight, jointWidth));
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(instanceMatrix));
    for(var i=0; i<6; i++) gl.drawArrays( gl.TRIANGLE_FAN, i*4, 4);
}

function gate4rightLowerJoint() {
    instanceMatrix = mult(modelViewMatrix, translate(jointWidth - 0.5, jointHeight + 0.2, jointWidth - 0.8) );
    instanceMatrix = mult(instanceMatrix, scale4(jointWidth, jointHeight, jointWidth) );
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(instanceMatrix));
    for(var i=0; i<6; i++) gl.drawArrays( gl.TRIANGLE_FAN, i*4, 4);
}

function gate4rightDoorComponent1() {
    instanceMatrix = mult(modelViewMatrix, translate(DoorComponentHeight, DoorComponentWidth, DoorComponentHeight));
    instanceMatrix = mult(instanceMatrix, scale4(jointWidth/2, jointHeight/2, jointWidth * 3.5) );
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(instanceMatrix));
    for(var i=0; i<6; i++) gl.drawArrays( gl.TRIANGLE_FAN, i*4, 4);
}

function gate4rightDoorComponent2() {
    instanceMatrix = mult(modelViewMatrix, translate(DoorComponentWidth, DoorComponentHeight, DoorComponentWidth));
    instanceMatrix = mult(instanceMatrix, scale4(jointWidth/2, jointHeight*9.5, jointWidth/2) );
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(instanceMatrix));
    for(var i=0; i<6; i++) gl.drawArrays( gl.TRIANGLE_FAN, i*4, 4);
}

function gate4rightDoorComponent3() {
    instanceMatrix = mult(modelViewMatrix, translate(DoorComponentHeight, DoorComponentWidth, DoorComponentHeight));
    instanceMatrix = mult(instanceMatrix, scale4(jointWidth/2, jointHeight/2, jointWidth * 3.5));
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(instanceMatrix));
    for(var i=0; i<6; i++) gl.drawArrays( gl.TRIANGLE_FAN, i*4, 4);
}

function gate4leftPillar() {
    ambientProduct = mult(lightAmbient, materialAmbient5);
    gl.uniform4fv(gl.getUniformLocation(program, "ambientProduct"), flatten(ambientProduct));

    instanceMatrix = mult(modelViewMatrix, translate(6.0, PillarHeight * -0.5 + 3.65, 28.5) );
    instanceMatrix = mult(instanceMatrix, scale4(PillarWidth, PillarHeight * 2, PillarWidth) );
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(instanceMatrix));
    for(var i=0; i<6; i++) gl.drawArrays( gl.TRIANGLE_FAN, i*4, 4);
}

function gate4leftUpperJoint() {
    instanceMatrix = mult(modelViewMatrix, translate(-0.5 + jointWidth, -5.5 * jointHeight, jointWidth ) );
    instanceMatrix = mult(instanceMatrix, scale4(jointWidth, jointHeight, jointWidth));
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(instanceMatrix));
    for(var i=0; i<6; i++) gl.drawArrays( gl.TRIANGLE_FAN, i*4, 4);
}

function gate4leftLowerJoint() {
    instanceMatrix = mult(modelViewMatrix, translate(-0.5 + jointWidth, -5.5 * jointHeight, jointWidth) );
    instanceMatrix = mult(instanceMatrix, scale4(jointWidth, jointHeight, jointWidth) );
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(instanceMatrix));
    for(var i=0; i<6; i++) gl.drawArrays( gl.TRIANGLE_FAN, i*4, 4);
}

function gate4leftDoorComponent1() {
    instanceMatrix = mult(modelViewMatrix, translate(DoorComponentHeight, DoorComponentWidth, DoorComponentHeight - 0.37) );
    instanceMatrix = mult(instanceMatrix, scale4(jointWidth/2, jointHeight/2, jointWidth * 3.5) );
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(instanceMatrix));
    for(var i=0; i<6; i++) gl.drawArrays( gl.TRIANGLE_FAN, i*4, 4);
}

function gate4leftDoorComponent2() {
    instanceMatrix = mult(modelViewMatrix, translate(DoorComponentWidth, DoorComponentHeight, DoorComponentWidth) );
    instanceMatrix = mult(instanceMatrix, scale4(jointWidth/2, jointHeight*9.5, jointWidth/2) );
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(instanceMatrix));
    for(var i=0; i<6; i++) gl.drawArrays( gl.TRIANGLE_FAN, i*4, 4);
}

function gate4leftDoorComponent3() {
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


function cube() {
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
    gl.clearColor( 0, 0, 0, 0 );

    program = initShaders( gl, "vertex-shader", "fragment-shader");

    gl.useProgram( program);

    instanceMatrix = mat4();

    modelViewMatrix = lookAt(vec3(0.0, 0.0, 50.0), vec3(0.0, 0.0, 0.0), vec3(0.0, 1.0, 0.0));
    projectionMatrix = perspective(60, 1, 0.001, 1000);

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
    for(i=0; i<numHorseNodes; i++) initNodes(i+26);
    for(i=0; i<numHorseNodes; i++) initNodes(i+40);
    for(i=0; i<numHorseNodes; i++) initNodes(i+54);

    for(i=0; i<numRightGateNodes; i++) initNodes(i+68);
    for(i=0; i<numLeftGateNodes; i++) initNodes(i+74);

    for(i=0; i<numRightGateNodes; i++) initNodes(i+80);
    for(i=0; i<numLeftGateNodes; i++) initNodes(i+86);

    for(i=0; i<numRightGateNodes; i++) initNodes(i+92);
    for(i=0; i<numLeftGateNodes; i++) initNodes(i+98);


    document.getElementById("cameraLookButton").addEventListener("click", setCameraLook);
    document.getElementById("cameraX").oninput = updateCameraOffset;
    document.getElementById("cameraY").oninput = updateCameraOffset;
    document.getElementById("cameraZ").oninput = updateCameraOffset;
    
    render();

}

var cameraOffset = vec3(30.6, 10.7, 51.2);
var cameraPos = true;
var cameraPoint = 0;

var start = true;

var render = function () {
    if (start) {
        modelViewMatrix = mat4();

        gl.clear(gl.COLOR_BUFFER_BIT);

        traverseGate(gate1rightPillarId);
        traverseGate(gate1leftPillarId);

        traverseGate(gate2rightPillarId);
        traverseGate(gate2leftPillarId);

        traverseGate(gate3rightPillarId);
        traverseGate(gate3leftPillarId);

        traverseGate(gate4rightPillarId);
        traverseGate(gate4leftPillarId);

        setTimeout(function () {
            start = false;
            requestAnimFrame(render);
        }, 2000);

        return;
    }

    // for each horse's speed
    var minSpeed = 0.1;
    var maxSpeed = 1;

    function getRandomSpeed(min, max) {
        return Math.random() * (max - min) + min;
    }

    horsePosition[0] += getRandomSpeed(minSpeed, maxSpeed);
    horsePosition2[0] += getRandomSpeed(minSpeed, maxSpeed);
    horsePosition3[0] += getRandomSpeed(minSpeed, maxSpeed);
    horsePosition4[0] += getRandomSpeed(minSpeed, maxSpeed);

    angle += 1;

    // for horse 1
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
    if (angleTail >= 20 || angleTail <= -1) {
        speedTail *= -1;
    }

    // for horse 2
    angleLeftFrontLower2 += speedLeftFrontLower2;
    if (angleLeftFrontLower2 >= 1 || angleLeftFrontLower2 <= -60) {
        speedLeftFrontLower2 *= -1;
    }

    angleLeftFrontUpper2 += speedLeftFrontUpper2;
    if (angleLeftFrontUpper2 >= 80 || angleLeftFrontUpper2 <= -60) {
        speedLeftFrontUpper2 *= -1;
    }

    angleNeck2 += speedNeck2;
    if (angleNeck2 >= 10 || angleNeck2 <= -30) {
        speedNeck2 *= -1;
    }

    angleRightFrontUpper2 += speedRightFrontUpper2;
    if (angleRightFrontUpper2 >= 100 || angleRightFrontUpper2 <= -40) {
        speedRightFrontUpper2 *= -1;
    }

    angleRightFrontLower2 += speedRightFrontLower2;
    if (angleRightFrontLower2 >= 1 || angleRightFrontLower2 <= -60) {
        speedRightFrontLower2 *= -1;
    }

    angleRightBackUpper2 += speedRightBackUpper2;
    if (angleRightBackUpper2 >= 40 || angleRightBackUpper2 <= -100) {
        speedRightBackUpper2 *= -1;
    }

    angleRightBackLower2 += speedRightBackLower2;
    if (angleRightBackLower2 >= 60 || angleRightBackLower2 <= -1) {
        speedRightBackLower2 *= -1;
    }

    angleLeftBackUpper2 += speedLeftBackUpper2;
    if (angleLeftBackUpper2 >= 60 || angleLeftBackUpper2 <= -80) {
        speedLeftBackUpper2 *= -1;
    }

    angleLeftBackLower2 += speedLeftBackLower2;
    if (angleLeftBackLower2 >= 60 || angleLeftBackLower2 <= -1) {
        speedLeftBackLower2 *= -1;
    }

    angleTail2 += speedTail2;
    if (angleTail2 >= 20 || angleTail2 <= -1) {
        speedTail2 *= -1;
    }

    // for horse 3
    angleLeftFrontLower3 += speedLeftFrontLower3;
    if (angleLeftFrontLower3 >= 1 || angleLeftFrontLower3 <= -60) {
        speedLeftFrontLower3 *= -1;
    }

    angleLeftFrontUpper3 += speedLeftFrontUpper3;
    if (angleLeftFrontUpper3 >= 80 || angleLeftFrontUpper3 <= -60) {
        speedLeftFrontUpper3 *= -1;
    }

    angleNeck3 += speedNeck3;
    if (angleNeck3 >= 10 || angleNeck3 <= -30) {
        speedNeck3 *= -1;
    }

    angleRightFrontUpper3 += speedRightFrontUpper3;
    if (angleRightFrontUpper3 >= 100 || angleRightFrontUpper3 <= -40) {
        speedRightFrontUpper3 *= -1;
    }

    angleRightFrontLower3 += speedRightFrontLower3;
    if (angleRightFrontLower3 >= 1 || angleRightFrontLower3 <= -60) {
        speedRightFrontLower3 *= -1;
    }

    angleRightBackUpper3 += speedRightBackUpper3;
    if (angleRightBackUpper3 >= 40 || angleRightBackUpper3 <= -100) {
        speedRightBackUpper3 *= -1;
    }

    angleRightBackLower3 += speedRightBackLower3;
    if (angleRightBackLower3 >= 60 || angleRightBackLower3 <= -1) {
        speedRightBackLower3 *= -1;
    }

    angleLeftBackUpper3 += speedLeftBackUpper3;
    if (angleLeftBackUpper3 >= 60 || angleLeftBackUpper3 <= -80) {
        speedLeftBackUpper3 *= -1;
    }

    angleLeftBackLower3 += speedLeftBackLower3;
    if (angleLeftBackLower3 >= 60 || angleLeftBackLower3 <= -1) {
        speedLeftBackLower3 *= -1;
    }

    angleTail3 += speedTail3;
    if (angleTail3 >= 20 || angleTail3 <= -1) {
        speedTail3 *= -1;
    }

    // for horse 4
    angleLeftFrontLower4 += speedLeftFrontLower4;
    if (angleLeftFrontLower4 >= 1 || angleLeftFrontLower4 <= -60) {
        speedLeftFrontLower4 *= -1;
    }

    angleLeftFrontUpper4 += speedLeftFrontUpper4;
    if (angleLeftFrontUpper4 >= 80 || angleLeftFrontUpper4 <= -60) {
        speedLeftFrontUpper4 *= -1;
    }

    angleNeck4 += speedNeck4;
    if (angleNeck4 >= 10 || angleNeck4 <= -30) {
        speedNeck4 *= -1;
    }

    angleRightFrontUpper4 += speedRightFrontUpper4;
    if (angleRightFrontUpper4 >= 100 || angleRightFrontUpper4 <= -40) {
        speedRightFrontUpper4 *= -1;
    }

    angleRightFrontLower4 += speedRightFrontLower4;
    if (angleRightFrontLower4 >= 1 || angleRightFrontLower4 <= -60) {
        speedRightFrontLower4 *= -1;
    }

    angleRightBackUpper4 += speedRightBackUpper4;
    if (angleRightBackUpper4 >= 40 || angleRightBackUpper4 <= -100) {
        speedRightBackUpper4 *= -1;
    }

    angleRightBackLower4 += speedRightBackLower4;
    if (angleRightBackLower4 >= 60 || angleRightBackLower4 <= -1) {
        speedRightBackLower4 *= -1;
    }

    angleLeftBackUpper4 += speedLeftBackUpper4;
    if (angleLeftBackUpper4 >= 60 || angleLeftBackUpper4 <= -80) {
        speedLeftBackUpper4 *= -1;
    }

    angleLeftBackLower4 += speedLeftBackLower4;
    if (angleLeftBackLower4 >= 60 || angleLeftBackLower4 <= -1) {
        speedLeftBackLower4 *= -1;
    }

    angleTail4 += speedTail4;
    if (angleTail4 >= 20 || angleTail4 <= -1) {
        speedTail4 *= -1;
    }

    // For horse 1
    theta[horse1leftFrontLowerLegId] = angleLeftFrontLower;
    theta[horse1leftFrontUpperLegId] = angleLeftFrontUpper;
    theta[horse1neckId] = angleNeck;
    theta[horse1rightFrontUpperLegId] = angleRightFrontUpper;
    theta[horse1rightFrontLowerLegId] = angleRightFrontLower;
    theta[horse1rightBackUpperLegId] = angleRightBackUpper;
    theta[horse1rightBackLowerLegId] = angleRightBackLower;
    theta[horse1leftBackUpperLegId] = angleLeftBackUpper;
    theta[horse1leftBackLowerLegId] = angleLeftBackLower;
    theta[horse1tailId] = angleTail;

    // For horse 2
    theta[horse2leftFrontLowerLegId] = angleLeftFrontLower2;
    theta[horse2leftFrontUpperLegId] = angleLeftFrontUpper2;
    theta[horse2neckId] = angleNeck2;
    theta[horse2rightFrontUpperLegId] = angleRightFrontUpper2;
    theta[horse2rightFrontLowerLegId] = angleRightFrontLower2;
    theta[horse2rightBackUpperLegId] = angleRightBackUpper2;
    theta[horse2rightBackLowerLegId] = angleRightBackLower2;
    theta[horse2leftBackUpperLegId] = angleLeftBackUpper2;
    theta[horse2leftBackLowerLegId] = angleLeftBackLower2;
    theta[horse2tailId] = angleTail2;

    // For horse 3
    theta[horse3leftFrontLowerLegId] = angleLeftFrontLower3;
    theta[horse3leftFrontUpperLegId] = angleLeftFrontUpper3;
    theta[horse3neckId] = angleNeck3;
    theta[horse3rightFrontUpperLegId] = angleRightFrontUpper3;
    theta[horse3rightFrontLowerLegId] = angleRightFrontLower3;
    theta[horse3rightBackUpperLegId] = angleRightBackUpper3;
    theta[horse3rightBackLowerLegId] = angleRightBackLower3;
    theta[horse3leftBackUpperLegId] = angleLeftBackUpper3;
    theta[horse3leftBackLowerLegId] = angleLeftBackLower3;
    theta[horse3tailId] = angleTail3;

    // For horse 4
    theta[horse4leftFrontLowerLegId] = angleLeftFrontLower4;
    theta[horse4leftFrontUpperLegId] = angleLeftFrontUpper4;
    theta[horse4neckId] = angleNeck4;
    theta[horse4rightFrontUpperLegId] = angleRightFrontUpper4;
    theta[horse4rightFrontLowerLegId] = angleRightFrontLower4;
    theta[horse4rightBackUpperLegId] = angleRightBackUpper4;
    theta[horse4rightBackLowerLegId] = angleRightBackLower4;
    theta[horse4leftBackUpperLegId] = angleLeftBackUpper4;
    theta[horse4leftBackLowerLegId] = angleLeftBackLower4;
    theta[horse4tailId] = angleTail4;

    angleRightUpperJoint += speedRightUpperJoint;
    if (angleRightUpperJoint >= 1) {
        speedRightUpperJoint *= -1;
    } else if (angleRightUpperJoint <= -100) {
        angleRightUpperJoint = -100;
        speedRightUpperJoint = 0;
    }

    angleRightLowerJoint += speedRightLowerJoint;
    if (angleRightLowerJoint >= 1) {
        speedRightLowerJoint *= -1;
    } else if (angleRightLowerJoint <= -100) {
        angleRightLowerJoint = -100;
        speedRightLowerJoint = 0;
    }

    angleLeftUpperJoint += speedLeftUpperJoint;
    if (angleLeftUpperJoint >= 100) {
        speedLeftUpperJoint = 0;
        angleLeftUpperJoint = 100;
    }

    angleLeftLowerJoint += speedLeftLowerJoint;
    if (angleLeftLowerJoint >= 100) {
        speedLeftLowerJoint = 0;
        angleLeftLowerJoint = 100;
    }

    // For gate 1
    theta[gate1rightUpperJointId] = angleRightUpperJoint;
    theta[gate1rightLowerJointId] = angleRightLowerJoint;
    theta[gate1leftUpperJointId] = angleLeftUpperJoint;
    theta[gate1leftLowerJointId] = angleLeftLowerJoint;

    // For gate 2
    theta[gate2rightUpperJointId] = angleRightUpperJoint;
    theta[gate2rightLowerJointId] = angleRightLowerJoint;
    theta[gate2leftUpperJointId] = angleLeftUpperJoint;
    theta[gate2leftLowerJointId] = angleLeftLowerJoint;

    // For gate 3
    theta[gate3rightUpperJointId] = angleRightUpperJoint;
    theta[gate3rightLowerJointId] = angleRightLowerJoint;
    theta[gate3leftUpperJointId] = angleLeftUpperJoint;
    theta[gate3leftLowerJointId] = angleLeftLowerJoint;

    // For gate 4
    theta[gate4rightUpperJointId] = angleRightUpperJoint;
    theta[gate4rightLowerJointId] = angleRightLowerJoint;
    theta[gate4leftUpperJointId] = angleLeftUpperJoint;
    theta[gate4leftLowerJointId] = angleLeftLowerJoint;

    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.enable(gl.DEPTH_TEST);


    var eye, at;
    if(cameraPoint == 0) {
        eye = vec3(horsePosition[0] + cameraOffset[0], horsePosition[1] + cameraOffset[1], horsePosition[2] + cameraOffset[2]);
        at = vec3(horsePosition[0], horsePosition[1], horsePosition[2]);
    } else if (cameraPoint == 1) {
        eye = vec3(510, 0, 15);
        at = vec3(horsePosition3[0], horsePosition3[1], horsePosition3[2]);
    } else if (cameraPoint == 2) {
        eye = vec3(horsePosition[0] + 4.9, horsePosition[1] + 30.2,horsePosition[2] + 56.5);
        at = vec3(horsePosition[0], horsePosition[1], horsePosition[2]);
    } else if (cameraPoint == 3) {
        eye = vec3(940, 30, 60);
        at = vec3(940, 0, 0);
    }


    modelViewMatrix = lookAt(eye, at, vec3(0.0, 1.0, 0.0));
    var translationMatrix = translate(horsePosition);
    traverseHorse(horse1torsoId, translationMatrix);
    traverseHorse2(horse2torsoId, translationMatrix);
    traverseHorse3(horse3torsoId, translationMatrix);
    traverseHorse4(horse4torsoId, translationMatrix);

    traverseGate(gate1rightPillarId);
    traverseGate(gate1leftPillarId);

    traverseGate(gate2rightPillarId);
    traverseGate(gate2leftPillarId);

    traverseGate(gate3rightPillarId);
    traverseGate(gate3leftPillarId);

    traverseGate(gate4rightPillarId);
    traverseGate(gate4leftPillarId);

    //console.log(horsePosition[0]);

    requestAnimFrame(render);
}

function updateCameraOffset() {
    var cameraX = document.getElementById("cameraX").value;
    var cameraY = document.getElementById("cameraY").value;
    var cameraZ = document.getElementById("cameraZ").value;

    cameraOffset = vec3(parseFloat(cameraX), parseFloat(cameraY), parseFloat(cameraZ));

    document.getElementById("cameraXValue").textContent = cameraX;
    document.getElementById("cameraYValue").textContent = cameraY;
    document.getElementById("cameraZValue").textContent = cameraZ;
}

function setCameraLook() {
    cameraPoint += 1
    console.log("function called");
    cameraPos = !cameraPos;
    console.log(cameraPos);
    var canvasContainer = document.getElementById("canvasContainer");
    if (cameraPoint == 1) {
        canvasContainer.style.backgroundImage = "url('track22.jpg')"; 
        canvasContainer.classList.remove("moveImage");
    } else if (cameraPoint == 2) {
        canvasContainer.style.backgroundImage = "url('top.jpg')"; 
        canvasContainer.classList.add("moveImage");
    } else if (cameraPoint == 3) {
        canvasContainer.style.backgroundImage = "url('finish.jpg')"; 
        canvasContainer.classList.remove("moveImage");
    }
}



