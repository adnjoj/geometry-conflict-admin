<script lang="ts">
  import { autorun } from 'mobx';
  import { navigate } from 'svelte-routing';
  import { _ } from 'svelte-i18n';

  import Sidebar from '../../components/Sidebar/Sidebar.svelte';
  import Card from '../../components/Card/Card.svelte';
  import ImageCard from '../../components/Card/ImageCard/ImageCard.svelte';
  import CardsGroup from '../../components/CardsGroup/CardsGroup.svelte';

  import type { Skin } from '../../types/entities/Skin';

  import { SkinsApiClient } from '../../core/api-client/skins/SkinsApiClient';
  import { skinsStore } from '../../core/mobx/entity-stores/SkinsStore';

  let skins: Skin[];
  let parsingError: Error;
  let finishedParsing: boolean;

  autorun(() => {
    skins = skinsStore.skins;
    parsingError = skinsStore.parsingError;
    finishedParsing = skinsStore.finishedParsing;
  });

  const handleCreateSkinClick = () => navigate('/skins/create');

  const handleEditSkinClick = (id: number) => navigate(`/skins/${id}`);

  const handleDeleteSkinClick = async (id: number) => {
    try {
      await SkinsApiClient.remove(id);
    } catch (error) {
      return alert(error.message);
    }

    skinsStore.parseSkins();
    alert($_('skin.Deleted'));
  };
</script>

<svelte:head>
  <title>Скины</title>
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
        <ImageCard imageSrc="/plus.svg" on:click={handleCreateSkinClick} />

        {#each skins as skin}
          <Card
            imageSrc={`${SkinsApiClient.SERVER_HOST}/skins/${skin.id}/skinImage.png`}
            title={skin.name}
            on:edit-click={() => handleEditSkinClick(skin.id)}
            on:delete-click={() => handleDeleteSkinClick(skin.id)}
          />
        {/each}
      {/if}
    </CardsGroup>
  </div>
</div>

<style lang="scss">
  @import '../weapons/PageLayout.scss';
</style>
