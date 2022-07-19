<script lang="ts">
  import { Route } from 'svelte-routing';
  import WeaponsPage from './index.svelte';
  import EditWeaponPage from './edit/index.svelte';
  import CreateWeaponPage from './create/index.svelte';
</script>

<Route path="weapons">
  <WeaponsPage />
</Route>

<Route path="weapons/create">
  <CreateWeaponPage />
</Route>

<Route path="weapons/:id" let:params>
  <EditWeaponPage weaponId={parseInt(params.id, 10)} />
</Route>
