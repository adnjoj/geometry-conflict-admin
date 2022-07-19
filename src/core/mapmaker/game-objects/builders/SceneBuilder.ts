import { GameObjectBuilder } from './GameObjectBuilder';
import { RectangleBox } from '../boxes/RectangleBox';
import { RectangleRenderer } from '../renderers/RectangleRenderer';
import { gameObjectTypesStore } from '../../../mobx/entity-stores/GameObjectTypesStore';

export class SceneBuilder extends GameObjectBuilder {
  buildType() {
    this.gameObject.type = gameObjectTypesStore.elementsEnum.Scene;
  }

  buildBox() {
    this.gameObject.box = new RectangleBox(this.gameObject);
  }

  buildRenderer() {
    this.gameObject.renderer = new RectangleRenderer(this.gameObject);
  }

  buildRenderData() {
    this.gameObject.renderData = {
      color: 'white',
      x: 0,
      y: 0,
      w: 10,
      h: 10,
    };
  }
}
