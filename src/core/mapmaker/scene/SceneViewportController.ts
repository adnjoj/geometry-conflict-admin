import type { Scene } from './scene';

export class SceneViewportController {
  private maxScale = 5;
  private minScale = 0.25;

  public scale = 1;
  public offset = { x: 0, y: 0 };

  constructor(private readonly scene: Scene) {
    const canvasWidth = window.innerWidth - 66 - 500;
    const canvasHeight = window.innerHeight;

    this.offset.x = canvasWidth / 2;
    this.offset.y = canvasHeight / 2;

    scene.canvas.addEventListener('wheel', this.onWheel.bind(this));
    scene.canvas.addEventListener('mousemove', this.onMouseMove.bind(this));
  }

  private onMouseMove(event: MouseEvent) {
    if (!this.scene.mouse.MmbPressed) return;

    this.offset.x += event.movementX / this.scale;
    this.offset.y += event.movementY / this.scale;
  }

  private onWheel(event: WheelEvent) {
    event.preventDefault();

    if (event.altKey) {
      if (this.scale < this.maxScale && event.deltaY < 0) {
        this.scale -= event.deltaY / 1000;
      }
      if (this.scale > this.minScale && event.deltaY > 0) {
        this.scale -= event.deltaY / 1000;
      }
    } else if (event.ctrlKey) {
      this.offset.x += event.deltaY / 5 / this.scale;
    } else {
      this.offset.y -= event.deltaY / 5 / this.scale;
    }
  }
}
