import { SolidObjectBuilder } from './SolidObjectBuilder';
import { gameObjectTypesStore } from '../../../mobx/entity-stores/GameObjectTypesStore';

export class IceBuilder extends SolidObjectBuilder {
  buildType() {
    this.gameObject.type = gameObjectTypesStore.elementsEnum.Ice;
  }
}
