import type { Point } from '../../../types/mapmaker/Point';

import { Instrument } from './Instrument';

import { gameObjectsStore } from '../../mobx/mapmaker-stores/GameObjectsStore';
import { versionsStore } from '../../mobx/mapmaker-stores/VersionsStore';

export class Pointer extends Instrument {
  private prevMousePosition: Point;
  private hoverElementId: string;

  private movedElement = false;
  private selectedElement = false;

  destroy() {}

  onMouseUp() {
    const clickedElement = this.scene.mouse.interactor.getHoveredElement();
    if (!clickedElement) return;

    if (this.selectedElement && !this.movedElement) {
      this.selectOneGameObject(clickedElement.id);
    }

    this.selectedElement = false;
    this.movedElement = false;
  }

  onMouseDown(event: MouseEvent) {
    if (event.button !== 0) return;
    this.prevMousePosition = undefined;

    const clickedElement = this.scene.mouse.interactor.getHoveredElement();

    if (!clickedElement || clickedElement.id === 'id0') {
      return this.clearSelection();
    }

    if (!clickedElement.state.isSelected) {
      this.selectOneGameObject(clickedElement.id);
    }

    this.selectedElement = true;
  }

  onMouseMove(event: MouseEvent) {
    if (event.buttons !== 1) return this.checkHover();
    this.moveObject();
  }

  protected clearSelection() {
    gameObjectsStore.setGameObjectState('id0', { isSelected: false });
  }

  protected selectOneGameObject(id: string) {
    this.clearSelection();
    gameObjectsStore.setGameObjectState(id, { isSelected: true });
  }

  protected clearHover() {
    gameObjectsStore.setGameObjectState('id0', { isHovered: false });
  }

  protected hoverOneGameObject(id: string) {
    this.clearHover();
    gameObjectsStore.setGameObjectState(id, { isHovered: true });
  }

  protected checkHover() {
    const hoverElement = this.scene.mouse.interactor.getHoveredElement();
    const hoverElementIsScene = hoverElement?.id === 'id0';

    if (this.hoverElementId && (!hoverElement || hoverElementIsScene)) {
      this.hoverElementId = undefined;
      return this.clearHover();
    }

    if (!hoverElement || hoverElementIsScene) return;

    if (hoverElement.id !== this.hoverElementId) {
      this.hoverElementId = hoverElement.id;
      this.hoverOneGameObject(hoverElement.id);
    }
  }

  protected moveObject() {
    if (gameObjectsStore.root.state.isSelected) return;
    if (this.selectedElement && !this.movedElement) versionsStore.saveState();

    this.movedElement = true;

    const { x, y } = this.scene.mouse.position;
    const roundedX = x - (x % 10);
    const roundedY = y - (y % 10);

    let deltaX = 0;
    let deltaY = 0;

    if (this.prevMousePosition !== undefined) {
      deltaX = roundedX - this.prevMousePosition.x;
      deltaY = roundedY - this.prevMousePosition.y;
    }

    this.prevMousePosition = { x: roundedX, y: roundedY };

    gameObjectsStore.tree.forEach('id0', (node) => {
      if (node.state.isSelected) {
        const gameObject = gameObjectsStore.tree.nodes[node.id].renderData;
        if (!gameObject) return;

        gameObject.x += deltaX;
        gameObject.y += deltaY;
      }
    });
  }
}
