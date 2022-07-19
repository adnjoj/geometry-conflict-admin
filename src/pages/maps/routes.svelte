<script lang="ts">
  import { Route } from 'svelte-routing';
  import MapsPage from './index.svelte';
  import EditMapPage from './edit/index.svelte';
  import CreateMapPage from './create/index.svelte';
</script>

<Route path="maps">
  <MapsPage />
</Route>

<Route path="maps/create">
  <CreateMapPage />
</Route>

<Route path="maps/:id" let:params>
  <EditMapPage mapId={parseInt(params.id, 10)} />
</Route>
