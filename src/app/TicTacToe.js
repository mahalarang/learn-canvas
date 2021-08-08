import createElement from 'Utils/createElement.util';

export const Marker = {
	O: 'o',
	X: 'x',
};

class TicTacToe {
	#dimention = '3x3';
	#rootEl = null;
	#currentTurn = Marker.X;

	constructor(options = {}) {
		this.#setupDimention(options.dimention);
		if (Object.values(Marker).includes(options.starter)) {
			this.#currentTurn = options.starter;
		}
	}

	breakDimention() {
		const dimSplit = this.#dimention.match(/\d/g);

		return {
			x: +dimSplit[0],
			y: +(dimSplit[1] || dimSplit[0]),
		};
	}

	markArea(target, turn) {
		target.dataset.marked = true;
		target.appendChild(
			createElement({
				selector: 'span',
				attributes: {
					class: 'ttt__marker',
					'data-marker': turn,
				},
			})
		);

		this.#currentTurn = this.#currentTurn === Marker.X ? Marker.O : Marker.X;
	}

	#setupDimention(dimention) {
		if (dimention) this.#dimention = dimention;
	}

	#handleClickTile() {
		const $this = this;

		return function () {
			const col = this;
			const row = this.parentElement;

			if (!col.dataset.marked) {
				$this.markArea(col, $this.#currentTurn);
			}
		};
	}

	render(selector) {
		if (selector && document) {
			this.#rootEl = document.querySelector(selector);
			this.#rootEl.classList.add('tic-tac-toe');

			const dimention = this.breakDimention();

			const wrapper = createElement({
				selector: 'div',
				attributes: {
					class: 'ttt__wrapper',
				},
				children: new Array(dimention.y).fill().map((_, i) =>
					createElement({
						selector: 'div',
						attributes: {
							class: 'ttt__row',
							'data-row': i + 1,
						},
						children: new Array(dimention.x).fill().map((__, j) =>
							createElement({
								selector: 'div',
								attributes: {
									class: 'ttt__col',
									'data-col': j + 1,
								},
								events: {
									click: this.#handleClickTile.call(this),
								},
							})
						),
					})
				),
			});

			this.#rootEl.appendChild(wrapper);
		}
	}
}

export default TicTacToe;
