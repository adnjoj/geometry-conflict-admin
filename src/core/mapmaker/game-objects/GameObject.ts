import { makeAutoObservable } from 'mobx';

import type { TreeNode } from '../../../types/mapmaker/TreeNode';
import type { GameObjectState } from '../../../types/mapmaker/GameObjectState';
import type { RenderData } from '../../../types/mapmaker/RenderData';
import type { GameObjectBox } from './boxes/GameObjectBox';
import type { GameObjectRenderer } from './renderers/GameObjectRenderer';
import { gameObjectTypesStore } from '../../mobx/entity-stores/GameObjectTypesStore';

export class GameObject implements TreeNode {
  id: string;
  parentId: string;
  childrenIds: string[] = [];

  type: number;
  name: string;

  state: GameObjectState;
  renderData: RenderData;

  box: GameObjectBox;
  renderer: GameObjectRenderer;

  constructor() {
    makeAutoObservable(this, {
      isPoint: false,
      isPath: false,
      isBlock: false,
    });
  }

  isScene() {
    return this.type === gameObjectTypesStore.elementsEnum.Scene;
  }

  isPoint() {
    return this.type === gameObjectTypesStore.elementsEnum.Point;
  }

  isPath() {
    return [
      gameObjectTypesStore.elementsEnum.Path,
      gameObjectTypesStore.elementsEnum.PlayerCollider,
      gameObjectTypesStore.elementsEnum.ShootableBulletCollider,
      gameObjectTypesStore.elementsEnum.UnshootableBulletCollider,
    ].includes(this.type);
  }

  isBlock() {
    return [
      gameObjectTypesStore.elementsEnum.Solid,
      gameObjectTypesStore.elementsEnum.Ice,
      gameObjectTypesStore.elementsEnum.Sand,
      gameObjectTypesStore.elementsEnum.Bush,
      gameObjectTypesStore.elementsEnum.GrassTile,
      gameObjectTypesStore.elementsEnum.GroundTile,
    ].includes(this.type);
  }

  setParent(parent: GameObject) {
    this.parentId = parent.id;
    if (!parent.childrenIds.includes(this.id)) parent.addChild(this);
  }

  addChild(child: GameObject, index = 0) {
    this.childrenIds.splice(index, 0, child.id);
    if (child.parentId !== this.id) child.setParent(this);
  }

  updateRenderData(renderData: Partial<RenderData>) {
    this.renderData = { ...this.renderData, ...renderData };
  }

  updateState(state: Partial<GameObjectState>) {
    this.state = { ...this.state, ...state };
  }
}
