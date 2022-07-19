import { makeAutoObservable } from 'mobx';
import type { TreeNode } from './TreeNode';

export class Tree<T extends TreeNode> {
  public nodes: { [id: string]: T } = {};

  constructor() {
    makeAutoObservable(this);
  }

  setNodes(nodes: { [id: string]: T }) {
    this.nodes = nodes;
  }

  addElements(newNodes: T[]) {
    newNodes.forEach((node) => {
      this.nodes[node.id] = node;
    });
  }

  deleteNode(id: string) {
    if (id === 'id0') return;

    this.forEach('id0', (node) => {
      if (node.childrenIds.includes(id)) {
        node.childrenIds.splice(node.childrenIds.indexOf(id), 1);
      }
    });

    const iterate = (nodeId: string) => {
      this.nodes[nodeId].childrenIds.forEach((childId) => iterate(childId));
      delete this.nodes[nodeId];
    };

    iterate(id);
  }

  forEach(startNodeId: string, callback: (node: T, depth: number) => any) {
    const iterate = (nodeId: string, depth = 0) => {
      const node = this.nodes[nodeId];
      if (!node) return;
      callback(node, depth);

      node.childrenIds.forEach((childId) => {
        iterate(childId, depth + 1);
      });
    };

    iterate(startNodeId);
  }

  moveNodes(ids: string[], insertionId: string, shouldInsertBefore: boolean) {
    const iterate = (node: T) => {
      const { childrenIds } = node;

      const includesInsertionNode = node.childrenIds.includes(insertionId);
      let insertionIndex = node.childrenIds.indexOf(insertionId);

      for (const id of ids) {
        const index = node.childrenIds.indexOf(id);

        if (index > -1) {
          childrenIds.splice(index, 1);

          if (index < insertionIndex) insertionIndex -= 1;
          else if (index === insertionIndex && !shouldInsertBefore) {
            insertionIndex -= 1;
          }
        }
      }

      if (!includesInsertionNode) return;
      if (!shouldInsertBefore) insertionIndex += 1;

      ids.reverse().forEach((id) => {
        node.addChild(this.nodes[id], insertionIndex);
      });
    };

    for (const node of Object.values(this.nodes)) iterate(node);
  }
}
