import type { Point } from '../../../../types/mapmaker/Point';
import type { Scene } from '../../scene/scene';
import type { GameObject } from '../GameObject';

export abstract class GameObjectBox {
  constructor(protected readonly gameObject: GameObject) {}

  abstract getBox(scene: Scene): Point[][];
}
