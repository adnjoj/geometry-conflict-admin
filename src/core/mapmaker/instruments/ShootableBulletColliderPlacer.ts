import type { Scene } from '../scene/scene';
import { GameObjectBuildDirector } from '../game-objects/GameObjectBuildDirector';
import { ShootableBulletColliderBuilder } from '../game-objects/builders/ShootableBulletColliderBuilder';
import { PathPlacer } from './PathPlacer';

export class ShootableBulletColliderPlacer extends PathPlacer {
  protected color = 'green';

  constructor(scene: Scene) {
    super(scene);
    this.createPreviewPoint();
  }

  protected generateName() {
    return 'shootable bullet collider';
  }

  protected instantiateGameObjectAt(name: string, x: number, y: number) {
    const bulletColliderBuilder = new ShootableBulletColliderBuilder();
    const buildDirector = new GameObjectBuildDirector(bulletColliderBuilder);
    const collider = buildDirector.construct(name);

    collider.updateRenderData({ x, y });

    return collider;
  }

  protected shouldReset() {
    // Points count is equals to actual count + 1
    // because 1 point always shows where the next will be put
    return this.pointsCount > 4;
  }
}
