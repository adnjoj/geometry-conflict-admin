import type { Scene } from '../../scene/scene';
import { GameObjectBox } from './GameObjectBox';

export class PointBox extends GameObjectBox {
  getBox(_scene: Scene) {
    const { x, y } = this.gameObject.renderData;

    const w = 10;
    const h = 10;

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
