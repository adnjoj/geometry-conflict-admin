import { GameObjectBuilder } from './GameObjectBuilder';
import { gameObjectTypesStore } from '../../../mobx/entity-stores/GameObjectTypesStore';

export class GroupBuilder extends GameObjectBuilder {
  buildType() {
    this.gameObject.type = gameObjectTypesStore.elementsEnum.Group;
  }

  buildBox() {
    this.gameObject.box = null;
  }

  buildRenderer() {
    this.gameObject.renderer = null;
  }

  buildRenderData() {
    this.gameObject.renderData = null;
  }
}
