import type { Scene } from '../../scene/scene';
import { GameObjectRenderer } from './GameObjectRenderer';

export class RectangleRenderer extends GameObjectRenderer {
  render(scene: Scene) {
    if (!('color' in this.gameObject.renderData)) return;
    if (!('w' in this.gameObject.renderData)) return;
    if (!('h' in this.gameObject.renderData)) return;

    scene.drawRect(
      this.gameObject.renderData.color,
      this.gameObject.renderData.x,
      this.gameObject.renderData.y,
      this.gameObject.renderData.w,
      this.gameObject.renderData.h,
    );
  }

  renderSelection(scene: Scene) {
    if (!('w' in this.gameObject.renderData)) return;
    if (!('h' in this.gameObject.renderData)) return;

    const color = '#1db1eb';
    const strokeWidth = 2;
    scene.strokeRect(
      color,
      strokeWidth,
      this.gameObject.renderData.x,
      this.gameObject.renderData.y,
      this.gameObject.renderData.w + 2,
      this.gameObject.renderData.h + 2,
    );
  }
}
