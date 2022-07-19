import { makeAutoObservable } from 'mobx';

import type { GameObjectState } from '../../../types/mapmaker/GameObjectState';
import type { GameObject } from '../../mapmaker/game-objects/GameObject';
import { GameObjectBuildDirector } from '../../mapmaker/game-objects/GameObjectBuildDirector';
import { GroupBuilder } from '../../mapmaker/game-objects/builders/GroupBuilder';

import { Tree } from '../../../types/mapmaker/Tree';

import { versionsStore } from './VersionsStore';
import { PointBuilder } from '../../mapmaker/game-objects/builders/PointBuilder';

export class GameObjectsStore {
  public mapId = 0;
  public tree = new Tree<GameObject>();

  constructor() {
    makeAutoObservable(this);
  }

  get root() {
    return this.tree.nodes['id0'];
  }

  setMapId(mapId: number) {
    this.mapId = mapId;
  }

  addGameObjects(gameObjects: GameObject[], shouldSaveState = true) {
    if (shouldSaveState) versionsStore.saveState();
    this.tree.addElements(gameObjects);
  }

  deleteGameObjects(ids: string[], shouldSaveState = true) {
    if (shouldSaveState) versionsStore.saveState();
    ids.forEach((id) => this.tree.deleteNode(id));
  }

  setGameObjectName(id: string, name: string, shouldSaveState = true) {
    if (shouldSaveState) versionsStore.saveState();
    this.tree.nodes[id].name = name;
  }

  setGameObjectState(id: string, state: Partial<GameObjectState>) {
    this.tree.forEach(id, (node) => {
      node.updateState(state);
    });
  }

  groupSelectedGameObjects(shouldSaveState = true) {
    if (shouldSaveState) versionsStore.saveState();
    const iterationQueue = new Array<string>('id0');

    while (iterationQueue.length > 0) {
      const node = this.tree.nodes[iterationQueue.shift()];
      if (node.id === 'id0' && node.state.isSelected) return;

      for (let i = 0; i < node.childrenIds.length; i += 1) {
        const childId = node.childrenIds[i];
        const child = this.tree.nodes[childId];

        if (!child.state.isSelected) continue;

        const groupBuilder = new GroupBuilder();
        const groupBuildDirector = new GameObjectBuildDirector(groupBuilder);
        const group = groupBuildDirector.construct('group');

        const pointBuilder = new PointBuilder();
        const pointBuildDirector = new GameObjectBuildDirector(pointBuilder);
        const temporaryAnchor = pointBuildDirector.construct('anchor');

        this.addGameObjects([group, temporaryAnchor], false);

        group.addChild(temporaryAnchor);
        node.addChild(group, i);

        this.moveSelectedGameObjectsInTree(temporaryAnchor.id, false, false);
        this.deleteGameObjects([temporaryAnchor.id], false);

        return;
      }

      iterationQueue.push(...node.childrenIds);
    }
  }

  moveSelectedGameObjectsInTree(
    insertionNodeId: string,
    shouldInsertBefore: boolean = false,
    shouldSaveState = true,
  ) {
    if (insertionNodeId === 'id0') return;
    if (shouldSaveState) versionsStore.saveState();

    const idsOfTheSelectedGameObjects = new Array<string>();
    this.tree.forEach('id0', (node) => {
      if (
        node.state.isSelected &&
        !this.tree.nodes[node.parentId]?.state.isSelected
      ) {
        idsOfTheSelectedGameObjects.push(node.id);
      }
    });

    this.tree.moveNodes(
      idsOfTheSelectedGameObjects,
      insertionNodeId,
      shouldInsertBefore,
    );
  }

  setNodes(nodes: { [id: string]: GameObject }) {
    this.tree.setNodes(nodes);
  }
}

export const gameObjectsStore = new GameObjectsStore();
