/* Copyright (c) 2022, Alex Hannigan */

import { STROKE_WIDTH, COLORS } from './constants.js'

export default class Circle {
    static idCount = 1
    static cookedImages = []

    timesSelected = 0

    constructor(context, radius, xPosition, yPosition, cookedImages) {
        this.id = Circle.idCount++
        this.context = context
        this.radius = radius
        this.xPosition = xPosition
        this.yPosition = yPosition
        if(Circle.cookedImages.length === 0)
            Circle.cookedImages = cookedImages
    }

    select() {
        this.timesSelected++
    }

    draw(image = null) {
        this.context.save()
        this.context.beginPath()
        this.context.arc(
            this.xPosition,
            this.yPosition,
            this.radius - STROKE_WIDTH / 2,
            0,
            Math.PI * 2
        )
        this.context.closePath()
        this.context.fillStyle = COLORS.CIRCLE[this.timesSelected]
        this.context.fill()
        this.context.clip()

        if (this.timesSelected > 0) {
            image = Circle.cookedImages[Math.floor(Math.random()*Circle.cookedImages.length)]
        }
        
        if (image) {
            this.context.drawImage(
                image,
                this.xPosition - this.radius * 0.75,
                this.yPosition - this.radius * 0.75,
                this.radius * 1.5,
                this.radius * 1.5
            )
        }
        
        this.context.beginPath()
        this.context.arc(this.xPosition, this.yPosition, this.radius, 0, Math.PI * 2)
        this.context.clip()
        this.context.closePath()
        this.context.restore()
    }
}