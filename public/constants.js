/* Copyright (c) 2022, Alex Hannigan */

export const STROKE_WIDTH = 10
export const GRID_DIMENSIONS_BY_STAGE = [
    [1, 2],
    [1, 2],
    [1, 3],
    [1, 3],
    [2, 3],
    [2, 4],
    [3, 4],
    [3, 4],
    [3, 5],
    [3, 6],
    [3, 6],
]
export const FACE_POSITION_COUNT_BY_STAGE = [
    2,
    4,
    5,
    5,
    5,
    6,
    5,
    5,
    6,
    6,
    7,
]
export const SPEED_BY_STAGE = [
    1000,
    500,
    1000,
    500,
    500,
    1000,
    500,
    350,
    1000,
    500,
    500,
]
export const COLORS = {
    CIRCLE: ['#266867', '#F58800', '#F8BC24', '#843b62', '#621940', '#1A4645'],
    DEMO_BORDER: '#D42049',
    TITLE_TEXT: '#000000',
    FAIL_TEXT: '#DDDDDD',
    WIN_TEXT: '#EEEEEE',
    WIN_BACKGROUND: '#7a24F8',
    TEXT_SHADOW: '#000000',
    BACKGROUND: '#051821',
    OVERLAY: '#000000AA',
    TRANSPARENT: '#00000000',
    DARK_TEXT: '#1D1D1D',
    JAPANESE_ICON: '#212121',
}
export const TITLE_SCREEN_FONT_SIZE = 50
export const CLEAR_SCREEN_FONT_SIZE = 75
export const SCORE_FONT_SIZE = 20
export const TITLE_SCREEN_FONT = 'Fredoka One'
export const SCORE_FONT = 'Fredoka One'
export const WIN_MESSAGE = 'You Win!'
export const SHADOW_LINE_WIDTH = 6
export const RIGHT_FACE_IMAGE_COUNT = 5
export const WRONG_FACE_IMAGE_COUNT = 9
export const COOKED_IMAGE_COUNT = 1
export const CLEAR_SCREEN_DURATIONS = [500, 500] // Milliseconds

export const INFO_TEXT = {
    ENGLISH: [
        `Welcome to Tori Anki!<br><br>
        We hope you enjoy our superior all-you-can-eat chicken menu.<br>
        The shop does tend to get a bit crowded, and for this reason we have a rather unique rule that we kindly request all customers adhere to:<br><br>
        You must <span class="yellow-text">memorize the positions of the dishes containing chicken, and select them in the correct order</span>.`,
        `If you select a dish containing a bird other than chicken, we will sadly request that you stop dining and settle your bill immediately.<br><br>
        We appreciate your understanding!<br><br>
        Good luck and bon appetit!`
    ],
    JAPANESE: [
        `いらっしゃいませー！<br><br>
        鶏暗記（とりあんき）はチキン食べ放題のメニューを提供しております。<br>
        店内は大変混み合いますので、以下のルールを設けております：<br><br>
        お召し上がりになる鶏の皿の<span class="yellow-text">位置および順番を暗記</span>した上、お客様自身に指定していただきます。`,
        `ニワトリ以外の鳥を指定してしまった場合は即時、ご帰宅いただきます。<br><br>
        ご協力、ご理解をいただき、誠にありがとうございます！<br><br>
        それでは、頑張ってください！`
    ],
}