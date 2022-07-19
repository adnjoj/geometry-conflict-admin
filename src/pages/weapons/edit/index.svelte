<script lang="ts">
  import { autorun } from 'mobx';
  import { _ } from 'svelte-i18n';

  import Sidebar from '../../../components/Sidebar/Sidebar.svelte';
  import WeaponForm from '../../../components/WeaponForm/WeaponForm.svelte';

  import type { Weapon } from '../../../types/entities/Weapon';

  import { weaponsStore } from '../../../core/mobx/entity-stores/WeaponsStore';
  import { weaponTypesStore } from '../../../core/mobx/entity-stores/WeaponTypesStore';
  import { clipsStore } from '../../../core/mobx/entity-stores/ClipsStore';
  import { specialitiesStore } from '../../../core/mobx/entity-stores/SpecialitiesStore';

  import { initializeForm } from './form-config';

  export let weaponId: number;

  const formProps = initializeForm(weaponId);
  const initialValues: any = {};

  let weapon: Weapon;
  let parsingError: Error;
  let finishedParsing: boolean;

  autorun(() => {
    weapon = weaponsStore.weapons.find(({ id }) => id === weaponId);

    parsingError = null;
    parsingError ||= clipsStore.parsingError;
    parsingError ||= weaponTypesStore.parsingError;
    parsingError ||= specialitiesStore.parsingError;

    finishedParsing = true;
    finishedParsing &&= clipsStore.finishedParsing;
    finishedParsing &&= weaponTypesStore.finishedParsing;
    finishedParsing &&= specialitiesStore.finishedParsing;

    Object.entries(weapon ?? {}).forEach(([name, value]) => {
      if (name === 'id') return;

      if (name === 'availableSpecialities') {
        value.forEach(({ id }) => {
          initialValues[`availableForSpeciality${id}`] = true;
        });
      } else if (name === 'clip') {
        initialValues['clipId'] = value.id.toString();
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
  <title>Редактирование оружия</title>
</svelte:head>

<div class="page-layout">
  <div class="page-layout__sidebar">
    <Sidebar />
  </div>

  <div class="page-layout__main">
    {#if weapon === undefined}
      <h3 style="margin: 3rem;">{$_('weapon.DoesNotExist')}</h3>
    {:else if parsingError}
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
