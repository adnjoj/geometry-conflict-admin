import { PathBuilder } from './PathBuilder';
import { gameObjectTypesStore } from '../../../mobx/entity-stores/GameObjectTypesStore';

export class ShootableBulletColliderBuilder extends PathBuilder {
  buildType() {
    this.gameObject.type =
      gameObjectTypesStore.elementsEnum.ShootableBulletCollider;
  }

  buildRenderData() {
    this.gameObject.renderData = {
      x: 0,
      y: 0,
      color: 'green',
      shouldClose: true,
    };
  }
}
