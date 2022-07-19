<script lang="ts">
  import { onMount } from 'svelte';
  import { autorun } from 'mobx';
  import type { GameObject } from '../../../core/mapmaker/game-objects/GameObject';
  import { GameObjectsTreeOrderController } from './GameObjectsTreeOrderController';
  import { gameObjectsStore } from '../../../core/mobx/mapmaker-stores/GameObjectsStore';

  import GameObjectsTreeElement from './Element/Element.svelte';

  let treeRootElement: HTMLDivElement;
  let elementSelected = false;
  let elementMoved = false;

  let elements = new Array<{
    gameObject: GameObject;
    parent: GameObject;
    depth: number;
  }>();

  autorun(() => {
    elements = [];

    gameObjectsStore.tree.forEach('id0', (gameObject, depth) => {
      const parent = gameObjectsStore.tree.nodes[gameObject.parentId];
      if (!parent?.state?.hideChildren && gameObject.state) {
        elements = [...elements, { gameObject, parent, depth }];
      }
    });
  });

  const onMouseDown = () => {
    gameObjectsStore.setGameObjectState('id0', { isSelected: false });
  };

  const onElementMouseDown = (event: CustomEvent) => {
    elementMoved = false;
    if (!event.detail.event.ctrlKey) elementSelected = true;
  };

  const onElementMouseUp = (event: CustomEvent) => {
    if (!elementMoved && !event.detail.event.ctrlKey) {
      const { gameObject } = event.detail;
      gameObjectsStore.setGameObjectState('id0', { isSelected: false });
      gameObjectsStore.setGameObjectState(gameObject.id, { isSelected: true });
    }
  };

  const onElementDblClick = () => {
    elementSelected = false;
  };

  onMount(() => {
    const orderController = new GameObjectsTreeOrderController(treeRootElement);

    treeRootElement?.addEventListener('mousemove', (event: MouseEvent) => {
      orderController.clearNodesBorders(treeRootElement);
      elementMoved = true;

      if (!elementSelected) return;

      const mouseY = event.clientY + treeRootElement.scrollTop;
      orderController.displayInsertPosition(mouseY);
    });

    treeRootElement?.addEventListener('mouseup', (event: MouseEvent) => {
      orderController.clearNodesBorders(treeRootElement);

      if (!elementSelected) return;
      elementSelected = false;

      if (!elementMoved) return;
      elementMoved = false;

      const mouseY = event.clientY + treeRootElement.scrollTop;
      orderController.moveNodes(mouseY);
    });
  });
</script>

<div
  class="objects-tree"
  on:mousedown={onMouseDown}
  bind:this={treeRootElement}
>
  {#each elements as element}
    <GameObjectsTreeElement
      {...element}
      on:dblclick={onElementDblClick}
      on:mousedown={onElementMouseDown}
      on:mouseup={onElementMouseUp}
    />
  {/each}
</div>

<style lang="scss">
  @import 'GameObjectsTree';
</style>
