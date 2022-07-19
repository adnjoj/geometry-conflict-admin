import type { Scene } from '../../scene/scene';
import { ImageRenderer } from '../renderers/ImageRenderer';
import { GameObjectBox } from './GameObjectBox';

export class ImageBox extends GameObjectBox {
  getBox(scene: Scene) {
    if (!('file' in this.gameObject.renderData)) return;
    const image = scene.getImage(this.gameObject.renderData.file);
    if (!image) return null;

    const { x, y } = this.gameObject.renderData;
    const { width: w, height: h } = image;

    return [
      [
        {
          x: x - (w / 2) * ImageRenderer.imageScale,
          y: y - (h / 2) * ImageRenderer.imageScale,
        },
        {
          x: x + (w / 2) * ImageRenderer.imageScale,
          y: y - (h / 2) * ImageRenderer.imageScale,
        },
        {
          x: x + (w / 2) * ImageRenderer.imageScale,
          y: y + (h / 2) * ImageRenderer.imageScale,
        },
        {
          x: x - (w / 2) * ImageRenderer.imageScale,
          y: y + (h / 2) * ImageRenderer.imageScale,
        },
      ],
    ];
  }
}
