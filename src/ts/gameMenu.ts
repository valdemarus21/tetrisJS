import { menuContent } from './gameContent.js';
import { addHoverForButtons } from './sketchBtn.js';
export const createGameMenu = (app: { (difficult: number): void; (arg0: number): any; }) => {
	const gameContent = document.querySelector('.game-content') as HTMLDivElement
	gameContent.innerHTML = '';
	gameContent.innerHTML = menuContent;

	const easyBtn = document.querySelector('.easy') as HTMLButtonElement
	const normBtn = document.querySelector('.normal') as HTMLButtonElement;
	const hardBtn = document.querySelector('.hard') as HTMLButtonElement;

	easyBtn.addEventListener('click', () => app(35))
	normBtn.addEventListener('click', () => app(15))
	hardBtn.addEventListener('click', () => app(5))

	addHoverForButtons();
};
