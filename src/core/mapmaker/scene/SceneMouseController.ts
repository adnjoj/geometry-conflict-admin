import type { Scene } from './scene';
import type { Point } from '../../../types/mapmaker/Point';
import { MouseInteractor } from './MouseInteractor';

export class SceneMouseController {
  public position = { x: 0, y: 0 };

  public LmbPressed = false;
  public RmbPressed = false;
  public MmbPressed = false;

  public readonly interactor: MouseInteractor;

  constructor(private readonly scene: Scene) {
    this.interactor = new MouseInteractor(scene);

    scene.canvas.addEventListener('mouseup', this.onMouseUp.bind(this));
    scene.canvas.addEventListener('mousedown', this.onMouseDown.bind(this));
    scene.canvas.addEventListener('mousemove', this.onMouseMove.bind(this));
  }

  private onMouseDown(event: MouseEvent) {
    this.position = this.getMousePositionFromEvent(event);

    switch (event.button) {
      case 0:
        this.LmbPressed = true;
        break;
      case 1:
        this.MmbPressed = true;
        break;
      case 2:
        this.RmbPressed = true;
    }
  }

  private onMouseUp(event: MouseEvent) {
    this.position = this.getMousePositionFromEvent(event);

    switch (event.button) {
      case 0:
        this.LmbPressed = false;
        break;
      case 1:
        this.MmbPressed = false;
        break;
      case 2:
        this.RmbPressed = false;
    }
  }

  private onMouseMove(event: MouseEvent) {
    this.position = this.getMousePositionFromEvent(event);
  }

  private getMousePositionFromEvent(event: MouseEvent): Point {
    if (!this.scene.canvas) return;
    const midX = this.scene.canvas.width / 2;
    const midY = this.scene.canvas.height / 2;

    const x = event.clientX - 66;
    const y = event.clientY;

    const viewportScale = this.scene.viewport.scale;
    const viewportOffset = this.scene.viewport.offset;

    this.position = {
      x: midX - viewportOffset.x + (x - midX) / viewportScale,
      y: midY - viewportOffset.y + (y - midY) / viewportScale,
    };

    return this.position;
  }
}
