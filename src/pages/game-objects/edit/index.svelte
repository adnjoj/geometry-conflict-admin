<script lang="ts">
  import { autorun } from 'mobx';
  import { _ } from 'svelte-i18n';

  import Sidebar from '../../../components/Sidebar/Sidebar.svelte';
  import GameObjectForm from '../../../components/GameObjectForm/GameObjectForm.svelte';

  import type { GameObject } from '../../../types/entities/GameObject';

  import { gameObjectsStore } from '../../../core/mobx/entity-stores/GameObjectsStore';
  import { gameObjectTypesStore } from '../../../core/mobx/entity-stores/GameObjectTypesStore';

  import { initializeForm } from './form-config';

  export let gameObjectId: number;

  const formProps = initializeForm(gameObjectId);
  const initialValues: any = {};

  let gameObject: GameObject;
  let parsingError: Error;
  let finishedParsing: boolean;

  autorun(() => {
    gameObject = gameObjectsStore.gameObjects.find(
      ({ id }) => id === gameObjectId,
    );
    parsingError = gameObjectTypesStore.parsingError;
    finishedParsing = gameObjectTypesStore.finishedParsing;

    Object.entries(gameObject ?? {}).forEach(([name, value]) => {
      if (name === 'id') return;

      if (name === 'type') {
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
  <title>Редактирование игрового объекта</title>
</svelte:head>

<div class="page-layout">
  <div class="page-layout__sidebar">
    <Sidebar />
  </div>

  <div class="page-layout__main">
    {#if gameObject === undefined}
      <h3 style="margin: 3rem;">{$_('gameObject.DoesNotExist')}</h3>
    {:else if parsingError}
      <h3 style="margin: 3rem;">Error: {parsingError.message}</h3>
    {:else if !finishedParsing}
      <h3 style="margin: 3rem;">{$_('loading')}</h3>
    {:else}
      <GameObjectForm {formProps} />
    {/if}
  </div>
</div>

<style lang="scss">
  @import '../../weapons/PageLayout.scss';
</style>
