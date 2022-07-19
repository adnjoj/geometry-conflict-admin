import { SolidObjectBuilder } from './SolidObjectBuilder';
import { gameObjectTypesStore } from '../../../mobx/entity-stores/GameObjectTypesStore';

export class GroundTileBuilder extends SolidObjectBuilder {
  buildType() {
    this.gameObject.type = gameObjectTypesStore.elementsEnum.GroundTile;
  }
}
