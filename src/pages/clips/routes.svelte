<script lang="ts">
  import { Route } from 'svelte-routing';
  import ClipsPage from './index.svelte';
  import EditClipPage from './edit/index.svelte';
  import CreateClipPage from './create/index.svelte';
</script>

<Route path="clips/">
  <ClipsPage />
</Route>

<Route path="clips/create">
  <CreateClipPage />
</Route>

<Route path="clips/:id" let:params>
  <EditClipPage clipId={parseInt(params.id, 10)} />
</Route>
