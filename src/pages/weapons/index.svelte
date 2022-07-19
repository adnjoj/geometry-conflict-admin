<script lang="ts">
  import { autorun } from 'mobx';
  import { navigate } from 'svelte-routing';
  import { _ } from 'svelte-i18n';

  import Sidebar from '../../components/Sidebar/Sidebar.svelte';
  import Card from '../../components/Card/Card.svelte';
  import ImageCard from '../../components/Card/ImageCard/ImageCard.svelte';
  import CardsGroup from '../../components/CardsGroup/CardsGroup.svelte';

  import type { Weapon } from '../../types/entities/Weapon';

  import { WeaponsApiClient } from '../../core/api-client/weapons/WeaponsApiClient';
  import { weaponsStore } from '../../core/mobx/entity-stores/WeaponsStore';

  let weapons: Weapon[];
  let parsingError: Error;
  let finishedParsing: boolean;

  autorun(() => {
    weapons = weaponsStore.weapons;
    parsingError = weaponsStore.parsingError;
    finishedParsing = weaponsStore.finishedParsing;
  });

  const handleCreateWeaponClick = () => navigate('/weapons/create');

  const handleEditWeaponClick = (id: number) => navigate(`/weapons/${id}`);

  const handleDeleteWeaponClick = async (id: number) => {
    try {
      await WeaponsApiClient.remove(id);
    } catch (error) {
      return alert(error.message);
    }

    weaponsStore.parseWeapons();
    alert($_('weapon.Deleted'));
  };
</script>

<svelte:head>
  <title>Оружие</title>
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
        <ImageCard imageSrc="/plus.svg" on:click={handleCreateWeaponClick} />

        {#each weapons as weapon}
          <Card
            imageSrc={`${WeaponsApiClient.SERVER_HOST}/weapons/${weapon.id}/weaponImage.png`}
            title={weapon.name}
            on:edit-click={() => handleEditWeaponClick(weapon.id)}
            on:delete-click={() => handleDeleteWeaponClick(weapon.id)}
          />
        {/each}
      {/if}
    </CardsGroup>
  </div>
</div>

<style lang="scss">
  @import './PageLayout.scss';
</style>
