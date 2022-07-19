import { SolidObjectBuilder } from './builders/SolidObjectBuilder';
import { IceBuilder } from './builders/IceBuilder';
import { BushBuilder } from './builders/BushBuilder';
import { GrassTileBuilder } from './builders/GrassTileBuilder';
import { GroundTileBuilder } from './builders/GroundTileBuilder';
import { SceneBuilder } from './builders/SceneBuilder';
import { PointBuilder } from './builders/PointBuilder';
import { PathBuilder } from './builders/PathBuilder';
import { PlayerColliderBuilder } from './builders/PlayerColliderBuilder';
import { ShootableBulletColliderBuilder } from './builders/ShootableBulletColliderBuilder';
import { UnshootableBulletColliderBuilder } from './builders/UnshootableBulletColliderBuilder';
import { GroupBuilder } from './builders/GroupBuilder';

import { gameObjectTypesStore } from '../../mobx/entity-stores/GameObjectTypesStore';

export const getBuilderByGameObjectType = (type: number) => {
  switch (type) {
    case gameObjectTypesStore.elementsEnum.Scene:
      return new SceneBuilder();
    case gameObjectTypesStore.elementsEnum.Solid:
      return new SolidObjectBuilder();
    case gameObjectTypesStore.elementsEnum.Ice:
      return new IceBuilder();
    case gameObjectTypesStore.elementsEnum.Bush:
      return new BushBuilder();
    case gameObjectTypesStore.elementsEnum.GrassTile:
      return new GrassTileBuilder();
    case gameObjectTypesStore.elementsEnum.GroundTile:
      return new GroundTileBuilder();
    case gameObjectTypesStore.elementsEnum.Group:
      return new GroupBuilder();
    case gameObjectTypesStore.elementsEnum.Point:
      return new PointBuilder();
    case gameObjectTypesStore.elementsEnum.Path:
      return new PathBuilder();
    case gameObjectTypesStore.elementsEnum.PlayerCollider:
      return new PlayerColliderBuilder();
    case gameObjectTypesStore.elementsEnum.ShootableBulletCollider:
      return new ShootableBulletColliderBuilder();
    case gameObjectTypesStore.elementsEnum.UnshootableBulletCollider:
      return new UnshootableBulletColliderBuilder();
  }
};
