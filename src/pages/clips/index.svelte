<script lang="ts">
  import { autorun } from 'mobx';
  import { navigate } from 'svelte-routing';
  import { _ } from 'svelte-i18n';

  import Sidebar from '../../components/Sidebar/Sidebar.svelte';
  import Card from '../../components/Card/Card.svelte';
  import ImageCard from '../../components/Card/ImageCard/ImageCard.svelte';
  import CardsGroup from '../../components/CardsGroup/CardsGroup.svelte';

  import type { Clip } from '../../types/entities/Clip';

  import { ClipsApiClient } from '../../core/api-client/clips/ClipsApiClient';
  import { clipsStore } from '../../core/mobx/entity-stores/ClipsStore';

  let clips: Clip[];
  let parsingError: Error;
  let finishedParsing: boolean;

  autorun(() => {
    clips = clipsStore.clips;
    parsingError = clipsStore.parsingError;
    finishedParsing = clipsStore.finishedParsing;
  });

  const handleCreateClipClick = () => navigate('/clips/create');

  const handleEditClipClick = (id: number) => navigate(`/clips/${id}`);

  const handleDeleteClipClick = async (id: number) => {
    try {
      await ClipsApiClient.remove(id);
    } catch (error) {
      return alert(error.message);
    }

    clipsStore.parseClips();
    alert($_('clip.Deleted'));
  };
</script>

<svelte:head>
  <title>Обоймы</title>
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
        <ImageCard imageSrc="/plus.svg" on:click={handleCreateClipClick} />

        {#each clips as clip}
          <Card
            title={clip.name}
            imageSrc={`${ClipsApiClient.SERVER_HOST}/clips/${clip.id}/clipImage.png`}
            on:edit-click={() => handleEditClipClick(clip.id)}
            on:delete-click={() => handleDeleteClipClick(clip.id)}
          />
        {/each}
      {/if}
    </CardsGroup>
  </div>
</div>

<style lang="scss">
  @import '../weapons/PageLayout.scss';
</style>
