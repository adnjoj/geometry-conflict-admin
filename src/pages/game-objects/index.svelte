<script lang="ts">
  import { autorun } from 'mobx';
  import { navigate } from 'svelte-routing';
  import { _ } from 'svelte-i18n';

  import Sidebar from '../../components/Sidebar/Sidebar.svelte';
  import Card from '../../components/Card/Card.svelte';
  import ImageCard from '../../components/Card/ImageCard/ImageCard.svelte';
  import CardsGroup from '../../components/CardsGroup/CardsGroup.svelte';

  import type { GameObject } from '../../types/entities/GameObject';

  import { GameObjectsApiClient } from '../../core/api-client/game-objects/GameObjectsApiClient';
  import { gameObjectsStore } from '../../core/mobx/entity-stores/GameObjectsStore';

  let gameObjects: GameObject[];
  let parsingError: Error;
  let finishedParsing: boolean;

  autorun(() => {
    gameObjects = gameObjectsStore.gameObjects;
    parsingError = gameObjectsStore.parsingError;
    finishedParsing = gameObjectsStore.finishedParsing;
  });

  const handleCreateGameObjectClick = () => navigate('/game-objects/create');

  const handleEditGameObjectClick = (id: number) => {
    navigate(`/game-objects/${id}`);
  };

  const handleDeleteGameObjectClick = async (id: number) => {
    try {
      await GameObjectsApiClient.remove(id);
    } catch (error) {
      return alert(error.message);
    }

    gameObjectsStore.parseGameObjects();
    alert($_('gameObject.Deleted'));
  };
</script>

<svelte:head>
  <title>Игровые объекты</title>
</svelte:head>

<div class="page-layout">
  <div class="page-layout__sidebar">
    <Sidebar />
  </div>

  <div class="page-layout__main">
    <CardsGroup>
      {#if parsingError}
        Error: {parsingError.message}
      {:else if !finishedParsing}
        {$_('loading')}
      {:else}
        <ImageCard
          imageSrc="/plus.svg"
          on:click={handleCreateGameObjectClick}
        />

        {#each gameObjects as gameObject}
          <Card
            imageSrc={`${GameObjectsApiClient.SERVER_HOST}/game-objects/${gameObject.id}/gameObjectImage.png`}
            title={gameObject.name}
            on:edit-click={() => handleEditGameObjectClick(gameObject.id)}
            on:delete-click={() => handleDeleteGameObjectClick(gameObject.id)}
          />
        {/each}
      {/if}
    </CardsGroup>
  </div>
</div>

<style lang="scss">
  @import '../weapons/PageLayout.scss';
</style>
