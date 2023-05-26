import { tetrisContent } from "./gameContent.js"
import { createGameMenu } from "./gameMenu.js"
import { addHoverForButtons } from "./sketchBtn.js"
const app = (difficult) => {
    const gameContent = document.querySelector('.game-content')
    gameContent.innerHTML = ''
    gameContent.innerHTML = tetrisContent
    addHoverForButtons()
}
createGameMenu(app)