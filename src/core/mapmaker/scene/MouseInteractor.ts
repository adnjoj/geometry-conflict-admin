import type { Scene } from './scene';
import type { Point } from '../../../types/mapmaker/Point';
import type { GameObject } from '../game-objects/GameObject';
import { gameObjectsStore } from '../../mobx/mapmaker-stores/GameObjectsStore';

export class MouseInteractor {
  constructor(private readonly scene: Scene) {}

  getHoveredElement() {
    let hoveredGameObject: GameObject = null;

    const iterateNode = (node: GameObject) => {
      Object.values([...node.childrenIds, node.id]).forEach((id: string) => {
        const gameObject = gameObjectsStore.tree.nodes[id];
        if (id !== node.id) iterateNode(gameObject);
        if (hoveredGameObject) return;

        if (this.checkIfInObject(gameObject)) {
          hoveredGameObject = node;
        }
      });
    };

    iterateNode(gameObjectsStore.root);

    return hoveredGameObject;
  }

  protected checkIfInObject(gameObject: GameObject) {
    const box = gameObject.box?.getBox?.(this.scene);
    if (!box) return false;

    for (let i = 0; i < box.length; i += 1) {
      if (this.mouseInPolygon(box[i])) return true;
    }

    return false;
  }

  protected mouseInPolygon(polygon: Point[]) {
    const { x, y } = this.scene.mouse.position;

    let inside = false;
    for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
      const xi = polygon[i].x;
      const yi = polygon[i].y;
      const xj = polygon[j].x;
      const yj = polygon[j].y;

      const intersect =
        yi > y != yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi;
      if (intersect) inside = !inside;
    }

    return inside;
  }
}
