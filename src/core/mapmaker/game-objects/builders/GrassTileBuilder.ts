import { SolidObjectBuilder } from './SolidObjectBuilder';
import { gameObjectTypesStore } from '../../../mobx/entity-stores/GameObjectTypesStore';

export class GrassTileBuilder extends SolidObjectBuilder {
  buildType() {
    this.gameObject.type = gameObjectTypesStore.elementsEnum.GrassTile;
  }
}
