/* Copyright (c) 2022, Alex Hannigan */

import {
    TITLE_SCREEN_FONT_SIZE,
    CLEAR_SCREEN_FONT_SIZE,
    TITLE_SCREEN_FONT,
    SHADOW_LINE_WIDTH,
    WIN_MESSAGE,
    INFO_TEXT,
    COLORS,
} from "./constants.js"

export const drawLoadingScreen = (context, center) => {
    context.font = `${TITLE_SCREEN_FONT_SIZE}px ${TITLE_SCREEN_FONT}`
    context.fillStyle = COLORS.WIN_TEXT
    context.textAlign = 'center'
    context.textBaseline = 'middle'
    context.lineWidth = SHADOW_LINE_WIDTH
    context.strokeStyle = COLORS.TEXT_SHADOW
    context.fillText('Loading...', center.x, center.y)
    context.strokeText('Loading...', center.x, center.y)
}

export const drawCenterText = (context, center, textColors, text) => {
    context.font = `${CLEAR_SCREEN_FONT_SIZE}px ${TITLE_SCREEN_FONT}`
    context.textAlign = 'center'
    context.textBaseline = 'middle'
    const lines = text.split('\n')
    for (let i = 0; i < lines.length; i++) {
        context.fillStyle = textColors[i]
        context.fillText(lines[i], center.x, center.y + (i * CLEAR_SCREEN_FONT_SIZE))
    }
}

export const drawTitleScreen = canvas => {
    [document.body, canvas].forEach(element => {
        element.style.backgroundColor = COLORS.CIRCLE[0]
    })
    canvas.style.setProperty('pointer-events', 'unset')
    canvas.style.setProperty('display', 'none')
    document.getElementById('win-images-container').style.setProperty('display', 'none')
    document.getElementById('good-bad-bird-container').style.setProperty('display', 'none')
    document.getElementById('main').style.setProperty('display', 'flex')
    document.getElementById('start-btn').style.setProperty('display', 'block')
    document.getElementById('home-btn').style.setProperty('display', 'none')
    document.getElementById('back-btn').style.setProperty('display', 'none')
    document.getElementById('score').style.setProperty('display', 'none')
    document.getElementById('bg-img-container').style.setProperty('display', 'block')
    document.getElementById('fail-img-container').style.setProperty('display', 'none')
    document.getElementById('main-title').innerText = 'Tori Anki'
    document.getElementById('info-text-1').style.setProperty('display', 'none')
    document.getElementById('info-text-2').style.setProperty('display', 'none')
    document.getElementById('language-btn').style.setProperty('display', 'none')
    document.getElementById('info-btn').style.setProperty('display', 'block')
    document.getElementById('back-icon-btn').style.setProperty('display', 'none')
    document.getElementById('main-copyright').style.setProperty('display', 'block')
    document.getElementById('info-copyright').style.setProperty('display', 'none')
    const comeAgainElements = document.getElementsByClassName('come-again')
    for (let i = 0; i < comeAgainElements.length; i++) {
        comeAgainElements[i]?.style.setProperty('display', 'none')
    }
}

export const drawInfoScreen = (canvas, isJapanese = true) => {
    [document.body, canvas].forEach(element => {
        element.style.backgroundColor = COLORS.CIRCLE[0]
    })
    document.getElementById('start-btn').style.setProperty('display', 'none')
    document.getElementById('home-btn').style.setProperty('display', 'none')
    document.getElementById('back-btn').style.setProperty('display', 'block')
    document.getElementById('score').style.setProperty('display', 'none')
    document.getElementById('bg-img-container').style.setProperty('display', 'none')
    document.getElementById('fail-img-container').style.setProperty('display', 'none')
    document.getElementById('main-title').innerText = 'Tori Anki'
    document.getElementById('info-text-1').innerHTML = isJapanese ? INFO_TEXT.JAPANESE[0] : INFO_TEXT.ENGLISH[0]
    document.getElementById('info-text-2').innerHTML = isJapanese ? INFO_TEXT.JAPANESE[1] : INFO_TEXT.ENGLISH[1]
    document.getElementById('good-bad-bird-container').style.setProperty('display', 'block')
    document.getElementById('info-text-1').style.setProperty('display', 'block')
    document.getElementById('info-text-2').style.setProperty('display', 'block')
    document.getElementById('info-btn').style.setProperty('display', 'none')
    document.getElementById('language-btn').style.setProperty('display', 'block')
    document.getElementById('back-icon-btn').style.setProperty('display', 'block')
    document.getElementById('main-copyright').style.setProperty('display', 'none')
    document.getElementById('info-copyright').style.setProperty('display', 'block')
    const comeAgainElements = document.getElementsByClassName('come-again')
    for (let i = 0; i < comeAgainElements.length; i++) {
        comeAgainElements[i]?.style.setProperty('display', 'none')
    }
}

export const drawWinScreen = (canvas, score, isFirstTime = false) => {
    const winImagesContainer = document.getElementById('win-images-container')
    document.body.style.backgroundColor = COLORS.WIN_BACKGROUND
    document.getElementById('main').style.setProperty('display', 'flex')
    canvas.style.setProperty('background-color', COLORS.TRANSPARENT)
    canvas.style.setProperty('pointer-events', 'none')
    document.getElementById('start-btn').style.setProperty('display', 'none')
    document.getElementById('main-copyright').style.setProperty('display', 'none')
    document.getElementById('info-copyright').style.setProperty('display', 'none')
    document.getElementById('home-btn').style.setProperty('display', 'block')
    document.getElementById('back-btn').style.setProperty('display', 'none')
    document.getElementById('score').style.setProperty('display', 'block')
    document.getElementById('score').innerText = `Score: ${score}`
    document.getElementById('bg-img-container').style.setProperty('display', 'none')
    document.getElementById('fail-img-container').style.setProperty('display', 'none')
    document.getElementById('main-title').innerText = WIN_MESSAGE
    document.getElementById('info-text-1').style.setProperty('display', 'none')
    document.getElementById('info-text-2').style.setProperty('display', 'none')
    document.getElementById('language-btn').style.setProperty('display', 'none')
    document.getElementById('info-btn').style.setProperty('display', 'none')
    document.getElementById('back-icon-btn').style.setProperty('display', 'none')
    document.getElementById('come-again-win').style.setProperty('display', 'block')

    if (!isFirstTime) return

    // Randomize image positions
    const winImages = document.getElementsByClassName('win-image')
    for (let i = winImages.length; i >= 0; i--) {
        winImagesContainer.appendChild(winImages[Math.random() * i | 0]);
    }
    winImagesContainer.style.setProperty('display', 'flex')
}

export const drawFailScreen = (canvas, score, isHorizontalOrientation = false) => {
    document.body.style.backgroundColor = COLORS.DEMO_BORDER
    document.getElementById('main').style.setProperty('display', 'flex')
    canvas.style.setProperty('display', 'none')
    document.getElementById('start-btn').style.setProperty('display', 'none')
    document.getElementById('home-btn').style.setProperty('display', 'block')
    document.getElementById('back-btn').style.setProperty('display', 'none')
    document.getElementById('score').style.setProperty('display', 'block')
    document.getElementById('score').innerText = `Score: ${score}`
    document.getElementById('bg-img-container').style.setProperty('display', 'none')
    document.getElementById('fail-img-container').style.setProperty('display', 'flex')
    document.getElementById('main-title').innerText = 'Game Over'
    document.getElementById('info-text-1').style.setProperty('display', 'none')
    document.getElementById('info-text-2').style.setProperty('display', 'none')
    document.getElementById('info-btn').style.setProperty('display', 'none')
    document.getElementById('language-btn').style.setProperty('display', 'none')
    document.getElementById('back-icon-btn').style.setProperty('display', 'none')
    document.getElementById('main-copyright').style.setProperty('display', 'none')
    document.getElementById('info-copyright').style.setProperty('display', 'none')
    const comeAgainHorizontalElements = document.getElementsByClassName('come-again-horizontal')
    const comeAgainVerticalElements = document.getElementsByClassName('come-again-vertical')
    for (let i = 0; i < comeAgainHorizontalElements.length; i++) {
        comeAgainHorizontalElements[i]?.style.setProperty('display', isHorizontalOrientation ? 'block' : 'none')
        comeAgainVerticalElements[i]?.style.setProperty('display', isHorizontalOrientation ? 'none' : 'block')
    }
    document.getElementById('come-again-win').style.setProperty('display', 'none')
}