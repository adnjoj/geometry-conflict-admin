<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  import type { GameObject } from '../../../../core/mapmaker/game-objects/GameObject';
  import { gameObjectsStore } from '../../../../core/mobx/mapmaker-stores/GameObjectsStore';

  const dispatch = createEventDispatcher();

  export let gameObject: GameObject = null;
  export let parent: GameObject;
  export let depth: number;

  let name = '';
  let isInRenameMode = false;

  $: if (!isInRenameMode) name = gameObject?.name;

  let className;

  $: {
    className = 'objects-tree__element ';

    if (parent?.state.isSelected) {
      className += 'objects-tree__element__selected-indirectly';
    } else if (gameObject?.state.isSelected) {
      className += 'objects-tree__element__selected';
    } else if (gameObject?.state.isHovered) {
      className += 'objects-tree__element__selected-indirectly';
    }
  }

  const rename = (newName: string) => {
    isInRenameMode = false;
    gameObjectsStore.setGameObjectName(gameObject.id, newName);
  };

  const onRenameInputBlur = (event: FocusEvent) => {
    rename((event.target as HTMLInputElement).value);
  };

  const onRenameInputKeyDown = (event: KeyboardEvent) => {
    if (event.code === 'Enter') {
      rename((event.target as HTMLInputElement).value);
    }
  };

  const onElementDblClick = (event: MouseEvent) => {
    isInRenameMode = true;
    dispatch('dblclick', { gameObject, event });
  };

  const onMouseDown = (event: MouseEvent) => {
    if (isInRenameMode) return;
    if (gameObject.state.isSelected) {
      return dispatch('mousedown', { gameObject, event });
    }

    if (!event.ctrlKey) {
      gameObjectsStore.setGameObjectState('id0', { isSelected: false });
    }

    gameObjectsStore.setGameObjectState(gameObject.id, { isSelected: true });
    dispatch('mousedown', { gameObject, event });
  };

  const onMouseUp = (event: MouseEvent) => {
    if (isInRenameMode) return event.stopPropagation();
    dispatch('mouseup', { gameObject, event });
  };

  const expand = () => {
    gameObjectsStore.setGameObjectState(gameObject.id, {
      hideChildren: !gameObject.state.hideChildren,
    });
  };
</script>

<div
  class={className}
  on:mouseup={onMouseUp}
  on:mousedown|stopPropagation={onMouseDown}
>
  <div style={`margin-left: ${40 + depth * 40}px`}>
    <div style="margin-right: 5px;" on:mousedown|stopPropagation={expand}>
      <img
        src="/short-arrow.svg"
        style={`visibility: ${
          gameObject.childrenIds.length > 0 ? 'visible' : 'hidden'
        }; transform: ${
          gameObject.state.hideChildren ? 'rotate(0deg)' : 'rotate(90deg)'
        };`}
        width="22pt"
        height="14pt"
        alt="expand"
      />
    </div>

    <div>
      {#if gameObject.isPath()}
        <img src="/collider.svg" width="22pt" height="24pt" alt="collider" />
      {:else if gameObject.isPoint()}
        <img src="/point.svg" width="22pt" height="24pt" alt="point" />
      {:else}
        <img src="/cube.svg" width="22pt" height="24pt" alt="object" />
      {/if}
    </div>

    {#if isInRenameMode}
      <input
        class="objects-tree__input"
        bind:value={name}
        on:blur={onRenameInputBlur}
        on:keydown={onRenameInputKeyDown}
      />
    {:else}
      <span on:dblclick={onElementDblClick}>{name}</span>
    {/if}
  </div>
</div>
