import type { Scene } from '../../scene/scene';
import { GameObjectBox } from './GameObjectBox';

export class RectangleBox extends GameObjectBox {
  getBox(_scene: Scene) {
    if (!('w' in this.gameObject.renderData)) return;
    if (!('h' in this.gameObject.renderData)) return;

    const { x, y, w, h } = this.gameObject.renderData;

    return [
      [
        { x: x - w / 2, y: y - h / 2 },
        { x: x + w / 2, y: y - h / 2 },
        { x: x + w / 2, y: y + h / 2 },
        { x: x - w / 2, y: y + h / 2 },
      ],
    ];
  }
}
