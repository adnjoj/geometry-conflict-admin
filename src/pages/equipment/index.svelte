<script lang="ts">
  import { autorun } from 'mobx';
  import { navigate } from 'svelte-routing';
  import { _ } from 'svelte-i18n';

  import Sidebar from '../../components/Sidebar/Sidebar.svelte';
  import Card from '../../components/Card/Card.svelte';
  import ImageCard from '../../components/Card/ImageCard/ImageCard.svelte';
  import CardsGroup from '../../components/CardsGroup/CardsGroup.svelte';

  import type { Equipment } from '../../types/entities/Equipment';

  import { equipmentStore } from '../../core/mobx/entity-stores/EquipmentStore';

  let equipment: Equipment[];
  let parsingError: Error;
  let finishedParsing: boolean;

  autorun(() => {
    equipment = equipmentStore.equipment;
    parsingError = equipmentStore.parsingError;
    finishedParsing = equipmentStore.finishedParsing;
  });

  const handleCreateEquipmentClick = () => navigate('/equipment/create');

  const handleEditEquipmentClick = (id: number) => navigate(`/equipment/${id}`);

  const handleDeleteEquipmentClick = (id: number) => {
    console.log(id);
  };
</script>

<svelte:head>
  <title>Снаряжение</title>
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
        <ImageCard imageSrc="/plus.svg" on:click={handleCreateEquipmentClick} />

        {#each equipment as equipmentItem}
          <Card
            imageSrc="/equipment.png"
            title={equipmentItem.name}
            on:edit-click={() => handleEditEquipmentClick(equipmentItem.id)}
            on:delete-click={() => handleDeleteEquipmentClick(equipmentItem.id)}
          />
        {/each}
      {/if}
    </CardsGroup>
  </div>
</div>

<style lang="scss">
  @import '../weapons/PageLayout.scss';
</style>
