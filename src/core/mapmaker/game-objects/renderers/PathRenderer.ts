import type { Scene } from '../../scene/scene';
import { GameObjectRenderer } from './GameObjectRenderer';
import { gameObjectsStore } from '../../../mobx/mapmaker-stores/GameObjectsStore';

export class PathRenderer extends GameObjectRenderer {
  render(scene: Scene) {
    if (!('color' in this.gameObject.renderData)) return;
    if (!('shouldClose' in this.gameObject.renderData)) return;

    const { color, shouldClose } = this.gameObject.renderData;

    const strokeWidth = 3;
    const points = this.getPoints();
    scene.drawPolygon(color, strokeWidth, points, shouldClose);
  }

  renderSelection(scene: Scene) {
    if (!('shouldClose' in this.gameObject.renderData)) return;

    const { shouldClose } = this.gameObject.renderData;

    const color = '#1db1eb';
    const strokeWidth = 4;
    const points = this.getPoints();
    scene.drawPolygon(color, strokeWidth, points, shouldClose);
  }

  protected getPoints() {
    return this.gameObject.childrenIds
      .map((pointId) => {
        const point = gameObjectsStore.tree.nodes[pointId];
        if (!point.isPoint()) return null;

        return {
          x: point.renderData.x,
          y: point.renderData.y,
        };
      })
      .filter((point) => point !== null);
  }
}
