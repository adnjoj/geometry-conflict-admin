<script lang="ts">
  import { autorun } from 'mobx';
  import { _ } from 'svelte-i18n';

  import { Map } from '../../types/entities/Map';
  import { mapsStore } from '../../core/mobx/entity-stores/MapsStore';
  import { gameObjectTypesStore } from '../../core/mobx/entity-stores/GameObjectTypesStore';

  import MapmakerPage from './index.svelte';

  export let mapId: number;

  let map: Map;
  let maps: Map[];
  let parsingError: Error;
  let finishedParsing: boolean;

  autorun(() => {
    maps = mapsStore.maps;
    map = maps?.find(({ id }) => id === mapId);

    parsingError = null;
    parsingError ||= mapsStore.parsingError;
    parsingError ||= gameObjectTypesStore.parsingError;

    finishedParsing = true;
    finishedParsing &&= mapsStore.finishedParsing;
    finishedParsing &&= gameObjectTypesStore.finishedParsing;
  });

  $: if (mapId) mapsStore.parseMap(mapId);
</script>

{#if !finishedParsing}
  {$_('loading')}
{:else if parsingError}
  Error: {parsingError.message}
{:else if !map}
  {$_('map.DoesNotExist')}
{:else if !map.gameObjects}
  {$_('loading')}
{:else}
  <MapmakerPage {map} />
{/if}
