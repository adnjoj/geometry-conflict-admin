import { action, makeAutoObservable } from 'mobx';
import { GameObjectTypesApiClient } from '../../api-client/game-objects/GameObjectTypesApiClient';
import type { GameObjectType } from '../../../types/entities/GameObjectType';

export class GameObjectTypesStore {
  gameObjectTypes: GameObjectType[] = [];
  parsingError: Error = null;
  finishedParsing = false;

  constructor() {
    makeAutoObservable(this);
  }

  get elementsEnum() {
    const findIdByName = (typeName: string) =>
      this.gameObjectTypes.find(({ name }) => name === typeName)?.id;

    return {
      Scene: findIdByName('Scene'),
      Solid: findIdByName('Solid'),
      Ice: findIdByName('Ice'),
      Sand: findIdByName('Sand'),
      Bush: findIdByName('Bush'),
      GrassTile: findIdByName('GrassTile'),
      GroundTile: findIdByName('GroundTile'),
      PlayerCollider: findIdByName('PlayerCollider'),
      UnshootableBulletCollider: findIdByName('UnshootableBulletCollider'),
      ShootableBulletCollider: findIdByName('ShootableBulletCollider'),
      Path: findIdByName('Path'),
      Point: findIdByName('Point'),
      Group: findIdByName('Group'),
    };
  }

  parseGameObjectTypes() {
    this.finishedParsing = false;

    GameObjectTypesApiClient.getAll()
      .then((response) => response.json())
      .then(
        action('fetchSuccess', (gameObjectTypes: GameObjectType[]) => {
          this.gameObjectTypes = gameObjectTypes;
          this.finishedParsing = true;
          this.parsingError = null;
        }),
      )
      .catch(
        action('fetchError', (error: Error) => {
          this.parsingError = error;
        }),
      );
  }
}

export const gameObjectTypesStore = new GameObjectTypesStore();
