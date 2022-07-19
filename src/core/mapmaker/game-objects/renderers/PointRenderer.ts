import type { Scene } from '../../scene/scene';
import { GameObjectRenderer } from './GameObjectRenderer';
import { gameObjectsStore } from '../../../mobx/mapmaker-stores/GameObjectsStore';

export class PointRenderer extends GameObjectRenderer {
  render(scene: Scene) {
    const { x, y } = this.gameObject.renderData;

    const parent = gameObjectsStore.tree.nodes[this.gameObject.parentId];
    const parentRenderData = parent?.renderData;

    let color = 'black';

    if ('color' in this.gameObject.renderData) {
      color = this.gameObject.renderData.color;
    } else if (parent?.isPath?.() && 'color' in parentRenderData) {
      color = parentRenderData.color;
    }

    const outerRadius = 5;
    const innerRadius = 2;
    scene.drawCircle(color, x, y, outerRadius);
    scene.drawCircle('white', x, y, innerRadius);
  }

  renderSelection(scene: Scene) {
    const { x, y } = this.gameObject.renderData;
    const color = '#1db1eb';
    const radius = 6;
    scene.drawCircle(color, x, y, radius);
  }
}
