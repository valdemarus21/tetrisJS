export const menuContent = `
<div class="game-menu">
		<span>CHOOSE YOUR LEVEL</span>
		<button class="sketch-button easy">EASY</button>
		<button class="sketch-button normal">NORMAL</button>
		<button class="sketch-button hard">HARD</button>
	</div>;
`;

export const tetrisContent = `
			<h1 class="title">tetrisJS</h1>
			<div class="game-content__inner">
				<div class="canvas-bg">
					<canvas id="game" width="320" height="640"></canvas>
				</div>
				<div class="game-content__info">
					<div class="game-content__next">
						<span class="next__title">next</span>
						<div class="next__inner">
							<div class="tetramino">
								<span></span>
								<span></span>
								<span></span>
								<span></span>
							</div>
						</div>
					</div>
					<div class="game-content__score">
						<span class="score__title">NEXT</span>
						<span class="score__total">0</span>
					</div>
					<div class="game-buttons">
						<span class="sketch-button start" start>Start</span>
						<span class="sketch-button pause" pause>Pause</span>
						<span class="sketch-button restart" restart>Restart</span>
					</div>
					<div class="game-controls">
						<button class="sketch-button top" >
							<span>
								<svg
									fill="#ffffff"
									xmlns="http://www.w3.org/2000/svg"
									width="24"
									height="24"
									viewBox="0 0 24 24"
								>
									<path d="M0 16.67l2.829 2.83 9.175-9.339 9.167 9.339 2.829-2.83-11.996-12.17z" />
								</svg>
							</span>
						</button>
						<button class="sketch-button  bottom">
                            							<span>
								<svg
									fill="#ffffff"
									xmlns="http://www.w3.org/2000/svg"
									width="24"
									height="24"
									viewBox="0 0 24 24"
								>
									<path d="M0 16.67l2.829 2.83 9.175-9.339 9.167 9.339 2.829-2.83-11.996-12.17z" />
								</svg>
							</span>
                            </button
						><button class="sketch-button  left">
							<span>
								<svg
									fill="#ffffff"
									xmlns="http://www.w3.org/2000/svg"
									width="24"
									height="24"
									viewBox="0 0 24 24"
								>
									<path d="M0 16.67l2.829 2.83 9.175-9.339 9.167 9.339 2.829-2.83-11.996-12.17z" />
								</svg>
							</span>
						</button>
						<button class="sketch-button right" >
							<span>
								<svg
									fill="#ffffff"
									xmlns="http://www.w3.org/2000/svg"
									width="24"
									height="24"
									viewBox="0 0 24 24"
								>
									<path d="M0 16.67l2.829 2.83 9.175-9.339 9.167 9.339 2.829-2.83-11.996-12.17z" />
								</svg>
							</span>
						</button>
					</div>
				</div>
			</div>`;
