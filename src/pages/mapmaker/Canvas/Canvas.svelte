<script lang="ts">
  import { onDestroy, onMount } from 'svelte';
  import { gameObjectsStore } from '../../../core/mobx/mapmaker-stores/GameObjectsStore';

  import { initShortcuts } from './shortcuts';
  import { startRenderLoop } from './renderLoop';

  export let canvas: HTMLCanvasElement;

  let drawIntervalId: NodeJS.Timer;

  onMount(() => {
    const ctx = canvas.getContext('2d');

    canvas.addEventListener('mouseleave', () => {
      gameObjectsStore.setGameObjectState('id0', { isHovered: false });
    });

    initShortcuts();
    drawIntervalId = startRenderLoop(ctx);
  });

  onDestroy(() => clearInterval(drawIntervalId));
</script>

<canvas bind:this={canvas} />
