<script lang="ts">
  import { onMount } from 'svelte';
  import { scene } from '../../core/mapmaker/scene/scene';
  import { shortcutsController } from '../../core/mapmaker/scene/ShortcutsController';

  import type { Map } from '../../types/entities/Map';
  import { GameObjectTransformer } from '../../core/mapmaker/transformers/GameObjectTransformer';
  import { SceneBuilder } from '../../core/mapmaker/game-objects/builders/SceneBuilder';
  import { GameObjectBuildDirector } from '../../core/mapmaker/game-objects/GameObjectBuildDirector';

  import { gameObjectsStore } from '../../core/mobx/mapmaker-stores/GameObjectsStore';
  import { versionsStore } from '../../core/mobx/mapmaker-stores/VersionsStore';

  import InstrumentsBar from './InstrumentsBar/InstrumentsBar.svelte';
  import Canvas from './Canvas/Canvas.svelte';
  import GameObjectsTree from './GameObjectsTree/GameObjectsTree.svelte';

  export let map: Map;

  let canvas: HTMLCanvasElement;

  onMount(() => {
    scene.init(canvas);
    shortcutsController.init();

    gameObjectsStore.setMapId(map.id);

    const rectangleBuilder = new SceneBuilder();
    const buildDirector = new GameObjectBuildDirector(rectangleBuilder);
    const sceneObject = buildDirector.construct('scene');
    sceneObject.id = 'id0';

    gameObjectsStore.addGameObjects([sceneObject], false);

    if (map?.gameObjects && map?.gameObjects.length !== 0) {
      const nodes = new GameObjectTransformer().toClass(map.gameObjects[0]);
      gameObjectsStore.setNodes(nodes);
    }

    gameObjectsStore.root.updateRenderData({
      w: map?.width,
      h: map?.height,
    });

    versionsStore.loadSavedState();
  });
</script>

<svelte:head>
  <title>Редактор карт</title>
</svelte:head>

<div class="container">
  {#if canvas}
    <InstrumentsBar {map} />
  {/if}

  <Canvas bind:canvas />

  <GameObjectsTree />
</div>

<style>
  .container {
    height: 100vh;
    display: flex;
    align-items: stretch;
  }
</style>
