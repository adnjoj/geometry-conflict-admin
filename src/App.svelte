<script lang="ts">
  import { navigate, Router } from 'svelte-routing';
  import { isLoading } from 'svelte-i18n';

  import { ApiClient } from './core/api-client/ApiClient';

  import { weaponsStore } from './core/mobx/entity-stores/WeaponsStore';
  import { weaponTypesStore } from './core/mobx/entity-stores/WeaponTypesStore';
  import { equipmentStore } from './core/mobx/entity-stores/EquipmentStore';
  import { equipmentTypesStore } from './core/mobx/entity-stores/EquipmentTypesStore';
  import { clipsStore } from './core/mobx/entity-stores/ClipsStore';
  import { fractionsStore } from './core/mobx/entity-stores/FractionsStore';
  import { specialitiesStore } from './core/mobx/entity-stores/SpecialitiesStore';
  import { skinTypesStore } from './core/mobx/entity-stores/SkinTypesStore';
  import { skinsStore } from './core/mobx/entity-stores/SkinsStore';
  import { gameObjectTypesStore } from './core/mobx/entity-stores/GameObjectTypesStore';
  import { gameObjectsStore } from './core/mobx/entity-stores/GameObjectsStore';
  import { gamemodesStore } from './core/mobx/entity-stores/GamemodesStore';
  import { mapsStore } from './core/mobx/entity-stores/MapsStore';

  import MapmakerRoutes from './pages/mapmaker/routes.svelte';
  import MapsRoutes from './pages/maps/routes.svelte';
  import SkinsRoutes from './pages/skins/routes.svelte';
  import GameObjectsRoutes from './pages/game-objects/routes.svelte';
  import EquipmentRoutes from './pages/equipment/routes.svelte';
  import WeaponsRoutes from './pages/weapons/routes.svelte';
  import ClipsRoutes from './pages/clips/routes.svelte';

  import LoginForm from './components/LoginForm/LoginForm.svelte';

  const parseData = () => {
    weaponsStore.parseWeapons();
    weaponTypesStore.parseWeaponTypes();
    equipmentStore.parseEquipment();
    equipmentTypesStore.parseEquipmentTypes();
    clipsStore.parseClips();
    fractionsStore.parseFractions();
    specialitiesStore.parseSpecialities();
    skinTypesStore.parseSkinTypes();
    skinsStore.parseSkins();
    gameObjectTypesStore.parseGameObjectTypes();
    gameObjectsStore.parseGameObjects();
    gamemodesStore.parseGamemodes();
    mapsStore.parseMaps();
  };
  parseData();

  let showLoginForm = false;

  if (location.pathname === '/') navigate('/weapons');

  ApiClient.unauthorizedListener = () => {
    showLoginForm = true;
  };
</script>

{#if $isLoading}
  Please wait...
{:else}
  {#if showLoginForm}
    <LoginForm
      on:login={() => {
        showLoginForm = false;
        parseData();
      }}
    />
  {/if}

  <Router url="">
    <MapmakerRoutes />
    <SkinsRoutes />
    <MapsRoutes />
    <GameObjectsRoutes />
    <EquipmentRoutes />
    <WeaponsRoutes />
    <ClipsRoutes />
  </Router>
{/if}
