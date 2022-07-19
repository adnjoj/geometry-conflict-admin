<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  import { scene } from '../../../../core/mapmaker/scene/scene';
  import { PlayerColliderPlacer } from '../../../../core/mapmaker/instruments/PlayerColliderPlacer';
  import { ShootableBulletColliderPlacer } from '../../../../core/mapmaker/instruments/ShootableBulletColliderPlacer';
  import { UnshootableBulletColliderPlacer } from '../../../../core/mapmaker/instruments/UnshootableBulletColliderPlacer';

  const dispatch = createEventDispatcher();

  const close = () => dispatch('close');

  const selectPlayerCollisions = () => {
    scene.instrument.setInstrument(PlayerColliderPlacer);
    close();
  };

  const selectShootableBulletCollisions = () => {
    scene.instrument.setInstrument(ShootableBulletColliderPlacer);
    close();
  };

  const selectUnshootableBulletCollisions = () => {
    scene.instrument.setInstrument(UnshootableBulletColliderPlacer);
    close();
  };
</script>

<div class="select-collision-type-window" on:blur={close}>
  <span
    class="select-collision-type-window__option"
    on:click={selectPlayerCollisions}
  >
    Игрок
    <span class="select-collision-type-window__shortcut">C</span>
  </span>

  <span
    class="select-collision-type-window__option"
    on:click={selectUnshootableBulletCollisions}
  >
    Пули (непрострел)
    <span class="select-collision-type-window__shortcut">Shift + C</span>
  </span>

  <span
    class="select-collision-type-window__option"
    on:click={selectShootableBulletCollisions}
  >
    Пули (прострел)
    <span class="select-collision-type-window__shortcut">Alt + Shift + C</span>
  </span>
</div>

<style lang="scss">
  @import 'CollisionTypePickWindow';
</style>
