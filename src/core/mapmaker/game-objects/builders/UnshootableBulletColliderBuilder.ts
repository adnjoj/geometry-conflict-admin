import { PathBuilder } from './PathBuilder';
import { gameObjectTypesStore } from '../../../mobx/entity-stores/GameObjectTypesStore';

export class UnshootableBulletColliderBuilder extends PathBuilder {
  buildType() {
    this.gameObject.type =
      gameObjectTypesStore.elementsEnum.UnshootableBulletCollider;
  }

  buildRenderData() {
    this.gameObject.renderData = {
      x: 0,
      y: 0,
      color: 'tomato',
      shouldClose: true,
    };
  }
}
