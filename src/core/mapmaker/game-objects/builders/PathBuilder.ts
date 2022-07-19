import { GameObjectBuilder } from './GameObjectBuilder';
import { PathBox } from '../boxes/PathBox';
import { PathRenderer } from '../renderers/PathRenderer';
import { gameObjectTypesStore } from '../../../mobx/entity-stores/GameObjectTypesStore';

export class PathBuilder extends GameObjectBuilder {
  buildType() {
    this.gameObject.type = gameObjectTypesStore.elementsEnum.Path;
  }

  buildBox() {
    this.gameObject.box = new PathBox(this.gameObject);
  }

  buildRenderer() {
    this.gameObject.renderer = new PathRenderer(this.gameObject);
  }

  buildRenderData() {
    this.gameObject.renderData = {
      x: 0,
      y: 0,
      color: 'blue',
      shouldClose: false,
    };
  }
}
