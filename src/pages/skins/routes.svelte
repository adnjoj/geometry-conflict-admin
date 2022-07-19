<script lang="ts">
  import { Route } from 'svelte-routing';
  import SkinsPage from './index.svelte';
  import EditSkinPage from './edit/index.svelte';
  import CreateSkinPage from './create/index.svelte';
</script>

<Route path="skins">
  <SkinsPage />
</Route>

<Route path="skins/create">
  <CreateSkinPage />
</Route>

<Route path="skins/:id" let:params>
  <EditSkinPage skinId={parseInt(params.id, 10)} />
</Route>
