<script lang="ts">
  import { autorun } from 'mobx';
  import { _ } from 'svelte-i18n';

  import Sidebar from '../../../components/Sidebar/Sidebar.svelte';
  import MapForm from '../../../components/MapForm/MapForm.svelte';

  import type { Map } from '../../../types/entities/Map';

  import { mapsStore } from '../../../core/mobx/entity-stores/MapsStore';
  import { gamemodesStore } from '../../../core/mobx/entity-stores/GamemodesStore';

  import { initializeForm } from './form-config';

  export let mapId: number;

  let formProps = initializeForm(mapId);
  const initialValues: any = {};

  let map: Map;
  let parsingError: Error;
  let finishedParsing: boolean;

  autorun(() => {
    map = mapsStore.maps.find(({ id }) => id === mapId);
    parsingError = gamemodesStore.parsingError;
    finishedParsing = gamemodesStore.finishedParsing;

    Object.entries(map ?? {}).forEach(([name, value]) => {
      if (name === 'id') return;

      if (name === 'gamemode') {
        initialValues['gamemodeId'] = value.id.toString();
      } else {
        initialValues[name] = value.toString();
      }
    });

    formProps.initialValues = {
      ...formProps.initialValues,
      ...initialValues,
    };
  });
</script>

<svelte:head>
  <title>Редактирование карты</title>
</svelte:head>

<div class="page-layout">
  <div class="page-layout__sidebar">
    <Sidebar />
  </div>

  <div class="page-layout__main">
    {#if map === undefined}
      <h3 style="margin: 3rem;">{$_('map.DoesNotExist')}</h3>
    {:else if parsingError}
      <h3 style="margin: 3rem;">Error: {parsingError.message}</h3>
    {:else if !finishedParsing}
      <h3 style="margin: 3rem;">{$_('loading')}</h3>
    {:else}
      <MapForm {formProps} />
    {/if}
  </div>
</div>

<style lang="scss">
  @import '../../weapons/PageLayout.scss';
</style>
