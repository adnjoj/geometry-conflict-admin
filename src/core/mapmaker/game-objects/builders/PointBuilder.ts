import { GameObjectBuilder } from './GameObjectBuilder';
import { PointBox } from '../boxes/PointBox';
import { PointRenderer } from '../renderers/PointRenderer';
import { gameObjectTypesStore } from '../../../mobx/entity-stores/GameObjectTypesStore';

export class PointBuilder extends GameObjectBuilder {
  buildType() {
    this.gameObject.type = gameObjectTypesStore.elementsEnum.Point;
  }

  buildBox() {
    this.gameObject.box = new PointBox(this.gameObject);
  }

  buildRenderer() {
    this.gameObject.renderer = new PointRenderer(this.gameObject);
  }

  buildRenderData() {
    this.gameObject.renderData = {
      x: 0,
      y: 0,
    };
  }
}
