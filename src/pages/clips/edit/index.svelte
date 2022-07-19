<script lang="ts">
  import { autorun } from 'mobx';
  import { _ } from 'svelte-i18n';

  import Sidebar from '../../../components/Sidebar/Sidebar.svelte';
  import ClipForm from '../../../components/ClipForm/ClipForm.svelte';

  import type { Clip } from '../../../types/entities/Clip';

  import { clipsStore } from '../../../core/mobx/entity-stores/ClipsStore';
  import { specialitiesStore } from '../../../core/mobx/entity-stores/SpecialitiesStore';

  import { initializeForm } from './form-config';

  export let clipId: number;

  const formProps = initializeForm(clipId);
  const initialValues: any = {};

  let clip: Clip;
  let parsingError: Error;
  let finishedParsing: boolean;

  autorun(() => {
    clip = clipsStore.clips.find(({ id }) => id === clipId);
    parsingError = specialitiesStore.parsingError;
    finishedParsing = specialitiesStore.finishedParsing;

    Object.entries(clip ?? {}).forEach(([name, value]) => {
      if (name === 'id') return;

      if (name === 'availableSpecialities') {
        value.forEach(({ id }) => {
          initialValues[`availableForSpeciality${id}`] = true;
        });
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
  <title>Редактирование обоймы</title>
</svelte:head>

<div class="page-layout">
  <div class="page-layout__sidebar">
    <Sidebar />
  </div>

  <div class="page-layout__main">
    {#if clip === undefined}
      <h3 style="margin: 3rem;">{$_('clip.DoesNotExist')}</h3>
    {:else if parsingError}
      <h3 style="margin: 3rem;">Error: {parsingError.message}</h3>
    {:else if !finishedParsing}
      <h3 style="margin: 3rem;">{$_('loading')}</h3>
    {:else}
      <ClipForm {formProps} />
    {/if}
  </div>
</div>

<style lang="scss">
  @import '../../weapons/PageLayout.scss';
</style>
