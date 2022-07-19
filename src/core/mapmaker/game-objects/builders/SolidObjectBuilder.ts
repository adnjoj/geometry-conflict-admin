import { GameObjectBuilder } from './GameObjectBuilder';
import { ImageBox } from '../boxes/ImageBox';
import { ImageRenderer } from '../renderers/ImageRenderer';
import { gameObjectTypesStore } from '../../../mobx/entity-stores/GameObjectTypesStore';

export class SolidObjectBuilder extends GameObjectBuilder {
  buildType() {
    this.gameObject.type = gameObjectTypesStore.elementsEnum.Solid;
  }

  buildBox() {
    this.gameObject.box = new ImageBox(this.gameObject);
  }

  buildRenderer() {
    this.gameObject.renderer = new ImageRenderer(this.gameObject);
  }

  buildRenderData() {
    this.gameObject.renderData = {
      x: 0,
      y: 0,
      id: 0,
      file: null,
    };
  }
}
