import { SolidObjectBuilder } from './SolidObjectBuilder';
import { gameObjectTypesStore } from '../../../mobx/entity-stores/GameObjectTypesStore';

export class SandBuilder extends SolidObjectBuilder {
  buildType() {
    this.gameObject.type = gameObjectTypesStore.elementsEnum.Sand;
  }
}
