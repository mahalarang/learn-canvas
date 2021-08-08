import random from 'Utils/random.util';
import Circle from 'Utils/shapes/Circle.util';
import 'Assets/scss/main.scss';

const VW = window.innerWidth;
const VH = window.innerHeight;
const $canvas = document.getElementsByTagName('canvas')[0];
const ctx = $canvas.getContext('2d');

$canvas.width = VW;
$canvas.height = VH;

const radius = 16;
const maxRadius = 70;
const totalCircle = 600;
const radiusMouseGap = 40;
const mouse = {
	x: undefined,
	y: undefined
}

window.addEventListener('mousemove', function (e) {
	mouse.x = e.x;
	mouse.y = e.y;
});

window.addEventListener('mouseout', function (e) {
	mouse.x = undefined;
	mouse.y = undefined;
});

const circles = new Array(totalCircle).fill().map(() => {
	const x = random.int(radius, VW - radius);
	const dx = random.choose([0.5, 1, 1.5, 2,], random.tive);
	const y = random.int(radius, VH - radius);
	const dy = random.choose([0.5, 1, 1.5, 2], random.tive);
	const color = random.choose(['red', 'blue', 'green', 'black', 'orange', 'purple']);


	return new Circle(ctx, VW, VH, radius)
		.position(x, y)
		.setColor(color)
		.speed(dx, dy);
});

let animationId = null;

function animate() {
	animationId = requestAnimationFrame(animate);
	ctx.clearRect(0, 0, VW, VH);

	for (const circle of circles) {
		circle.draw().animate();

		if (
			mouse.x &&
			mouse.x - circle.x < circle.radius + radiusMouseGap &&
			circle.x - mouse.x < circle.radius + radiusMouseGap &&
			mouse.y &&
			mouse.y - circle.y < circle.radius + radiusMouseGap &&
			circle.y - mouse.y < circle.radius + radiusMouseGap
		) {
			if (circle.radius < maxRadius) {
				circle.radius++;
			}
		} else if (circle.radius > radius) {
			circle.radius -= 2;
		}
	}
}

function stop() {
	if (animationId) cancelAnimationFrame(animationId);
}

function start() {
	animate();
}

window.stopAnimation = stop;
window.startAnimation = start;

window.addEventListener("hashchange", function () {
	console.log("Fire!!!", location.hash);
});