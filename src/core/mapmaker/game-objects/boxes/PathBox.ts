import type { Scene } from '../../scene/scene';
import type { Point } from '../../../../types/mapmaker/Point';
import { GameObjectBox } from './GameObjectBox';
import { gameObjectsStore } from '../../../mobx/mapmaker-stores/GameObjectsStore';

export class PathBox extends GameObjectBox {
  getBox(_scene: Scene) {
    const points = this.getPoints();

    const box: Point[][] = [];

    for (let i = 0, j = points.length - 1; i < points.length; j = i, i += 1) {
      box.push(this.getLineBox(points[i], points[j]));
    }

    return box;
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

  protected getLineBox(point1: Point, point2: Point) {
    const box = [{ ...point1 }, { ...point1 }, { ...point2 }, { ...point2 }];

    const boxWidth = 20;

    const deltaX = point2.x - point1.x;
    const deltaY = point2.y - point1.y;
    const lineLength = Math.sqrt(deltaX ** 2 + deltaY ** 2);

    const lengthenX = (deltaX / lineLength) * (boxWidth / 2);
    const lengthenY = (deltaY / lineLength) * (boxWidth / 2);

    box[0].x -= lengthenX;
    box[0].y -= lengthenY;
    box[1].x -= lengthenX;
    box[1].y -= lengthenY;

    box[2].x += lengthenX;
    box[2].y += lengthenY;
    box[3].x += lengthenX;
    box[3].y += lengthenY;

    let lineAngle = Math.acos(deltaX / lineLength);
    if (deltaY > 0) lineAngle = -lineAngle;

    const ninetyDeg = Math.PI / 2;

    const widenX = Math.cos(lineAngle + ninetyDeg) * (boxWidth / 2);
    const widenY = Math.sin(lineAngle + ninetyDeg) * (boxWidth / 2);

    box[1].x += widenX;
    box[1].y -= widenY;
    box[2].x += widenX;
    box[2].y -= widenY;

    const widenToOtherSideX = Math.cos(lineAngle - ninetyDeg) * (boxWidth / 2);
    const widenToOtherSideY = Math.sin(lineAngle - ninetyDeg) * (boxWidth / 2);

    box[0].x += widenToOtherSideX;
    box[0].y -= widenToOtherSideY;
    box[3].x += widenToOtherSideX;
    box[3].y -= widenToOtherSideY;

    return box;
  }
}
