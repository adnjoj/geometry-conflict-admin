import { gameObjectsStore } from '../../../core/mobx/mapmaker-stores/GameObjectsStore';

export class GameObjectsTreeOrderController {
  constructor(private readonly nodesRoot: any) {}

  clearNodesBorders(nodesRoot: any) {
    for (const node of nodesRoot.children) {
      node.children[0].style.border = '2px solid transparent';
    }
  }

  displayInsertPosition(mouseY: number) {
    const { rangeCenter, nodeIndex } = this.getInsertionRange(mouseY);

    if (mouseY < rangeCenter) {
      this.nodesRoot.children[nodeIndex].children[0].style.borderTop =
        '2px solid #1db0eb';
    } else {
      this.nodesRoot.children[nodeIndex].children[0].style.borderBottom =
        '2px solid #1db0eb';
    }
  }

  moveNodes(mouseY: number) {
    const { rangeCenter, nodeId: insertionNodeId } =
      this.getInsertionRange(mouseY);

    if (mouseY < rangeCenter) {
      return gameObjectsStore.moveSelectedGameObjectsInTree(
        insertionNodeId,
        true,
      );
    }

    return gameObjectsStore.moveSelectedGameObjectsInTree(
      insertionNodeId,
      false,
    );
  }

  getInsertionRange(mouseY: number) {
    let foundInsertionRange = false;
    let nodeId = '0';
    let nodeIndex = 0;
    let rangeStart = 0;
    let rangeEnd = 0;
    let rangeCenter = 0;

    const getChildrenCount = (id: string) => {
      const node = gameObjectsStore.tree.nodes[id];
      if (node.state.hideChildren) return 0;

      return node.childrenIds.reduce(
        (count, id) => count + getChildrenCount(id) + 1,
        0,
      );
    };

    let index = 0;

    gameObjectsStore.tree.forEach('id0', (gameObject) => {
      const parent = gameObjectsStore.tree.nodes[gameObject.parentId];
      if (parent?.state?.hideChildren) return;
      if (foundInsertionRange) return;

      rangeStart = index * 35 + 25;
      rangeEnd = rangeStart + 35;

      index += 1;

      if (gameObject.state.isSelected) {
        rangeEnd += getChildrenCount(gameObject.id) * 35;
      }

      rangeCenter = (rangeStart + rangeEnd) / 2;

      if (!(rangeStart < mouseY && rangeEnd >= mouseY)) {
        return;
      }

      nodeId = gameObject.id;
      nodeIndex = index - 1;
      foundInsertionRange = true;
    });

    return {
      foundInsertionRange,
      nodeId,
      nodeIndex,
      rangeStart,
      rangeEnd,
      rangeCenter,
    };
  }
}
