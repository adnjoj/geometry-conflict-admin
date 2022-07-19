<script lang="ts">
  import { autorun } from 'mobx';
  import { _ } from 'svelte-i18n';

  import Sidebar from '../../../components/Sidebar/Sidebar.svelte';
  import SkinForm from '../../../components/SkinForm/SkinForm.svelte';

  import type { Skin } from '../../../types/entities/Skin';

  import { skinsStore } from '../../../core/mobx/entity-stores/SkinsStore';
  import { skinTypesStore } from '../../../core/mobx/entity-stores/SkinTypesStore';
  import { fractionsStore } from '../../../core/mobx/entity-stores/FractionsStore';

  import { initializeForm } from './form-config';

  export let skinId: number;

  let formProps = initializeForm(skinId);
  const initialValues: any = {};

  let skin: Skin;
  let parsingError: Error;
  let finishedParsing: boolean;

  autorun(() => {
    skin = skinsStore.skins.find(({ id }) => id === skinId);

    parsingError = null;
    parsingError ||= skinTypesStore.parsingError;
    parsingError ||= fractionsStore.parsingError;

    finishedParsing = true;
    finishedParsing &&= skinTypesStore.finishedParsing;
    finishedParsing &&= fractionsStore.finishedParsing;

    Object.entries(skin ?? {}).forEach(([name, value]) => {
      if (name === 'id') return;

      if (name === 'availableFractions') {
        value.forEach(({ id }) => {
          initialValues[`availableForFraction${id}`] = true;
        });
      } else if (name === 'type') {
        initialValues['typeId'] = value.id.toString();
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
  <title>Редактирование скина</title>
</svelte:head>

<div class="page-layout">
  <div class="page-layout__sidebar">
    <Sidebar />
  </div>

  <div class="page-layout__main">
    {#if skin === undefined}
      <h3 style="margin: 3rem;">{$_('skin.DoesNotExist')}</h3>
    {:else if parsingError}
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
