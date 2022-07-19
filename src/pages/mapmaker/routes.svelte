<script lang="ts">
  import { Route } from 'svelte-routing';
  import MapmakerPageValidator from './validator.svelte';
</script>

<Route path="mapmaker/:id" let:params>
  <MapmakerPageValidator mapId={parseInt(params.id, 10)} />
</Route>
