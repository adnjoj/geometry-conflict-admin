<script lang="ts">
  import { evaluate } from 'mathjs';
  import { _ } from 'svelte-i18n';

  import type { Map } from '../../../../types/entities/Map';
  import type { RectangleRenderData } from '../../../../types/mapmaker/RectangleRenderData';

  import { MapsApiClient } from '../../../../core/api-client/maps/MapsApiClient';
  import { GameObjectTransformer } from '../../../../core/mapmaker/transformers/GameObjectTransformer';
  import { PathPlacer } from '../../../../core/mapmaker/instruments/PathPlacer';

  import { scene } from '../../../../core/mapmaker/scene/scene';
  import { gamemodesStore } from '../../../../core/mobx/entity-stores/GamemodesStore';
  import { gameObjectsStore } from '../../../../core/mobx/mapmaker-stores/GameObjectsStore';

  export let map: Map;

  const sceneNode = gameObjectsStore.tree.nodes['id0'];

  let width = (sceneNode.renderData as RectangleRenderData).w;
  let height = (sceneNode.renderData as RectangleRenderData).h;

  const selectPathPlacer = () => {
    scene.instrument.setInstrument(PathPlacer);
  };

  const calculateStringExpression = (expression: string) => {
    try {
      return evaluate(expression);
    } catch (e) {
      return 0;
    }
  };

  const setWidth = (newWidth: string) =>
    (width = calculateStringExpression(newWidth));
  const setHeight = (newHeight: string) =>
    (height = calculateStringExpression(newHeight));

  const saveMap = async () => {
    const mapData = {
      width,
      height,
      gameObjects: [new GameObjectTransformer().toPlain(gameObjectsStore.root)],
    };

    console.log(mapData);

    try {
      await MapsApiClient.update(map.id, mapData);
      delete localStorage[`map${map.id}`];
    } catch (e) {
      return alert(e.message);
    }

    alert($_('map.Updated'));
  };

  $: showPathButton =
    gamemodesStore?.gamemodes.find(({ id }) => id === map.gamemode.id)?.name ===
    'Path';

  $: sceneNode.updateRenderData({ w: width, h: height });
</script>

<div class="scene-settings-window">
  <div class="scene-settings-window__row">
    <label for="width-input">W:</label>
    <input
      id="width-input"
      value={width}
      on:blur={(event) => setWidth(event.target.value)}
      on:keydown={(event) => {
        if (event.code === 'Enter') setWidth(event.target.value);
      }}
    />
  </div>

  <div class="scene-settings-window__row">
    <label for="height-input">H:</label>
    <input
      id="height-input"
      value={height}
      on:blur={(event) => setHeight(event.target.value)}
      on:keydown={(event) => {
        if (event.code === 'Enter') setHeight(event.target.value);
      }}
    />
  </div>

  <div
    class="scene-settings-window__row"
    style="margin-top: 10px; margin-bottom: 5px;"
  >
    <button
      class="scene-settings-window__button"
      style={`visibility: ${showPathButton ? 'visible' : 'hidden'};`}
      on:click={selectPathPlacer}
    >
      Тропа
    </button>

    <button class="scene-settings-window__button" on:click={saveMap}>
      Сохранить
    </button>
  </div>
</div>

<style lang="scss">
  @import 'SceneSettingsWindow';
</style>
