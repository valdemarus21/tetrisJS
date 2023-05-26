export const shuffle = (array) => {
	let currentIndex = array.length,
		randomIndex;
	while (currentIndex != 0) {
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex--;
		[array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
	}

	return array;
};

export const isValidPos = (tetromino, tetrominoRow, tetrominoCol, playArea) => {
	for (let row = 0; row < tetromino.length; row++) {
		for (let col = 0; col < tetromino[row].length; col++) {
			if (
				tetromino[row][col] &&
				(tetrominoCol + col < 0 ||
					tetrominoCol + col >= playArea[0].length ||
					tetrominoRow + row >= playArea.length ||
					playArea[tetrominoRow + row][tetrominoCol + col])
			) {
				return false;
			}
		}
	}

	return true;
};

export const rapidFallDown = (tetromino, playArea, placeTetromino) => {
	const row = tetromino.row + 1;
	if (!isValidPos(tetromino.matrix, row, tetromino.col, playArea)) {
		tetromino.row = row - 1;
		placeTetromino();
		return;
	}
	tetromino.row = row;
};
export const showGameMessage = (context, canvas, text) => {
	context.fillStyle = 'black';
	context.globalAlpha = 0.75;
	context.fillRect(0, canvas.height / 2 - 30, canvas.width, 60);
	context.globalAlpha = 1;
	context.fillStyle = 'white';
	context.font = '36px monospace';
	context.textAlign = 'center';
	context.textBaseline = 'middle';
	context.fillText(text, canvas.width / 2, canvas.height / 2);
};
