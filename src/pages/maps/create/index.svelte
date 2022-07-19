<script lang="ts">
  import { autorun } from 'mobx';
  import { _ } from 'svelte-i18n';

  import Sidebar from '../../../components/Sidebar/Sidebar.svelte';
  import MapForm from '../../../components/MapForm/MapForm.svelte';

  import { initializeForm } from './form-config';
  import { gamemodesStore } from '../../../core/mobx/entity-stores/GamemodesStore';

  const formProps = initializeForm();

  let parsingError: Error;
  let finishedParsing: boolean;

  autorun(() => {
    parsingError = gamemodesStore.parsingError;
    finishedParsing = gamemodesStore.finishedParsing;
  });
</script>

<svelte:head>
  <title>Создание карты</title>
</svelte:head>

<div class="page-layout">
  <div class="page-layout__sidebar">
    <Sidebar />
  </div>

  <div class="page-layout__main">
    {#if parsingError}
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
