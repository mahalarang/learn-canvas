<script>
	import { onMount } from 'svelte';
	import random from 'Utils/random.util';
	import Circle from 'Utils/shapes/Circle.util';

	let canvas;

	onMount(() => {
		const VW = window.innerWidth;
		const VH = window.innerHeight;

		const ctx = canvas.getContext('2d');

		canvas.width = VW;
		canvas.height = VH;

		const balls = [];
		const gravity = 1;
		const velocity = 0.93;
		const radius = 50;

		window.addEventListener('click', function ({ x, y }) {
			const color = random.choose([
				'red',
				'green',
				'blue',
				'pink',
				'lightgreen',
				'lightblue',
			]);

			const ball = new Circle(ctx, VW, VH, radius)
				.setColor(color)
				.position(x, y)
				.speed(2, 2);

			balls.push(ball);
		});

		let animationId;
		function animate() {
			animationId = requestAnimationFrame(animate);
			ctx.clearRect(0, 0, VW, VH);

			for (const ball of balls) {
				if (ball.y + ball.radius + ball.dy > VH) {
					ball.dy = -ball.dy * velocity;
				} else {
					ball.dy += gravity;
				}

				ball.y += ball.dy;
				ball.draw();
			}
		}

		animate();

		function stop() {
			if (animationId) cancelAnimationFrame(animationId);
		}

		window.stop = stop;
	});
</script>

<canvas bind:this={canvas} />
