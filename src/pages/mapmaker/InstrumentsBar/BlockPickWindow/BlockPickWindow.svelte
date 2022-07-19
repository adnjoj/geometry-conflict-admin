<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { autorun } from 'mobx';
  import { _ } from 'svelte-i18n';

  import type { GameObject } from '../../../../types/entities/GameObject';
  import type { GameObjectType } from '../../../../types/entities/GameObjectType';
  import type { Instrument } from '../../../../core/mapmaker/instruments/Instrument';
  import { BlockPlacer } from '../../../../core/mapmaker/instruments/BlockPlacer';

  import { ApiClient } from '../../../../core/api-client/ApiClient';
  import { gameObjectsStore } from '../../../../core/mobx/entity-stores/GameObjectsStore';
  import { gameObjectTypesStore } from '../../../../core/mobx/entity-stores/GameObjectTypesStore';

  import { scene } from '../../../../core/mapmaker/scene/scene';

  const dispatch = createEventDispatcher();

  const close = () => dispatch('close');

  let selectedBlockType = gameObjectTypesStore.elementsEnum.Solid;
  let gameObjects: GameObject[] = [];
  let gameObjectTypes: GameObjectType[] = [];
  let instrument: Instrument = scene.instrument.instrument;

  scene.instrument.addChangeListener((newInstrument) => {
    instrument = newInstrument;
  });

  autorun(() => {
    gameObjects = gameObjectsStore.gameObjects;
    gameObjectTypes = gameObjectTypesStore.gameObjectTypes;
  });

  const getGameObjectUrl = (id: number) => {
    return `${ApiClient.SERVER_HOST}/game-objects/${id}/gameObjectImage.png`;
  };

  const selectBlock = (blockId: number) => {
    const block = gameObjects.find(({ id }) => id === blockId);
    scene.instrument.setInstrument(BlockPlacer, {
      ...block,
      url: getGameObjectUrl(blockId),
    });

    close();
  };

  $: filteredGameObjects = gameObjects.filter(
    ({ type: { id } }) => id === selectedBlockType,
  );

  const hiddenTypes = [
    gameObjectTypesStore.elementsEnum.Scene,
    gameObjectTypesStore.elementsEnum.Group,
    gameObjectTypesStore.elementsEnum.Point,
    gameObjectTypesStore.elementsEnum.Path,
    gameObjectTypesStore.elementsEnum.PlayerCollider,
    gameObjectTypesStore.elementsEnum.UnshootableBulletCollider,
    gameObjectTypesStore.elementsEnum.ShootableBulletCollider,
  ];
</script>

<div class="block-pick-window">
  <div class="block-pick-window__tab-list">
    <div class="block-pick-window__empty-tab" />

    {#each gameObjectTypes as { id, name }}
      {#if !hiddenTypes.includes(id)}
        <div
          class={`block-pick-window__tab ${
            selectedBlockType === id ? 'block-pick-window__tab__active' : ''
          }`}
          on:click={() => (selectedBlockType = id)}
        >
          {$_(`gameObjectTypes.${name}`)}
        </div>
      {/if}
    {/each}

    <div class="block-pick-window__filler-tab">
      <div on:click={close}>
        <img width="17pt" height="17pt" src="/close.svg" alt="close" />
      </div>
    </div>
  </div>

  <div class="block-pick-window__blocks-list">
    {#each filteredGameObjects as { id, name }}
      <div
        class={`block-pick-window__block ${
          instrument instanceof BlockPlacer && instrument?.block?.id === id
            ? 'block-pick-window__block__active'
            : ''
        }`}
        on:click={() => selectBlock(id)}
      >
        <img src={getGameObjectUrl(id)} alt="game object" />
      </div>
    {/each}
  </div>
</div>

<style lang="scss">
  @import 'BlockPickWindow';
</style>
