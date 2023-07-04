import { tetraminoItems } from './tetraminoItems.js';
import { tetrisContent } from './gameContent.js';
import { createGameMenu } from './gameMenu.js';
import { addHoverForButtons } from './sketchBtn.js';
import { isValidPos, moveOnClickLeft, moveOnClickRight, rapidFallDown, rotateOnCliclUp, showGameMessage, showNextTetromino, shuffle, tetrisResize, } from './utils.js';
import { colors } from './tetraminoItems.js';
const app = (difficult) => {
    const gameContent = document.querySelector('.game-content');
    gameContent.innerHTML = '';
    gameContent.innerHTML = tetrisContent;
    const canvas = document.getElementById('game');
    const context = canvas.getContext('2d');
    const startBtn = document.querySelector('.start');
    const pauseBtn = document.querySelector('.pause');
    const restartBtn = document.querySelector('.restart');
    const scoreBlock = document.querySelector('.score__total');
    const topArrow = document.querySelector('.top');
    const bottomArrow = document.querySelector('.bottom');
    const leftArrow = document.querySelector('.left');
    const rightArrow = document.querySelector('.right');
    const squareSize = 32;
    let tetraminoOrder = [];
    let playArea = [];
    for (let row = -2; row < 20; row++) {
        playArea[row] = [];
        for (let col = 0; col < 10; col++) {
            playArea[row][col] = 0;
        }
    }
    let count = 0; // счетчик кадров, от которого зависит сложность игры
    let tetramino = createTetramino();
    let score = 0;
    let isGameOver = false;
    let requestAnimationId = null;
    const showGameOver = () => {
        cancelAnimationFrame(requestAnimationId);
        isGameOver = true;
        showGameMessage(context, canvas, 'GAME OVER!');
    };
    function createTetramino() {
        var _a;
        if (tetraminoOrder.length === 0) {
            tetraminoOrder = ['I', 'J', 'L', 'O', 'S', 'T', 'Z'];
            shuffle(tetraminoOrder);
        }
        const name = tetraminoOrder.pop() || '';
        const matrix = tetraminoItems[name];
        console.log(tetraminoItems);
        console.log(tetraminoOrder);
        const col = playArea[0].length / 2 - Math.ceil(((_a = matrix[0]) === null || _a === void 0 ? void 0 : _a.length) / 2);
        const row = name === 'I' ? -1 : -2;
        return {
            name,
            matrix,
            row,
            col,
        };
    }
    const placeTetramino = () => {
        for (let row = 0; row < tetramino.matrix.length; row++) {
            for (let col = 0; col < tetramino.matrix[row].length; col++) {
                if (tetramino.matrix[row][col]) {
                    if (tetramino.row + row < 0) {
                        return showGameOver();
                    }
                    playArea[tetramino.row + row][tetramino.col + col] = tetramino.name;
                }
            }
        }
        for (let row = playArea.length - 1; row > 0;) {
            if (playArea[row].every((cell) => !!cell)) {
                for (let r = row; r >= 0; r--) {
                    for (let col = 0; col < playArea[r].length; col++) {
                        playArea[r][col] = playArea[r - 1][col];
                    }
                }
                scoreBlock.innerHTML = (score += 5).toString();
            }
            else {
                row--;
            }
        }
        tetramino = createTetramino();
    };
    const game = () => {
        showNextTetromino(tetraminoOrder.at(-1));
        requestAnimationId = requestAnimationFrame(game);
        context.clearRect(0, 0, canvas.clientWidth, canvas.height);
        for (let row = 0; row < 20; row++) {
            for (let col = 0; col < 10; col++) {
                if (playArea[row][col]) {
                    const name = playArea[row][col];
                    context.fillStyle = colors[name];
                    context.fillRect(col * squareSize, row * squareSize, squareSize - 1, squareSize - 1);
                }
            }
        }
        if (tetramino) {
            if (++count > difficult) {
                tetramino.row++;
                count = 0;
            }
            if (!isValidPos(tetramino.matrix, tetramino.row, tetramino.col, playArea)) {
                tetramino.row--;
                placeTetramino();
            }
            context.fillStyle = colors[tetramino.name];
            for (let row = 0; row < tetramino.matrix.length; row++) {
                for (let col = 0; col < tetramino.matrix[row].length; col++) {
                    if (tetramino.matrix[row][col]) {
                        context.fillRect((tetramino.col + col) * squareSize, (tetramino.row + row) * squareSize, squareSize - 1, squareSize - 1);
                    }
                }
            }
        }
    };
    document.addEventListener('keydown', (e) => {
        if (isGameOver)
            return;
        if (e.which === 40) {
            rapidFallDown(tetramino, playArea, placeTetramino);
        }
        if (e.which == 38) {
            rotateOnCliclUp(tetramino, playArea);
        }
        if (e.which == 39) {
            moveOnClickRight(tetramino, playArea);
        }
        if (e.which == 37) {
            moveOnClickLeft(tetramino, playArea);
        }
    });
    startBtn.addEventListener('click', () => {
        requestAnimationId = requestAnimationFrame(game);
        startBtn.disabled = true;
        pauseBtn.disabled = false;
    });
    addHoverForButtons();
    pauseBtn.addEventListener('click', () => {
        cancelAnimationFrame(requestAnimationId);
        showGameMessage(context, canvas, 'PAUSED');
        pauseBtn.disabled = true;
        startBtn.disabled = false;
    });
    restartBtn.addEventListener('click', () => {
        window.location.reload();
    });
    topArrow.addEventListener('click', () => rotateOnCliclUp(tetramino, playArea));
    bottomArrow.addEventListener('click', () => rapidFallDown(tetramino, playArea, placeTetramino));
    leftArrow.addEventListener('click', () => moveOnClickLeft(tetramino, playArea));
    rightArrow.addEventListener('click', () => moveOnClickRight(tetramino, playArea));
};
createGameMenu(app);
tetrisResize();
window.addEventListener('resize', tetrisResize);
