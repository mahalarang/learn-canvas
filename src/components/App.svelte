<script>
	import { Router, Route, Link } from 'svelte-routing';

	const BubbleMove = () => import('./BubbleMove.svelte');
	const Gravity = () => import('./Gravity.svelte');
	const Fireworks = () => import('./Fireworks.svelte');

	let name = 'John Mahalarang';
</script>

<Router>
	<ul class="menu">
		<li class="menu-item">
			<Link to="/">Home</Link>
		</li>
		<li class="menu-item">
			<Link to="bubble-move">Buble Move</Link>
		</li>
		<li class="menu-item">
			<Link to="gravity">Gravity</Link>
		</li>
		<li class="menu-item">
			<Link to="fireworks">Fireworks</Link>
		</li>
	</ul>

	<main>
		<Route path="/">
			<h1>This is Home</h1>
		</Route>

		<Route path="bubble-move">
			{#await BubbleMove() then module}
				<svelte:component this={module.default} />
			{/await}
		</Route>

		<Route path="gravity">
			{#await Gravity() then module}
				<svelte:component this={module.default} />
			{/await}
		</Route>

		<Route path="fireworks">
			{#await Fireworks() then module}
				<svelte:component this={module.default} />
			{/await}
		</Route>

		<h3>&copy; {new Date().getFullYear()} By {name}</h3>
	</main>
</Router>

<style type="text/scss">
	$hover-bg: whitesmoke;

	.menu {
		position: fixed;
		z-index: 10;
		top: 50%;
		transform: translate(-90%, -50%);
		display: inline-block;
		list-style: none;
		padding: 20px;
		border-top-right-radius: 5px;
		border-bottom-right-radius: 5px;
		box-shadow: -1px 5px 9px -3px rgb(219, 219, 219);
		border: 1px solid #eee;
		transition: 0.3s;
		background-color: #fff;

		&::before {
			content: '';
			display: inline-block;
			width: 4px;
			height: 50px;
			background-color: #ccc;
			position: absolute;
			right: 5px;
			top: 50%;
			transform: translateY(-50%);
			border-radius: 5px;
		}

		&:hover {
			transform: translate(0%, -50%);

			&::before {
				visibility: hidden;
			}
		}

		.menu-item {
			&:not(:last-child) {
				margin-bottom: 5px;
			}

			:global(a) {
				display: flex;
				align-items: center;
				justify-content: center;
				color: #555;
				font-size: 1rem;
				font-weight: 700;
				text-decoration: none;
				padding: 10px 20px;
				border-radius: 40px;

				&:hover {
					background-color: $hover-bg;
					transition: 0.3s;
				}
			}

			:global(a[aria-current='page']) {
				background-color: darken($hover-bg, 3%);
			}
		}
	}
</style>
