import { menuContent } from './gameContent.js';
import { addHoverForButtons } from './sketchBtn.js';
export const createGameMenu = (app) => {
	const gameContent = document.querySelector('.game-content');
	gameContent.innerHTML = '';
	gameContent.innerHTML = menuContent;

	const easyBtn = document.querySelector('.easy')
	const normBtn = document.querySelector('.normal')
	const hardBtn = document.querySelector('.hard')

	easyBtn.addEventListener('click', () => app(35))
	normBtn.addEventListener('click', () => app(15))
	hardBtn.addEventListener('click', () => app(5))

	addHoverForButtons();
};
