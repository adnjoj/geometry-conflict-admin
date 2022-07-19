import { PathBuilder } from './PathBuilder';
import { gameObjectTypesStore } from '../../../mobx/entity-stores/GameObjectTypesStore';

export class PlayerColliderBuilder extends PathBuilder {
  buildType() {
    this.gameObject.type = gameObjectTypesStore.elementsEnum.PlayerCollider;
  }

  buildRenderData() {
    this.gameObject.renderData = {
      x: 0,
      y: 0,
      color: '#f9de59',
      shouldClose: true,
    };
  }
}
