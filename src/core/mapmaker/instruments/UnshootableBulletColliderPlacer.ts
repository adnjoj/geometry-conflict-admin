import type { Scene } from '../scene/scene';
import { GameObjectBuildDirector } from '../game-objects/GameObjectBuildDirector';
import { UnshootableBulletColliderBuilder } from '../game-objects/builders/UnshootableBulletColliderBuilder';
import { PathPlacer } from './PathPlacer';

export class UnshootableBulletColliderPlacer extends PathPlacer {
  protected color = 'tomato';

  constructor(scene: Scene) {
    super(scene);
    this.createPreviewPoint();
  }

  protected generateName() {
    return 'unshootable bullet collider';
  }

  protected instantiateGameObjectAt(name: string, x: number, y: number) {
    const bulletColliderBuilder = new UnshootableBulletColliderBuilder();
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
