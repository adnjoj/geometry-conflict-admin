import { makeAutoObservable } from 'mobx';

import { GameObjectTransformer } from '../../mapmaker/transformers/GameObjectTransformer';
import { gameObjectsStore } from './GameObjectsStore';

export class VersionsStore {
  undoStack = new Array<{ w: number; h: number; gameObjects: any }>();
  redoStack = new Array<{ w: number; h: number; gameObjects: any }>();

  constructor() {
    makeAutoObservable(this);
  }

  saveState() {
    const state = VersionsStore.serializeState();
    this.redoStack = [];
    this.undoStack.push(state);

    localStorage[`map${gameObjectsStore.mapId}`] = JSON.stringify(state);

    if (this.undoStack.length >= 20) this.undoStack.shift();
  }

  undo() {
    if (this.undoStack.length <= 0) return;
    this.redoStack.push(VersionsStore.serializeState());

    const state = this.undoStack.pop();
    VersionsStore.loadState(state);
  }

  redo() {
    if (this.redoStack.length <= 0) return;
    this.undoStack.push(VersionsStore.serializeState());

    const state = this.redoStack.pop();
    VersionsStore.loadState(state);
  }

  loadSavedState() {
    if (!localStorage[`map${gameObjectsStore.mapId}`]) return;
    if (!confirm('Вы уже редактировали эту карту. Загрузить изменения?')) {
      return;
    }

    VersionsStore.loadState(
      JSON.parse(localStorage[`map${gameObjectsStore.mapId}`]),
    );
  }

  private static serializeState() {
    if (!('w' in gameObjectsStore.root.renderData)) {
      return { w: 0, h: 0, gameObjects: {} };
    }
    if (!('h' in gameObjectsStore.root.renderData)) {
      return { w: 0, h: 0, gameObjects: {} };
    }

    return {
      w: gameObjectsStore.root.renderData.w,
      h: gameObjectsStore.root.renderData.h,
      gameObjects: new GameObjectTransformer().toPlain(gameObjectsStore.root),
    };
  }

  private static loadState(state: { w: number; h: number; gameObjects: any }) {
    localStorage[gameObjectsStore.mapId] = state;

    gameObjectsStore.setNodes(
      new GameObjectTransformer().toClass(state.gameObjects),
    );

    gameObjectsStore.root.updateRenderData({ w: state.w, h: state.h });
  }
}

export const versionsStore = new VersionsStore();
