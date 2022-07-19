import type { Point } from '../../../types/mapmaker/Point';
import type { GameObject } from '../game-objects/GameObject';
import { SceneMouseController } from './SceneMouseController';
import { SceneViewportController } from './SceneViewportController';
import { InstrumentController } from './InstrumentController';

export class Scene {
  public canvas: HTMLCanvasElement;
  public ctx: CanvasRenderingContext2D;
  private images = new Map<string, HTMLImageElement>();

  public mouse: SceneMouseController;
  public viewport: SceneViewportController;
  public instrument: InstrumentController;

  public gameObjects = new Map<string, GameObject>();

  init(canvasElement: HTMLCanvasElement) {
    this.canvas = canvasElement;
    this.ctx = canvasElement?.getContext?.('2d');

    this.mouse = new SceneMouseController(this);
    this.viewport = new SceneViewportController(this);
    this.instrument = new InstrumentController(this);
  }

  getImage(file: string) {
    const image = this.images.get(file);
    if (image) return image;

    const newImage = new Image();
    newImage.src = file;
    this.images.set(file, newImage);

    return null;
  }

  drawRect(color: string, x: number, y: number, width: number, height: number) {
    if (!this.ctx) return;
    const midX = this.ctx.canvas.width / 2;
    const midY = this.ctx.canvas.height / 2;

    this.ctx.fillStyle = color;

    this.ctx.fillRect(
      midX +
        (this.viewport.offset.x + x - midX - width / 2) * this.viewport.scale,
      midY +
        (this.viewport.offset.y + y - midY - height / 2) * this.viewport.scale,
      width * this.viewport.scale,
      height * this.viewport.scale,
    );
  }

  drawCircle(color: string, x: number, y: number, radius: number) {
    if (!this.ctx) return;
    const midX = this.ctx.canvas.width / 2;
    const midY = this.ctx.canvas.height / 2;

    this.ctx.fillStyle = color;

    const startAngle = 0;
    const endAngle = 2 * Math.PI;

    this.ctx.beginPath();
    this.ctx.arc(
      midX + (this.viewport.offset.x + x - midX) * this.viewport.scale,
      midY + (this.viewport.offset.y + y - midY) * this.viewport.scale,
      radius * this.viewport.scale,
      startAngle,
      endAngle,
    );
    this.ctx.fill();
  }

  drawPolygon(
    color: string,
    strokeWidth: number,
    points: Point[],
    shouldClose = true,
  ) {
    if (!points) return;
    if (!this.ctx) return;
    if (points.length === 0) return;
    const midX = this.ctx.canvas.width / 2;
    const midY = this.ctx.canvas.height / 2;

    this.ctx.strokeStyle = color;
    this.ctx.lineWidth = strokeWidth * this.viewport.scale;
    this.ctx.beginPath();

    for (let i = 0; i < points.length; i += 1) {
      const point = points[i];

      const x =
        midX + (this.viewport.offset.x + point.x - midX) * this.viewport.scale;
      const y =
        midY + (this.viewport.offset.y + point.y - midY) * this.viewport.scale;

      if (i === 0) this.ctx.moveTo(x, y);
      else this.ctx.lineTo(x, y);
    }

    if (shouldClose) this.ctx.closePath();
    this.ctx.stroke();
  }

  strokeRect(
    color: string,
    strokeWidth: number,
    x: number,
    y: number,
    width: number,
    height: number,
  ) {
    if (!this.ctx) return;
    const midX = this.ctx.canvas.width / 2;
    const midY = this.ctx.canvas.height / 2;

    this.ctx.lineWidth = strokeWidth * this.viewport.scale;
    this.ctx.strokeStyle = color;

    this.ctx.strokeRect(
      midX +
        (this.viewport.offset.x + x - midX - width / 2) * this.viewport.scale,
      midY +
        (this.viewport.offset.y + y - midY - height / 2) * this.viewport.scale,
      width * this.viewport.scale,
      height * this.viewport.scale,
    );
  }

  drawImage(
    image: CanvasImageSource,
    x: number,
    y: number,
    width: number,
    height: number,
  ) {
    if (!this.ctx) return;
    const midX = this.ctx.canvas.width / 2;
    const midY = this.ctx.canvas.height / 2;

    this.ctx.drawImage(
      image,
      midX +
        (this.viewport.offset.x + x - midX - width / 2) * this.viewport.scale,
      midY +
        (this.viewport.offset.y + y - midY - height / 2) * this.viewport.scale,
      width * this.viewport.scale,
      height * this.viewport.scale,
    );
  }
}

export const scene = new Scene();
