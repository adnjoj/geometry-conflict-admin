<script lang="ts">
  import { navigate } from 'svelte-routing';

  import { scene } from '../../../core/mapmaker/scene/scene';
  import { Pointer } from '../../../core/mapmaker/instruments/Pointer';
  import { BlockPlacer } from '../../../core/mapmaker/instruments/BlockPlacer';
  import { PathPlacer } from '../../../core/mapmaker/instruments/PathPlacer';
  import { PlayerColliderPlacer } from '../../../core/mapmaker/instruments/PlayerColliderPlacer';
  import { ShootableBulletColliderPlacer } from '../../../core/mapmaker/instruments/ShootableBulletColliderPlacer';
  import { UnshootableBulletColliderPlacer } from '../../../core/mapmaker/instruments/UnshootableBulletColliderPlacer';

  import type { Map } from '../../../types/entities/Map';

  import BlockPickWindow from './BlockPickWindow/BlockPickWindow.svelte';
  import SceneSettingsWindow from './SceneSettingsWindow/SceneSettingsWindow.svelte';
  import CollisionTypePickWindow from './CollisionTypePickWindow/CollisionTypePickWindow.svelte';

  import { shortcutsController } from '../../../core/mapmaker/scene/ShortcutsController';

  export let map: Map;

  const selectPointer = () => {
    scene.instrument.setInstrument(Pointer);
  };

  let instrument = null;
  let openedMenu = '';

  const handleMenuButtonClick = (menu: string) => {
    if (openedMenu === menu) openedMenu = '';
    else openedMenu = menu;
  };

  scene.instrument.addChangeListener((newInstrument) => {
    instrument = newInstrument;
  });

  shortcutsController.addShortcut(['KeyV'], () => selectPointer());
  shortcutsController.addShortcut(['KeyB'], () => {
    handleMenuButtonClick('block-pick');
  });
  shortcutsController.addShortcut(['KeyC'], () => {
    scene.instrument.setInstrument(PlayerColliderPlacer);
  });
  shortcutsController.addShortcut(['ShiftLeft', 'KeyC'], () => {
    scene.instrument.setInstrument(UnshootableBulletColliderPlacer);
  });
  shortcutsController.addShortcut(['AltLeft', 'ShiftLeft', 'KeyC'], () => {
    scene.instrument.setInstrument(ShootableBulletColliderPlacer);
  });
</script>

{#if openedMenu === 'block-pick'}
  <BlockPickWindow on:close={() => (openedMenu = '')} />
{:else if openedMenu === 'collider-pick'}
  <CollisionTypePickWindow on:close={() => (openedMenu = '')} />
{:else if openedMenu === 'scene-settings'}
  <SceneSettingsWindow {map} />
{/if}

<div class="instruments-bar">
  <div
    class={`instruments-bar__image-container ${
      instrument instanceof Pointer
        ? 'instruments-bar__image-container__active'
        : ''
    }`}
    style="padding-top: 4px; padding-left: 4px;"
    title="Двигать объекты (V)"
    on:click={selectPointer}
  >
    <img src="/arrow.svg" width="26pt" height="26pt" alt="move instrument" />
  </div>

  <div
    class={`instruments-bar__image-container ${
      instrument instanceof BlockPlacer
        ? 'instruments-bar__image-container__active'
        : ''
    }`}
    style="padding-left: 1px;"
    title="Выбрать игровой объект (B)"
    on:click={() => handleMenuButtonClick('block-pick')}
  >
    <img src="/cube.svg" width="26pt" height="29pt" alt="select game object" />
  </div>

  <div
    class={`instruments-bar__image-container ${
      instrument instanceof PathPlacer
        ? 'instruments-bar__image-container__active'
        : ''
    }`}
    style="padding-top: 1px; padding-left: 1px;"
    title="Коллайдеры"
    on:click={() => handleMenuButtonClick('collider-pick')}
  >
    <img src="/collider.svg" width="26px" height="26px" alt="colliders" />
  </div>

  <div
    class="instruments-bar__image-container"
    style="margin-top: auto;"
    title="Настройки сцены"
    on:click={() => handleMenuButtonClick('scene-settings')}
  >
    <img src="/scene.svg" width="30px" height="30px" alt="scene settings" />
  </div>

  <div
    class="instruments-bar__image-container"
    title="Выход в редактор объектов"
    on:click={() => navigate('/maps')}
  >
    <img src="/close.svg" width="23px" height="23px" alt="close" />
  </div>
</div>

<style lang="scss">
  @import 'InstrumentsBar';
</style>
