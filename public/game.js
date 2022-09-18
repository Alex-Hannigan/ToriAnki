/* Copyright (c) 2022, Alex Hannigan */

import {
    COLORS,
    INFO_TEXT,
    SCORE_FONT,
    STROKE_WIDTH,
    SPEED_BY_STAGE,
    SCORE_FONT_SIZE,
    COOKED_IMAGE_COUNT,
    CLEAR_SCREEN_DURATIONS,
    RIGHT_FACE_IMAGE_COUNT,
    WRONG_FACE_IMAGE_COUNT,
    GRID_DIMENSIONS_BY_STAGE,
    FACE_POSITION_COUNT_BY_STAGE,
} from './constants.js'
import {
    drawLoadingScreen,
    drawTitleScreen,
    drawInfoScreen,
    drawFailScreen,
    drawCenterText,
    drawWinScreen,
} from './titleScreens.js'
import Circle from './Circle.js'
import FacePosition from './FacePosition.js'
import { state } from './state.js'

let loadedImageCount = 0
let winConfetti = null

const showStartButton = () => {
    document.getElementById('loading').style.setProperty('display', 'none')
    document.getElementById('start-btn').style.setProperty('display', 'block')
}

const onLoadImage = () => {
    loadedImageCount++;
    const loadingPercent = Math.round(100 / totalImageCount * loadedImageCount)
    const loadingPercentElement = document.getElementById('loading-percentage')
    loadingPercentElement.innerText = loadingPercent
    if(loadedImageCount === totalImageCount) {
        state.hasFinishedLoading = true
        // START HERE
        setCanvasSize()
        showStartButton()
    };
}

const startGame = () => {
    setCanvasSize()
    state.score = 0
    state.stage++
    showNextStage()
    canvas.style.setProperty('display', 'block')
    document.body.style.backgroundColor = '#000000'
    document.getElementById('main').style.setProperty('display', 'none')
    animate()
}

const canvas = document.querySelector('canvas')
const context = canvas.getContext('2d')
const totalImageCount = RIGHT_FACE_IMAGE_COUNT + WRONG_FACE_IMAGE_COUNT + COOKED_IMAGE_COUNT

const rightFaceImages = []
for(let i = 1; i <= RIGHT_FACE_IMAGE_COUNT; i++) {
    const image = document.createElement('img')
    image.src = `./images/rightFace${i}.png`
    rightFaceImages.push(image)
    image.onload = onLoadImage
}
const wrongFaceImages = []
for(let i = 1; i <= WRONG_FACE_IMAGE_COUNT; i++) {
    const image = document.createElement('img')
    image.src = `./images/wrongFace${i}.png`
    wrongFaceImages.push(image)
    image.onload = onLoadImage
}
const cookedImages = []
for(let i = 1; i <= COOKED_IMAGE_COUNT; i++) {
    const image = document.createElement('img')
    image.src = `./images/cooked${i}.png`
    cookedImages.push(image)
    image.onload = onLoadImage
}

const setCircleSizeAndPosition = isResize => {
    // Only reset the ID if we are starting a new game or stage
    if (!isResize) Circle.idCount = 0
    
    // The radius is the smallest of: canvas width divided by no. of cols, canvas height divided by no. of rows
    // In other words the radius is the size that allows all the circles to fit in the screen perfectly regardless of orientation
    const radius = Math.min(
        (state.playArea.width / 2 / state.columnCount),
        (state.playArea.height / 2 / state.rowCount)
    )
    
    let circleIndex = 0

    for(let i = 1; i <= (state.columnCount); i++) {
        for(let j = 1; j <= (state.rowCount); j++) {
            const circleX = state.playArea.center.x - (radius * (state.columnCount - 1)) + (radius * 2 * (i - 1))
            const circleY = state.playArea.center.y - (radius * (state.rowCount - 1)) + (radius * 2 * (j - 1))
            
            // Update circle if exists, otherwise create new
            if(isResize && state.circles[circleIndex]) {
                state.circles[circleIndex].radius = radius
                state.circles[circleIndex].xPosition = circleX
                state.circles[circleIndex].yPosition = circleY
            } else {
                state.circles[circleIndex] = new Circle(
                    context,
                    radius,
                    circleX,
                    circleY,
                    cookedImages,
                )
            }
            circleIndex++
        }
    }

    state.circles.splice(circleIndex)
}

const setCanvasSize = () => {
    // Get the no. of physical pixels on the device per CSS pixel
    const devicePixelRatio = Math.ceil(window.devicePixelRatio)

    // Get screen dimensions in CSS pixels
    state.screenWidth = window.innerWidth
    state.screenHeight = window.innerHeight

    // Set canvas dimensions in physical pixels
    canvas.width = state.screenWidth * devicePixelRatio
    canvas.height = state.screenHeight * devicePixelRatio

    // Set the canvas CSS dimensions in "CSS pixels"
    canvas.style.width = `${state.screenWidth}px`
    canvas.style.height = `${state.screenHeight}px`
    canvas.getContext('2d').scale(devicePixelRatio, devicePixelRatio)
    
    // Get orientation & center of screen
    state.isHorizontalOrientation = state.screenWidth >= state.screenHeight
    state.center.x = state.screenWidth / 2
    state.center.y = state.screenHeight / 2

    // Set play area
    state.playArea.x = 0
    state.playArea.y = state.screenHeight / 10 * 1
    state.playArea.width = state.screenWidth
    state.playArea.height = state.screenHeight / 10 * 9
    state.playArea.center.x = state.playArea.width / 2
    state.playArea.center.y = (state.playArea.height / 2) + state.playArea.height / 10
}

const setRowAndColumnCount = () => {
    // Calculate the number of circles to put horizontally & vertically
    const shortDimensionCircleCount = Math.min(state.gridDimensions[0], state.gridDimensions[1])
    const longDimensionCircleCount = Math.max(state.gridDimensions[0], state.gridDimensions[1])
    if (state.isHorizontalOrientation) {
        state.rowCount = shortDimensionCircleCount
        state.columnCount = longDimensionCircleCount
    } else {
        state.rowCount = longDimensionCircleCount
        state.columnCount = shortDimensionCircleCount
    }
}

const temporarilyDisableButtons = () => {
    state.isClickAllowed = false
    if (state.timeout) clearTimeout(state.timeout)
    state.timeout = setTimeout(() => {
        state.isClickAllowed = true
        state.timeout = null
    }, 300)
}

const drawFrame = () => {
    context.beginPath()
    context.rect(0, 0, state.screenWidth, state.screenHeight)
    context.strokeStyle = COLORS.DEMO_BORDER
    context.lineWidth = STROKE_WIDTH
    context.stroke()

    const text = 'Watch!'
    context.font = `${SCORE_FONT_SIZE}px ${SCORE_FONT}`
    context.fillStyle = COLORS.DEMO_BORDER
    context.strokeStyle = COLORS.TEXT_SHADOW
    context.textAlign = 'left'
    context.textBaseline = 'middle'
    context.fillText(text, STROKE_WIDTH * 2, SCORE_FONT_SIZE + STROKE_WIDTH)
}

const drawGo = () => {
    const text = 'Go!'
    context.font = `${SCORE_FONT_SIZE}px ${SCORE_FONT}`
    context.fillStyle = COLORS.WIN_TEXT
    context.strokeStyle = COLORS.TEXT_SHADOW
    context.textAlign = 'left'
    context.textBaseline = 'middle'
    context.fillText(text, STROKE_WIDTH * 2, SCORE_FONT_SIZE + STROKE_WIDTH)
}

const drawScore = () => {
    const text = `x ${state.score}`
    context.font = `${SCORE_FONT_SIZE}px ${SCORE_FONT}`
    context.fillStyle = COLORS.WIN_TEXT
    context.strokeStyle = COLORS.TEXT_SHADOW
    context.textAlign = 'right'
    context.textBaseline = 'middle'
    context.fillText(text, state.screenWidth - STROKE_WIDTH * 2, SCORE_FONT_SIZE + STROKE_WIDTH)

    const textWidth = context.measureText(text).width
    
    const radius = SCORE_FONT_SIZE * 2
    context.drawImage(
        cookedImages[0],
        state.screenWidth - radius - STROKE_WIDTH * 2 - textWidth,
        5,
        radius,
        radius
    )
}

const drawClearStage = partCount => {
    context.beginPath()
    context.rect(0, 0, state.screenWidth, state.screenHeight)
    context.fillStyle = COLORS.OVERLAY
    context.lineWidth = STROKE_WIDTH
    context.fill()

    const text = partCount === 0 ? 'OK!' : 'OK!\nOkawari!'
    drawCenterText(context, state.center, [COLORS.WIN_TEXT, COLORS.DEMO_BORDER], text)
}


const showConfetti = () => {
    winConfetti = window.confetti.create(canvas, {
        resize: true,
        useWorker: false,
    })

    let lastFrameTimeStamp = 0
    let didFireFirstOne = false

    const frame = timeStamp => {
        if (!didFireFirstOne && (timeStamp - lastFrameTimeStamp > 1000)) {
            winConfetti({
                particleCount: 100,
                angle: 60,
                spread: 55,
                origin: { x: 0, y: Math.random() / 2 + 0.5 },
            })
            didFireFirstOne = true
        }
        if (timeStamp - lastFrameTimeStamp > 2000) {
            lastFrameTimeStamp = timeStamp
            didFireFirstOne = false
            winConfetti({
                particleCount: 100,
                angle: 120,
                spread: 55,
                origin: { x: 1, y: Math.random() / 2 + 0.5 },
            })
        }
        state.confettiAnimationFrame = requestAnimationFrame(frame)
    }

    state.confettiAnimationFrame = requestAnimationFrame(frame)
}

const animate = timeStamp => {
    if (state.didClearStage && !state.clearTimeStamp) {
        state.clearTimeStamp = timeStamp
    }

    context.clearRect(0, 0, canvas.width, canvas.height)

    if (state.didFinishShowingClearScreen) showNextStage()

    switch (state.stage) {
        case -2: // FAIL
            drawFailScreen(canvas, state.score, state.isHorizontalOrientation)
            return
        case -1: // START
            drawTitleScreen(canvas)
            return
        case GRID_DIMENSIONS_BY_STAGE.length: // WIN
            temporarilyDisableButtons()
            drawWinScreen(canvas, state.score, true)
            showConfetti()
            return
        default: // GAME IN PROGRESS
            context.fillStyle = COLORS.BACKGROUND
            context.fillRect(0, 0, canvas.width, canvas.height)
            if (timeStamp - state.lastFrameTimestamp >= state.animationInterval) {
                state.lastFrameTimestamp = timeStamp
                if (state.isDemonstration && (state.visibleFaceIndex < state.facePositions.length)) {
                    state.visibleFaceIndex++
                }
                state.isDemonstration = state.visibleFaceIndex < state.facePositions.length
                if (state.facePositions[state.visibleFaceIndex]?.isRedHerring) {
                    state.rightFaceIndex = -1
                    state.wrongFaceIndex = Math.floor(Math.random()*wrongFaceImages.length)
                } else {
                    state.wrongFaceIndex = -1
                    state.rightFaceIndex = Math.floor(Math.random()*rightFaceImages.length)
                }
            }
            state.circles.forEach((circle, index) => {
                if (index === state.facePositions[state.visibleFaceIndex]?.positionID) {
                        circle.draw(state.wrongFaceIndex === -1 ?
                            rightFaceImages[state.rightFaceIndex] :
                            wrongFaceImages[state.wrongFaceIndex]
                        )
                } else {
                    circle.draw(null)
                }
            })
            // CLEAR STAGE
            if (state.didClearStage) {
                const timeSinceClear = timeStamp - state.clearTimeStamp
                if (timeSinceClear > CLEAR_SCREEN_DURATIONS[0]) {
                    drawClearStage(1)
                } else {
                    drawClearStage(0)
                }
                
                if (timeSinceClear > CLEAR_SCREEN_DURATIONS[0] + CLEAR_SCREEN_DURATIONS[1]) {
                    state.didClearStage = false
                    state.clearTimeStamp = null
                    state.didFinishShowingClearScreen = true
                }
            }
            state.isDemonstration ? drawFrame() : drawGo()
            drawScore()
        break
    }
    requestAnimationFrame(animate)
}

const onPointerDown = event => {
    event.stopPropagation()
    event.preventDefault()
}

const onPointerUp = event => {
    if (!state.hasFinishedLoading) return
    event.stopPropagation()
    event.preventDefault()
    event.cancelBubble = true
    if(state.isDemonstration) { return }
    switch (state.stage) {
        case -1: // Title screen
        case -2: // Fail screen
        case -3: // Info screen
        case GRID_DIMENSIONS_BY_STAGE.length: // Win screen
            return
        default: // Stages
            state.circles.forEach(circle => {
                const xDistance = event.clientX - circle.xPosition
                const yDistance = event.clientY - circle.yPosition
                const distance = Math.sqrt(xDistance * xDistance + yDistance * yDistance)
        
                // If the click was within the circle, check if it's the correct circle
                if (distance <= circle.radius) {
                    while(state.facePositions[state.clickCount].isRedHerring) {
                        state.clickCount++
                    }
                    if(state.facePositions[state.clickCount].positionID === circle.id) {
                        circle.select()
                        state.clickCount++
                        state.score++
                    } else {
                        state.stage = -2
                        temporarilyDisableButtons()
                        state.circles.length = 0
                        state.gridDimensions = GRID_DIMENSIONS_BY_STAGE[0]
                        setCanvasSize()
                        setRowAndColumnCount()
                        setCircleSizeAndPosition(false)
                    }
                }
            })
            if (state.clickCount >= state.facePositions.length) {
                state.stage++
                if (state.stage < GRID_DIMENSIONS_BY_STAGE.length) {
                    state.didClearStage = true
                }
            }
            break
    }
}

const showNextStage = () => {
    state.didFinishShowingClearScreen = false
    state.clickCount = 0
    state.visibleFaceIndex = -2
    state.isDemonstration = true
    state.gridDimensions = GRID_DIMENSIONS_BY_STAGE[state.stage]
    setRowAndColumnCount()
    setCircleSizeAndPosition(false)
    state.animationInterval = SPEED_BY_STAGE[state.stage]

    // Set random face positions
    state.facePositions.length = 0
    let wrongFaceCount = 0
    while(state.facePositions.length - wrongFaceCount < FACE_POSITION_COUNT_BY_STAGE[state.stage]) {
        const isRedHerring = Math.floor(Math.random() * 11) < state.chanceOfWrongFace
        if (isRedHerring) { wrongFaceCount++ }
        let facePosition = new FacePosition(-1, isRedHerring)
        while (facePosition.positionID === -1
            || facePosition.positionID === state.facePositions[state.facePositions.length - 1]?.positionID)
        {
            facePosition.positionID = Math.floor(Math.random() * state.circles.length)
        }
        state.facePositions.push(facePosition)
    }
}

const onResize = isOrientationChange => {
    setCanvasSize()
    switch (state.stage) {
        case -3: // INFO
            drawInfoScreen(canvas, state.isJapanese)
            return
        case -2: // FAIL
            drawFailScreen(canvas, state.score, state.isHorizontalOrientation)
            return
            case -1: // START
            drawTitleScreen(canvas)
            return
        case GRID_DIMENSIONS_BY_STAGE.length: // WIN
            drawWinScreen(canvas, state.score, false)
            if (isOrientationChange) {
                state.confettiAnimationFrame && window.cancelAnimationFrame(state.confettiAnimationFrame)
                winConfetti?.reset()
                winConfetti = null
                showConfetti()
            }
            return
        default: // GAME STAGE
            break
    }
    setRowAndColumnCount()
    setCircleSizeAndPosition(true)
}

/* EVENT LISTENERS */
window.addEventListener('resize', () => onResize(false))
window.addEventListener('orientationchange', () => onResize(true))
window.addEventListener('pointerdown', event => onPointerDown(event))
window.addEventListener('pointerup', event => onPointerUp(event))
document.getElementById('start-btn').addEventListener('click', startGame)
document.getElementById('home-btn').addEventListener('click', event => {
    if (!state.isClickAllowed) return
    temporarilyDisableButtons()
    state.score = 0
    state.stage = -1 // Home
    state.confettiAnimationFrame && window.cancelAnimationFrame(state.confettiAnimationFrame)
    winConfetti?.reset()
    winConfetti = null
    drawTitleScreen(canvas)
})
document.getElementById('back-btn').addEventListener('click', event => {
    if (!state.isClickAllowed) return
    temporarilyDisableButtons()
    event.preventDefault()
    event.stopPropagation()
    state.stage = -1 // Home
    drawTitleScreen(canvas)
})
document.getElementById('back-icon-btn').addEventListener('click', event => {
    if (!state.isClickAllowed) return
    temporarilyDisableButtons()
    event.preventDefault()
    event.stopPropagation()
    state.stage = -1 // Home
    drawTitleScreen(canvas)
})
document.getElementById('info-btn').addEventListener('click', event => {
    if (!state.isClickAllowed) return
    temporarilyDisableButtons()
    event.preventDefault()
    event.stopPropagation()
    state.stage = -3 // Info
    drawInfoScreen(canvas, state.isJapanese)
})
document.getElementById('language-btn').addEventListener('click', function(event) {
    if (!state.isClickAllowed) return
    temporarilyDisableButtons()
    event.preventDefault()
    event.stopPropagation()
    const buttonLabel = this.firstChild
    const infoText1 = document.getElementById('info-text-1')
    const infoText2 = document.getElementById('info-text-2')

    state.isJapanese = !state.isJapanese
    if (state.isJapanese) {
        infoText1.innerHTML = INFO_TEXT.JAPANESE[0]
        infoText2.innerHTML = INFO_TEXT.JAPANESE[1]
        infoText1.style.setProperty('font-family', "'Kiwi Maru', cursive")
        infoText2.style.setProperty('font-family', "'Kiwi Maru', cursive")
        buttonLabel.innerText = 'EN'
        buttonLabel.style.setProperty('color', COLORS.DARK_TEXT)
        this.style.setProperty('background-color', COLORS.CIRCLE[2])
    } else {
        infoText1.innerHTML = INFO_TEXT.ENGLISH[0]
        infoText2.innerHTML = INFO_TEXT.ENGLISH[1]
        infoText1.style.setProperty('font-family', 'Sen')
        infoText2.style.setProperty('font-family', 'Sen')
        buttonLabel.innerText = 'JP'
        buttonLabel.style.setProperty('color', COLORS.FAIL_TEXT)
        this.style.setProperty('background-color', COLORS.JAPANESE_ICON)
    }
})

drawLoadingScreen(context, state.center)