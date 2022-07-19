<script lang="ts">
  import { autorun } from 'mobx';
  import { navigate } from 'svelte-routing';
  import { _ } from 'svelte-i18n';

  import Sidebar from '../../components/Sidebar/Sidebar.svelte';
  import Card from '../../components/Card/Card.svelte';
  import ImageCard from '../../components/Card/ImageCard/ImageCard.svelte';
  import CardsGroup from '../../components/CardsGroup/CardsGroup.svelte';

  import type { Map } from '../../types/entities/Map';

  import { MapsApiClient } from '../../core/api-client/maps/MapsApiClient';
  import { mapsStore } from '../../core/mobx/entity-stores/MapsStore';

  let maps: Map[];
  let parsingError: Error;
  let finishedParsing: boolean;

  autorun(() => {
    maps = mapsStore.maps;
    parsingError = mapsStore.parsingError;
    finishedParsing = mapsStore.finishedParsing;
  });

  const handleMapClick = (id: number) => navigate(`mapmaker/${id}`);

  const handleCreateMapClick = () => navigate('/maps/create');

  const handleEditMapClick = (id: number) => navigate(`/maps/${id}`);

  const handleDeleteMapClick = async (id: number) => {
    try {
      await MapsApiClient.remove(id);
    } catch (error) {
      return alert(error.message);
    }

    mapsStore.parseMaps();
    alert($_('map.Deleted'));
  };
</script>

<svelte:head>
  <title>Карты</title>
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
        <ImageCard imageSrc="/plus.svg" on:click={handleCreateMapClick} />

        {#each maps as map}
          <Card
            imageSrc={`${MapsApiClient.SERVER_HOST}/maps/${map.id}/mapImage.png`}
            title={map.name}
            on:click={() => handleMapClick(map.id)}
            on:edit-click={() => handleEditMapClick(map.id)}
            on:delete-click={() => handleDeleteMapClick(map.id)}
          />
        {/each}
      {/if}
    </CardsGroup>
  </div>
</div>

<style lang="scss">
  @import '../weapons/PageLayout.scss';
</style>
