/* Copyright (c) 2022, Alex Hannigan */

export const state = {
    gridDimensions: [], // Number of rows & columns for current stage
    screenWidth: 0,
    screenHeight: 0,
    playArea: {
        x: 0,
        y: 0,
        width: 0,
        height: 0,
        center: {
            x: 0,
            y: 0,
        },
    },
    stage: -1,
    isHorizontalOrientation: true,
    center: {
        x: 0,
        y: 0,
    },
    rowCount: 0, // Number of rows of circles
    columnCount: 0, // Number of columns of circles
    circles: [],
    lastFrameTimestamp: 0,
    clearTimeStamp: null,
    animationInterval: 0, // Milliseconds
    isDemonstration: false,
    facePositions: [],
    visibleFaceIndex: -2,
    clickCount: 0,
    chanceOfWrongFace: 3, // Out of 10
    wrongFaceIndex: -1,
    rightFaceIndex: -1,
    hasFinishedLoading: false,
    score: 0,
    isClickAllowed: true,
    didClearStage: false,
    didFinishShowingClearScreen: false,
    confettiAnimationFrame: null,
    timeout: null,
    isJapanese: true,
}