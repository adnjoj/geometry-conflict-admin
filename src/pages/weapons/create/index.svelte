<script lang="ts">
  import { autorun } from 'mobx';
  import { _ } from 'svelte-i18n';

  import Sidebar from '../../../components/Sidebar/Sidebar.svelte';
  import WeaponForm from '../../../components/WeaponForm/WeaponForm.svelte';

  import { initializeForm } from './form-config';
  import { clipsStore } from '../../../core/mobx/entity-stores/ClipsStore';
  import { weaponTypesStore } from '../../../core/mobx/entity-stores/WeaponTypesStore';
  import { specialitiesStore } from '../../../core/mobx/entity-stores/SpecialitiesStore';

  const formProps = initializeForm();

  let parsingError: Error;
  let finishedParsing: boolean;

  autorun(() => {
    parsingError = null;
    parsingError ||= clipsStore.parsingError;
    parsingError ||= weaponTypesStore.parsingError;
    parsingError ||= specialitiesStore.parsingError;

    finishedParsing = true;
    finishedParsing &&= clipsStore.finishedParsing;
    finishedParsing &&= weaponTypesStore.finishedParsing;
    finishedParsing &&= specialitiesStore.finishedParsing;
  });
</script>

<svelte:head>
  <title>Создание оружия</title>
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
      <WeaponForm {formProps} />
    {/if}
  </div>
</div>

<style lang="scss">
  @import '../PageLayout.scss';
</style>
