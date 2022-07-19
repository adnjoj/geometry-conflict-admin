import type { Scene } from '../../scene/scene';
import { GameObjectRenderer } from './GameObjectRenderer';

export class ImageRenderer extends GameObjectRenderer {
  public static imageScale = 0.5;

  render(scene: Scene) {
    if (!('file' in this.gameObject.renderData)) return;
    const image = scene.getImage(this.gameObject.renderData.file);
    if (!image) return;

    scene.drawImage(
      image,
      this.gameObject.renderData.x,
      this.gameObject.renderData.y,
      (image.width as number) / 2,
      (image.height as number) / 2,
    );
  }

  renderSelection(scene: Scene) {
    if (!('file' in this.gameObject.renderData)) return;
    const image = scene.getImage(this.gameObject.renderData.file);
    if (!image) return;

    const color = '#1db1eb';
    const strokeWidth = 2;
    scene.strokeRect(
      color,
      strokeWidth,
      this.gameObject.renderData.x,
      this.gameObject.renderData.y,
      (image.width as number) * ImageRenderer.imageScale + 2,
      (image.height as number) * ImageRenderer.imageScale + 2,
    );
  }
}
