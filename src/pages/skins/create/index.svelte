<script lang="ts">
  import { autorun } from 'mobx';
  import { _ } from 'svelte-i18n';

  import Sidebar from '../../../components/Sidebar/Sidebar.svelte';
  import SkinForm from '../../../components/SkinForm/SkinForm.svelte';

  import { initializeForm } from './form-config';
  import { skinTypesStore } from '../../../core/mobx/entity-stores/SkinTypesStore';
  import { fractionsStore } from '../../../core/mobx/entity-stores/FractionsStore';

  const formProps = initializeForm();

  let parsingError: Error;
  let finishedParsing: boolean;

  autorun(() => {
    parsingError = null;
    parsingError ||= skinTypesStore.parsingError;
    parsingError ||= fractionsStore.parsingError;

    finishedParsing = true;
    finishedParsing &&= skinTypesStore.finishedParsing;
    finishedParsing &&= fractionsStore.finishedParsing;
  });
</script>

<svelte:head>
  <title>Создание скина</title>
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
      <SkinForm {formProps} />
    {/if}
  </div>
</div>

<style lang="scss">
  @import '../../weapons/PageLayout.scss';
</style>
