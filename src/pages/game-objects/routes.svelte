<script lang="ts">
  import { Route } from 'svelte-routing';
  import GameObjectsPage from './index.svelte';
  import EditGameObjectPage from './edit/index.svelte';
  import CreateGameObjectPage from './create/index.svelte';
</script>

<Route path="game-objects">
  <GameObjectsPage />
</Route>

<Route path="game-objects/create">
  <CreateGameObjectPage />
</Route>

<Route path="game-objects/:id" let:params>
  <EditGameObjectPage gameObjectId={parseInt(params.id, 10)} />
</Route>
