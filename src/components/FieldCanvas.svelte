<script>
	import { onMount } from 'svelte';

	export let width = 600;
	export let height = 300;
	export let color = '#ff0000';
	export let background = '#fff';
	export let points = [];

	let canvas;
	let context;
	let img;
	let t, l;

	onMount(() => {
		context = canvas.getContext('2d');
		context.lineWidth = 3;

		handleSize();
		// fill background with image
		img = new Image();
		img.src = '/field.png';
		img.onload = () => {
			context.drawImage(img, 0, 0, width, height);
		};

		// draw points
		requestAnimationFrame(render);
	});
	const render = () => {
		context.drawImage(img, 0, 0, width, height);

		points.forEach(({ x, y }) => {
			//console.log('drawing point');
			context.beginPath();
			context.arc(x, y, 8, 0, 2 * Math.PI);
			context.fill();
			context.closePath();
		});
		requestAnimationFrame(render);
	};
	$: if (context) {
		context.strokeStyle = color;
		context.fillStyle = color;
	}

	const handleStart = ({ offsetX: x, offsetY: y }) => {
		console.log(points);

		points = [...points, { x, y }];
		context.beginPath();
		context.arc(x, y, 8, 0, 2 * Math.PI);
		context.fill();

		context.closePath();
	};

	const handleSize = () => {
		const { top, left } = canvas.getBoundingClientRect();
		t = top;
		l = left;
	};
    const clear = () => 
    {
        console.log('clear?')
        points = [];
    }
</script>

<svelte:window on:resize={handleSize} />
<div>
	<canvas
		{width}
		{height}
		style:background
		bind:this={canvas}
		on:mousedown={handleStart}
		on:touchstart={(e) => {
			const { clientX, clientY } = e.touches[0];
			handleStart({
				offsetX: clientX - l,
				offsetY: clientY - t
			});
		}}
	/>
	<!----><button
		class="btn btn-primary rounded-t-none"
		on:click={clear}
        
		><svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			stroke-width="1.5"
			stroke="currentColor"
			class="h-6 w-6"
		>
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
			/>
		</svg>
	</button>
</div>
