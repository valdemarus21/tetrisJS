import { tetrisContent } from './gameContent.js';
import { createGameMenu } from './gameMenu.js';
import { addHoverForButtons } from './sketchBtn.js';
import { isValidPos, shuffle } from './utils.js';
import { tetraminoItems } from './tetraminoItems.js';
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

	function createTetramino() {
		if (tetraminoOrder.length === 0) {
			tetraminoOrder = ['I', 'J', 'L', 'O', 'S', 'T', 'Z'];
			shuffle(tetraminoOrder);
		}
		const name = tetraminoOrder.pop();
		const matrix = tetraminoItems[name];
		const col = playArea[0].length / 2 - Math.ceil(matrix[0]?.length / 2);
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
                if(tetramino.matrix[row][col]){
                    if(tetramino.row + row < 0){
                        return
                    }
                    playArea[tetramino.row + row][tetramino.col + col] = tetramino.name
                }
            }
		}
        tetramino = createTetramino()
	};
	const game = () => {
		requestAnimationId = requestAnimationFrame(game);
		context.clearRect(0, 0, canvas.clientWidth, canvas.height);

		if (tetramino) {
			if (++count > difficult) {
				tetramino.row++;
				count = 0;
			}
			if (!isValidPos(tetramino.matrix, tetramino.row, tetramino.col, playArea)) {
				tetramino.row--;
                placeTetramino()
			}
			context.fillStyle = colors[tetramino.name];

			for (let row = 0; row < tetramino.matrix.length; row++) {
				for (let col = 0; col < tetramino.matrix[row].length; col++) {
					if (tetramino.matrix[row][col]) {
                        console.log(tetramino)
						context.fillRect(
							(tetramino.col + col) * squareSize,
							(tetramino.row + row) * squareSize,
							squareSize - 1,
							squareSize - 1,
						);
					}
				}
			}
		}
	};
	startBtn.addEventListener('click', () => (requestAnimationId = requestAnimationFrame(game)));
	addHoverForButtons();
};
createGameMenu(app);
