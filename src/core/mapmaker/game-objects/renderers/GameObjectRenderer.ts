import type { Scene } from '../../scene/scene';
import type { GameObject } from '../GameObject';

export abstract class GameObjectRenderer {
  constructor(protected readonly gameObject: GameObject) {}

  abstract render(scene: Scene): void;

  abstract renderSelection(scene: Scene): void;
}
