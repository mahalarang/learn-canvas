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

		const particles = [];

		window.addEventListener('click', function ({ x, y }) {
			const radius = () => random.choose([2, 3, 4]);
			const totalParticle = random.choose([200, 300, 400]);
			const angle = (Math.PI * 2) / totalParticle;
			const gravity = 0.02;
			const friction = 0.99;
			const power = random.choose([5, 10, 20, 30]);

			for (let i = 0; i < totalParticle; i++) {
				const color = `hsl(${random.int(0, 360)}, 70%, 50%)`;
				const particle = new Circle(ctx, VW, VH, radius())
					.setColor(color)
					.position(x, y)
					.setVelocity(
						Math.cos(angle * i) * random.int() * power,
						Math.sin(angle * i) * random.int() * power
					);

				particle.animate = function () {
					this.velocity.x *= friction;
					this.velocity.y *= friction;
					this.velocity.y += gravity;

					this.x += this.velocity.x;
					this.y += this.velocity.y;
					this.alpha -= 0.004;
				};

				particles.push(particle);
			}
		});

		let animationId;
		function animate() {
			animationId = requestAnimationFrame(animate);
			ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
			ctx.fillRect(0, 0, VW, VH);

			for (const [i, particle] of particles.entries()) {
				if (particle.alpha > 0) {
					// Agar frame statis (dengan opacity yang sama)
					// maka decrement alpha tidak boleh di save()
					// it's mean decrement alpha harus berada di antara save() dan restore
					particle.ctx.save();
					particle.draw();
					particle.ctx.restore();
					particle.animate();
				} else {
					particles.splice(i, 1);
				}
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
